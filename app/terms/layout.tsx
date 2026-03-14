import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms and Conditions",
  description:
    "Review Devsomeware terms and conditions for service usage, project agreements, payments, IP ownership, and legal policies.",
  path: "/terms",
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
