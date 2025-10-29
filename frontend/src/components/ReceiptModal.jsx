import React from 'react';
export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Receipt</h3>
        <p>Receipt ID: {receipt.receiptId}</p>
        <p>Name: {receipt.name} | Email: {receipt.email}</p>
        <p>Total: ₹{receipt.total}</p>
        <p>Time: {new Date(receipt.timestamp).toLocaleString()}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
