"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[500px] rounded-lg overflow-hidden mb-12">
      <Image
        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
        alt="Hero image"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white space-y-4">
          <h1 className="text-5xl font-bold">Azərbaycanda Online Alış-Veriş</h1>
          <div className="text-xl">
            Ən yaxşı məhsullar, ən yaxşı qiymətlərlə
          </div>
          <div>
            <Button size="lg" asChild>
              <Link href="/products">İndi Alış-Veriş Et</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
