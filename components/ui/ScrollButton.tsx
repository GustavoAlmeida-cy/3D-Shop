"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollButton() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const isScrollingUp = currentY < lastScrollY;
      const isNearTop = currentY < 100;
      setShow(isNearTop || isScrollingUp);
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
        >
          <Link
            href="#preview"
            aria-label="Scroll to preview section"
            className="flex items-center px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-200 bg-black/30 backdrop-blur-sm hover:bg-black/50 transition"
          >
            <MdKeyboardDoubleArrowDown className="w-4 h-4 mr-2 animate-pulse" />
            <span>Scroll down</span>
            <MdKeyboardDoubleArrowDown className="w-4 h-4 ml-2 animate-pulse" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
