import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="product-image"
        />
      </div>

      <div className="product-details">
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>

        <div className="product-price">${product.price.toFixed(2)}</div>

        <Link
          to={`/product/${product.id}`}
          className="details-button"
          aria-label={`See details for ${product.title}`}
        >
          🔍 View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
