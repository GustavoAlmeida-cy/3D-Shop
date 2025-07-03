"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import TypingText from "@/components/ui/TypingText";
import ScrollButton from "../ui/ScrollButton";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative h-screen max-w-[1024px] mx-auto flex flex-col p-8 lg:pt-32 md:p-16"
      aria-label="Hero section"
    >
      <div className="flex flex-col md:flex-row items-center relative">
        <div className="w-full md:w-1/2 flex flex-col gap-8 z-10 bg-gradient-to-r from-stone-950 via-stone-950 to-transparent">
          <div>
            <TypingText
              text="Your keyboard"
              textStyles="text-5xl md:text-6xl font-bold"
            />
            <TypingText
              text="your comfort!"
              textStyles="text-5xl md:text-6xl font-bold"
            />
          </div>

          <p className="text-slate-400 font-semibold max-w-md">
            Discover a keyboard designed for both style and functionality,
            providing unmatched comfort and efficiency for your everyday tasks.
          </p>

          <div className="flex gap-6">
            <Link
              href="#preview"
              className="w-36 flex justify-center py-3 rounded-xl text-xs bg-gradient hover:brightness-110 transition"
              aria-label="Buy keyboard"
            >
              Buy keyboard
            </Link>
            <Link
              href="#features"
              className="w-36 flex justify-center py-3 rounded-xl text-xs border border-white hover:bg-white/10 transition"
              aria-label="See more features"
            >
              See more
            </Link>
          </div>
        </div>

        <Image
          src="/assets/hero.png"
          alt="Keyboard hero image"
          width={700}
          height={400}
          unoptimized={true}
          className="md:absolute left-1/4 top-4 mt-16 md:mt-0 object-contain"
          priority
        />
      </div>

      <ScrollButton />
    </section>
  );
};

export default Hero;
