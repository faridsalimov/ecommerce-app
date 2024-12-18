"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Haqqımızda</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:underline">
                  Şirkət haqqında
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Karyera
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:underline">
                  Mətbuat
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Müştərilər üçün</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="hover:underline">
                  Yardım mərkəzi
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:underline">
                  Çatdırılma
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:underline">
                  Qaytarma siyasəti
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Satıcılar üçün</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sell" className="hover:underline">
                  Satmağa başla
                </Link>
              </li>
              <li>
                <Link href="/seller-center" className="hover:underline">
                  Satıcı mərkəzi
                </Link>
              </li>
              <li>
                <Link href="/seller-rules" className="hover:underline">
                  Satış qaydaları
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Bizimlə əlaqə</h3>
            <div className="flex space-x-4 mb-4">
              <Link href="https://facebook.com" className="hover:text-primary">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="https://instagram.com" className="hover:text-primary">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="https://twitter.com" className="hover:text-primary">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              Email: info@ecommerce.az
              <br />
              Tel: +994 12 345 67 89
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <div>&copy; {new Date().getFullYear()} ecommerce.az. Bütün hüquqlar qorunur.</div>
        </div>
      </div>
    </footer>
  );
}
