"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, CreditCard } from "lucide-react";

export default function ProfileOverview() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const user = session.user;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Şəxsi Məlumatlar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-semibold">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Qoşulma tarixi:{" "}
              {formatDate(user.createdAt || new Date().toISOString())}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hesab Statistikası</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Package className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Ümumi Sifariş</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <MapPin className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Saxlanılmış Ünvan</p>
              <p className="text-2xl font-semibold">3</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <CreditCard className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Ödəniş Metodu</p>
              <p className="text-2xl font-semibold">2</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Son Sifarişlər</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div
                key={order}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    Sifariş #{String(order).padStart(6, "0")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(new Date().toISOString())}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">459.99 ₼</p>
                  <Badge variant="secondary">Çatdırılıb</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
