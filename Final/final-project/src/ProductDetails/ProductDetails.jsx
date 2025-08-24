import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../CartContext/CartContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(data);
        setError(false);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <LoadingSkeleton />;

  if (error || !product) {
    return (
      <div className="error-message">
        <h3>❌ Product Not Found</h3>
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-background" />

      <div className="product-container">
        {/* Image Section */}
        <div className="product-image-section">
          <div className="image-wrapper">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
              loading="lazy"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="product-info-section">
          <h1 className="product-name">{product.title}</h1>

          <div className="product-meta">
            <span className="category">{product.category}</span>
            <span className="rating">
              ⭐ {product.rating?.rate ?? "4.5"} (
              {product.rating?.count ?? "120"})
            </span>
          </div>

          <div className="product-price">${product.price.toFixed(2)}</div>

          <p className="product-description">{product.description}</p>

          <div className="product-actions">
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(product)}
            >
              🛒 Add to Cart
            </button>

            <button className="back-button" onClick={() => navigate(-1)}>
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton Component
const LoadingSkeleton = () => (
  <div className="loading-skeleton">
    <div className="skeleton-image"></div>
    <div className="skeleton-info">
      <div className="skeleton-line large"></div>
      <div className="skeleton-line medium"></div>
      <div className="skeleton-line small"></div>
      <div className="skeleton-line full"></div>
      <div className="skeleton-line full"></div>
      <div className="skeleton-line full"></div>
      <div className="skeleton-button"></div>
    </div>
  </div>
);

export default ProductDetails;
