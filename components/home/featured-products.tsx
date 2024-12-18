"use client";

import { products } from "@/lib/products";
import ProductCard from "@/components/products/product-card";

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 3);

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Seçilmiş Məhsullar</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
