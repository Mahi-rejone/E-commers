"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BikeIcon } from "lucide-react";

export default function Navbar() {
  const user: any = {
    name: "John Doe",
    email: "john.doe@example.com",
    isAdmin: true,
  };
  const { cartCount, setISCartOpen } = {
    cartCount: 5,
    setISCartOpen: (_data: any) => {},
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-white sticky top-0 z-50 boder-b border-app-borrder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-[22px] font-medium shink-0"
        >
          <BikeIcon size={28} className="text-app-green" /> ShopEasy
        </Link>
        <div className="w-full flex items-center justify-end gap-4 lg:gap-10">
          {/* Add navigation items here (Desktop) */}
          <div className="hidden md:flex iems-cene gap-6 text-sm text-zinc-600">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/deals" className="text-app-orange">
              Deals
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
