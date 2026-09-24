import type { NextConfig } from "next";

/**
 * GitHub Pages serves a project site from a sub-path (/portfolio), so the build
 * needs a basePath. CI sets PAGES_BASE_PATH; locally it is empty, so `npm run dev`
 * and `npm run build` behave normally.
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static HTML export — no Node server on Pages.
  output: "export",
  basePath,
  // Emit work/index.html rather than work.html, which static hosts resolve most reliably.
  trailingSlash: true,
  images: { unoptimized: true },
  // Exposed to the browser so <img> src values can be prefixed too.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
