"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const categories = ["Elektronika", "Geyim", "Ev və Bağ", "İdman"];

export default function Categories() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Kateqoriyalar</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card key={category} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">{category}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
