"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Delay in milliseconds before the element animates in. */
  delay?: number;
  className?: string;
  as?: ElementType;
  /** Set false to animate in-place children (headlines) without the translate. */
  shift?: boolean;
};

/**
 * Reveals children once they scroll into view. Purely CSS-driven (see globals.css)
 * so it costs nothing on the main thread and degrades gracefully without JS.
 */
export function Reveal({ children, delay = 0, className = "", as, shift = true }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={`${shift ? "reveal" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
