"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import manAnimation from "@/public/assets/man.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { NoiseBackground } from "@/app/components/ui/noise-background";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

/* ─── Decorative SVG: animated orbit rings ─────────────────────────────── */
function OrbitRings() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      viewBox="0 0 900 480"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(180,120,255)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="orb2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(100,180,255)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(180,120,255,0)" />
          <stop offset="40%" stopColor="rgba(180,120,255,0.5)" />
          <stop offset="60%" stopColor="rgba(100,180,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,150,60,0)" />
        </linearGradient>
        <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,150,60,0)" />
          <stop offset="45%" stopColor="rgba(255,150,60,0.4)" />
          <stop offset="55%" stopColor="rgba(180,120,255,0.4)" />
          <stop offset="100%" stopColor="rgba(100,180,255,0)" />
        </linearGradient>
      </defs>

      {/* Soft ambient glows */}
      <ellipse cx="750" cy="240" rx="260" ry="200" fill="url(#orb1)">
        <animateTransform attributeName="transform" type="rotate"
          from="0 750 240" to="360 750 240" dur="28s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="780" cy="260" rx="180" ry="130" fill="url(#orb2)">
        <animateTransform attributeName="transform" type="rotate"
          from="360 780 260" to="0 780 260" dur="18s" repeatCount="indefinite" />
      </ellipse>

      {/* Ring 1 — large */}
      <ellipse cx="760" cy="240" rx="190" ry="140" fill="none"
        stroke="url(#ringGrad1)" strokeWidth="0.8" opacity="0.45">
        <animateTransform attributeName="transform" type="rotate"
          from="0 760 240" to="360 760 240" dur="22s" repeatCount="indefinite" />
      </ellipse>

      {/* Ring 2 — medium */}
      <ellipse cx="760" cy="240" rx="140" ry="100" fill="none"
        stroke="url(#ringGrad2)" strokeWidth="0.6" opacity="0.35">
        <animateTransform attributeName="transform" type="rotate"
          from="360 760 240" to="0 760 240" dur="15s" repeatCount="indefinite" />
      </ellipse>

      {/* Ring 3 — small tight */}
      <ellipse cx="760" cy="240" rx="82" ry="58" fill="none"
        stroke="rgba(180,120,255,0.3)" strokeWidth="0.5">
        <animateTransform attributeName="transform" type="rotate"
          from="0 760 240" to="360 760 240" dur="10s" repeatCount="indefinite" />
      </ellipse>

      {/* Orbiting dot 1 */}
      <circle r="2.5" fill="rgba(200,150,255,0.9)">
        <animateMotion dur="22s" repeatCount="indefinite">
          <mpath href="#orbitPath1" />
        </animateMotion>
      </circle>
      <path id="orbitPath1" d="M 570,240 a 190,140 0 1,1 0.001,0" fill="none" />

      {/* Orbiting dot 2 */}
      <circle r="1.8" fill="rgba(100,200,255,0.85)">
        <animateMotion dur="15s" repeatCount="indefinite" keyPoints="0.6;1;0;0.6" keyTimes="0;0.4;0.8;1" calcMode="linear">
          <mpath href="#orbitPath2" />
        </animateMotion>
      </circle>
      <path id="orbitPath2" d="M 620,240 a 140,100 0 1,1 0.001,0" fill="none" />

      {/* Fine dot grid — right half only */}
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 14 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={480 + col * 32}
            cy={24 + row * 62}
            r="0.9"
            fill="rgba(255,255,255,0.08)"
          />
        ))
      )}

      {/* Thin corner bracket top-right */}
      <path d="M860 20 L900 20 L900 60" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <path d="M860 460 L900 460 L900 420" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    </svg>
  );
}

/* ─── Magnetic CTA button ────────────────────────────────────────────────── */
function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    // subtle magnetic pull
    gsap.to(btn, { x: (x - cx) * 0.28, y: (y - cy) * 0.28, duration: 0.35, ease: "power2.out" });
    // inner glow follow
    if (glowRef.current) {
      gsap.to(glowRef.current, { x: x - 60, y: y - 60, duration: 0.25, ease: "power2.out" });
    }
  };

  const handleLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
  };

  return (
    <a
      ref={btnRef}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-white cursor-pointer select-none"
      style={{
        background: "linear-gradient(135deg,#1a0a2e 0%,#0d0d12 50%,#0a0a10 100%)",
        boxShadow: "0 0 0 1px rgba(180,120,255,0.35), 0 4px 24px rgba(120,60,220,0.25), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      {/* hover shimmer sweep */}
      <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 ease-in-out"
        style={{ background: "linear-gradient(105deg,transparent 30%,rgba(180,120,255,0.18) 50%,transparent 70%)" }}
        aria-hidden="true"
      />
      {/* cursor-following inner glow */}
      <span
        ref={glowRef}
        className="absolute w-30 h-30 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(circle, rgba(180,120,255,0.22) 0%, transparent 70%)", willChange: "transform" }}
        aria-hidden="true"
      />
      {children}
      <svg width="11" height="11" viewBox="0 0 14 14" fill="none"
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

/* ─── Animated counter ───────────────────────────────────────────────────── */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        gsap.to({ n: 0 }, {
          n: to,
          duration: 1.6,
          ease: "power2.out",
          onUpdate() { setVal(Math.round((this as unknown as { targets: () => Array<{ n: number }> }).targets()[0].n)); },
        });
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function CTASection() {
  const sectionRef   = useRef<HTMLElement>(null);
  // video row
  const videoRowTriggerRef = useRef<HTMLDivElement>(null);
  const videoRowRef  = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const processRef   = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  // cta card
  const cardTriggerRef = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const imgRef       = useRef<HTMLDivElement>(null);
  const labelRef     = useRef<HTMLDivElement>(null);
  const labelTextRef = useRef<HTMLSpanElement>(null);
  const line1Ref     = useRef<HTMLDivElement>(null);
  const line2Ref     = useRef<HTMLDivElement>(null);
  const descRef      = useRef<HTMLParagraphElement>(null);
  const ctasRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const resume = () => {
      if (!video.paused) return;
      video.play().catch(() => {});
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") resume();
    };

    video.addEventListener("pause", resume);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      video.removeEventListener("pause", resume);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(videoRowRef.current,  { opacity: 0, y: 32 });
      gsap.set(videoWrapRef.current, { opacity: 0, scale: 1.03 });
      gsap.set(processRef.current,   { opacity: 0, x: 24 });

      gsap.timeline({
        scrollTrigger: { trigger: videoRowTriggerRef.current, start: "top 82%", once: true },
        defaults: { ease: "power2.out" },
      })
        .to(videoRowRef.current,  { opacity: 1, y: 0, duration: 0.85 }, 0)
        .to(videoWrapRef.current, { opacity: 1, scale: 1, duration: 1.1 }, 0.15)
        .to(processRef.current,   { opacity: 1, x: 0, duration: 0.8 }, 0.3);

      gsap.set(cardRef.current,  { opacity: 0, y: 40 });
      gsap.set(imgRef.current,   { opacity: 0, scale: 1.04 });
      gsap.set(labelRef.current, { opacity: 0 });
      gsap.set(line1Ref.current, { opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(line2Ref.current, { opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(descRef.current,  { opacity: 0, y: 14 });
      gsap.set(ctasRef.current,  { opacity: 0, y: 18 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: cardTriggerRef.current, start: "top 85%", once: true },
        defaults: { ease: "power2.out" },
      });

      tl.to(cardRef.current,  { opacity: 1, y: 0, duration: 0.9 }, 0)
        .to(imgRef.current,   { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }, 0.1)
        .to(labelRef.current, { opacity: 1, duration: 0.4 }, 0.35)
        .to(labelTextRef.current, {
            duration: 1.4,
            scrambleText: {
              text: "// let's build together",
              chars: "█▓▒░_/\\|<>{}[]",
              revealDelay: 0.3,
              speed: 0.5,
            },
            ease: "none",
          }, 0.45)
        .to(line1Ref.current, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.out" }, 0.6)
        .to(line2Ref.current, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.out" }, 0.75)
        .to(descRef.current,  { opacity: 1, y: 0, duration: 0.65 }, 0.95)
        .to(ctasRef.current,  { opacity: 1, y: 0, duration: 0.65 }, 1.08);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-white overflow-hidden"
    >

      <div className="w-full h-px bg-linear-to-r from-transparent via-black/8 to-transparent" />

      <div className="relative z-20 flex flex-col items-center px-5 sm:px-8 lg:px-14 py-16 sm:py-20 gap-4">

        <div ref={videoRowTriggerRef} className="w-full max-w-6xl">
          <div
            ref={videoRowRef}
            className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12"
            style={{ opacity: 0 }}
          >

          <div className="w-full lg:w-[58%] shrink-0">
          <NoiseBackground
            containerClassName="p-[1.5px] rounded-2xl bg-black"
            gradientColors={[
              "rgb(180, 120, 255)",
              "rgb(100, 180, 255)",
              "rgb(255, 150, 60)",
            ]}
            speed={0.035}
          >
            <div
              ref={videoWrapRef}
              className="relative w-full overflow-hidden rounded-[14px] bg-black"
              style={{ aspectRatio: "16/14", opacity: 0 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(84,126,255,0.22),transparent_42%),radial-gradient(circle_at_top_right,rgba(232,122,255,0.16),transparent_36%),linear-gradient(135deg,#020202_0%,#0d0d12_52%,#050505_100%)]" />
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-95"
                style={{ objectPosition: "center center" }}
                src="/banner.mp4"
              />
              <div
                className="absolute inset-0 pointer-events-none bg-[url('/assets/noise.png')] bg-repeat bg-size-[200px_200px] opacity-[0.07] mix-blend-soft-light"
                aria-hidden="true"
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
              <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

              {/* Live badge */}
              <div className="absolute top-3.5 left-4 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                </span>
                <span className="text-[8px] tracking-[0.22em] uppercase text-white/50 font-(family-name:--font-geist-mono)">
                  Showreel
                </span>
              </div>

              {/* Corner dots */}
              {([
                { bottom: 10, right: 12 },
                { bottom: 10, left: 12 },
              ] as React.CSSProperties[]).map((pos, i) => (
                <div key={i} className="absolute w-1 h-1 rounded-full bg-white/15" style={pos} aria-hidden="true" />
              ))}
            </div>
          </NoiseBackground>
          </div>

          {/* Right — floating typography + stats */}
          <div
            ref={processRef}
            className="flex flex-col justify-center gap-5 lg:py-8"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-neutral-300" />
              <span className="text-[8px] tracking-[0.30em] uppercase text-neutral-400 font-(family-name:--font-geist-mono)">
                Our Showreel
              </span>
            </div>

            <h3
              className="font-bold font-(family-name:--font-museo-moderno) text-neutral-900 leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)" }}
            >
              Crafted with
              <br />
              <span className="bg-linear-to-r from-purple-600 via-blue-600 to-orange-500 bg-clip-text text-transparent">
                precision.
              </span>
            </h3>

            <p className="text-neutral-500 text-[13px] leading-[1.75] max-w-[30ch]">
              We turn complex ideas into elegant,
              high&#8209;performance digital products — shipped fast.
            </p>

            <div className="flex gap-10 pt-4 border-t border-neutral-200">
              {[
                { n: 50, suffix: "+", label: "Projects" },
                { n: 3,  suffix: "+", label: "Years" },
                { n: 100, suffix: "%", label: "On Time" },
              ].map(({ n, suffix, label }) => (
                <div key={label} className="cta-stat flex flex-col gap-1">
                  <span className="text-2xl font-bold text-neutral-900 font-(family-name:--font-museo-moderno) tracking-tight">
                    <CountUp to={n} suffix={suffix} />
                  </span>
                  <span className="text-[8px] tracking-[0.20em] uppercase text-neutral-400 font-(family-name:--font-geist-mono)">{label}</span>
                </div>
              ))}
            </div>

            {/* Lottie animation */}
            <div className="w-full pt-2">
              <Lottie
                animationData={manAnimation}
                loop
                className="w-full max-w-70"
              />
            </div>
          </div>

          </div>
        </div>

        <div ref={cardTriggerRef} className="w-full max-w-6xl">
          <NoiseBackground
            containerClassName="w-full p-[1.5px] rounded-2xl bg-black"
            gradientColors={[
              "rgb(180, 120, 255)",
              "rgb(100, 180, 255)",
              "rgb(255, 150, 60)",
            ]}
            speed={0.04}
          >
            <div
              ref={cardRef}
              className="relative w-full overflow-hidden rounded-[14px] min-h-70 sm:min-h-75 bg-[#050507]"
              style={{ opacity: 0 }}
            >
            <div ref={imgRef} className="absolute inset-0" style={{ opacity: 0 }} aria-hidden="true">
              <Image
                src="/assets/bg.png"
                alt=""
                fill
                className="object-cover opacity-30"
                priority
              />
            </div>

            <OrbitRings />

            <div
              className="absolute inset-0 pointer-events-none bg-[url('/assets/noise.png')] bg-repeat bg-size-[200px_200px] opacity-[0.06] mix-blend-soft-light"
              aria-hidden="true"
            />

            <div className="absolute inset-0 bg-linear-to-r from-[#050507]/90 via-[#050507]/60 to-[#050507]/10 pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-t from-[#050507]/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-400/30 to-transparent pointer-events-none" />

            {([
              { top: 12, left: 12 },
              { top: 12, right: 12 },
              { bottom: 12, left: 12 },
              { bottom: 12, right: 12 },
            ] as React.CSSProperties[]).map((pos, i) => (
              <div
                key={i}
                className="absolute w-2.5 h-2.5 pointer-events-none"
                style={{
                  ...pos,
                  borderTop: i < 2 ? "1px solid rgba(255,255,255,0.12)" : undefined,
                  borderBottom: i >= 2 ? "1px solid rgba(255,255,255,0.12)" : undefined,
                  borderLeft: i % 2 === 0 ? "1px solid rgba(255,255,255,0.12)" : undefined,
                  borderRight: i % 2 === 1 ? "1px solid rgba(255,255,255,0.12)" : undefined,
                }}
                aria-hidden="true"
              />
            ))}

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12 px-8 sm:px-12 lg:px-14 py-12 sm:py-14">

              <div className="flex flex-col items-start">
                <div ref={labelRef} className="mb-5" style={{ opacity: 0 }}>
                  <div className="inline-flex items-center gap-2.5">
                    <span className="h-px w-8 bg-white/20" />
                    <span
                      ref={labelTextRef}
                      className="text-[9px] tracking-[0.30em] uppercase text-white/30 font-(family-name:--font-geist-mono)"
                      aria-label="Let's build together"
                    />
                  </div>
                </div>

                <div className="overflow-hidden mb-0.5">
                  <div
                    ref={line1Ref}
                    className="font-bold font-(family-name:--font-museo-moderno) text-white/95 leading-[1.06] tracking-tight"
                    style={{ fontSize: "clamp(1.75rem, 3.8vw, 2.9rem)", opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
                  >
                    Ready to build
                  </div>
                </div>
                <div className="overflow-hidden mb-5">
                  <div
                    ref={line2Ref}
                    className="font-bold font-(family-name:--font-museo-moderno) leading-[1.06] tracking-tight bg-linear-to-r from-purple-300 via-blue-300 to-orange-200 bg-clip-text text-transparent"
                    style={{ fontSize: "clamp(1.75rem, 3.8vw, 2.9rem)", opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
                  >
                    something great?
                  </div>
                </div>

                <p
                  ref={descRef}
                  className="text-white/40 text-sm leading-[1.8] max-w-[40ch]"
                  style={{ opacity: 0 }}
                >
                  Your project should serve you, not the other way around.
                  Let&apos;s turn your vision into a polished digital reality.
                </p>

              </div>

              <div
                ref={ctasRef}
                className="flex flex-col items-start lg:items-end gap-4 shrink-0"
                style={{ opacity: 0 }}
              >
                <MagneticButton href="/contact">
                  Start a Project
                </MagneticButton>

                <Link
                  href="/work"
                  className="group inline-flex items-center gap-2 text-white/30 text-[10px] font-medium tracking-[0.16em] uppercase hover:text-white/60 transition-colors duration-300"
                >
                  <span>View Our Work</span>
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none"
                    className="group-hover:-translate-y-0.5 transition-transform duration-300"
                  >
                    <path d="M7 13V1M1 7l6-6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

            </div>
            </div>
          </NoiseBackground>
        </div>

      </div>

      <div className="w-full h-px bg-linear-to-r from-transparent via-black/8 to-transparent" />
    </section>
  );
}
