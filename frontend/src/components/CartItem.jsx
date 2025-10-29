import React, { useState } from 'react';
export default function CartItem({ item, onChangeQty, onRemove }) {
  const [localQty, setLocalQty] = useState(item.qty);
  function apply() {
    const q = Number(localQty);
    if (q <= 0) return alert('qty > 0');
    onChangeQty(item.productId, q);
  }
  return (
    <div className="cart-item">
      <div>
        <strong>{item.name}</strong>
        <p>₹{item.price} x {item.qty} = ₹{item.lineTotal}</p>
      </div>
      <div className="cart-controls">
        <input type="number" value={localQty} onChange={e=>setLocalQty(e.target.value)} min={1} />
        <button onClick={apply}>Update</button>
        <button onClick={onRemove}>Remove</button>
      </div>
    </div>
  );
}
