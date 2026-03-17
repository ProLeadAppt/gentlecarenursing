"use client";

import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "@/design-system/tokens";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * A wrapper component that provides a smooth, orchestral reveal when scrolled into view.
 */
export function SectionReveal({ children, className = "", delay = 0 }: SectionRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={ANIMATION_VARIANTS.container}
      className={className}
    >
      <motion.div variants={ANIMATION_VARIANTS.item} transition={{ delay }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
