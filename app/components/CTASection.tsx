"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ArrowRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="transition-transform duration-300 group-hover:translate-x-1"
  >
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rulerTopRef = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnWrapRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const bracketLRef = useRef<HTMLDivElement>(null);
  const bracketRRef = useRef<HTMLDivElement>(null);
  const sideBordersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // set initial states
      gsap.set(rulerTopRef.current, { scaleX: 0, transformOrigin: "left" });
      gsap.set(
        [eyebrowRef.current, line1Ref.current, line2Ref.current, subRef.current, btnWrapRef.current],
        { opacity: 0, y: 22 }
      );
      gsap.set(markRef.current, { opacity: 0 });
      gsap.set([bracketLRef.current, bracketRRef.current], { opacity: 0, scale: 0.92 });
      gsap.set(sideBordersRef.current, { scaleY: 0, transformOrigin: "top" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(markRef.current, { opacity: 1, duration: 1.8, ease: "power1.out" }, 0);
      tl.to(sideBordersRef.current, { opacity: 1, scaleY: 1, duration: 1.4, ease: "power2.out" }, 0);
      tl.to(rulerTopRef.current, { scaleX: 1, duration: 1.1 }, 0);
      tl.to(
        [bracketLRef.current, bracketRRef.current],
        { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
        0.15
      );
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.65 }, 0.2);
      tl.to(line1Ref.current, { opacity: 1, y: 0, duration: 0.8 }, 0.32);
      tl.to(line2Ref.current, { opacity: 1, y: 0, duration: 0.8 }, 0.46);
      tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.62);
      tl.to(btnWrapRef.current, { opacity: 1, y: 0, duration: 0.65 }, 0.76);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-black overflow-hidden"
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 bg-[url('/assets/noise.png')] bg-repeat bg-[length:200px_200px] opacity-[0.08] mix-blend-soft-light"
        aria-hidden="true"
      />

      {/* Radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_75%_55%_at_50%_85%,rgba(255,255,255,0.035)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      {/* Side connecting borders — white continuation of CraftReveal's vertical borders */}
      <div
        ref={sideBordersRef}
        className="absolute inset-x-1.5 sm:inset-x-2 md:inset-x-3 inset-y-0 pointer-events-none z-10"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <span
          className="absolute left-0 inset-y-0 block"
          style={{ width: "2px", background: "rgba(255,255,255,0.18)" }}
        />
        <span
          className="absolute right-0 inset-y-0 block"
          style={{ width: "2px", background: "rgba(255,255,255,0.18)" }}
        />
        <span
          className="absolute inset-y-0 block"
          style={{ left: "7px", width: "2px", background: "rgba(255,255,255,0.09)" }}
        />
        <span
          className="absolute inset-y-0 block"
          style={{ right: "7px", width: "2px", background: "rgba(255,255,255,0.09)" }}
        />
      </div>

      {/* Oversized watermark lettermark */}
      <div
        ref={markRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <div
          className="relative"
          style={{
            width: "clamp(320px, 62vw, 900px)",
            height: "clamp(320px, 62vw, 900px)",
            opacity: 0.028,
            filter: "blur(2px)",
          }}
        >
          <Image
            src="/logo/d.png"
            alt=""
            fill
            className="object-contain"
            priority={false}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 sm:pt-32 lg:pt-44 pb-0">
        {/* Top rule */}
        <span
          ref={rulerTopRef}
          className="block w-full h-px bg-white/10 mb-14 sm:mb-18 lg:mb-20"
          aria-hidden="true"
        />

        {/* Corner brackets — decorative */}
        <div
          ref={bracketLRef}
          className="absolute left-6 sm:left-10 lg:left-20 top-24 sm:top-32 lg:top-44 pointer-events-none"
          aria-hidden="true"
          style={{ opacity: 0 }}
        >
          <span
            className="block"
            style={{
              width: 18,
              height: 18,
              borderTop: "1.5px solid rgba(255,255,255,0.14)",
              borderLeft: "1.5px solid rgba(255,255,255,0.14)",
            }}
          />
        </div>
        <div
          ref={bracketRRef}
          className="absolute right-6 sm:right-10 lg:right-20 top-24 sm:top-32 lg:top-44 pointer-events-none"
          aria-hidden="true"
          style={{ opacity: 0 }}
        >
          <span
            className="block"
            style={{
              width: 18,
              height: 18,
              borderTop: "1.5px solid rgba(255,255,255,0.14)",
              borderRight: "1.5px solid rgba(255,255,255,0.14)",
            }}
          />
        </div>

        {/* Eyebrow label */}
        <span
          ref={eyebrowRef}
          className="block text-[11px] sm:text-[11.5px] tracking-[0.26em] uppercase text-white/35 font-semibold mb-7 sm:mb-9"
          style={{ opacity: 0 }}
        >
          Let&apos;s work together
        </span>

        {/* Headline */}
        <div className="mb-7 sm:mb-9">
          <span
            ref={line1Ref}
            className="block font-[family-name:var(--font-museo-moderno)] text-white/93 leading-[1.0]"
            style={{
              fontSize: "clamp(2.75rem, 9.5vw, 8.5rem)",
              letterSpacing: "-0.025em",
              opacity: 0,
            }}
          >
            Ready to build
          </span>
          <span
            ref={line2Ref}
            className="block font-[family-name:var(--font-museo-moderno)] leading-[1.0]"
            style={{
              fontSize: "clamp(2.75rem, 9.5vw, 8.5rem)",
              letterSpacing: "-0.025em",
              opacity: 0,
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.38)",
            }}
          >
            something great?
          </span>
        </div>

        {/* Subtext */}
        <p
          ref={subRef}
          className="text-white/42 text-sm sm:text-[15px] max-w-sm sm:max-w-md leading-[1.72] mb-11 sm:mb-14"
          style={{ opacity: 0 }}
        >
          From first sprint to production — we partner with founders and teams
          to ship polished, scalable digital products.
        </p>

        {/* CTA buttons */}
        <div
          ref={btnWrapRef}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pb-20 sm:pb-28 lg:pb-36"
          style={{ opacity: 0 }}
        >
          <a
            href="mailto:hello@devsomeware.com"
            className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-black text-sm font-semibold tracking-[0.01em] rounded-full transition-all duration-300 hover:bg-white/88 active:scale-[0.97]"
          >
            <span>Start a Project</span>
            <ArrowRight />
          </a>

          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 border border-white/18 text-white/60 text-sm font-medium tracking-[0.01em] rounded-full transition-all duration-300 hover:border-white/35 hover:text-white/85"
          >
            View Our Work
          </a>
        </div>
      </div>
    </section>
  );
}
