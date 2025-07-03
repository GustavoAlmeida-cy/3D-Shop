import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LogoProps {
  size?: "sm" | "lg";
}

const Logo: React.FC<LogoProps> = ({ size = "sm" }) => {
  const isLarge = size === "lg";
  const iconSize = isLarge ? 35 : 25;
  const textSize = isLarge ? "text-base" : "text-sm";

  return (
    <Link
      href="/"
      className="flex items-center gap-2 select-none group"
      aria-label="Go to homepage"
    >
      <Image
        src="/assets/logo.png"
        alt="3D Shop Logo"
        width={iconSize}
        height={iconSize}
        priority
        className="transition-opacity duration-300 group-hover:opacity-90"
      />
      <span className={`text-slate-200 font-semibold ${textSize}`}>
        Keyboard
      </span>
    </Link>
  );
};

export default Logo;
