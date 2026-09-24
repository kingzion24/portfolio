"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Flips after the first page has mounted, so the curtain only plays on in-site navigation. */
let hasNavigated = false;

/**
 * Next remounts a template on every route change. Each new page is uncovered by
 * an ink panel wiping upward; the very first load is left alone so nothing
 * stands between a visitor and the content.
 */
export default function Template({ children }: { children: ReactNode }) {
  const [curtain] = useState(() => hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {curtain && <div aria-hidden="true" className="page-curtain" />}
      {children}
    </>
  );
}
