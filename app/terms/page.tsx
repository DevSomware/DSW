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
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: [
      {
        heading: "Agreement to these terms",
        text: "By accessing this website or using our services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website or our services.",
      },
      {
        heading: "Capacity to contract",
        text: "You represent that you are at least 18 years of age and legally authorized to enter into binding agreements for yourself or the entity you represent.",
      },
    ],
  },
  {
    id: "services",
    title: "2. Services",
    body: [
      {
        heading: "Scope of work",
        text: "Services are governed by a project proposal, statement of work, contract, or any other written agreement accepted by both parties. These Terms apply in addition to such agreements.",
      },
      {
        heading: "Service descriptions on this website",
        text: "Any service description on this website is for informational purposes only and does not constitute a binding offer.",
      },
      {
        heading: "Modifications to services",
        text: "We may update, modify, suspend, or discontinue any website feature or service offering at our discretion, subject to commitments already made under signed agreements.",
      },
    ],
  },
  {
    id: "payment",
    title: "3. Payment Terms",
    body: [
      {
        heading: "Payment schedule",
        text: "Payment terms, milestones, due dates, and applicable charges are defined in the relevant agreement, proposal, or invoice.",
      },
      {
        heading: "Invoicing",
        text: "Invoices are issued in accordance with applicable law and must be paid within the agreed time period.",
      },
      {
        heading: "Late payment",
        text: "Delayed payments may result in service pause, delayed delivery, or additional charges where permitted by law and agreed terms.",
      },
      {
        heading: "Refunds",
        text: "Refunds are governed by our Refund Policy and any applicable project-specific agreement.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "4. Intellectual Property",
    body: [
      {
        heading: "Ownership transfer on completion",
        text: "Ownership of deliverables transfers only as explicitly stated in the applicable project agreement and after full payment of all dues.",
      },
      {
        heading: "Pre-existing materials",
        text: "Each party retains ownership of its pre-existing intellectual property, tools, templates, and know-how unless otherwise agreed in writing.",
      },
      {
        heading: "Portfolio rights",
        text: "Unless restricted by a confidentiality agreement, we may reference completed work in portfolios and marketing materials.",
      },
      {
        heading: "Website content",
        text: "Website content, branding, and materials are protected by intellectual property laws and may not be copied or reused without prior written permission.",
      },
    ],
  },
  {
    id: "confidentiality",
    title: "5. Confidentiality",
    body: [
      {
        heading: "Mutual confidentiality",
        text: "Both parties agree to keep confidential information private and use it only for legitimate business purposes related to the engagement.",
      },
      {
        heading: "Non-disclosure agreements",
        text: "Where required, parties may execute a separate non-disclosure agreement that will govern confidentiality obligations in more detail.",
      },
    ],
  },
  {
    id: "warranties-liability",
    title: "6. Warranties and Limitation of Liability",
    body: [
      {
        heading: "Service warranty",
        text: "Services are provided using commercially reasonable skill and care, subject to the limitations stated in applicable agreements.",
      },
      {
        heading: "Website disclaimer",
        text: "This website is provided on an as-is and as-available basis without warranties of any kind, to the extent permitted by law.",
      },
      {
        heading: "Limitation of liability",
        text: "To the maximum extent permitted by law, our aggregate liability is limited to the amount paid by the client for the specific services giving rise to the claim, unless otherwise agreed in writing.",
      },
      {
        heading: "Exclusion of consequential damages",
        text: "We are not liable for indirect, incidental, special, punitive, or consequential losses, including loss of profits, revenue, opportunity, or data.",
      },
    ],
  },
  {
    id: "termination",
    title: "7. Termination",
    body: [
      {
        heading: "Termination by either party",
        text: "Either party may terminate services in accordance with the applicable agreement or mutually agreed written terms.",
      },
      {
        heading: "Effect of termination",
        text: "On termination, fees for completed work, approved expenses, and outstanding invoices become immediately due unless stated otherwise in writing.",
      },
      {
        heading: "Survival",
        text: "Provisions that by nature should survive termination, including payment, confidentiality, intellectual property, and liability limitations, will continue to apply.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "8. Governing Law and Dispute Resolution",
    body: [
      {
        heading: "Governing law",
        text: "These Terms are governed by applicable laws of India, unless a different governing law is expressly set in a signed agreement.",
      },
      {
        heading: "Dispute resolution",
        text: "Parties agree to first attempt good-faith resolution through discussion. If unresolved, disputes may be handled through arbitration or courts as provided in the governing agreement.",
      },
      {
        heading: "Jurisdiction",
        text: "For matters not settled by arbitration, competent courts under applicable law will have jurisdiction.",
      },
    ],
  },
  {
    id: "general",
    title: "9. General Provisions",
    body: [
      {
        heading: "Entire agreement",
        text: "These Terms, together with any applicable order form, proposal, contract, or statement of work, form the complete understanding between parties for the subject matter.",
      },
      {
        heading: "Severability",
        text: "If any provision is held invalid, the remaining provisions continue in full force and effect.",
      },
      {
        heading: "Amendments",
        text: "We may update these Terms from time to time. Updated terms will be posted with a revised Last Updated date.",
      },
      {
        heading: "Contact",
        text: "For questions regarding these Terms, please contact hello@devsomeware.com.",
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

export default function TermsPage() {
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
              text: "TERMS & CONDITIONS",
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

      {/* Hero */}
      <section className="relative px-6 sm:px-10 md:px-16 lg:px-24 pt-16 pb-12 overflow-hidden">
        <div
          className="pointer-events-none absolute -top-20 left-1/3 w-120 h-60 rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 65%)" }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-white/35"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Legal
            </span>
            <span className="h-px w-24 bg-white/8" />
          </div>

          <h1
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none"
            style={{ fontFamily: "var(--font-museo-moderno)", opacity: 0 }}
            aria-label="Terms and Conditions"
          >
            ░░░░░░░░░░░░░░░░░░
          </h1>

          <p
            className="mt-6 text-white/40 text-sm max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            These Terms and Conditions govern your use of the Devsomeware website
            and any services provided by Devsomeware Technology Private Limited.
            Please read them carefully.
          </p>

          <p
            className="mt-3 text-white/25 text-xs"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.07) 75%, transparent)" }} />

      {/* Content */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-16 items-start">

          {/* Sticky TOC */}
          <nav className="hidden lg:flex flex-col gap-1 sticky top-24" aria-label="Table of contents">
            <p
              className="text-[9px] tracking-[0.3em] uppercase text-white/25 mb-3"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Contents
            </p>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs text-white/30 hover:text-white/65 transition-colors leading-snug py-1 border-l border-white/8 pl-3 hover:border-white/30"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {s.title}
              </a>
            ))}
            <div className="mt-6 pt-5 border-t border-white/7">
              <Link
                href="/privacy"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Privacy Policy →
              </Link>
            </div>
          </nav>

          {/* Sections */}
          <div className="flex flex-col gap-12">
            {SECTIONS.map((s) => (
              <SectionCard key={s.id} section={s} />
            ))}

            {/* Divider */}
            <div className="w-full h-px bg-white/7" />

            <p
              className="text-xs text-white/28 leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Devsomeware Technology Private Limited is incorporated under the
              Companies Act, 2013 of India. These Terms were last updated on{" "}
              {LAST_UPDATED}. If you have any questions, please contact us at{" "}
              hello@devsomeware.com.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
