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
    id: "introduction",
    title: "1. Introduction",
    body: [
      {
        heading: "Purpose",
        text: "This Privacy Policy explains how we collect, use, store, and protect personal information when you visit our website or engage our services.",
      },
      {
        heading: "Your consent",
        text: "By using this website or submitting information to us, you agree to the collection and use of information as described in this policy.",
      },
    ],
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    body: [
      {
        heading: "Information you provide",
        text: "We may collect your name, email address, phone number, company details, and any content you submit through forms, messages, or project communication.",
      },
      {
        heading: "Automatically collected information",
        text: "When you use our website, we may collect technical information such as IP address, device information, browser type, pages viewed, and timestamps.",
      },
      {
        heading: "Usage logs",
        text: "We may maintain logs for security, abuse prevention, debugging, and service performance monitoring.",
      },
    ],
  },
  {
    id: "how-we-use-information",
    title: "3. How We Use Information",
    body: [
      {
        heading: "Service operations",
        text: "We use collected information to provide services, respond to inquiries, manage projects, and maintain communication with clients and users.",
      },
      {
        heading: "Improvement and analytics",
        text: "We may use information to analyze usage trends, improve website functionality, and enhance the quality of our services.",
      },
      {
        heading: "Compliance",
        text: "We may use and retain information to satisfy legal, accounting, tax, and compliance requirements.",
      },
    ],
  },
  {
    id: "sharing",
    title: "4. Sharing and Disclosure",
    body: [
      {
        heading: "No sale of personal data",
        text: "We do not sell personal information to third parties.",
      },
      {
        heading: "Trusted service providers",
        text: "We may share information with hosting, communication, analytics, and operational vendors where needed to operate our services. Such sharing is limited to legitimate business purposes.",
      },
      {
        heading: "Legal disclosures",
        text: "We may disclose information where required by law, regulation, legal process, or valid governmental request.",
      },
    ],
  },
  {
    id: "retention",
    title: "5. Data Retention",
    body: [
      {
        heading: "Retention period",
        text: "We retain personal information only as long as required for service delivery, legal compliance, dispute resolution, and enforcement of agreements.",
      },
      {
        heading: "Deletion",
        text: "Where feasible and legally permissible, we will delete or anonymize personal information when it is no longer needed.",
      },
    ],
  },
  {
    id: "security",
    title: "6. Data Security",
    body: [
      {
        heading: "Safeguards",
        text: "We implement reasonable technical and organizational safeguards to protect information against unauthorized access, loss, misuse, or alteration.",
      },
      {
        heading: "No absolute guarantee",
        text: "No transmission or storage system is fully secure. While we strive to protect data, we cannot guarantee absolute security.",
      },
    ],
  },
  {
    id: "rights",
    title: "7. Your Rights",
    body: [
      {
        heading: "Access and correction",
        text: "You may request access to personal information we hold about you and request correction of inaccurate or incomplete data.",
      },
      {
        heading: "Deletion and objection",
        text: "You may request deletion of personal information or object to certain processing, subject to legal and contractual obligations.",
      },
    ],
  },
  {
    id: "third-party-links",
    title: "8. Third-Party Links",
    body: [
      {
        heading: "External sites",
        text: "Our website may contain links to third-party websites. We are not responsible for the privacy practices, content, or security of those external sites.",
      },
    ],
  },
  {
    id: "policy-updates",
    title: "9. Policy Updates",
    body: [
      {
        heading: "Changes to this policy",
        text: "We may update this Privacy Policy from time to time. Updated versions will be posted on this page with a revised Last Updated date.",
      },
    ],
  },
  {
    id: "contact",
    title: "10. Contact",
    body: [
      {
        heading: "Privacy inquiries",
        text: "For privacy requests or questions, contact us at hello@devsomeware.com.",
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

export default function PrivacyPage() {
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
            duration: 1.5,
            scrambleText: {
              text: "PRIVACY POLICY",
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
          className="pointer-events-none absolute -top-20 right-1/3 w-120 h-60 rounded-full opacity-10"
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
            aria-label="Privacy Policy"
          >
            ░░░░░░░░░░░░░░
          </h1>

          <p
            className="mt-6 text-white/40 text-sm max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            This Privacy Policy explains how Devsomeware Technology Private Limited
            collects, uses, and protects personal information you provide to us.
          </p>

          <p
            className="mt-3 text-white/25 text-xs"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.07) 75%, transparent)" }} />

      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-16 items-start">

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
                href="/terms"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Terms & Conditions →
              </Link>
            </div>
          </nav>

          <div className="flex flex-col gap-12">
            {SECTIONS.map((s) => (
              <SectionCard key={s.id} section={s} />
            ))}

            <div className="w-full h-px bg-white/7" />

            <p
              className="text-xs text-white/28 leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              This Privacy Policy is governed by the laws of India. Any disputes
              arising under this policy shall be subject to the exclusive jurisdiction
              of the courts of India. Devsomeware reserves the right to update this
              policy at any time. The &quot;Last Updated&quot; date at the top of this page
              reflects when changes were last made. Continued use of our website after
              any changes constitutes acceptance of the revised policy.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
