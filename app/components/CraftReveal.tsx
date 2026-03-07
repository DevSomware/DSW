"use client";

import { CSSProperties, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type VBorderProps = {
  pos: "left" | "right";
  offset: number;
  overhang: number;
  opacity: number;
  delay: number;
};
const VBorder = ({ pos, offset, overhang, opacity, delay }: VBorderProps) => (
  <motion.span
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay }}
    style={{
      position: "absolute",
      display: "block",
      [pos]: offset,
      top: -overhang,
      bottom: -overhang,
      width: "2px",
      backgroundColor: `rgba(0,0,0,${opacity})`,
      transformOrigin: "top",
    }}
  />
);

const leftPoints = [
  "Product-first discovery",
  "Rapid sprint execution",
  "Interface systems with clarity",
  "Frontend detail with polish",
];

const rightPoints = [
  "Reliable production delivery",
  "Thoughtful motion and UX",
  "Cloud-ready architecture",
  "Built for long-term scale",
];

type MaskStyle = CSSProperties & {
  [key: string]: string | number | undefined;
};

const maskStyle: MaskStyle = {
  "--mask-size": "42%",
  WebkitMaskImage: "url('/logo/logo-v2.png')",
  maskImage: "url('/logo/logo-v2.png')",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "var(--mask-size)",
  maskSize: "var(--mask-size)",
  WebkitMaskMode: "alpha",
  maskMode: "alpha",
};

const bulletIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    className="shrink-0"
  >
    <circle
      cx="10"
      cy="10"
      r="8"
      stroke="rgba(0,0,0,0.38)"
      strokeWidth="1.3"
    />
    <path
      d="M6.4 10.3L8.7 12.6L13.8 7.5"
      stroke="rgba(0,0,0,0.82)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function ArchitecturalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const pulses = useRef<
    { x: number; y: number; r: number; opacity: number; speed: number }[]
  >([]);
  const scanlineRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GRID_STEP = 36;
    const DOT_R = 1.05;

    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;

    function resize() {
      if (!canvas) return;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);
      cols = Math.ceil(W / GRID_STEP) + 1;
      rows = Math.ceil(H / GRID_STEP) + 1;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function spawnPulse() {
      const col = Math.floor(Math.random() * cols);
      const row = Math.floor(Math.random() * rows);
      pulses.current.push({
        x: col * GRID_STEP,
        y: row * GRID_STEP,
        r: 0,
        opacity: 0.55,
        speed: 0.55 + Math.random() * 0.45,
      });
    }

    for (let i = 0; i < 3; i++) {
      setTimeout(() => spawnPulse(), i * 900);
    }
    const spawnInterval = setInterval(spawnPulse, 1800);

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      scanlineRef.current = (t * 0.025) % W;
      const scan = scanlineRef.current;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * GRID_STEP;
          const y = r * GRID_STEP;

          const distFromScan = Math.abs(x - scan);
          const scanGlow = Math.max(0, 1 - distFromScan / 120) * 0.28;

          const base = 0.08 + scanGlow;

          let pulseBoost = 0;
          for (const p of pulses.current) {
            const d = Math.hypot(x - p.x, y - p.y);
            const ring = Math.abs(d - p.r);
            if (ring < 18) {
              pulseBoost = Math.max(
                pulseBoost,
                (1 - ring / 18) * p.opacity * 0.65
              );
            }
          }

          const alpha = Math.min(base + pulseBoost, 0.88);
          ctx.beginPath();
          ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,0,0,${alpha})`;
          ctx.fill();
        }
      }

      const grad = ctx.createLinearGradient(scan - 50, 0, scan + 50, 0);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(0.45, "rgba(0,0,0,0.04)");
      grad.addColorStop(0.5, "rgba(0,0,0,0.07)");
      grad.addColorStop(0.55, "rgba(0,0,0,0.04)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(scan - 50, 0, 100, H);

      for (const p of pulses.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,0,0,${p.opacity * 0.22})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (p.r > 10) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,0,0,${p.opacity * 0.1})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }

        p.r += p.speed;
        p.opacity -= 0.0032;
      }

      pulses.current = pulses.current.filter((p) => p.opacity > 0);

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(spawnInterval);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: 0.85 }}
    />
  );
}

function CornerBrackets() {
  return (
    <>
      {[
        { top: "5%", left: "4%", rotate: "0deg" },
        { top: "5%", right: "4%", rotate: "90deg" },
        { bottom: "5%", left: "4%", rotate: "270deg" },
        { bottom: "5%", right: "4%", rotate: "180deg" },
      ].map((style, i) => (
        <motion.svg
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.33, 1, 0.68, 1] }}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          className="pointer-events-none absolute"
          style={{ ...style, transform: `rotate(${style.rotate})` } as CSSProperties}
          aria-hidden="true"
        >
          <path
            d="M1 11V2H11"
            stroke="rgba(0,0,0,0.28)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      ))}
    </>
  );
}

function RuledLines() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {[18, 34, 52, 68, 84].map((pct) => (
        <motion.div
          key={pct}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.4,
            delay: 0.1 + pct * 0.007,
            ease: [0.33, 1, 0.68, 1],
          }}
          style={{
            position: "absolute",
            top: `${pct}%`,
            left: 0,
            right: 0,
            height: "1px",
            background:
              pct === 52
                ? "rgba(0,0,0,0.06)"
                : "rgba(0,0,0,0.035)",
            transformOrigin: "left",
          }}
        />
      ))}
    </div>
  );
}

function BulletList({
  items,
  align = "left",
}: {
  items: string[];
  align?: "left" | "right";
}) {
  return (
    <ul
      className={`grid gap-4 ${align === "right" ? "lg:justify-items-end" : ""}`}
    >
      {items.map((item) => (
        <li
          key={item}
          className={`art-fade flex items-center gap-2.5 text-[13px] font-medium leading-[1.45] text-black/75 sm:text-[14px] ${align === "right" ? "lg:flex-row-reverse lg:text-right" : ""}`}
        >
          {bulletIcon}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CraftReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const topBlockRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLHeadingElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mobileBulletsRef = useRef<HTMLDivElement>(null);
  const overlayTitleRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  const inView = useInView(borderRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const section = sectionRef.current;
    const topBlock = topBlockRef.current;
    const heading = headingRef.current;
    const watermark = watermarkRef.current;
    const frame = frameRef.current;
    const logo = logoRef.current;
    const mask = maskRef.current;
    const video = imageRef.current;
    const content = contentRef.current;

    if (
      !section ||
      !topBlock ||
      !heading ||
      !watermark ||
      !frame ||
      !logo ||
      !mask ||
      !video ||
      !content
    )
      return;

    const ctx = gsap.context(() => {
      const fades = gsap.utils.toArray<HTMLElement>(".art-fade", section);
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      const targetWidth = isMobile
        ? Math.max(window.innerWidth - 56, 240)
        : Math.min(window.innerWidth * 0.54, 860);

      const initWidth = isMobile
        ? Math.min(window.innerWidth * 0.62, 250)
        : Math.min(window.innerWidth * 0.26, 360);

      gsap.set(content, { opacity: 0, y: 22 });
      if (overlayTitleRef.current)
        gsap.set(overlayTitleRef.current, { opacity: 0, y: 14 });
      gsap.set(logo, { opacity: 0.9, scale: 1, y: 0 });
      gsap.set(mask, { opacity: 0 });
      gsap.set(video, {
        scale: isMobile ? 1.14 : 1.1,
        transformOrigin: "center center",
      });
      gsap.set(topBlock, {
        height: topBlock.offsetHeight,
        overflow: "hidden",
      });

      gsap.set(frame, {
        width: initWidth,
        borderRadius: isMobile ? 28 : 36,
        borderColor: "rgba(0,0,0,0.09)",
        backgroundColor: "rgba(255,255,255,0.46)",
        boxShadow: "0 18px 48px rgba(0,0,0,0.06)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () =>
            `+=${Math.round(window.innerHeight * (isMobile ? 2.4 : 3.2))}`,
          scrub: 2.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress > 0.35) {
              if (video.paused) video.play();
            } else {
              if (!video.paused) {
                video.pause();
                video.currentTime = 0;
              }
            }
          },
        },
      });

      tl.to(
        [heading, ...fades],
        {
          opacity: 0,
          y: isMobile ? -8 : -14,
          stagger: 0.025,
          ease: "power1.inOut",
          duration: 0.38,
        },
        0
      )
        .to(
          topBlock,
          {
            height: 0,
            paddingBottom: 0,
            marginBottom: 0,
            ease: "power2.inOut",
            duration: 0.42,
          },
          0.08
        )
        .to(
          watermark,
          {
            opacity: 0.08,
            ease: "power1.inOut",
            duration: 0.38,
          },
          0
        );

      if (isMobile && mobileBulletsRef.current) {
        tl.to(
          mobileBulletsRef.current,
          {
            opacity: 0,
            height: 0,
            marginTop: 0,
            overflow: "hidden",
            ease: "power1.inOut",
            duration: 0.3,
          },
          0
        );
      }

      tl.to(
        logo,
        {
          opacity: 0,
          scale: 1.08,
          y: -10,
          ease: "power2.inOut",
          duration: 0.22,
        },
        0.34
      )
        .to(
          frame,
          {
            width: targetWidth,
            borderRadius: isMobile ? 18 : 22,
            borderColor: "rgba(0,0,0,0.12)",
            backgroundColor: "rgba(255,255,255,0.58)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.12)",
            ease: "power2.inOut",
            duration: 0.46,
          },
          0.42
        )
        .to(
          mask,
          {
            opacity: 1,
            "--mask-size": isMobile ? "2400%" : "2100%",
            ease: "power1.inOut",
            duration: 0.46,
          },
          0.42
        )
        .to(
          video,
          {
            scale: 1,
            ease: "power2.out",
            duration: 0.46,
          },
          0.42
        )
        .to(
          overlayTitleRef.current ?? [],
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.2,
          },
          0.58
        )
        .to(
          overlayTitleRef.current ?? [],
          {
            opacity: 0,
            y: -10,
            ease: "power1.in",
            duration: 0.14,
          },
          0.82
        )
        .to(
          content,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.2,
          },
          0.84
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-white text-black"
    >
      <Image
        src="/assets/bg.png"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover opacity-[0.1]"
      />

      <ArchitecturalBackground />
      <RuledLines />

      <div className="pointer-events-none absolute inset-0 bg-[url('/assets/noise.png')] bg-[length:200px_200px] opacity-[0.03] mix-blend-multiply" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.70),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.30),transparent_35%,rgba(0,0,0,0.03))]" />

      {/* Border frame — overflow hidden so nothing escapes */}
      <div
        ref={borderRef}
        className="absolute inset-x-1.5 -top-2 bottom-0 pointer-events-none z-10 overflow-hidden sm:inset-x-2 md:inset-x-3"
      >
        {inView && (
          <>
            <VBorder pos="left" offset={0} overhang={0} opacity={0.82} delay={0.1} />
            <VBorder pos="right" offset={0} overhang={0} opacity={0.82} delay={0.25} />
            <VBorder pos="left" offset={7} overhang={0} opacity={0.45} delay={0.35} />
            <VBorder pos="right" offset={7} overhang={0} opacity={0.45} delay={0.45} />
          </>
        )}

        <CornerBrackets />

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Coordinate label — top left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="pointer-events-none absolute top-6 left-6 z-20 hidden sm:block"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.18em] text-black/20 uppercase">
          X:0032 / Y:0018
        </span>
      </motion.div>

      {/* Coordinate label — bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="pointer-events-none absolute bottom-6 right-6 z-20 hidden sm:block"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.18em] text-black/20 uppercase">
          CRAFT / DSW-03
        </span>
      </motion.div>

      {/* Cross-hair center mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.33, 1, 0.68, 1] }}
        className="pointer-events-none absolute top-1/2 right-8 -translate-y-1/2 z-[3] hidden lg:block"
        aria-hidden="true"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="6" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
          <circle cx="14" cy="14" r="1.5" fill="rgba(0,0,0,0.18)" />
          <line x1="14" y1="0" x2="14" y2="8" stroke="rgba(0,0,0,0.14)" strokeWidth="1" strokeLinecap="round" />
          <line x1="14" y1="20" x2="14" y2="28" stroke="rgba(0,0,0,0.14)" strokeWidth="1" strokeLinecap="round" />
          <line x1="0" y1="14" x2="8" y2="14" stroke="rgba(0,0,0,0.14)" strokeWidth="1" strokeLinecap="round" />
          <line x1="20" y1="14" x2="28" y2="14" stroke="rgba(0,0,0,0.14)" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Left edge crosshair */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.0, ease: [0.33, 1, 0.68, 1] }}
        className="pointer-events-none absolute top-1/2 left-8 -translate-y-1/2 z-[3] hidden lg:block"
        aria-hidden="true"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="6" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
          <circle cx="14" cy="14" r="1.5" fill="rgba(0,0,0,0.18)" />
          <line x1="14" y1="0" x2="14" y2="8" stroke="rgba(0,0,0,0.14)" strokeWidth="1" strokeLinecap="round" />
          <line x1="14" y1="20" x2="14" y2="28" stroke="rgba(0,0,0,0.14)" strokeWidth="1" strokeLinecap="round" />
          <line x1="0" y1="14" x2="8" y2="14" stroke="rgba(0,0,0,0.14)" strokeWidth="1" strokeLinecap="round" />
          <line x1="20" y1="14" x2="28" y2="14" stroke="rgba(0,0,0,0.14)" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* ── Main content — padded to stay inside the border lines ── */}
      <div className="relative mx-auto flex h-[100svh] w-full max-w-[1540px] flex-col justify-between
        px-[calc(1.25rem+10px)] pt-10 pb-8
        sm:px-[calc(2rem+12px)] sm:pt-12 sm:pb-10
        md:px-[calc(3rem+14px)]
        lg:px-[calc(3rem+14px)] lg:pt-14 lg:pb-12">

        <div ref={topBlockRef} className="shrink-0 pb-6 sm:pb-8 lg:pb-10">
          <div
            ref={headingRef}
            className="relative z-20 mb-4 text-center sm:mb-5"
          >
            <div className="inline-flex items-center gap-3 font-[family-name:var(--font-museo-moderno)] text-[13px] font-bold uppercase tracking-[0.20em] text-black/60 sm:text-[15px]">
              <span className="text-black/28">—</span>
              <span>The Craft</span>
              <span className="text-black/28">—</span>
            </div>
          </div>

          <h2
            ref={watermarkRef}
            className="pointer-events-none select-none text-center font-[family-name:var(--font-museo-moderno)] text-[clamp(3.2rem,12vw,10rem)] font-bold leading-none tracking-[-0.02em] text-black/[0.60]"
          >
            {" "}
            CRAFT
          </h2>
        </div>

        {/* Centre panel + side bullets */}
        <div className="relative z-10 flex min-h-0 items-center pt-2 sm:pt-3 lg:pt-4">
          <div className="grid w-full items-center gap-6 lg:grid-cols-[1fr_minmax(260px,900px)_1fr] lg:gap-10">
            <div className="hidden lg:block">
              <BulletList items={leftPoints} />
            </div>

            <div className="flex justify-center">
              <div className="relative w-full">
                <div className="absolute inset-x-[14%] top-[12%] h-[60%] rounded-full bg-black/[0.05] blur-3xl" />
                <div className="absolute inset-x-[18%] bottom-[6%] h-16 rounded-full bg-black/[0.03] blur-3xl sm:h-24" />

                <div
                  ref={frameRef}
                  className="relative mx-auto h-[clamp(160px,28vh,400px)] overflow-hidden border border-black/[0.08] bg-black/[0.02] shadow-[0_24px_80px_rgba(0,0,0,0.10)] lg:h-[clamp(240px,42vh,520px)]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.82),rgba(255,255,255,0.08)_60%,transparent_82%)]" />
                  <div
                    ref={logoRef}
                    className="pointer-events-none absolute inset-[18%] z-[1] bg-center bg-no-repeat"
                    style={{
                      backgroundImage: "url('/logo/d.png')",
                      backgroundSize: "contain",
                      opacity: 0.9,
                      filter:
                        "drop-shadow(0 18px 32px rgba(0,0,0,0.08)) grayscale(1) contrast(1.18)",
                    }}
                  />
                  <div
                    ref={maskRef}
                    style={maskStyle}
                    className="relative z-[2] h-full w-full overflow-hidden"
                  >
                    <video
                      ref={imageRef}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      src="/banner.mp4"
                      muted
                      loop
                      playsInline
                      preload="auto"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.12)_48%,rgba(0,0,0,0.34))]" />
                  </div>

                  <div
                    ref={overlayTitleRef}
                    className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center"
                  >
                    <p className="font-[family-name:var(--font-museo-moderno)] text-[clamp(1.1rem,2.6vw,2.4rem)] font-bold leading-tight tracking-[-0.03em] text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.85)]">
                      Crafted to Scale
                    </p>
                    <p className="mt-2 text-[clamp(0.6rem,1vw,0.85rem)] uppercase tracking-[0.18em] text-white/55 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
                      devsomeware.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <BulletList items={rightPoints} align="right" />
            </div>
          </div>
        </div>

        {/* Mobile bullets — 4 items total in a 2-col grid */}
        <div
          ref={mobileBulletsRef}
          className="relative z-20 mt-3 grid grid-cols-2 gap-3 lg:hidden"
        >
          <BulletList items={leftPoints.slice(0, 2)} />
          <BulletList items={rightPoints.slice(0, 2)} align="right" />
        </div>

        {/* Bottom content */}
        <div
          ref={contentRef}
          className="relative z-20 shrink-0 pt-3 -top-40 lg:-top-10 text-center sm:pt-4 lg:pt-6"
        >
          <h3 className="font-[family-name:var(--font-museo-moderno)] text-[clamp(1.2rem,3.2vw,2.8rem)] font-bold leading-[1.04] tracking-[-0.04em] text-black/88">
            Made with Craft, Poured with Passion
          </h3>
          <p className="mx-auto mt-2 max-w-[46ch] px-2 text-[12px] leading-[1.65] text-black/50 sm:px-0 sm:text-[14px] lg:mt-3 lg:text-[15px]">
            Brand, product thinking, interface polish, and engineering discipline
            - come together in one focused reveal.
          </p>
        </div>
      </div>
    </section>
  );
}