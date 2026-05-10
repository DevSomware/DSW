import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Drone Analytics Services",
  description:
    "Professional drone-based analytics for agriculture and field research. Zonal statistics, AI-powered plant counts, weed detection, and data management — built for Indian farms and research organisations.",
  path: "/drone",
});

export default function DroneLayout({ children }: { children: React.ReactNode }) {
  return children;
}
