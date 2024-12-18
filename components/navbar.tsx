"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Search, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import UserMenu from "./navbar/user-menu";
import CartButton from "./navbar/cart-button";
import AuthButtons from "./navbar/auth-buttons";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold">
              ecommerce.az
            </Link>
            <div className="hidden md:flex items-center space-x-2">
              <Input type="search" placeholder="Məhsul axtarın..." className="w-64" />
              <Button size="icon" variant="ghost">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>İşıqlı</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Qaranlıq</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>Sistem</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <CartButton />

            {session ? <UserMenu /> : <AuthButtons />}

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
