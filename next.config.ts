import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});


const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
  },
  allowedDevOrigins: [
    "https://figma.com",
 
  ],
};

export default bundleAnalyzer(nextConfig);
