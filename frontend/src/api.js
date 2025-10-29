const BASE = 'http://localhost:5000/api';

export async function fetchProducts() {
  const r = await fetch(`${BASE}/products`);
  if (!r.ok) throw new Error('Failed to fetch products');
  return r.json();
}

export async function getCart() {
  const r = await fetch(`${BASE}/cart`);
  if (!r.ok) throw new Error('Failed to fetch cart');
  return r.json();
}

export async function addOrUpdateCart(productId, qty) {
  const r = await fetch(`${BASE}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, qty })
  });
  return r.json();
}

export async function removeCartItem(id) {
  const r = await fetch(`${BASE}/cart/${id}`, { method: 'DELETE' });
  return r.json();
}

export async function checkout(payload) {
  const r = await fetch(`${BASE}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return r.json();
}
