import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products", {
          timeout: 5000,
        });
        setProducts(data);
      } catch (err) {
        console.log("Error loading products:", err);
        setError("Oops! Couldn't load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // error
  if (error) {
    return (
      <div className="error-message">
        <h3>⚠️ Something went wrong</h3>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          🔄 Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="product-grid">
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // load
  return (
    <div className="product-list">
      <div className="background-effect"></div>

      <div className="product-grid-container">
        <div className="product-grid">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="product-card-container"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const ProductCardSkeleton = () => (
  <div className="product-skeleton">
    <div className="skeleton-img"></div>
    <div className="skeleton-info">
      <div className="skeleton-line title"></div>
      <div className="skeleton-line price"></div>
      <div className="skeleton-btn"></div>
    </div>
  </div>
);

export default ProductList;
