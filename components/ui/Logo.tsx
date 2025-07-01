import Image from "next/image";
import React from "react";

interface LogoProps {
  size?: "sm" | "lg";
}

const Logo = ({ size = "sm" }: LogoProps) => {
  const iconSize = size === "lg" ? 35 : 25;

  return (
    <div className="flex flex-row gap-2 items-center">
      <Image
        src="/assets/logo.png"
        alt="Logo"
        width={iconSize}
        height={iconSize}
      />
      <h1 className={`text-slate-400 ${size === "sm" ? "text-sm" : ""}`}>
        Keyboard
      </h1>
    </div>
  );
};

export default Logo;
