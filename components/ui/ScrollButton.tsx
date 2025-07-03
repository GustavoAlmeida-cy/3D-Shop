"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollButton() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShow(currentScrollY < 100 || currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
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
          className="absolute bottom-32 left-1/3 md:left-1/2 transform -translate-x-1/2"
        >
          <Link
            href="#preview"
            className="flex flex-row items-center font-semibold p-3 mx-auto border-[1px] border-slate-200 rounded-xl text-sm text-slate-200 bg-black/30 backdrop-blur-sm"
          >
            <MdKeyboardDoubleArrowDown className="w-4 h-4 mr-2 animate-ping" />
            <span>click to scroll</span>
            <MdKeyboardDoubleArrowDown className="w-4 h-4 ml-2 animate-ping" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
