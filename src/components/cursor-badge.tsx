"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * A round label that trails just below-right of the pointer while `active`; the
 * cursor itself stays as it is. Mouse and trackpad only — touch screens have no
 * hover to follow.
 */
export function CursorBadge({ active, label }: { active: boolean; label: string }) {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 520, damping: 38, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 520, damping: 38, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[45]"
    >
      <motion.div
        initial={false}
        animate={{ scale: active ? 1 : 0, rotate: active ? 0 : -45 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className="ml-5 mt-5 grid h-24 w-24 place-items-center rounded-full bg-accent label text-bg"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
