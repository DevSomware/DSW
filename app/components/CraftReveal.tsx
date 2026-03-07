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

const SWIRL_PATH =
  "M337.591,0.932c-13.464,6.12-26.315,12.852-39.168,20.196c-11.628,6.12-25.704,12.24-35.496,21.42c-5.508,4.896,0,15.3,7.344,12.852c0,0,0.612,0,0.612-0.612c1.836,1.224,3.061,2.448,4.896,4.284c0,0.612,0.611,1.836,0.611,2.448c0.612,1.224,1.836,2.448,3.061,3.672c-17.748,33.048-34.272,66.096-55.08,96.696c-6.12,9.18-12.853,17.748-20.808,25.704c-19.584-31.212-51.409-67.32-89.965-60.588c-50.796,9.18-23.256,63.647,3.06,82.008c31.212,22.644,58.14,21.42,85.068,0c12.24,20.808,20.809,44.063,19.584,66.708c-1.836,54.468-50.796,63.647-91.8,49.571c6.12-15.912,7.956-34.271,4.284-50.184c-6.12-28.764-50.184-54.468-75.888-34.272c-25.092,20.196,22.032,71.604,37.332,82.009c4.284,3.06,9.18,6.119,14.076,8.567c-0.612,0.612-0.612,1.225-1.224,1.836c-28.152,44.064-65.484,6.12-82.62-25.092c-2.448-4.896-9.18-0.612-7.344,4.284c14.076,32.436,42.84,70.38,81.396,48.348c9.18-5.508,17.136-13.464,22.644-23.256c33.66,13.464,72.829,13.464,97.308-17.136c29.376-36.72,11.017-84.456-8.567-119.952c0.611-0.612,0.611-0.612,1.224-1.224c34.884-33.66,56.304-81.396,78.336-124.236c4.284,3.06,9.181,6.12,13.464,9.18c3.061,1.836,7.345,1.224,9.792-1.224c17.748-20.808,31.212-45.9,35.496-73.44C351.055,2.768,344.324-2.128,337.591,0.932z M178.471,207.787c-23.256,13.464-46.512-3.06-63.648-18.972c-22.644-20.808-16.524-54.468,18.36-47.735c17.748,3.672,31.824,19.584,43.452,32.436c6.12,6.732,12.241,14.687,17.749,23.255C189.488,201.056,183.979,204.728,178.471,207.787z M116.047,319.171C116.047,319.171,115.435,319.171,116.047,319.171c-16.524-8.567-28.764-20.808-38.556-36.107c-4.284-6.732-7.956-14.076-9.792-22.032c-6.12-20.808,26.928-10.404,35.496-6.12C126.451,267.764,124.615,297.14,116.047,319.171z M306.379,67.028c-0.612,0-0.612-0.612-1.224-0.612c0-1.836-1.225-3.672-3.672-4.896c-4.284-1.836-8.568-4.284-12.853-6.732c-1.836-1.224-5.508-4.896-5.508-3.672c0-0.612-0.612-1.224-1.224-1.224c6.731-3.672,13.464-8.568,20.195-12.24c8.568-4.896,17.748-9.792,26.929-14.688C324.74,38.264,316.784,53.564,306.379,67.028z";

const SWIRL_VIEWBOX = "0 0 367.339 367.34";

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

  const swirlPathMobileRef = useRef<SVGPathElement>(null);
  const swirlPathDesktopRef = useRef<SVGPathElement>(null);

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
      const isCompact = window.matchMedia("(max-width: 1023px)").matches;

      const targetWidth = isMobile
        ? Math.max(window.innerWidth - 56, 240)
        : Math.min(window.innerWidth * 0.54, 860);

      const initWidth = isMobile
        ? Math.min(window.innerWidth * 0.62, 250)
        : Math.min(window.innerWidth * 0.26, 360);

      const swirlPath = isCompact
        ? swirlPathMobileRef.current
        : swirlPathDesktopRef.current;

      const inactivePath = isCompact
        ? swirlPathDesktopRef.current
        : swirlPathMobileRef.current;

      if (inactivePath) gsap.set(inactivePath, { opacity: 0 });

      if (!swirlPath) return;

      const swirlLength = swirlPath.getTotalLength();

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

      gsap.set(swirlPath, {
        opacity: 0,
        strokeDasharray: swirlLength,
        strokeDashoffset: -swirlLength,
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
        swirlPath,
        {
          opacity: 1,
          ease: "power1.out",
          duration: 0.08,
        },
        0.1
      ).to(
        swirlPath,
        {
          strokeDashoffset: 0,
          ease: "power1.inOut",
          duration: 0.42,
        },
        0.12
      );

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
      <div className="pointer-events-none absolute inset-0 bg-[url('/assets/noise.png')] bg-[length:200px_200px] opacity-[0.03] mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.70),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.30),transparent_35%,rgba(0,0,0,0.03))]" />

      <div
        ref={borderRef}
        className="absolute inset-1.5 pointer-events-none z-10 sm:inset-2 md:inset-3"
      >
        {inView && (
          <>
            <VBorder pos="left" offset={0} overhang={14} opacity={0.82} delay={0.1} />
            <VBorder pos="right" offset={0} overhang={14} opacity={0.82} delay={0.25} />
            <VBorder pos="left" offset={7} overhang={7} opacity={0.45} delay={0.35} />
            <VBorder pos="right" offset={7} overhang={7} opacity={0.45} delay={0.45} />
          </>
        )}
      </div>

      <div className="pointer-events-none absolute top-[2%] left-[10%] right-[16%] bottom-[50%] z-[2] rotate-160 scale-x-[-1] lg:hidden">
        <svg
          viewBox={SWIRL_VIEWBOX}
          preserveAspectRatio="xMinYMin meet"
          className="h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <path
            ref={swirlPathMobileRef}
            d={SWIRL_PATH}
            fill="none"
            stroke="rgba(0, 0, 0, 0.48)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute top-[3%] left-[6%] right-[10%] bottom-[18%] z-[2] hidden scale-x-[-1] rotate-155 lg:block">
        <svg
          viewBox={SWIRL_VIEWBOX}
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <path
            ref={swirlPathDesktopRef}
            d={SWIRL_PATH}
            fill="none"
            stroke="rgba(0, 0, 0, 0.48)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative mx-auto flex h-[100svh] w-full max-w-[1540px] flex-col px-5 pt-10 pb-8 sm:px-8 sm:pt-12 sm:pb-10 lg:px-12 lg:pt-14 lg:pb-12">
        <div ref={topBlockRef} className="shrink-0 pb-8 sm:pb-10 lg:pb-12">
          <div
            ref={headingRef}
            className="relative z-20 mb-5 text-center sm:mb-6"
          >
            <div className="inline-flex items-center gap-3 font-[family-name:var(--font-museo-moderno)] text-[13px] font-bold uppercase tracking-[0.20em] text-black/60 sm:text-[15px]">
              <span className="text-black/28">—</span>
              <span>The Craft</span>
              <span className="text-black/28">—</span>
            </div>
          </div>

          <h2
            ref={watermarkRef}
            className="pointer-events-none select-none text-center font-[family-name:var(--font-museo-moderno)] text-[clamp(3.8rem,15vw,11.5rem)] font-bold leading-none tracking-[-0.02em] text-black/[0.60]"
          >
            {" "}
            CRAFT
          </h2>
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 items-start pt-2 sm:pt-4 lg:pt-6">
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
                  className="relative mx-auto h-[clamp(180px,30vh,420px)] overflow-hidden border border-black/[0.08] bg-black/[0.02] shadow-[0_24px_80px_rgba(0,0,0,0.10)] lg:h-[clamp(260px,46vh,560px)]"
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

        <div
          ref={mobileBulletsRef}
          className="relative z-20 mt-3 grid grid-cols-2 gap-3 lg:hidden"
        >
          <BulletList items={leftPoints.slice(0, 2)} />
          <BulletList items={rightPoints.slice(0, 2)} align="right" />
        </div>

        <div
          ref={contentRef}
          className="relative z-20 -top-40 shrink-0 pt-3 text-center sm:-top-20 sm:pt-5 lg:-top-10 lg:pt-8"
        >
          <h3 className="font-[family-name:var(--font-museo-moderno)] text-[clamp(1.5rem,3.8vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.04em] text-black/88">
            Made with Craft, Poured with Passion
          </h3>
          <p className="mx-auto mt-3 max-w-[46ch] px-2 text-[13px] leading-[1.65] text-black/50 sm:px-0 sm:text-[15px]">
            Brand, product thinking, interface polish, and engineering discipline
            - come together in one focused reveal.
          </p>
        </div>
      </div>
    </section>
  );
}