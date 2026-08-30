import React from "react";
import Button from "./Button";

const CartItem = ({
  name,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const subtotal = price * quantity;
  return (
    <div className="cart-item">
      <div>
        <h4 className="item-name">{name}</h4>
        <p className ="cart-price">₹{price} each</p>
      </div>

      <div className="quantity-controls">
        <Button label="−" variant="outline" onClick={onDecrease} />

        <span>{quantity}</span>

        <Button
          label="+"
          variant="outline"
          onClick={onIncrease}
          disabled={quantity >= 10}
        />
      </div>

      <div className="cart-subtotal">
        <strong>₹{subtotal}</strong>

        <Button label="Remove" variant="danger" onClick={onRemove} />
      </div>
    </div>
  );
};

export default CartItem;
