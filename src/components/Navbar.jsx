import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="#top" className="logo">
        Shopsy
      </a>

      <div className="nav-links">
        <a href="#description">Product Description</a>

        <a href="#products">All Products</a>

        <a href="#cart">Cart</a>
      </div>
    </nav>
  );
};

export default Navbar;
