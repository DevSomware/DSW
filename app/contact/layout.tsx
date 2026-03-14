import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Devsomeware",
  description:
    "Contact Devsomeware to discuss your project, get a strategy call, and receive a tailored proposal for software development.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
