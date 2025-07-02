import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

const Social = () => {
  return (
    <div className="flex flex-col gap-4">
      <Logo />

      <div className="flex flex-row gap-4">
        <Link
          href="#"
          className="flex items-center justify-center rounded-full bg-white p-1"
        >
          <FaInstagram className="text-stone-950" />
        </Link>
        <Link
          href="#"
          className="flex items-center justify-center rounded-full bg-white p-1"
        >
          <FaFacebookF className="text-stone-950" />
        </Link>
        <Link
          href="#"
          className="flex items-center justify-center rounded-full bg-white p-1"
        >
          <FaTwitter className="text-stone-950" />
        </Link>
        <Link
          href="#"
          className="flex items-center justify-center rounded-full bg-white p-1"
        >
          <FiYoutube className="text-stone-950" />
        </Link>
      </div>
    </div>
  );
};

export default Social;
