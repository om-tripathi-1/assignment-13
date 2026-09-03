import React from "react";
import EmptyState from "./EmptyState";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onAddToCart, cartItems }) => {
  if (products.length === 0) {
    return <EmptyState message="No products found" />;
  }

  return (
    <div className="product-grid">
      {products.map((product) => {
        const isInCart = cartItems.some((item) => item.id === product.id);

        return (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image_url={product.image_url}
            image={product.image}
            category={product.category}
            isInCart={isInCart}
            onAddToCart={() => onAddToCart(product)}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
