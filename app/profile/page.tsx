"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileOverview from "@/components/profile/profile-overview";
import ProfileOrders from "@/components/profile/profile-orders";
import ProfileSettings from "@/components/profile/profile-settings";
import ProfileAddresses from "@/components/profile/profile-addresses";

export default function ProfilePage() {
  return (
    <div className="p-3">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Ümumi</TabsTrigger>
          <TabsTrigger value="orders">Sifarişlər</TabsTrigger>
          <TabsTrigger value="addresses">Ünvanlar</TabsTrigger>
          <TabsTrigger value="settings">Tənzimləmələr</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ProfileOverview />
        </TabsContent>

        <TabsContent value="orders">
          <ProfileOrders />
        </TabsContent>

        <TabsContent value="addresses">
          <ProfileAddresses />
        </TabsContent>

        <TabsContent value="settings">
          <ProfileSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
