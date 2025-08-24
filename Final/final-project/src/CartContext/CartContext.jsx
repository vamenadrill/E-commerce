import React, { createContext, useState, useEffect, useCallback } from "react";
import "../CartContext/CartContext.css";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("shoppingCart");
    return saved ? JSON.parse(saved) : [];
  });

  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = useCallback((msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  }, []);

  const addToCart = useCallback(
    (product) => {
      setCartItems((prevItems) => {
        const exists = prevItems.find((item) => item.id === product.id);
        if (exists) {
          showToast(`Added another ${product.title}`);
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          showToast(`Added ${product.title} to cart`);
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    (id) => {
      setCartItems((prevItems) => {
        const item = prevItems.find((i) => i.id === id);
        if (!item) return prevItems;

        if (item.quantity > 1) {
          showToast(`Removed one ${item.title}`);
          return prevItems.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          );
        } else {
          showToast(`Removed ${item.title} from cart`);
          return prevItems.filter((i) => i.id !== id);
        }
      });
    },
    [showToast]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    showToast("Cart cleared");
  }, [showToast]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}

      {toast.show && (
        <div className="cart-toast">
          <span className="emoji">🛒</span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}
    </CartContext.Provider>
  );
};
