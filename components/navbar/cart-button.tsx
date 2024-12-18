"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getCart } from "@/app/actions/cart";
import { useSession } from "next-auth/react";

export default function CartButton() {
  const { data: session } = useSession();
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (session?.user) {
        const result = await getCart();
        if (result.success && result.cart) {
          setItemCount(result.cart.items.length);
        }
      }
    };

    fetchCartCount();
  }, [session]);

  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href="/cart" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
