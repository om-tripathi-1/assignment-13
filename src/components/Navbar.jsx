import React from "react";
import { Link } from "react-router-dom";
import Badge from "./Badge";

const Navbar = ({ cartCount, user, onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Shopsy
      </Link>

      <div className="nav-links">
        <Link to="/products">All Products</Link>
        <Link to="/cart">
          Cart
          {cartCount > 0 ? <Badge text={cartCount} color="count" /> : null}
        </Link>

        {user ? (
          <>
            <button className="btn btn-outline" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
