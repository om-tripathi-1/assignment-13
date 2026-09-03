import React from "react";
import CartItem from "./CartItem";
import EmptyState from "./EmptyState";
import Badge from "./Badge";
import Button from "./Button";

const Cart = ({ cartItems, onIncrease, onDecrease, onRemove, onClear }) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <section id="cart" className="cart-section">
        <h2>Your Cart</h2>

        <EmptyState message="Your cart is empty" />
      </section>
    );
  }

  return (
    <section id="cart" className="cart-section">
      <div className="cart-header">
        <h2 className="cart-heading">
          Your Cart
          <Badge text={totalItems + " items"} color="count" />
        </h2>

        <Button label="Clear Cart" variant="danger" onClick={onClear} />
      </div>

      <div className="cart-list">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrease={() => onIncrease(item.cartItemId)}
            onDecrease={() => onDecrease(item.cartItemId)}
            onRemove={() => onRemove(item.cartItemId)}
          />
        ))}
      </div>

      <div className="cart-total">
        <span>Total Items</span>

        <strong>{totalItems}</strong>

        <span>Total Price</span>

        <strong>₹{totalPrice}</strong>
      </div>
    </section>
  );
};

export default Cart;
