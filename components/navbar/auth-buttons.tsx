"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthButtons() {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" asChild>
        <Link href="/auth/login">Daxil ol</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/register">Qeydiyyat</Link>
      </Button>
    </div>
  );
}
