import React, { useEffect, useState } from 'react';
import { fetchProducts, addOrUpdateCart, getCart } from '../api';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({ items: [], cartTotal: 0 });

  useEffect(() => {
    setLoading(true);
    fetchProducts().then(p => setProducts(p)).catch(console.error).finally(() => setLoading(false));
    getCart().then(setCart).catch(() => setCart({ items: [], cartTotal: 0 }));
  }, []);

  async function handleAdd(productId) {
    try {
      const existing = cart.items.find(i => i.productId === productId);
      const newQty = existing ? existing.qty + 1 : 1;
      const updated = await addOrUpdateCart(productId, newQty);
      setCart(updated);
    } catch (e) { console.error(e); alert('Failed to add to cart'); }
  }

  return (
    <div>
      <h2>Products</h2>
      {loading && <p>Loading...</p>}
      <div className="grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onAdd={() => handleAdd(p.id)} />
        ))}
      </div>
    </div>
  );
}
