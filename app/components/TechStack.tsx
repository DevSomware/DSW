"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techs = [
  {
    name: "React",
    label: "UI Library",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-[15px] h-[15px]" aria-hidden="true">
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.1" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.1" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.1" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    label: "Framework",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.93 5.4h-1.37v5.48l-4.06-5.48H9.13V16.6h1.37v-5.62l4.14 5.62h1.29V7.4z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    label: "Language",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="2" opacity="0.12" />
        <path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm8.26 8.26H8.5V11H14v1.26h-1.76V17h-1.98v-4.74zM17.5 11c-.9 0-1.5.48-1.5 1.08 0 .56.34.88 1.14 1.18l.42.16c.54.2.76.38.76.7 0 .34-.3.56-.8.56-.56 0-.92-.24-1.16-.7l-1.06.62c.38.78 1.12 1.22 2.2 1.22 1.2 0 2-.62 2-1.6 0-.72-.38-1.12-1.3-1.46l-.44-.16c-.5-.18-.68-.34-.68-.62 0-.26.22-.44.62-.44.4 0 .66.18.88.54l1-.6C19.26 11.38 18.54 11 17.5 11z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    label: "Styling",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]" aria-hidden="true">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.5 12 7 12z" />
      </svg>
    ),
  },
  {
    name: "GSAP",
    label: "Animation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-[15px] h-[15px]" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.1" />
        <path d="M14.5 9h-4a1.5 1.5 0 0 0 0 3h2.5a1.5 1.5 0 0 1 0 3H9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M13 14.5h1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    label: "Animation",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]" aria-hidden="true">
        <path d="M4 3h16v6.5H12L4 3zm0 6.5h8l8 6.5H4V9.5zm0 6.5h8v5L4 16z" />
      </svg>
    ),
  },
  {
    name: "Three.js",
    label: "3D / WebGL",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]" aria-hidden="true">
        <path d="M12 2L2 20h20L12 2zm0 3.5L19.5 19H12V5.5zM12 19H4.5L12 5.5V19z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    label: "Runtime",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]" aria-hidden="true">
        <path d="M12 1.5L2.5 7v10L12 22.5 21.5 17V7L12 1.5zm0 2.08L19.7 8l-3.58 2.07A4.08 4.08 0 0 0 12 9a4.08 4.08 0 0 0-4.12 1.07L4.3 8l7.7-4.42zM4 9.38l3.5 2.02A4.1 4.1 0 0 0 7.5 12 4.08 4.08 0 0 0 9 14.78V19L4 16.12V9.38zm16 0v6.74L15 19v-4.22A4.08 4.08 0 0 0 16.5 12a4.1 4.1 0 0 0-.5-.6l3.5-2.02zM12 11a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
      </svg>
    ),
  },
  {
    name: "Spline",
    label: "3D Design",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-[15px] h-[15px]" aria-hidden="true">
        <path d="M7 17c0-3.5 4-6 4-9a3 3 0 0 0-6 0c0 1.5.75 2.5 1.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M17 7c0 3.5-4 6-4 9a3 3 0 0 0 6 0c0-1.5-.75-2.5-1.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Lottie",
    label: "Motion Graphics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-[15px] h-[15px]" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    ),
  },
];

function Pill({ name, label, icon }: (typeof techs)[number]) {
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2.5 mx-2.5 shrink-0 border border-white/[0.08] bg-white/[0.025] rounded-full text-white/52 select-none">
      <span className="text-white/45">{icon}</span>
      <span className="text-[12px] tracking-[0.04em] text-white/60 font-[family-name:var(--font-geist-sans)] whitespace-nowrap">
        {name}
      </span>
      <span className="text-[9px] tracking-[0.28em] uppercase text-white/22 font-[family-name:var(--font-geist-mono)] whitespace-nowrap pl-0.5 border-l border-white/[0.08]">
        &nbsp;{label}
      </span>
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = [row1Ref.current, row2Ref.current];
    const onVisibility = () => {
      rows.forEach((r) => {
        if (!r) return;
        r.style.animationPlayState = document.hidden ? "paused" : "running";
      });
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const head = headRef.current;
    if (!section || !head) return;

    const ctx = gsap.context(() => {
      gsap.set(head, { opacity: 0, y: 18 });
      gsap.to(head, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const reversed = [...techs].reverse();

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden"
      aria-label="Technologies we use"
    >
      <div
        className="absolute inset-0 pointer-events-none z-10 bg-[url('/assets/noise.png')] bg-repeat bg-[length:200px_200px] opacity-[0.04] mix-blend-soft-light"
        aria-hidden="true"
      />

      <span
        className="block w-full h-px"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.08) 75%, transparent)",
        }}
      />

      <div className="relative z-20 w-full py-12 sm:py-16">

        <div ref={headRef} className="text-center mb-10 sm:mb-12 px-6" style={{ opacity: 0 }}>
          <span className="inline-block text-[9px] tracking-[0.5em] uppercase text-white/22 font-[family-name:var(--font-geist-mono)] mb-3">
            Built With
          </span>
          <h2 className="font-[family-name:var(--font-museo-moderno)] font-bold text-white/80 text-base sm:text-lg tracking-tight">
            Our Technology Stack
          </h2>
          <p className="text-white/30 text-[12px] tracking-wide mt-1.5 font-[family-name:var(--font-geist-sans)]">
            The real tools powering every project we ship.
          </p>
        </div>

        <div className="relative overflow-hidden mb-3.5">
          <div className="absolute inset-y-0 left-0 w-16 sm:w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #000, transparent)" }} aria-hidden="true" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #000, transparent)" }} aria-hidden="true" />

          <div
            ref={row1Ref}
            className="flex w-max"
            style={{ animation: "marquee-l 36s linear infinite" }}
          >
            {[...techs, ...techs].map((t, i) => (
              <Pill key={`r1-${i}`} {...t} />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-16 sm:w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #000, transparent)" }} aria-hidden="true" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #000, transparent)" }} aria-hidden="true" />

          <div
            ref={row2Ref}
            className="flex w-max"
            style={{ animation: "marquee-r 42s linear infinite" }}
          >
            {[...reversed, ...reversed].map((t, i) => (
              <Pill key={`r2-${i}`} {...t} />
            ))}
          </div>
        </div>
      </div>

      <span
        className="block w-full h-px"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.08) 75%, transparent)",
        }}
      />
    </section>
  );
}
