"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  fullHeight?: boolean;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  className?: string;
  staggerChildren?: number;
}

/**
 * A reusable scroll-reveal component that uses Framer Motion.
 * Standardises "premium" entrance animations across the site.
 */
export const Reveal = ({
  children,
  width = "fit-content",
  fullHeight = false,
  delay = 0.2,
  duration = 0.8,
  y = 24,
  x = 0,
  className = "",
  staggerChildren,
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: y,
      x: x 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        staggerChildren: staggerChildren,
      }
    },
  };

  return (
    <div 
      ref={ref} 
      className={`${className} ${fullHeight ? "h-full" : ""}`}
      style={{ position: "relative", width, overflow: "visible" }}
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
        className={fullHeight ? "h-full" : ""}
      >
        {children}
      </motion.div>
    </div>
  );
};
