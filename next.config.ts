import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [new URL('https://img.icons8.com/**')],
  },
};

export default nextConfig;
