import React from "react";

const ProductDescription = () => {
  return (
    <section id="description" className="description-section">
      <div>
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

        <a href="#products" className="hero-button">
          Explore Products
        </a>
      </div>
    </section>
  );
};

export default ProductDescription;
