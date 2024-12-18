"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react"; // NextAuth üçün useSession
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function ProfileSettings() {
  const { data: session, status, update } = useSession(); // Sessiyanı yoxlayırıq
  const router = useRouter();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Yeni şifrələr uyğun gəlmir");
      return;
    }
    setLoading(true);
    try {
      // TODO: Implement password change API call
      toast.success("Şifrə uğurla dəyişdirildi");
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Şifrə dəyişdirilə bilmədi");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      // TODO: Implement account deletion API call
      router.push("/");
      toast.success("Hesabınız silindi");
    } catch (error) {
      toast.error("Hesab silinə bilmədi");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <p>Yüklənir...</p>;
  }

  if (!session) {
    router.push("/login"); // Sessiya yoxdursa login səhifəsinə yönləndir
    return null;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profil Məlumatları</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ad</Label>
            <Input id="name" defaultValue={session.user.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={session.user.email} />
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
            Hesabınızı silmək bütün məlumatlarınızın silinməsinə səbəb olacaq.
            Bu əməliyyat geri qaytarıla bilməz.
          </p>
          <Button variant="destructive">Hesabı Sil</Button>
        </CardContent>
      </Card>
    </div>
  );
}
