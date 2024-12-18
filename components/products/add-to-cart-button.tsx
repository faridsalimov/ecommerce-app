"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { addToCart } from "@/app/actions/cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface AddToCartButtonProps {
  productId: string;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }

    setLoading(true);
    try {
      const result = await addToCart(productId);
      if (result.success) {
        toast.success("Məhsul səbətə əlavə edildi");
      } else {
        toast.error(result.error || "Xəta baş verdi");
      }
    } catch (error) {
      toast.error("Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button className="w-full" onClick={handleAddToCart} disabled={loading}>
      {loading ? (
        <>
          <LoadingSpinner size={16} className="mr-2" />
          Əlavə edilir...
        </>
      ) : (
        "Səbətə əlavə et"
      )}
    </Button>
  );
}
