"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useHasFinePointer } from "@/hooks/useMediaQuery";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
}

/**
 * Provides a subtle magnetic pull effect to its children on hover.
 *
 * No-ops on touch-only devices and when the user prefers reduced motion —
 * the effect requires a fine pointer to be perceptible, and on touch it
 * just adds an extra motion.div + per-event spring computation for nothing.
 */
export function Magnetic({ children, strength = 0.15 }: MagneticProps) {
  const hasFinePointer = useHasFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const enabled = hasFinePointer && !prefersReducedMotion;

  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if (!enabled) {
    // Bypass the motion wrapper entirely on touch / reduced-motion. The
    // children render exactly where they are, no wrapping div, no listeners.
    return <>{children}</>;
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();

    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
