"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Edit, Trash } from "lucide-react";
import AddressForm from "./forms/address-form";
import { Badge } from "../ui/badge";

export default function ProfileAddresses() {
  const [showAddForm, setShowAddForm] = useState(false);

  const addresses = [
    {
      id: 1,
      title: "Ev",
      address: "28 May küçəsi 15",
      city: "Bakı",
      zipCode: "AZ1000",
      isDefault: true,
    },
    {
      id: 2,
      title: "İş",
      address: "Nizami küçəsi 23",
      city: "Bakı",
      zipCode: "AZ1001",
      isDefault: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Çatdırılma Ünvanları</h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Yeni Ünvan
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Yeni Ünvan Əlavə Et</CardTitle>
          </CardHeader>
          <CardContent>
            <AddressForm onSubmit={() => setShowAddForm(false)} />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold">{address.title}</h3>
                </div>
                <div className="space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.zipCode}
                </p>
              </div>
              {address.isDefault && (
                <Badge variant="secondary" className="mt-4">
                  Əsas Ünvan
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
