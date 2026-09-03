import { useEffect, useState } from "react";

import { supabase } from "../../config/supabaseConfig";

const MAX_QTY = 10;

async function fetchCart(user, setCartItems) {
  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      product_id,
      products (id, name, description, price, image_url, category)
    `)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching cart:", error);
    return;
  }

  setCartItems(
    (data || []).map((item) => ({
      ...item.products,
      quantity: item.quantity,
      cartItemId: item.id,
    })),
  );
}

export function useCart(user) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetchCart(user, setCartItems);
  }, [user]);

  async function addToCart(product) {
    if (!user) {
      alert("Please login first.");
      window.location.href = "/login";
      return;
    }

    const { data: existingItem, error: findError } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("product_id", product.id)
      .maybeSingle();

    if (findError) {
      console.error("Error checking cart:", findError);
      return;
    }

    if (existingItem) {
      if (existingItem.quantity >= MAX_QTY) {
        alert(`Maximum quantity is ${MAX_QTY}.`);
        return;
      }

      await updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      const { error } = await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: product.id,
        quantity: 1,
      });

      if (error) {
        console.error("Error adding to cart:", error);
        return;
      }
    }

    await fetchCart(user, setCartItems);
  }

  async function updateQuantity(cartItemId, quantity) {
    if (!user) return false;

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", cartItemId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating cart quantity:", error);
      return false;
    }

    return true;
  }

  async function changeQuantity(cartItemId, amount) {
    const item = cartItems.find((cartItem) => cartItem.cartItemId === cartItemId);
    if (!item) return;

    const nextQuantity = item.quantity + amount;
    if (nextQuantity > MAX_QTY) {
      alert(`Maximum quantity is ${MAX_QTY}.`);
      return;
    }

    if (nextQuantity === 0) {
      await remove(cartItemId);
      return;
    }

    if (await updateQuantity(item.cartItemId, nextQuantity)) {
      setCartItems((currentItems) =>
        currentItems.map((cartItem) =>
          cartItem.cartItemId === cartItemId
            ? { ...cartItem, quantity: nextQuantity }
            : cartItem,
        ),
      );
    }
  }

  async function remove(cartItemId) {
    const item = cartItems.find((cartItem) => cartItem.cartItemId === cartItemId);
    if (!item) return;

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", item.cartItemId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error removing item:", error);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.filter((cartItem) => cartItem.cartItemId !== cartItemId),
    );
  }

  async function clear() {
    if (!user) return;

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Error clearing cart:", error);
      return;
    }

    setCartItems([]);
  }

  return {
    cartItems: user ? cartItems : [],
    addToCart,
    increase: (cartItemId) => changeQuantity(cartItemId, 1),
    decrease: (cartItemId) => changeQuantity(cartItemId, -1),
    remove,
    clear,
  };
}
