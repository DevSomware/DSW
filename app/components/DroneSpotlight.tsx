"use client";

import { memo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const HIGHLIGHTS = [
  {
    num: "01",
    title: "Precision Mapping",
    description:
      "High-resolution UAV flights produce centimetre-accurate orthomosaics, DEMs, and 3-D point clouds for agriculture, infrastructure, and land management.",
    tags: ["Orthomosaic", "DEM", "Point Cloud"],
  },
  {
    num: "02",
    title: "Crop Health Intelligence",
    description:
      "Multispectral NDVI, NDRE, and custom vegetation index analysis reveals stress zones, irrigation gaps, and yield variance across entire fields in minutes.",
    tags: ["NDVI", "NDRE", "Yield Mapping"],
  },
  {
    num: "03",
    title: "Actionable Data Reports",
    description:
      "Every flight ends in GIS-ready exports, PDF field reports, and API-accessible data layers so your team can act on insights immediately.",
    tags: ["GIS Export", "PDF Reports", "API Access"],
  },
] as const;

const METRICS = [
  { value: "95%+", label: "Mapping accuracy" },
  { value: "₹315", label: "Per hectare (basic)" },
  { value: "3", label: "Service tiers" },
  { value: "24h", label: "Report turnaround" },
] as const;

// ─── Shared card wrapper ──────────────────────────────────────────────────────

const HighlightCard = memo(
  ({ item }: { item: (typeof HIGHLIGHTS)[number] }) => {
    const [hovered, setHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!cardRef.current) return;
      const el = cardRef.current;
      const tween = gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }
      );
      return () => { tween.kill(); };
    }, []);

    return (
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          opacity: 0,
          border: hovered
            ? "1px solid rgba(255,255,255,0.18)"
            : "1px solid rgba(255,255,255,0.08)",
          background: hovered
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.02)",
          boxShadow: hovered
            ? "0 4px 24px rgba(0,0,0,0.45)"
            : "0 1px 8px rgba(0,0,0,0.25)",
          transition:
            "border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
          borderRadius: "1rem",
          padding: "1.25rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {/* num + title */}
        <div className="flex items-start gap-3">
          <span
            className="text-[10px] tracking-[0.22em] text-white/25 mt-0.5 shrink-0"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {item.num}
          </span>
          <h3
            className="text-[15px] sm:text-[17px] font-bold text-white/90 leading-snug"
            style={{ fontFamily: "var(--font-museo-moderno)" }}
          >
            {item.title}
          </h3>
        </div>

        {/* description */}
        <p
          className="text-[12px] sm:text-[13px] text-white/50 leading-relaxed"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          {item.description}
        </p>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] text-white/40 border border-white/8"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }
);
HighlightCard.displayName = "HighlightCard";

const DroneSpotlight = memo(() => {
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scramble label
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.01,
            scrollTrigger: { trigger: labelRef.current, start: "top 90%", once: true },
            onComplete() {
              gsap.to(labelRef.current, {
                duration: 0.9,
                scrambleText: {
                  text: "// drone analytics",
                  chars: "█▓▒░_/\\|<>{}[]",
                  speed: 0.7,
                },
              });
            },
          }
        );
      }

      // Heading fade-in slide
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            delay: 0.15,
            scrollTrigger: { trigger: headingRef.current, start: "top 88%", once: true },
          }
        );
      }

      // Subtitle
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.28,
            scrollTrigger: { trigger: subtitleRef.current, start: "top 88%", once: true },
          }
        );
      }

      // Divider line
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power2.inOut",
            scrollTrigger: { trigger: dividerRef.current, start: "top 90%", once: true },
          }
        );
      }

      // Metrics row
      if (metricsRef.current) {
        gsap.fromTo(
          metricsRef.current,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: metricsRef.current, start: "top 90%", once: true },
          }
        );
      }

      // CTA
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.1,
            scrollTrigger: { trigger: ctaRef.current, start: "top 92%", once: true },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-black py-20 sm:py-28 px-4 sm:px-8 border-t border-white/6">
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <div className="flex items-center gap-3 mb-5">
          <span
            ref={labelRef}
            className="text-[11px] sm:text-xs tracking-[0.22em] uppercase text-white/35"
            style={{ fontFamily: "var(--font-geist-mono)", opacity: 0 }}
          >
            {"// drone analytics"}
          </span>
          <div
            ref={dividerRef}
            className="h-px flex-1 max-w-16 bg-white/8"
            style={{ transformOrigin: "left" }}
          />
        </div>

        {/* Heading + subtitle */}
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.05] mb-4"
          style={{ fontFamily: "var(--font-museo-moderno)", opacity: 0 }}
        >
          Aerial Intelligence,
          <br />
          <span className="text-white/35">Ground-Level Precision.</span>
        </h2>

        <p
          ref={subtitleRef}
          className="text-sm sm:text-base text-white/50 max-w-2xl leading-relaxed mb-10 sm:mb-14"
          style={{ fontFamily: "var(--font-geist-sans)", opacity: 0 }}
        >
          We deploy drone analytics services for agriculture, land surveying, and
          infrastructure inspection — delivering centimetre-accurate data and
          actionable reports, priced for Indian markets.
        </p>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 sm:mb-14">
          {HIGHLIGHTS.map((item) => (
            <HighlightCard key={item.num} item={item} />
          ))}
        </div>

        {/* Metrics strip */}
        <div
          ref={metricsRef}
          className="flex flex-wrap gap-0 border border-white/8 rounded-2xl overflow-hidden mb-10 sm:mb-14"
          style={{ opacity: 0 }}
        >
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`flex-1 min-w-35 flex flex-col gap-1 px-5 py-4 sm:py-5 ${
                i < METRICS.length - 1 ? "border-r border-white/8" : ""
              }`}
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <span
                className="text-xl sm:text-2xl font-black text-white leading-none"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                {m.value}
              </span>
              <span
                className="text-[10px] sm:text-[11px] text-white/40 tracking-widest uppercase"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="flex items-center gap-4" style={{ opacity: 0 }}>
          <Link
            href="/drone"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-[13px] font-bold tracking-wide transition-opacity hover:opacity-85"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Explore Drone Services
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <span
            className="text-[11px] text-white/30 tracking-widest"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            — view pricing & plans
          </span>
        </div>

      </div>
    </section>
  );
});

DroneSpotlight.displayName = "DroneSpotlight";
export default DroneSpotlight;
