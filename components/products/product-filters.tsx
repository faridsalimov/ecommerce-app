"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductFilters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtrlər</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">Axtar</Label>
          <Input type="search" id="search" placeholder="Məhsul adı..." />
        </div>

        <div className="space-y-2">
          <Label>Kateqoriya</Label>
          <div className="flex flex-wrap gap-2">
            {["Hamısı", "Elektronika", "Ayaqqabı", "Geyim", "Ev və Bağ"].map(
              (category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  {category}
                </Button>
              )
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Qiymət</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input type="number" placeholder="Min" />
            <Input type="number" placeholder="Max" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
