"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { NoiseBackground } from "@/app/components/ui/noise-background";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const BADGES = [
  { label: "Response within", value: "24 hrs" },
  { label: "Projects delivered", value: "50+" },
  { label: "Client satisfaction", value: "100%" },
];

export default function CTASection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const markRef      = useRef<HTMLDivElement>(null);
  const sideBordRef  = useRef<HTMLDivElement>(null);
  const labelRef     = useRef<HTMLDivElement>(null);
  const labelTextRef = useRef<HTMLSpanElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);
  const line1Ref     = useRef<HTMLDivElement>(null);
  const line2Ref     = useRef<HTMLDivElement>(null);
  const descRef      = useRef<HTMLParagraphElement>(null);
  const ctasRef      = useRef<HTMLDivElement>(null);
  const badgesRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(markRef.current,     { opacity: 0 });
      gsap.set(sideBordRef.current, { scaleY: 0, transformOrigin: "top", opacity: 0 });
      gsap.set(dividerRef.current,  { scaleX: 0, transformOrigin: "center" });
      gsap.set(labelRef.current,    { opacity: 0 });
      gsap.set(line1Ref.current,    { opacity: 0, y: 48, clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(line2Ref.current,    { opacity: 0, y: 48, clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(descRef.current,     { opacity: 0, y: 18 });
      gsap.set(ctasRef.current,     { opacity: 0, y: 22 });
      gsap.set(badgesRef.current,   { opacity: 0, y: 14 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
        defaults: { ease: "power2.out" },
      });

      tl.to(sideBordRef.current, { opacity: 1, scaleY: 1, duration: 1.4 }, 0)
        .to(markRef.current,     { opacity: 1, duration: 2.0, ease: "power1.out" }, 0)
        .to(dividerRef.current,  { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, 0.1)
        .to(labelRef.current,    { opacity: 1, duration: 0.4 }, 0.3)
        .to(labelTextRef.current, {
            duration: 1.4,
            scrambleText: {
              text: "// let's build together",
              chars: "█▓▒░_/\\|<>{}[]",
              revealDelay: 0.3,
              speed: 0.5,
            },
            ease: "none",
          }, 0.4)
        .to(line1Ref.current, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power3.out" }, 0.55)
        .to(line2Ref.current, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power3.out" }, 0.7)
        .to(descRef.current,  { opacity: 1, y: 0, duration: 0.7 }, 0.9)
        .to(ctasRef.current,  { opacity: 1, y: 0, duration: 0.7 }, 1.0)
        .to(badgesRef.current,{ opacity: 1, y: 0, duration: 0.6 }, 1.15);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-black overflow-hidden"
      style={{ minHeight: "80vh" }}
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 bg-[url('/assets/noise.png')] bg-repeat bg-[length:200px_200px] opacity-[0.08] mix-blend-soft-light"
        aria-hidden="true"
      />

      {/* Side borders */}
      <div
        ref={sideBordRef}
        className="absolute inset-x-1.5 sm:inset-x-2 md:inset-x-3 inset-y-0 pointer-events-none z-10"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <span className="absolute left-0 inset-y-0 block"  style={{ width: 2, background: "rgba(255,255,255,0.18)" }} />
        <span className="absolute right-0 inset-y-0 block" style={{ width: 2, background: "rgba(255,255,255,0.18)" }} />
        <span className="absolute inset-y-0 block" style={{ left:  7, width: 2, background: "rgba(255,255,255,0.08)" }} />
        <span className="absolute inset-y-0 block" style={{ right: 7, width: 2, background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* Logo watermark */}
      <div
        ref={markRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5] select-none"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <div
          className="relative"
          style={{
            width:  "clamp(340px, 40vw, 1100px)",
            height: "clamp(340px, 40vw, 1100px)",
            opacity: 0.025,
            filter:  "blur(1px)",
          }}
        >
          <Image
            src="/logo/logo-v2.png"
            alt=""
            fill
            className="object-contain object-center"
            priority={false}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-[80vh] px-6 sm:px-10 lg:px-20 py-20 sm:py-28">
        <div className="w-full max-w-4xl mx-auto text-center">

          {/* Divider line */}
          <div
            ref={dividerRef}
            className="mx-auto mb-10 sm:mb-12"
            style={{
              width: "clamp(60px, 8vw, 120px)",
              height: 1,
              background: "rgba(255,255,255,0.22)",
              transform: "scaleX(0)",
            }}
            aria-hidden="true"
          />

          {/* Section label */}
          <div
            ref={labelRef}
            className="flex items-center justify-center gap-4 mb-8 sm:mb-10"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
              <span className="w-1 h-1 rounded-full bg-white/15" />
            </div>
            <span
              ref={labelTextRef}
              className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/55 font-[family-name:var(--font-geist-mono)]"
              aria-label="Let's build together"
            />
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
              <span className="w-2 h-2 rounded-full bg-white/40" />
            </div>
          </div>

          {/* Headline */}
          <div className="overflow-hidden mb-2 sm:mb-3">
            <div
              ref={line1Ref}
              className="font-bold font-[family-name:var(--font-museo-moderno)] leading-[1.05] tracking-tight text-white/95"
              style={{
                fontSize: "clamp(2.6rem, 7vw, 5.8rem)",
                opacity: 0,
                clipPath: "inset(100% 0% 0% 0%)",
              }}
            >
              Ready to build
            </div>
          </div>
          <div className="overflow-hidden mb-9 sm:mb-11">
            <div
              ref={line2Ref}
              className="font-bold font-[family-name:var(--font-museo-moderno)] leading-[1.05] tracking-tight"
              style={{
                fontSize: "clamp(2.6rem, 7vw, 5.8rem)",
                opacity: 0,
                clipPath: "inset(100% 0% 0% 0%)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.55) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              something remarkable?
            </div>
          </div>

          {/* Description */}
          <p
            ref={descRef}
            className="text-white/48 text-base sm:text-lg leading-[1.8] max-w-[50ch] mx-auto mb-10 sm:mb-12"
            style={{ opacity: 0 }}
          >
            From MVP to enterprise platform — we turn your vision into a
            production-ready product. Fast delivery, industry-grade quality,
            at a price that makes sense.
          </p>

          {/* CTAs */}
          <div
            ref={ctasRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14 sm:mb-18"
            style={{ opacity: 0 }}
          >
            <NoiseBackground
              containerClassName="w-full sm:w-fit p-1.5 rounded-full bg-neutral-900"
              gradientColors={[
                "rgb(180, 120, 255)",
                "rgb(100, 180, 255)",
                "rgb(255, 180, 100)",
              ]}
            >
              <a
                href="mailto:hello@devsomeware.com"
                className="flex min-w-[230px] items-center justify-center gap-2 cursor-pointer rounded-full bg-gradient-to-r from-black via-neutral-950 to-neutral-900 px-7 py-3.5 text-[11px] font-semibold tracking-[0.24em] uppercase text-white/85 shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] transition-all duration-150 hover:text-white active:scale-95 sm:min-w-0 sm:px-8 sm:py-4 sm:text-sm sm:tracking-widest"
              >
                Book a Strategy Call
                <span className="text-white/70 text-sm leading-none">&rarr;</span>
              </a>
            </NoiseBackground>

            <a
              href="#craft"
              className="group inline-flex items-center gap-2.5 text-white/40 text-sm font-medium tracking-wide hover:text-white/70 transition-colors duration-300"
            >
              <span>View Our Work</span>
              <svg
                width="13" height="13" viewBox="0 0 14 14" fill="none"
                className="group-hover:-translate-y-0.5 transition-transform duration-300"
              >
                <path d="M7 13V1M1 7l6-6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Trust badges */}
          <div
            ref={badgesRef}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
            style={{ opacity: 0 }}
          >
            {BADGES.map((badge, i) => (
              <div key={badge.label} className="flex flex-col items-center gap-1.5">
                {i > 0 && (
                  <span
                    className="hidden sm:block absolute h-6 w-px bg-white/[0.08]"
                    style={{ transform: "translateX(-24px)" }}
                    aria-hidden="true"
                  />
                )}
                <span className="text-white/88 text-2xl sm:text-3xl font-bold font-[family-name:var(--font-museo-moderno)] tracking-tight leading-none">
                  {badge.value}
                </span>
                <span className="text-white/28 text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-[family-name:var(--font-geist-mono)]">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}