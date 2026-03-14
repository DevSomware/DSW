import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Software Development Services",
  description:
    "Explore Devsomeware services including custom software, MVP builds, internal tools, web development, management, and SEO growth support.",
  path: "/services",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
