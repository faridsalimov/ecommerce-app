import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import FeaturedProducts from "@/components/home/featured-products";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <Categories />
      <FeaturedProducts />
    </div>
  );
}
