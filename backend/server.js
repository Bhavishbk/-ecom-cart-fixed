const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const productsSeed = require('./data/seed');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory DB
const PRODUCTS = [...productsSeed];
let CART = { items: [] }; // items: { id: cartItemId, productId, name, price, qty, lineTotal }
let RECEIPTS = [];

// GET /api/products
app.get('/api/products', (req, res) => {
  res.json(PRODUCTS);
});

// POST /api/cart -> add or update item
app.post('/api/cart', (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || typeof qty !== 'number' || qty <= 0) {
      return res.status(400).json({ error: 'productId and qty (>0) required' });
    }
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return res.status(404).json({ error: 'product not found' });

    // Check if item exists in cart
    const existing = CART.items.find(i => i.productId === productId);
    if (existing) {
      // Replace qty (documented approach)
      existing.qty = qty;
      existing.lineTotal = existing.price * existing.qty;
    } else {
      const cartItem = {
        id: uuidv4(),
        productId: product.id,
        name: product.name,
        price: product.price,
        qty,
        lineTotal: product.price * qty
      };
      CART.items.push(cartItem);
    }

    const cartTotal = CART.items.reduce((s, it) => s + it.lineTotal, 0);
    return res.json({ items: CART.items, cartTotal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /api/cart
app.get('/api/cart', (req, res) => {
  const cartTotal = CART.items.reduce((s, it) => s + it.lineTotal, 0);
  res.json({ items: CART.items, cartTotal });
});

// DELETE /api/cart/:id
app.delete('/api/cart/:id', (req, res) => {
  const id = req.params.id;
  const before = CART.items.length;
  CART.items = CART.items.filter(i => i.id !== id && i.productId !== id);
  const after = CART.items.length;
  const cartTotal = CART.items.reduce((s, it) => s + it.lineTotal, 0);
  if (before === after) return res.status(404).json({ error: 'item not found' });
  res.json({ success: true, items: CART.items, cartTotal });
});

// POST /api/checkout
app.post('/api/checkout', (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email required' });
    if (CART.items.length === 0) return res.status(400).json({ error: 'cart empty' });

    const total = CART.items.reduce((s, i) => s + i.lineTotal, 0);
    const receipt = {
      receiptId: uuidv4(),
      name,
      email,
      items: CART.items,
      total,
      timestamp: new Date().toISOString()
    };

    RECEIPTS.push(receipt);

    // Clear cart after checkout
    CART.items = [];

    res.status(201).json(receipt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Backend listening on', PORT));
