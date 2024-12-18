"use server";

import { OrderData } from "@/types/order";
import connectDB from "@/lib/db";
import Order from "@/lib/models/order";
import Cart from "@/lib/models/cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createOrder(orderData: OrderData) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { success: false, error: "Sifariş vermək üçün daxil olmalısınız" };
    }

    const cart = await Cart.findOne({ user: session.user.id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return { success: false, error: "Səbətiniz boşdur" };
    }

    const order = await Order.create({
      user: session.user.id,
      items: cart.items,
      total: cart.total,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
    });

    await Cart.findOneAndUpdate({ user: session.user.id }, { $set: { items: [], total: 0 } });

    return { success: true, order };
  } catch (error) {
    console.error("Create order error:", error);
    return { success: false, error: "Sifariş yaradılarkən xəta baş verdi" };
  }
}

export async function getUserOrders() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { success: false, error: "İcazəniz yoxdur" };
    }

    const orders = await Order.find({ user: session.user.id }).populate("items.product").sort({ createdAt: -1 });

    return { success: true, orders };
  } catch (error) {
    console.error("Get orders error:", error);
    return { success: false, error: "Sifarişlər alınarkən xəta baş verdi" };
  }
}
