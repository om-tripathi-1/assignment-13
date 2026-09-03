import React from "react";
import { useState } from "react";

import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";

const ProductsPage = ({
  products,
  onAddToCart,
  cartItems,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low") return a.price - b.price;
    if (sortOrder === "high") return b.price - a.price;
    return 0;
  });

  return (
    <section id="products" className="products-section">
      <div className="section-header">
        <div>
          <span className="section-label">Our Collection</span>
          <h1 className="section-heading">All Products</h1>
        </div>

        <div className="filters">
          <SearchBar value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
            <option value="">Sort Products</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <ProductList
        products={sortedProducts}
        onAddToCart={onAddToCart}
        cartItems={cartItems}
      />
    </section>
  );
};

export default ProductsPage;
