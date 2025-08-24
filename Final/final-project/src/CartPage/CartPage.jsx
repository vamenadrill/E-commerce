import React, { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import "./CartPage.css";

function CartPage() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-page container py-5">
      <h1 className="mb-4 text-center fw-bold">🛒 Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center fs-5 text-muted">Your cart is empty</p>
      ) : (
        <div className="row g-4">
          {cartItems.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm cart-item-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-img-top p-3"
                  style={{ height: "220px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text fw-semibold text-success">
                    ${item.price.toFixed(2)}
                  </p>
                  <button
                    className="btn btn-outline-danger mt-auto"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
