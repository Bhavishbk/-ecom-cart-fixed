import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Products from './pages/Products';
import Cart from './pages/Cart';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">Vibe Commerce</Link>
        <nav>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}
