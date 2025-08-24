import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const cartItemCount = cartItems.length;

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">MyShop</span>
        </Link>

        <button
          className="mobile-menu-button"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <span className="menu-icon"></span>
        </button>

        <nav className={`main-nav ${isOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/products" className="nav-link">
                <span className="link-icon">🧾</span>
                <span>Products</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/cart" className="nav-link cart-link">
                <span className="link-icon">🛒</span>
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
