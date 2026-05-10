"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Footer from "@/app/components/Footer";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

/* ─── Data ───────────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    title: "Zonal Statistics",
    body: "Upload drone imagery and the platform automatically segments your field into precise plot boundaries. Extract per-plot vegetation indices, canopy cover, height maps, and custom metrics in minutes — not weeks of manual scouting.",
    accent: "#3b82f6",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    bullets: [
      "Auto-generate plot boundaries from flight path",
      "Per-plot NDVI, NDRE, VARI and custom indices",
      "Canopy height and elevation profiling",
      "CSV and SHP export for R and Excel",
      "Timeline comparison across growth stages",
    ],
  },
  {
    title: "AI Plant Counts — PlantAI™",
    body: "Machine-learning models detect and count individual plants across virtually any crop type — from seedlings to mature canopy. Train a crop-specific model in a few clicks and get per-plant area, diameter, and health scores.",
    accent: "#8b5cf6",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" /><line x1="11" y1="8" x2="11" y2="14" />
      </svg>
    ),
    bullets: [
      "Species-agnostic detection with custom model training",
      "Individual plant geolocation (SHP output)",
      "Per-plant area, diameter, and health index",
      "Weed presence detection and density mapping",
      "Batch processing across hundreds of fields",
    ],
  },
  {
    title: "Data Management at Scale",
    body: "Whether you run a single research plot or thousands of trials across India, the platform keeps all imagery, metrics, and annotations organised — with team permissions, audit trails, and API access for full automation.",
    accent: "#10b981",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    ),
    bullets: [
      "Unlimited field and farm organisation",
      "Multi-user access with role-based permissions",
      "Annotation, comment, and review workflows",
      "Automated PDF and web-link report generation",
      "REST API for ERP and LIMS integration",
    ],
  },
  {
    title: "Prescription & Variable-Rate Files",
    body: "Turn vegetation index maps into actionable zone files. Define management zones, set application rates, and export formats that plug directly into smart spreaders, sprayers, and farm management systems.",
    accent: "#f59e0b",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    bullets: [
      "Automatic zone classification from any index",
      "Variable-rate file export (ISOXML, SHP)",
      "Fertiliser and pesticide rate calculator",
      "Season-on-season zone comparison",
      "Compatible with all major FMS platforms",
    ],
  },
  {
    title: "Weed Detection",
    body: "Identify weed hotspots across entire fields in a single flight. Our detection models flag weed presence, estimate density, and generate targeted spray maps — reducing chemical usage while protecting yield.",
    accent: "#ec4899",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12" /><path d="M12 12C12 12 7 9 7 4a5 5 0 0 1 10 0c0 5-5 8-5 8z" />
        <path d="M12 12C12 12 16 14 19 11" /><path d="M12 12C12 12 8 14 5 11" />
      </svg>
    ),
    bullets: [
      "Field-wide weed hotspot detection",
      "Density estimation per plot or zone",
      "Targeted spray map generation",
      "25–40% reduction in chemical input",
      "Works on RGB and multispectral imagery",
    ],
  },
  {
    title: "Thermal & Multispectral Imagery",
    body: "Process imagery from virtually any sensor on the market — up to 6+ spectral bands. Thermal layers reveal irrigation stress and drainage issues invisible to standard cameras.",
    accent: "#3b82f6",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    bullets: [
      "RGB, multispectral (up to 6+ bands), and thermal",
      "DJI Mavic/Phantom, MicaSense RedEdge, Sentera, Slantrange",
      "Irrigation stress mapping via thermal",
      "Calibrated reflectance outputs",
      "30–60 minute cloud processing pipeline",
    ],
  },
];

const HOW_STEPS = [
  {
    num: "01",
    title: "Fly and capture",
    body: "Use any drone with any camera — RGB or multispectral. No proprietary hardware required. Upload up to 1,500 images per mission from the field or office.",
    accent: "#3b82f6",
  },
  {
    num: "02",
    title: "Process and stitch",
    body: "Our cloud pipeline orthorectifies and stitches imagery into calibrated maps — RGB orthomosaic, multispectral layers, DSM, and point cloud — usually in 30–60 minutes.",
    accent: "#8b5cf6",
  },
  {
    num: "03",
    title: "Analyse and visualise",
    body: "Draw plot boundaries, run plant counts, compute indices, and review per-plot performance on an interactive web map with timeline comparison across growth stages.",
    accent: "#10b981",
  },
  {
    num: "04",
    title: "Export and automate",
    body: "Download CSV, SHP, or GeoTIFF. Share read-only web links with stakeholders. Connect your own pipeline via REST API for full end-to-end automation.",
    accent: "#f59e0b",
  },
];

const PLANS = [
  {
    name: "Starter",
    tagline: "For individual researchers and small farms",
    price: "₹44,999",
    period: "/year",
    credits: "₹45,000 credits included",
    accent: "#3b82f6",
    popular: false,
    cta: "Start Free Trial",
    meta: ["Single user", "Single farm"],
    rates: [
      { label: "Upload + Analytics", val: "₹2,250 / upload" },
      { label: "Basic Plant Count", val: "₹315 / ha" },
      { label: "Count + Plant Data", val: "₹630 / ha" },
      { label: "Weed Detection", val: "₹180 / ha" },
    ],
    features: [
      "RGB and multispectral processing (up to 5 bands)",
      "Vegetation index maps (NDVI, VARI, NDRE)",
      "Elevation and canopy height maps",
      "Prescription zone file export",
      "PDF reports and shareable web links",
      "Annotation and measurement tools",
    ],
  },
  {
    name: "Professional",
    tagline: "For advanced analytics and team collaboration",
    price: "₹2,24,999",
    period: "/year",
    credits: "₹2,25,000 credits included",
    accent: "#8b5cf6",
    popular: true,
    cta: "Start Free Trial",
    meta: ["Single user", "Unlimited farms"],
    rates: [
      { label: "Upload + Analytics", val: "₹1,800 / upload" },
      { label: "Basic Plant Count", val: "₹270 / ha" },
      { label: "Count + Plant Data", val: "₹540 / ha" },
      { label: "Weed Detection", val: "₹135 / ha" },
    ],
    features: [
      "Everything in Starter",
      "Zonal statistics and trial plot tools",
      "Multispectral 6+ band processing",
      "Thermal imagery processing",
      "Custom vegetation index builder",
      "Custom branding on reports",
      "1-hour onboarding and setup call",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For organisations managing trials at scale",
    price: "₹6,74,999",
    period: "/year",
    credits: "₹6,75,000 credits included",
    accent: "#10b981",
    popular: false,
    cta: "Contact Us",
    meta: ["Multiple users", "Unlimited farms"],
    rates: [
      { label: "Upload + Analytics", val: "₹1,350 / upload" },
      { label: "Basic Plant Count", val: "₹225 / ha" },
      { label: "Count + Plant Data", val: "₹450 / ha" },
      { label: "Weed Detection", val: "₹90 / ha" },
    ],
    features: [
      "Everything in Professional",
      "Multi-user roles and permissions",
      "REST API integration",
      "Bulk data pipeline and automation",
      "Dedicated account manager",
      "Priority processing queue",
      "Custom SLA and data retention",
    ],
  },
];

const ADDONS = [
  {
    title: "Trial Plot Creation Suite",
    price: "₹53,999 / year",
    accent: "#8b5cf6",
    body: "Generate precise trial plot boundaries automatically from flight metadata or import layouts from an Excel template. Supports row, column, alpha-lattice, and custom experimental designs. Full per-plot metric reports in one click.",
    bullets: [
      "Auto-detection from orthomosaic",
      "Excel template import for any trial layout",
      "Custom naming and numbering patterns",
      "Height, index, and count metrics per plot",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
  {
    title: "Ground Control Points",
    price: "₹53,999 / year",
    accent: "#f59e0b",
    body: "Achieve 1–3 cm absolute accuracy by marking GCPs directly in the imagery using a click-and-point interface. Upload a CSV with coordinates in any standard system and the platform handles the rest.",
    bullets: [
      "Upload GCP CSV in any EPSG coordinate system",
      "Minimum 3-point click-and-mark interface",
      "1–3 cm per-pixel absolute accuracy",
      "Ideal for regulatory and precision-ag applications",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      </svg>
    ),
  },
];

const FAQS = [
  {
    q: "How does the free trial work?",
    a: "The 15-day free trial gives you access to all platform features including 3 uploads and plant count analysis for up to 5 hectares. No credit card is required to start.",
  },
  {
    q: "What drones and cameras are supported?",
    a: "Any drone that captures geotagged imagery is supported — DJI Mavic, Phantom, Matrice, Parrot, and custom builds. Camera support includes all major RGB sensors and multispectral cameras up to 6+ bands including MicaSense RedEdge-M, Sentera, and Slantrange.",
  },
  {
    q: "What counts as one upload?",
    a: "One upload covers up to 1,500 image captures, typically one or more adjacent fields. A mission exceeding 1,500 images counts as multiple uploads in 1,500-image increments — 3,000 images is 2 uploads, and so on.",
  },
  {
    q: "How accurate are the AI plant count results?",
    a: "At 1–2 cm GSD (ground sampling distance) our models typically exceed 95% detection accuracy on crops like cotton, maize, sunflower, and vegetables. Custom model fine-tuning is included in all plans.",
  },
  {
    q: "Can I access my data via API?",
    a: "Yes. Professional and Enterprise plans include full REST API access. Pull processed maps, per-plot metrics, plant count results, and annotation data directly into your own ERP, LIMS, or analytics pipeline.",
  },
  {
    q: "How long is my data stored?",
    a: "All data is retained for the duration of your active subscription plus one month after expiry. Enterprise plans can negotiate extended retention under a custom SLA.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major cards (Visa, Mastercard, RuPay), UPI, net banking, and bank transfer for annual subscriptions. All transactions are in Indian Rupees (INR).",
  },
];

const STATS = [
  { value: "15 days", label: "Free trial, no card" },
  { value: "30–60 min", label: "Processing time" },
  { value: "1–3 cm", label: "GCP map accuracy" },
  { value: "Any drone", label: "Hardware agnostic" },
];

/* ─── Shared UI components ───────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="text-[10px] tracking-[0.3em] uppercase text-white/30"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        {children}
      </span>
      <span className="h-px w-16 bg-white/8" />
    </div>
  );
}

function Divider({ accent }: { accent?: string }) {
  return (
    <div
      className="w-full h-px"
      style={{
        background: accent
          ? `linear-gradient(90deg, transparent, ${accent}35 30%, ${accent}35 70%, transparent)`
          : "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.07) 75%, transparent)",
      }}
    />
  );
}

/* ─── Service card ───────────────────────────────────────────────────────── */
function ServiceCard({
  item,
  index,
}: {
  item: (typeof SERVICES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        delay: index * 0.07,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-xl border p-5 flex flex-col gap-3 transition-all duration-300 cursor-default"
      style={{
        borderColor: hovered ? `${item.accent}38` : "rgba(255,255,255,0.07)",
        background: hovered ? `${item.accent}07` : "rgba(255,255,255,0.02)",
      }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300"
        style={{
          borderColor: hovered ? `${item.accent}40` : "rgba(255,255,255,0.08)",
          background: hovered ? `${item.accent}14` : "rgba(255,255,255,0.04)",
          color: hovered ? item.accent : "rgba(255,255,255,0.35)",
        }}
      >
        {item.icon}
      </div>

      <p
        className="text-sm font-bold text-white/75 group-hover:text-white transition-colors"
        style={{ fontFamily: "var(--font-museo-moderno)" }}
      >
        {item.title}
      </p>

      <p
        className="text-xs text-white/35 leading-relaxed group-hover:text-white/50 transition-colors"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {item.body}
      </p>

      <ul className="flex flex-col gap-1.5 mt-1">
        {item.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span
              className="mt-1 w-1 h-1 rounded-full shrink-0 transition-colors duration-300"
              style={{ background: hovered ? item.accent : "rgba(255,255,255,0.2)" }}
            />
            <span
              className="text-[11px] text-white/30 group-hover:text-white/45 leading-relaxed transition-colors"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {b}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Stat card ──────────────────────────────────────────────────────────── */
function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 18,
        duration: 0.55,
        delay: index * 0.08,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={ref} className="rounded-xl border border-white/7 bg-white/2 px-5 py-5 flex flex-col gap-1">
      <span
        className="text-2xl font-black text-white leading-none"
        style={{ fontFamily: "var(--font-museo-moderno)" }}
      >
        {value}
      </span>
      <span
        className="text-[11px] text-white/35 leading-snug"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Pricing card ───────────────────────────────────────────────────────── */
function PlanCard({ plan, index }: { plan: (typeof PLANS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 28,
        duration: 0.65,
        delay: index * 0.1,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl border flex flex-col overflow-hidden transition-all duration-400"
      style={{
        borderColor: hovered ? `${plan.accent}45` : plan.popular ? `${plan.accent}28` : "rgba(255,255,255,0.08)",
        background: hovered
          ? `linear-gradient(145deg, ${plan.accent}08 0%, rgba(0,0,0,0.4) 100%)`
          : "rgba(255,255,255,0.02)",
      }}
    >
      {/* top accent line */}
      <div
        className="w-full h-0.5 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${plan.accent} 50%, transparent)`,
          opacity: hovered ? 1 : plan.popular ? 0.6 : 0.2,
        }}
      />

      {plan.popular && (
        <div className="absolute top-4 right-4">
          <span
            className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border"
            style={{
              fontFamily: "var(--font-geist-mono)",
              borderColor: `${plan.accent}35`,
              color: plan.accent,
              background: `${plan.accent}10`,
            }}
          >
            Most popular
          </span>
        </div>
      )}

      <div className="p-6 sm:p-7 flex flex-col flex-1 gap-5">
        {/* header */}
        <div>
          <h3
            className="text-lg font-black text-white mb-1"
            style={{ fontFamily: "var(--font-museo-moderno)" }}
          >
            {plan.name}
          </h3>
          <p
            className="text-xs text-white/35"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {plan.tagline}
          </p>
        </div>

        {/* price */}
        <div>
          <div className="flex items-end gap-1">
            <span
              className="text-3xl font-black text-white leading-none"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              {plan.price}
            </span>
            <span
              className="text-xs text-white/30 mb-0.5"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {plan.period}
            </span>
          </div>
          <p
            className="text-[11px] mt-1"
            style={{ fontFamily: "var(--font-geist-mono)", color: plan.accent }}
          >
            {plan.credits}
          </p>
        </div>

        {/* per-unit rates */}
        <div className="rounded-xl border border-white/7 bg-white/2 p-4 flex flex-col gap-2">
          {plan.rates.map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <span
                className="text-[11px] text-white/35"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {r.label}
              </span>
              <span
                className="text-[11px] font-semibold text-white/65"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {r.val}
              </span>
            </div>
          ))}
        </div>

        {/* meta tags */}
        <div className="flex flex-wrap gap-1.5">
          {plan.meta.map((m) => (
            <span
              key={m}
              className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/8 text-white/30"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {m}
            </span>
          ))}
        </div>

        {/* features */}
        <ul className="flex flex-col gap-2 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                <circle cx="10" cy="10" r="9" stroke={plan.accent} strokeWidth="1.2" opacity="0.4" />
                <path d="M6 10.5l3 3 5-6" stroke={plan.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span
                className="text-xs text-white/45 group-hover:text-white/60 leading-relaxed transition-colors"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/contact"
          className="mt-auto block w-full text-center py-3 rounded-xl text-xs font-bold tracking-widest uppercase border transition-all duration-300"
          style={{
            fontFamily: "var(--font-geist-mono)",
            borderColor: hovered ? `${plan.accent}60` : `${plan.accent}30`,
            color: hovered ? plan.accent : "rgba(255,255,255,0.45)",
            background: hovered ? `${plan.accent}10` : "rgba(255,255,255,0.03)",
          }}
        >
          {plan.cta}
        </Link>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at top right, ${plan.accent}10 0%, transparent 55%)`,
          opacity: hovered ? 1 : 0,
        }}
      />
    </div>
  );
}

/* ─── Add-on card ────────────────────────────────────────────────────────── */
function AddonCard({ item, index }: { item: (typeof ADDONS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-xl border p-6 flex flex-col gap-4 transition-all duration-300 cursor-default"
      style={{
        borderColor: hovered ? `${item.accent}38` : "rgba(255,255,255,0.07)",
        background: hovered ? `${item.accent}07` : "rgba(255,255,255,0.02)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300"
          style={{
            borderColor: hovered ? `${item.accent}40` : "rgba(255,255,255,0.08)",
            background: hovered ? `${item.accent}14` : "rgba(255,255,255,0.04)",
            color: hovered ? item.accent : "rgba(255,255,255,0.35)",
          }}
        >
          {item.icon}
        </div>
        <span
          className="text-[10px] font-bold tracking-widest uppercase"
          style={{ fontFamily: "var(--font-geist-mono)", color: item.accent }}
        >
          {item.price}
        </span>
      </div>

      <div>
        <p
          className="text-sm font-bold text-white/80 mb-2 group-hover:text-white transition-colors"
          style={{ fontFamily: "var(--font-museo-moderno)" }}
        >
          {item.title}
        </p>
        <p
          className="text-xs text-white/35 leading-relaxed group-hover:text-white/50 transition-colors"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          {item.body}
        </p>
      </div>

      <ul className="flex flex-col gap-1.5">
        {item.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span
              className="mt-1 w-1 h-1 rounded-full shrink-0 transition-colors duration-300"
              style={{ background: hovered ? item.accent : "rgba(255,255,255,0.2)" }}
            />
            <span
              className="text-[11px] text-white/30 group-hover:text-white/45 leading-relaxed transition-colors"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {b}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── FAQ accordion ──────────────────────────────────────────────────────── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 12,
        duration: 0.5,
        delay: index * 0.05,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={ref} className="border-b border-white/6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span
          className="text-sm text-white/70 group-hover:text-white transition-colors leading-relaxed"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          {q}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="shrink-0 text-white/25 transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "400px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p
          className="text-xs text-white/35 leading-relaxed pb-5 pr-6"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  PAGE                                                                      */
/* ══════════════════════════════════════════════════════════════════════════ */

export default function DronePage() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0 });
        tl.to(headingRef.current, { opacity: 1, duration: 0.3 }, 0);
        tl.to(
          headingRef.current,
          {
            duration: 1.6,
            scrambleText: {
              text: "DRONE ANALYTICS",
              chars: "█▓▒░_/\\|<>{}[]",
              revealDelay: 0.2,
              speed: 0.55,
            },
            ease: "none",
          },
          0.05,
        );
      }
      if (subRef.current) {
        gsap.from(subRef.current, {
          opacity: 0,
          y: 14,
          duration: 0.7,
          delay: 0.7,
          ease: "power3.out",
          clearProps: "all",
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      {/* noise */}
      <div
        className="pointer-events-none fixed inset-0 z-60 bg-repeat opacity-[0.04]"
        style={{ backgroundImage: "url('/assets/noise.png')", backgroundSize: "200px 200px" }}
      />

      {/* ── header ── */}
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
            href="/services"
            className="hidden sm:inline-flex text-[11px] tracking-widest uppercase text-white/35 hover:text-white/70 transition-colors"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-1.5 text-[11px] font-semibold tracking-widest uppercase text-white/60 hover:bg-white/10 hover:text-white hover:border-white/25 transition-all"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Get Started
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

      {/* ── hero ── */}
      <section className="relative px-6 sm:px-10 md:px-16 lg:px-24 pt-16 pb-16 sm:pt-20 sm:pb-20 overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 right-1/4 w-150 h-75 rounded-full opacity-12"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.09) 0%, transparent 65%)" }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-white/35"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Drone services
            </span>
            <span className="h-px w-24 bg-white/8" />
          </div>

          <h1
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none"
            style={{ fontFamily: "var(--font-museo-moderno)", opacity: 0 }}
            aria-label="Drone Analytics"
          >
            ░░░░░░░░░░░░░░
          </h1>

          <p
            ref={subRef}
            className="mt-6 text-white/40 text-sm sm:text-base max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Transform weeks of manual field assessments into hours. Precise, unbiased
            crop analytics — plant counts, zonal statistics, weed maps, and prescription
            files — built for Indian agriculture and research organisations.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black hover:bg-white/90 transition-colors"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Start Free Trial
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/60 transition-colors"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              View pricing →
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── stats ── */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map(({ value, label }, i) => (
            <StatCard key={label} value={value} label={label} index={i} />
          ))}
        </div>
      </section>

      <Divider />

      {/* ── 01 · services ── */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>01 · What We Offer</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-12">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                Six modules.<br />
                <span className="text-white/40">One platform. Any field.</span>
              </h2>
            </div>
            <div>
              <p
                className="text-sm text-white/45 leading-relaxed"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Every module works independently or together. Fly once and extract zonal
                statistics, plant counts, weed maps, and prescription files from the same
                imagery — no switching between software platforms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((item, i) => (
              <ServiceCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 02 · how it works ── */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>02 · How It Works</SectionLabel>

          <div className="mb-10">
            <h2
              className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              From flight to insight<br />
              <span className="text-white/40">in four steps.</span>
            </h2>
            <p
              className="text-sm text-white/40 max-w-xl leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              No photogrammetry expertise required. Our pipeline handles the heavy lifting
              so your team can focus on agronomy and decision-making.
            </p>
          </div>

          <div className="flex flex-col gap-0">
            {HOW_STEPS.map((step, i) => {
              return (
                <HowRow key={step.num} step={step} index={i} last={i === HOW_STEPS.length - 1} />
              );
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 03 · pricing ── */}
      <section id="pricing" className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>03 · Pricing</SectionLabel>

          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className="text-3xl sm:text-4xl font-black text-white leading-tight"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              Choose a plan that<br />fits your scale
            </h2>
            <p
              className="text-xs text-white/30 max-w-xs leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              All plans include a 15-day free trial — 3 uploads, 5 ha of plant count
              analysis. No credit card required. All prices in INR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {PLANS.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>

          <p
            className="mt-6 text-center text-[11px] text-white/20"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Credits can be used for uploads, plant counts, and weed detection ·
            Additional credits purchasable anytime
          </p>
        </div>
      </section>

      <Divider />

      {/* ── 04 · add-ons ── */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>04 · Add-ons</SectionLabel>

          <div className="mb-10">
            <h2
              className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              Power up any plan
            </h2>
            <p
              className="text-sm text-white/40 max-w-xl leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Optional modules that bolt onto any paid plan. Purchase only what your
              workflow actually needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ADDONS.map((item, i) => (
              <AddonCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 05 · standard features ── */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>05 · Included in All Plans</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                Standard platform<br />
                <span className="text-white/40">every tier gets.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <p
                className="text-sm text-white/45 leading-relaxed"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Core analytical capabilities are available from the Starter plan upward.
                No feature gating on the fundamentals that make drone data useful.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Plant health maps",
                desc: "Detect crop stress, disease, and nutrient deficiency with NDVI, NDRE, and VARI index layers rendered per field.",
                accent: "#10b981",
              },
              {
                label: "Elevation and DSM maps",
                desc: "Visualise terrain variation, drainage patterns, and crop height differences across the entire flight area.",
                accent: "#3b82f6",
              },
              {
                label: "Prescription zone files",
                desc: "Create variable-rate application zones and export files directly compatible with smart spreaders and sprayers.",
                accent: "#f59e0b",
              },
              {
                label: "Sharing and collaboration",
                desc: "Share read-only web links with clients. Collaborate with comments, annotations, and PDF report generation.",
                accent: "#8b5cf6",
              },
              {
                label: "RGB and multispectral processing",
                desc: "Process imagery from DJI Mavic, Phantom, MicaSense RedEdge, Sentera, Slantrange, and all major sensors.",
                accent: "#ec4899",
              },
              {
                label: "Annotate and measure",
                desc: "Mark areas of interest, measure distances and zones, and leave comments that sync across your whole team.",
                accent: "#3b82f6",
              },
            ].map(({ label, desc, accent }) => (
              <div
                key={label}
                className="rounded-xl border border-white/7 bg-white/2 px-4 py-4 flex flex-col gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                <p
                  className="text-sm font-bold text-white/75"
                  style={{ fontFamily: "var(--font-museo-moderno)" }}
                >
                  {label}
                </p>
                <p
                  className="text-xs text-white/35 leading-snug"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 06 · faq ── */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>06 · Common Questions</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-10">
            <h2
              className="text-3xl sm:text-4xl font-black text-white leading-tight"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              Everything you need<br />
              <span className="text-white/40">to know before flying.</span>
            </h2>
            <p
              className="text-sm text-white/40 leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Questions about the free trial, supported hardware, data storage, or
              billing? Covered below. Anything else — just reach out.
            </p>
          </div>

          <div>
            {FAQS.map((faq, i) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── CTA ── */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-2xl border border-white/8 overflow-hidden px-8 sm:px-12 py-12 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.07) 0%, transparent 65%)" }}
            />
            <div className="relative z-10">
              <p
                className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-3"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Get started today
              </p>
              <h2
                className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                Ready to turn drone flights<br />into field intelligence?
              </h2>
              <p
                className="text-sm text-white/40 max-w-sm"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                15-day free trial. 3 uploads. 5 ha of plant counts. No credit card.
                See results from your first mission in under an hour.
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-black hover:bg-white/90 transition-colors"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Start Free Trial
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 text-xs text-white/35 hover:text-white/60 transition-colors"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Talk to our team →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ─── How-it-works row (defined after default export to keep page readable) ─ */
function HowRow({
  step,
  index,
  last,
}: {
  step: (typeof HOW_STEPS)[number];
  index: number;
  last: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        x: -16,
        duration: 0.55,
        delay: index * 0.1,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={ref}>
      <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-0 py-7 group hover:bg-white/1.5 transition-colors duration-200 rounded-lg -mx-2 px-2">
        <div className="pr-4 pt-0.5">
          <span
            className="text-[11px] font-bold tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-geist-mono)", color: step.accent }}
          >
            {step.num}
          </span>
        </div>
        <div>
          <p
            className="text-base font-black text-white/80 mb-2 group-hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-museo-moderno)" }}
          >
            {step.title}
          </p>
          <p
            className="text-sm text-white/35 leading-relaxed max-w-xl"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {step.body}
          </p>
        </div>
      </div>
      {!last && <Divider accent={step.accent} />}
    </div>
  );
}
