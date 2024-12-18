"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Order, OrderData } from "@/types/order";

export function useOrders() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (status !== "authenticated") return;

    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: OrderData) => {
    if (status !== "authenticated") return { error: "Unauthorized" };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (data.order) {
        setOrders([data.order, ...orders]);
      }
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      return { error: "Failed to create order" };
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchOrders();
    }
  }, [status]);

  return {
    orders,
    loading,
    createOrder,
    refreshOrders: fetchOrders,
  };
}
