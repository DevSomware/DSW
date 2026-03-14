import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Startup MVP Development",
  description:
    "Launch your startup faster with Devsomeware MVP development, scalable architecture, and sprint-based product engineering.",
  path: "/startup",
});

export default function StartupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
