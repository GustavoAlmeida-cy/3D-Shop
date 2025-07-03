"use client";

import React from "react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "./Cart";

const Navbar: React.FC = () => {
  const { toggleCart } = useCart();

  return (
    <nav
      className="max-w-5xl flex justify-between items-center p-8 mx-auto"
      aria-label="Primary navigation"
    >
      <Logo size="lg" />

      <div className="hidden sm:flex flex-row gap-8 items-center">
        <Link
          href="#catalog"
          className="font-semibold text-sm text-slate-400 hover:text-slate-200 transition"
        >
          Catalog
        </Link>
        <Link
          href="#features"
          className="font-semibold text-sm text-slate-400 hover:text-slate-200 transition"
        >
          Features
        </Link>
        <Link
          href="#reviews"
          className="font-semibold text-sm text-slate-400 hover:text-slate-200 transition"
        >
          Reviews
        </Link>
      </div>

      <button
        onClick={toggleCart}
        aria-label="Toggle shopping cart"
        className="text-slate-400 hover:text-slate-200 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-400 rounded"
      >
        <FaCartShopping className="w-6 h-6" />
      </button>
    </nav>
  );
};

export default Navbar;
