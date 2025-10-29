import React from 'react';
export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <div className="card-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p><strong>₹{(product.price/1).toFixed(0)}</strong></p>
        <button onClick={onAdd}>Add to Cart</button>
      </div>
    </div>
  );
}
