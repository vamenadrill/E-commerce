import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page d-flex align-items-center justify-content-center">
      <div className="welcome-card text-center shadow-lg">
        <h1 className="main-heading mb-3">
          Welcome to <span className="highlight">ITI Store</span>
        </h1>

        <p className="subheading mb-4">
          Explore our <span className="featured">exclusive products</span> and
          grab
          <br /> the best deals today <span className="sparkle">✨</span>
        </p>

        <Link
          to="/products"
          className="shop-button btn btn-warning px-4 py-2 fw-bold"
        >
          🛍️ Shop Now
        </Link>
      </div>
    </div>
  );
}

export default Home;
