"use client";

import { useRef, useState } from "react";
import { ProjectArt } from "@/components/project-art";
import type { Project } from "@/content/site";

/**
 * Onda-style index list: hovering a row floats that project's art alongside the cursor.
 * Pointer preview is desktop-only; small screens get the art inline instead.
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const node = previewRef.current;
    if (!node) return;
    node.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 140}px, 0)`;
  };

  return (
    <div onMouseMove={onMove} className="relative">
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[280px] w-[380px] transition-opacity duration-500 lg:block"
        style={{ opacity: active === null ? 0 : 1 }}
      >
        {active !== null && (
          <ProjectArt art={projects[active].art} label={projects[active].client} className="h-full w-full" />
        )}
      </div>

      <ul className="border-t border-line">
        {projects.map((project, i) => (
          <li
            key={project.slug}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="group border-b border-line py-8 md:py-12"
          >
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-baseline gap-4 transition-colors duration-500 hover:text-accent md:gap-8"
            >
              <span className="label w-8 shrink-0 text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="font-display text-huge uppercase transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:translate-x-4">
                {project.title}
              </h2>
              <span className="ml-auto hidden shrink-0 label text-muted md:block">{project.category}</span>
              <span className="label shrink-0 text-muted">{project.year}</span>
            </a>

            <div className="mt-6 grid gap-8 md:grid-cols-12 md:pl-12">
              <ProjectArt
                art={project.art}
                label={project.client}
                className="aspect-[16/10] w-full md:col-span-5 lg:hidden"
              />

              <div className="md:col-span-5">
                <p className="text-lead text-balance">{project.summary}</p>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline mt-6 inline-block label text-accent"
                >
                  {project.href.replace("https://", "")} &#8599;
                </a>
              </div>

              <div className="md:col-span-6 md:col-start-7">
                <ul className="space-y-3">
                  {project.notes.map((note) => (
                    <li key={note} className="flex gap-3 text-muted">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {note}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="label border border-line px-3 py-1.5 text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
