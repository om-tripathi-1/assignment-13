import React from "react";
import Badge from "./Badge";

const Navbar = ({cartCount}) => {
  return (
    <nav className="navbar">
      <a href="#top" className="logo">
        Shopsy
      </a>

      <div className="nav-links">
        <a href="#description">Product Description</a>

        <a href="#products">All Products</a>

        <a href="#cart">
          Cart
          { cartCount > 0 ? <Badge text={cartCount} color="count" /> : null }
          </a>

      </div>
    </nav>
  );
};

export default Navbar;
