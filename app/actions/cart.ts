"use server";

import connectDB from "@/lib/db";
import Cart from "@/lib/models/cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function addToCart(productId: string, quantity: number = 1) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: "Səbətə əlavə etmək üçün daxil olmalısınız",
      };
    }

    const cart = await Cart.findOneAndUpdate(
      { user: session.user.id },
      {
        $push: { items: { product: productId, quantity, price: 0 } },
      },
      { upsert: true, new: true }
    ).populate("items.product");

    return { success: true, cart };
  } catch (error) {
    console.error("Add to cart error:", error);
    return { success: false, error: "Səbətə əlavə edilərkən xəta baş verdi" };
  }
}

export async function removeFromCart(itemId: string) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { success: false, error: "İcazəniz yoxdur" };
    }

    const cart = await Cart.findOneAndUpdate(
      { user: session.user.id },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    ).populate("items.product");

    return { success: true, cart };
  } catch (error) {
    console.error("Remove from cart error:", error);
    return {
      success: false,
      error: "Məhsul səbətdən silinərkən xəta baş verdi",
    };
  }
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { success: false, error: "İcazəniz yoxdur" };
    }

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

    return { success: true, cart };
  } catch (error) {
    console.error("Update cart quantity error:", error);
    return { success: false, error: "Miqdar yenilənərkən xəta baş verdi" };
  }
}

export async function getCart() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { success: false, error: "İcazəniz yoxdur" };
    }

    const cart = await Cart.findOne({ user: session.user.id }).populate("items.product");

    return { success: true, cart };
  } catch (error) {
    console.error("Get cart error:", error);
    return {
      success: false,
      error: "Səbət məlumatları alınarkən xəta baş verdi",
    };
  }
}
