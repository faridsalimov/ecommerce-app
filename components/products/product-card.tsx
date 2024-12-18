"use client";

import { Product } from "@/types/product";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import AddToCartButton from "./add-to-cart-button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="relative h-48 mb-4">
          <Image src={product.image} alt={product.name} fill className="object-cover rounded-md" />
        </div>
        <CardTitle>{product.name}</CardTitle>
        <div className="mt-2">
          <Badge variant="secondary">{product.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">{product.price} ₼</div>
          {product.description && <div className="text-sm text-muted-foreground">{product.description}</div>}
          {product.stock && (
            <div className="text-sm">
              <Badge variant="outline">Stokda: {product.stock}</Badge>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <AddToCartButton productId={product.id.toString()} />
      </CardFooter>
    </Card>
  );
}
