import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { CartProvider } from "./CartContext/CartContext";

// Error Boundary Component (optional enhancement)
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="cosmic-error-container">
          <h1 className="text-light">⚠️ Application Error</h1>
          <p className="text-muted">
            Please refresh the page or try again later
          </p>
          <button
            className="btn btn-neon"
            onClick={() => window.location.reload()}
          >
            🔄 Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <CartProvider>
        <App />
      </CartProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
