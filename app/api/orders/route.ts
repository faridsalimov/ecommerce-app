import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Order from "@/lib/models/order";
import Cart from "@/lib/models/cart";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const orders = await Order.find({ user: session.user.id }).populate("items.product").sort({ createdAt: -1 });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { shippingAddress, paymentMethod } = await req.json();

    await connectDB();

    const cart = await Cart.findOne({ user: session.user.id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const total = cart.items.reduce((sum: number, item: { product: { price: number }; quantity: number }) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    const order = await Order.create({
      user: session.user.id,
      items: cart.items,
      total,
      shippingAddress,
      paymentMethod,
      paymentStatus: "pending",
      orderStatus: "processing",
    });

    await Cart.findOneAndUpdate({ user: session.user.id }, { $set: { items: [] } });

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
