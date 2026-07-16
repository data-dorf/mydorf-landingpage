import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Required for next/image to load the Unsplash photos used in ValueProps.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
