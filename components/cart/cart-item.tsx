"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/types/cart";
import { removeFromCart, updateCartItemQuantity } from "@/app/actions/cart";
import { useState } from "react";

interface CartItemProps {
  item: CartItemType;
  onUpdate: () => void;
}

export default function CartItem({ item, onUpdate }: CartItemProps) {
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setLoading(true);
    await updateCartItemQuantity(item._id, newQuantity);
    onUpdate();
    setLoading(false);
  };

  const handleRemove = async () => {
    setLoading(true);
    await removeFromCart(item._id);
    onUpdate();
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="relative w-24 h-24">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex-grow">
        <h3 className="font-semibold">{item.product.name}</h3>
        <p className="text-muted-foreground">
          {item.product.price} ₼ × {item.quantity} ={" "}
          {item.product.price * item.quantity} ₼
        </p>

        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={loading || item.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>

          <span className="w-8 text-center">{item.quantity}</span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={loading}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-destructive"
        onClick={handleRemove}
        disabled={loading}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
