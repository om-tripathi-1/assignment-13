import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import { useAuth } from "./hooks/useAuth";
import { useCart } from "./hooks/useCart";
import { useProducts } from "./hooks/useProducts";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const { user, authLoading, login, signup, logout } = useAuth();
  const products = useProducts(user);
  const cart = useCart(user);

  const totalCartItems = cart.cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  async function handleLogin({ email, password }) {
    if (await login(email, password)) navigate("/products");
  }

  async function handleSignup(formData) {
    if (await signup(formData)) navigate("/login");
  }

  async function handleLogout() {
    if (await logout()) navigate("/");
  }

  return (
    <div>
      <Navbar cartCount={totalCartItems} user={user} onLogout={handleLogout} />

      <main>
        <Routes>
          <Route path="/login" element={<AuthForm mode="login" onSubmit={handleLogin} />} />
          <Route path="/signup" element={<AuthForm mode="signup" onSubmit={handleSignup} />} />
          <Route
            path="/products"
            element={
              authLoading ? null : (
                <ProductsPage
                  products={products}
                  onAddToCart={cart.addToCart}
                  cartItems={cart.cartItems}
                />
              )
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cart.cartItems}
                onIncrease={cart.increase}
                onDecrease={cart.decrease}
                onRemove={cart.remove}
                onClear={cart.clear}
              />
            }
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;