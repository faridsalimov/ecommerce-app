"use client";

import { useSession, signIn } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfileInfo() {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Xəta baş verdi");

      await update({ ...session, user: formData });
      setIsEditing(false);
      toast.success("Məlumatlar yeniləndi");
    } catch (error) {
      toast.error("Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="text-center">
        <p>Giriş etməmisiniz</p>
        <LoadingButton onClick={() => signIn()}>Giriş Et</LoadingButton>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Şəxsi Məlumatlar</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ad</Label>
            {isEditing ? (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            ) : (
              <p className="text-lg">{session.user?.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            ) : (
              <p className="text-lg">{session.user?.email}</p>
            )}
          </div>
          {isEditing ? (
            <div className="flex space-x-2">
              <LoadingButton type="submit" loading={loading}>
                Yadda Saxla
              </LoadingButton>
              <LoadingButton
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Ləğv Et
              </LoadingButton>
            </div>
          ) : (
            <LoadingButton type="button" onClick={() => setIsEditing(true)}>
              Məlumatları Yenilə
            </LoadingButton>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
