"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Footer from "@/app/components/Footer";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const LAST_UPDATED = "23 April 2026";

const SECTIONS = [
  {
    id: "overview",
    title: "1. Overview",
    body: [
      {
        heading: "Purpose",
        text: "This Refund Policy defines how cancellations, partial refunds, and full refunds are handled for our services.",
      },
      {
        heading: "Applicability",
        text: "This policy applies to all project and service engagements unless a separate signed agreement states different refund terms.",
      },
    ],
  },
  {
    id: "eligibility",
    title: "2. Refund Eligibility",
    body: [
      {
        heading: "Work completed",
        text: "Fees for work already completed, approved milestones, and delivered assets are generally non-refundable.",
      },
      {
        heading: "Prepaid amounts",
        text: "Unused prepaid amounts may be eligible for refund after adjustment of completed work, committed costs, and applicable taxes.",
      },
      {
        heading: "Custom commitments",
        text: "Any third-party, licensing, infrastructure, or procurement costs incurred specifically for your project are non-refundable.",
      },
    ],
  },
  {
    id: "cancellation",
    title: "3. Cancellation Terms",
    body: [
      {
        heading: "Client cancellation",
        text: "If you cancel a project after confirmation, we will calculate charges for completed scope and committed resources up to the cancellation date.",
      },
      {
        heading: "Service suspension",
        text: "Where work is paused due to delayed approvals, access issues, or overdue payments, refund claims may be limited based on actual effort spent.",
      },
      {
        heading: "Provider cancellation",
        text: "If we cannot continue service for reasons within our control, we will determine a fair refund for any undelivered scope.",
      },
    ],
  },
  {
    id: "process",
    title: "4. Refund Request Process",
    body: [
      {
        heading: "How to request",
        text: "Submit refund requests by email from your registered contact address with project name, invoice reference, and reason for request.",
      },
      {
        heading: "Review timeline",
        text: "Refund requests are reviewed within 7 to 10 business days. We may ask for supporting details before final decision.",
      },
      {
        heading: "Decision communication",
        text: "Approved or rejected status, along with any adjusted amount details, will be shared in writing.",
      },
    ],
  },
  {
    id: "processing",
    title: "5. Refund Processing Timeline",
    body: [
      {
        heading: "Processing time",
        text: "After approval, refunds are initiated within 7 business days. Final credit timing depends on banking and settlement timelines.",
      },
      {
        heading: "Mode of refund",
        text: "Refunds are made to the original payer account or another legally verifiable account held by the same customer.",
      },
    ],
  },
  {
    id: "non-refundable",
    title: "6. Non-Refundable Items",
    body: [
      {
        heading: "Examples",
        text: "Strategy sessions completed, consultation hours consumed, setup costs, urgent work premiums, and completed milestone deliverables are non-refundable unless explicitly stated otherwise.",
      },
    ],
  },
  {
    id: "policy-updates",
    title: "7. Policy Updates",
    body: [
      {
        heading: "Changes",
        text: "We may revise this Refund Policy from time to time. Revised versions are effective when posted on this page.",
      },
    ],
  },
  {
    id: "contact",
    title: "8. Contact",
    body: [
      {
        heading: "Refund support",
        text: "For refund queries, contact hello@devsomeware.com with subject line: Refund Request.",
      },
    ],
  },
];

function SectionCard({ section }: { section: (typeof SECTIONS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 28,
        duration: 0.65,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} id={section.id} className="flex flex-col gap-5">
      <h2
        className="text-xl sm:text-2xl font-black text-white leading-snug"
        style={{ fontFamily: "var(--font-museo-moderno)" }}
      >
        {section.title}
      </h2>
      <div className="flex flex-col gap-5">
        {section.body.map((item) => (
          <div key={item.heading} className="flex flex-col gap-1.5">
            <h3
              className="text-sm font-bold text-white/70"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              {item.heading}
            </h3>
            <p
              className="text-sm text-white/40 leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RefundPage() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0 });
        const tl = gsap.timeline({ delay: 0.1 });
        tl.to(headingRef.current, { opacity: 1, duration: 0.3 }, 0);
        tl.to(
          headingRef.current,
          {
            duration: 1.6,
            scrambleText: {
              text: "REFUND POLICY",
              chars: "█▓▒░_/\\|<>{}[]",
              revealDelay: 0.2,
              speed: 0.55,
            },
            ease: "none",
          },
          0.05,
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <div
        className="pointer-events-none fixed inset-0 z-60 bg-repeat opacity-[0.04]"
        style={{ backgroundImage: "url('/assets/noise.png')", backgroundSize: "200px 200px" }}
      />

      <header
        className={`sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/6 backdrop-blur-md bg-black/80"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image src="/logo/logo-v2.png" alt="Devsomeware" width={28} height={28} className="opacity-90" />
          <span
            className="text-sm font-bold tracking-wider uppercase text-white/80 group-hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-museo-moderno)" }}
          >
            Devsomeware
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-1.5 text-[11px] font-semibold tracking-widest uppercase text-white/60 hover:bg-white/10 hover:text-white hover:border-white/25 transition-all"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Book a Call
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-white/30 hover:text-white/70 transition-colors"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>
      </header>

      <section className="relative px-6 sm:px-10 md:px-16 lg:px-24 pt-16 pb-12 overflow-hidden">
        <div
          className="pointer-events-none absolute -top-20 right-1/3 w-120 h-60 rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 65%)" }}
        />

        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-white/35"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Policy Page
          </p>
          <h1
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white"
            style={{ fontFamily: "var(--font-museo-moderno)" }}
          >
            REFUND POLICY
          </h1>
          <p
            className="max-w-3xl text-sm sm:text-base text-white/50 leading-relaxed"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            This page explains cancellation, eligibility, and processing timelines for refunds. It is written in neutral terms and does not depend on any specific payment gateway.
          </p>
          <p
            className="text-[11px] tracking-[0.2em] uppercase text-white/30"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="relative px-6 sm:px-10 md:px-16 lg:px-24 pb-18">
        <div className="max-w-5xl mx-auto flex flex-col gap-11">
          {SECTIONS.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
