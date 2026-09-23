import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The share-card route reads its fonts from disk at runtime.
  outputFileTracingIncludes: {
    "/api/og": ["./assets/fonts/**"],
  },
};

export default nextConfig;
