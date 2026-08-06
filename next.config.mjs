import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so the bundler never walks above this project.
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  // Fully static export. No server runtime, no API routes, no server-side data fetching.
  output: 'export',
  trailingSlash: true,
  images: {
    // Static export cannot use the optimizing image loader.
    unoptimized: true,
  },
  reactStrictMode: true,
  // No environment variables are read at build time or runtime by design.
};

export default nextConfig;
