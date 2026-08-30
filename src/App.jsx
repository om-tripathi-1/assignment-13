import { useState } from "react";

import Navbar from "./components/Navbar";
import ProductDescription from "./components/ProductDescription";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import SearchBar from "./components/SearchBar";

import { products } from "./data/products";

import "./App.css";

const MAX_QTY = 10;

function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading cart :", error);
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [sortOrder, setSortOrder] = useState("");

  function updateCart(newCart) {
    setCartItems(newCart);

    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function handleAddToCart(product) {
    const existingItem = cartItems.find((item) => item.id === product.id);

    let newCart;

    if (existingItem) {
      if (existingItem.quantity >= MAX_QTY) {
        return;
      }

      newCart = cartItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    } else {
      newCart = [
        ...cartItems,

        {
          ...product,
          quantity: 1,
        },
      ];
    }

    updateCart(newCart);
  }

  function handleIncrease(id) {
    const newCart = cartItems.map((item) => {
      if (item.id === id && item.quantity < MAX_QTY) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    updateCart(newCart);
  }

  function handleDecrease(id) {
    const item = cartItems.find((item) => item.id === id);

    if (!item) return;

    let newCart;

    if (item.quantity === 1) {
      newCart = cartItems.filter((item) => item.id !== id);
    } else {
      newCart = cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      );
    }

    updateCart(newCart);
  }

  function handleRemove(id) {
    const newCart = cartItems.filter((item) => item.id !== id);

    updateCart(newCart);
  }

  function clearCart() {
    updateCart([]);
  }

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low") {
      return a.price - b.price;
    }

    if (sortOrder === "high") {
      return b.price - a.price;
    }

    return 0;
  });

  return (
    <div id="top">
      <Navbar />

      <main>
        <ProductDescription />

        <section id="products" className="products-section">
          <div className="section-header">
            <div>
              <span className="section-label">Our Collection</span>

              <h2 className="section-heading">All Products</h2>
            </div>

            <div className="filters">
              <SearchBar value={searchTerm} onChange={handleSearchChange} />

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Sort Products</option>

                <option value="low">Price: Low to High</option>

                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <ProductList
            products={sortedProducts}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
          />
        </section>

        <Cart
          cartItems={cartItems}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          onClear={clearCart}
        />
      </main>
    </div>
  );
}

export default App;
