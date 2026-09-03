import React from "react";
import { Link } from "react-router-dom";

const ProductDescription = () => {
  return (
    <section id="description" className="description-section">
      <div className="decription-container">
        <span className="hero-label">Everything you need</span>

        <h1 className="hero-heading">
          Simple products.
          <br />
          Better everyday life.
        </h1>

        <p className="hero-para">
          Discover carefully selected electronics, home essentials, accessories
          and lifestyle products designed to make your everyday life easier.
        </p>

        <Link to="/products" className="hero-button">
          Explore Products
        </Link>
      </div>
    </section>
  );
};

export default ProductDescription;
