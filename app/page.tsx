// app/page.tsx
import Cart from "@/components/sections/Cart";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";
import Products from "@/components/sections/Products";
import Reviews from "@/components/sections/Reviews";
import Sale from "@/components/sections/Sale";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="text-slate-100">
      <Toaster position="top-right" reverseOrder={false} />

      <Cart />
      <Navbar />
      <Hero />
      <Products />
      <Features />
      <Reviews />

      <section className="bg-stone-800">
        <Sale />
        <Footer />
      </section>
    </main>
  );
}
