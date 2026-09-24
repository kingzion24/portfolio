"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/** Local time in the studio's timezone. Renders nothing until mounted to avoid hydration drift. */
export function Clock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: site.timezone,
        }).format(new Date()),
      );

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time ? `${time} ${site.location.split(", ")[1] ?? ""}` : "—"}
    </span>
  );
}
