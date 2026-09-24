"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useVelocity,
} from "framer-motion";
import { useId } from "react";

/**
 * Circular text that turns slowly on its own and spins up while the page scrolls.
 * Decorative only — the same words are already on the page.
 */
export function SpinBadge({ text, className = "" }: { text: string; className?: string }) {
  const id = useId();
  const reduce = useReducedMotion();
  const rotate = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const boost = Math.min(Math.abs(velocity.get()) / 150, 10);
    rotate.set(rotate.get() + (delta / 1000) * 16 * (1 + boost));
  });

  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      <motion.svg viewBox="0 0 100 100" style={{ rotate }} className="h-full w-full overflow-visible">
        <defs>
          <path id={id} d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
        </defs>
        <text className="fill-current uppercase" style={{ fontSize: 7.6, fontWeight: 500 }}>
          {/* textLength stretches the run to exactly one circumference (2π·40), so the seam closes. */}
          <textPath href={`#${id}`} textLength={251} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </motion.svg>
      <span className="absolute inset-0 grid place-items-center font-display text-2xl text-accent">
        &#8595;
      </span>
    </div>
  );
}
