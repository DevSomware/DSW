import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Refund Policy",
  description:
    "Read our refund policy for project cancellations, eligibility, timelines, and refund processing terms.",
  path: "/refund",
});

export default function RefundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
