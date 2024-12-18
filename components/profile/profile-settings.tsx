"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function ProfileSettings() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Yüklənir...</p>;
  }

  if (!session?.user) return null;

  const user = session.user;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profil Məlumatları</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ad</Label>
            <Input id="name" defaultValue={user.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user.email} />
          </div>
          <Button>Yadda Saxla</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Şifrə Dəyişdirmə</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Cari Şifrə</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Yeni Şifrə</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Yeni Şifrəni Təsdiqlə</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button>Şifrəni Yenilə</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hesab Silmə</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Hesabınızı silmək bütün məlumatlarınızın silinməsinə səbəb olacaq. Bu əməliyyat geri qaytarıla bilməz.
          </p>
          <Button variant="destructive">Hesabı Sil</Button>
        </CardContent>
      </Card>
    </div>
  );
}
