"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Importing useSession from next-auth
import { Cart } from "@/types/cart";

export function useCart() {
  const { data: session, status } = useSession(); // Use session to get authentication status
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (status !== "authenticated") return;

    try {
      const response = await fetch("/api/cart");
      const data = await response.json();
      if (data.cart) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (status !== "authenticated") return { error: "Unauthorized" };

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      if (data.cart) {
        setCart(data.cart);
      }
      return data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return { error: "Failed to add to cart" };
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (status !== "authenticated") return { error: "Unauthorized" };

    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity }),
      });
      const data = await response.json();
      if (data.cart) {
        setCart(data.cart);
      }
      return data;
    } catch (error) {
      console.error("Error updating cart:", error);
      return { error: "Failed to update cart" };
    }
  };

  const removeItem = async (itemId: string) => {
    if (status !== "authenticated") return { error: "Unauthorized" };

    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      const data = await response.json();
      if (data.cart) {
        setCart(data.cart);
      }
      return data;
    } catch (error) {
      console.error("Error removing from cart:", error);
      return { error: "Failed to remove from cart" };
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchCart();
    }
  }, [status]);

  return {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    refreshCart: fetchCart,
  };
}
