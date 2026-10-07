import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Photos in /public are pre-sized for the web, so they are served as-is.
    // This avoids Vercel's image-optimization quota (it returns 402 when used up).
    unoptimized: true,
  },
};

export default nextConfig;
