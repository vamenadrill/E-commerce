import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext/CartContext";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import ProductList from "./ProductList/ProductList";
import ProductDetails from "./ProductDetails/ProductDetails";
import CartPage from "./CartPage/CartPage";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <div className="app-background"></div>

          <Navbar />

          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
