"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedContainerProps {
  children: ReactNode;
  delay: number;
  styles?: string;
}

// Variants fora da função para evitar recriação
const getVariants = (delay: number): Variants => ({
  hidden: {
    opacity: 0,
    x: 50,
    y: 100,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeIn",
      duration: 0.5,
      delay,
    },
  },
});

const AnimatedContainer = ({
  children,
  delay,
  styles = "",
}: AnimatedContainerProps) => {
  return (
    <motion.div
      className={styles}
      variants={getVariants(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
