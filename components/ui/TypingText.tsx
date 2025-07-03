"use client";

import { motion, Variants } from "framer-motion";

interface TypingTextProps {
  text: string;
  textStyles?: string;
}

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  show: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: i * 0.05,
    },
  }),
};

const textVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeIn",
    },
  },
};

const TypingText: React.FC<TypingTextProps> = ({ text, textStyles }) => {
  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={textStyles}
    >
      {Array.from(text).map((letter, index) => (
        <motion.span key={index} variants={textVariant}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TypingText;
