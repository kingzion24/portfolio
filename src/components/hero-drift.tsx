"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Lifts and fades a page's opening headline as the first screen scrolls away.
 * Moves up, never down, so it can't slide into the content beneath it.
 */
export function HeroDrift({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -140]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <motion.div style={reduce ? undefined : { y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
