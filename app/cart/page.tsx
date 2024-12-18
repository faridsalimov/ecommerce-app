"use client";

import { useEffect, useState } from "react";
import { getCart } from "@/app/actions/cart";
import CartItem from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";
import { Cart } from "@/types/cart";

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const result = await getCart();
    if (result.success) {
      setCart(result.cart);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Səbətiniz Boşdur</h1>
        <p className="text-muted-foreground mb-8">
          Səbətinizdə heç bir məhsul yoxdur. Alış-verişə davam etmək üçün
          mağazaya qayıdın.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Səbət</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <CartItem key={item._id} item={item} onUpdate={fetchCart} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}
