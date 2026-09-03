import React from "react";
import Cart from "../components/Cart";

const CartPage = ({
  cartItems,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}) => {
  return (
    <Cart
      cartItems={cartItems}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onRemove={onRemove}
      onClear={onClear}
    />
  );
};

export default CartPage;
