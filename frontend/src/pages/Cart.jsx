import React, { useEffect, useState } from 'react';
import { getCart, addOrUpdateCart, removeCartItem, checkout } from '../api';
import CartItem from '../components/CartItem';
import ReceiptModal from '../components/ReceiptModal';

export default function Cart() {
  const [cart, setCart] = useState({ items: [], cartTotal: 0 });
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [receipt, setReceipt] = useState(null);

  useEffect(() => { loadCart(); }, []);
  async function loadCart() {
    setLoading(true);
    try { const c = await getCart(); setCart(c); } catch (e) { console.error(e); }
    setLoading(false);
  }

  async function updateQty(productId, qty) {
    try {
      const updated = await addOrUpdateCart(productId, qty);
      setCart(updated);
    } catch (e) { console.error(e); }
  }

  async function removeItem(id) {
    try { const res = await removeCartItem(id); setCart(res); } catch (e) { console.error(e); }
  }

  async function handleCheckout(e) {
    e.preventDefault();
    if (!name || !email) return alert('Please enter name and email');
    try {
      const payload = { name, email };
      const r = await checkout(payload);
      if (r.error) return alert(r.error);
      setReceipt(r);
      await loadCart();
    } catch (err) { console.error(err); alert('Checkout failed'); }
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {loading && <p>Loading...</p>}
      <div>
        {cart.items.length === 0 && <p>Cart is empty</p>}
        {cart.items.map(item => (
          <CartItem key={item.id} item={item} onChangeQty={updateQty} onRemove={() => removeItem(item.id)} />
        ))}
      </div>
      <h3>Total: ₹{cart.cartTotal}</h3>
      <form onSubmit={handleCheckout} className="checkout-form">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button type="submit">Checkout (Mock)</button>
      </form>

      {receipt && <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />}
    </div>
  );
}
