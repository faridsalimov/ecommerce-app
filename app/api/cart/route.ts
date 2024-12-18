import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Cart from "@/lib/models/cart";
import mongoose from "mongoose";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const cart = await Cart.findOne({ user: session.user.id }).populate(
      "items.product"
    );

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Cart fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = new mongoose.Types.ObjectId(session.user.id);

    const { productId, quantity } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          items: {
            product: new mongoose.Types.ObjectId(productId),
            quantity: quantity || 1,
          },
        },
      },
      { upsert: true, new: true }
    ).populate("items.product");

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Cart update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { itemId, quantity } = await req.json();

    await connectDB();

    const cart = await Cart.findOneAndUpdate(
      {
        user: session.user.id,
        "items._id": itemId,
      },
      {
        $set: { "items.$.quantity": quantity },
      },
      { new: true }
    ).populate("items.product");

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Cart item update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { itemId } = await req.json();

    await connectDB();

    const cart = await Cart.findOneAndUpdate(
      { user: session.user.id },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    ).populate("items.product");

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Cart item delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
