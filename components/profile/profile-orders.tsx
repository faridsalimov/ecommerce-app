"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types/order";
import { formatDate, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function ProfileOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sifarişlərim</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sifarişlərim</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-muted-foreground">Hələ ki heç bir sifariş yoxdur.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border rounded-lg p-4 hover:bg-accent transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">Sifariş #{order._id.slice(-6)}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                  </div>
                  <Badge variant={order.orderStatus === "delivered" ? "default" : "secondary"}>
                    {order.orderStatus}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.product._id} className="flex justify-between text-sm">
                      <span>
                        {item.product.name} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.price)} ₼</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t flex justify-between font-medium">
                  <span>Cəmi</span>
                  <span>{formatPrice(order.total)} ₼</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
