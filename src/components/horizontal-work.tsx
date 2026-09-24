"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CursorBadge } from "@/components/cursor-badge";
import { ProjectShot } from "@/components/project-shot";
import { Reveal } from "@/components/reveal";
import type { Project } from "@/content/site";

/**
 * Work gallery that travels left-to-right as the page scrolls down.
 *
 * On a wide screen the section pins and the track is translated by scroll
 * progress. Narrow windows and reduced-motion users get a plain snap-scrolling
 * row instead — same content, swipeable, no pinning.
 *
 * While pinned, each screenshot also slides a little inside its frame, against
 * the direction of travel, so the frames read as windows onto something deeper.
 */
export function HorizontalWork({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Decide the mode once mounted, and follow changes to viewport / motion pref.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setPinned(wide.matches && !reduce.matches);
    update();

    for (const mq of [wide, reduce]) mq.addEventListener("change", update);
    return () => {
      for (const mq of [wide, reduce]) mq.removeEventListener("change", update);
    };
  }, []);

  const onScroll = useCallback(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const scrollable = section.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;

    const passed = Math.min(Math.max(-section.getBoundingClientRect().top, 0), scrollable);
    const p = passed / scrollable;
    const distance = Math.max(track.scrollWidth - window.innerWidth, 0);

    track.style.transform = `translate3d(${-distance * p}px, 0, 0)`;
    setProgress(p);

    const vw = window.innerWidth;
    for (const img of track.querySelectorAll<HTMLElement>("[data-parallax] img")) {
      const frame = img.parentElement!.getBoundingClientRect();
      // -1 when the frame's centre sits at the left edge, +1 at the right edge.
      const offset = Math.max(-1, Math.min(1, (frame.left + frame.width / 2 - vw / 2) / (vw / 2)));
      img.style.transform = `translate3d(${offset * -6}%, 0, 0) scale(1.14)`;
    }
  }, []);

  useEffect(() => {
    if (!pinned) {
      if (trackRef.current) trackRef.current.style.transform = "";
      for (const img of sectionRef.current?.querySelectorAll<HTMLElement>("[data-parallax] img") ?? []) {
        img.style.transform = "";
      }
      return;
    }

    let frame = 0;
    const handler = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(onScroll);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [pinned, onScroll]);

  const cards = projects.map((project, i) => (
    <a
      key={project.slug}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="group relative block w-[84vw] shrink-0 snap-center sm:w-[70vw] lg:w-[58vw] xl:w-[52vw] [@media(pointer:fine)]:cursor-none"
    >
      <Reveal shift={false} delay={i * 120} className="clip-reveal">
        <div>
          <ProjectShot
            src={project.image}
            title={project.title}
            priority={i === 0}
            parallax={pinned}
            className="aspect-[16/10] w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
          />
        </div>
      </Reveal>
      <div className="mt-5 flex items-baseline justify-between gap-6 border-t border-line pt-4">
        <h2 className="font-display text-big uppercase transition-colors duration-500 group-hover:text-accent">
          <span className="label mr-3 align-super text-muted">{String(i + 1).padStart(2, "0")}</span>
          {project.title}
        </h2>
        <span className="label shrink-0 text-muted">{project.category}</span>
      </div>
      <p className="mt-3 max-w-lg text-muted">{project.summary}</p>
      <span className="link-underline mt-4 inline-block label text-accent">
        {project.href.replace("https://", "")} &#8599;
      </span>
    </a>
  ));

  return (
    <section
      ref={sectionRef}
      aria-label="Selected work"
      style={pinned ? { height: `${projects.length * 95 + 40}vh` } : undefined}
      className="relative"
    >
      <div className={pinned ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden" : ""}>
        {pinned ? (
          <div
            ref={trackRef}
            className="flex w-max gap-10 px-[6vw] will-change-transform"
          >
            {cards}
          </div>
        ) : (
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 [scrollbar-width:none] md:gap-10 md:px-10 [&::-webkit-scrollbar]:hidden">
            {cards}
          </div>
        )}

        {/* Progress rail */}
        <div className="gutter mt-10 hidden lg:block" aria-hidden="true">
          <div className="h-px w-full bg-line">
            <div
              className="h-px bg-accent transition-[width] duration-150 ease-out"
              style={{ width: `${Math.round((pinned ? progress : 0) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <CursorBadge active={hovered} label="Visit ↗" />
    </section>
  );
}
