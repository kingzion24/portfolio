"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";

/** Wraps v into [min, max) — keeps the track looping without a visible jump. */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Drifts on its own, speeds up with scroll, and turns round when the reader
 * scrolls back up. Items lean into the motion while it's fast.
 */
export function Marquee({ items }: { items: readonly string[] }) {
  // The track holds two identical runs and loops across exactly -50%, so the seam is never visible.
  const run = [...items, ...items];

  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(-1);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const skewX = useTransform(velocity, [-2500, 0, 2500], [10, 0, -10]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) direction.current = 1;
    else if (b > 0) direction.current = -1;
    // 1.5% of the track per second at rest — about the old 34s CSS loop.
    baseX.set(baseX.get() + direction.current * 1.5 * (delta / 1000) * (1 + Math.abs(b)));
  });

  return (
    <div className="relative flex overflow-hidden border-y border-line py-5" aria-hidden="true">
      <motion.div style={reduce ? undefined : { x }} className="flex shrink-0 gap-10 pr-10">
        {run.map((item, i) => (
          <motion.span
            key={i}
            style={reduce ? undefined : { skewX }}
            className="flex shrink-0 items-center gap-10 font-display text-big uppercase"
          >
            {item}
            <span className="text-accent">&#9679;</span>
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
