import React from "react";
import Badge from "./Badge";
import Button from "./Button";


const ProductCard = ({
  name,
  price,
  image,
  category,
  onAddToCart,
  isInCart,
}) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className ="product-image" />
      <div className="product-content">
        <Badge text={category} color={category} />
        <h3 className="product-title">{name}</h3>
        <p className="product-price">₹{price}</p>
        {isInCart && <Badge text="In Cart" color="success" />}
        <Button
          label={isInCart ? "Added!" : "Add to Cart"}
          onClick={onAddToCart}
          disabled={isInCart}
        />
      </div>  
    </div>
  );
};

export default ProductCard;
