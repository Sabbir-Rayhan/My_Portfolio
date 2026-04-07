import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local images from /public are served directly — no remote config needed
    remotePatterns: [],
  },
};

export default nextConfig;
