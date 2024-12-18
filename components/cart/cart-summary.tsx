"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Cart } from "@/types/cart";
import { formatPrice } from "@/lib/utils";

interface CartSummaryProps {
  cart: Cart;
}

export default function CartSummary({ cart }: CartSummaryProps) {
  const router = useRouter();
  const subtotal = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Sifariş Xülasəsi</h2>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Məbləğ</span>
          <span>{formatPrice(subtotal)} ₼</span>
        </div>

        <div className="flex justify-between">
          <span>Çatdırılma</span>
          <span>{formatPrice(shipping)} ₼</span>
        </div>

        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Cəmi</span>
            <span>{formatPrice(total)} ₼</span>
          </div>
        </div>
      </div>

      <Button
        className="w-full mt-6"
        onClick={() => router.push("/checkout")}
        disabled={cart.items.length === 0}
      >
        Sifarişi Tamamla
      </Button>
    </div>
  );
}
