import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Devsomeware",
  description:
    "Learn about Devsomeware, our leadership, delivery principles, and why startups and companies trust us for custom software development.",
  path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
