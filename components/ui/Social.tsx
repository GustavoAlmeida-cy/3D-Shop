import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

const socialLinks = [
  {
    href: "https://www.instagram.com/yourprofile",
    label: "Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://www.facebook.com/yourprofile",
    label: "Facebook",
    Icon: FaFacebookF,
  },
  {
    href: "https://twitter.com/yourprofile",
    label: "Twitter",
    Icon: FaTwitter,
  },
  {
    href: "https://www.youtube.com/yourchannel",
    label: "YouTube",
    Icon: FiYoutube,
  },
];

const Social: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <Logo />

      <div className="flex flex-row gap-4">
        {socialLinks.map(({ href, label, Icon }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit our ${label} page`}
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:bg-stone-200"
          >
            <Icon className="text-stone-950 w-5 h-5" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Social;
