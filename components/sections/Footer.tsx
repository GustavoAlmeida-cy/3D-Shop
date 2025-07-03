import React from "react";
import Link from "next/link";
import Social from "../ui/Social";

const Footer: React.FC = () => {
  return (
    <footer
      className="container max-w-[1024px] mx-auto pt-32 relative z-20"
      aria-label="Footer"
    >
      <div className="flex flex-col gap-12 md:flex-row justify-between pb-8 px-8">
        <Social />

        <address className="not-italic flex flex-col gap-8">
          <div className="w-32 flex flex-col gap-2">
            <p className="p-xs font-semibold text-slate-400">Location:</p>
            <p>Some Address 121, USA, 12345</p>
          </div>

          <div className="w-32 flex flex-col gap-2">
            <p className="p-xs font-semibold text-slate-400">Phone:</p>
            <p>+123456789012</p>
          </div>
        </address>

        <nav
          aria-label="Footer navigation"
          className="flex flex-col gap-2 text-sm text-slate-400"
        >
          <Link href="#" legacyBehavior={false}>
            Home
          </Link>
          <Link href="#" legacyBehavior={false}>
            Catalog
          </Link>
          <Link href="#" legacyBehavior={false}>
            About
          </Link>
          <Link href="#" legacyBehavior={false}>
            Contact us
          </Link>
          <Link href="#" legacyBehavior={false}>
            Privacy policy
          </Link>
        </nav>
      </div>

      <hr className="border-slate-400" />

      <div className="w-full flex flex-col-reverse gap-y-2 md:flex-row items-center justify-between py-4 text-xs text-slate-400">
        <p>&copy; Fibipals Co.</p>
        <p>Contact us | keyboard@gamil.com</p>
      </div>
    </footer>
  );
};

export default Footer;
