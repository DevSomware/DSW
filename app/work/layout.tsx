import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Work and Case Studies",
  description:
    "See Devsomeware case studies, product builds, and engineering outcomes delivered across SaaS, data platforms, and enterprise software.",
  path: "/work",
});

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
