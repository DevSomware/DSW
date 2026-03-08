"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const markRef     = useRef<HTMLDivElement>(null);
  const sideBordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(markRef.current,     { opacity: 0 });
      gsap.set(sideBordRef.current, { scaleY: 0, transformOrigin: "top", opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
        defaults: { ease: "power2.out" },
      });

      tl.to(sideBordRef.current, { opacity: 1, scaleY: 1, duration: 1.4 }, 0)
        .to(markRef.current,     { opacity: 1, duration: 2.0, ease: "power1.out" }, 0);
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

      <div
        ref={sideBordRef}
        className="absolute inset-x-1.5 sm:inset-x-2 md:inset-x-3 inset-y-0 pointer-events-none z-10"
        aria-hidden="true"
      >
        <span className="absolute left-0 inset-y-0 block"  style={{ width: 2, background: "rgba(255,255,255,0.18)" }} />
        <span className="absolute right-0 inset-y-0 block" style={{ width: 2, background: "rgba(255,255,255,0.18)" }} />
        <span className="absolute inset-y-0 block" style={{ left:  7, width: 2, background: "rgba(255,255,255,0.08)" }} />
        <span className="absolute inset-y-0 block" style={{ right: 7, width: 2, background: "rgba(255,255,255,0.08)" }} />
      </div>

      <div
        ref={markRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none"
        aria-hidden="true"
      >
        <div
          className="relative"
          style={{
            width:  "clamp(340px, 40vw, 1100px)",
            height: "clamp(340px, 40vw, 1100px)",
            opacity: 0.02,
            filter:  "blur(1px)",
          }}
        >
          <Image
            src="/logo/logo-v2.png"
            alt=""
            fill
            className="object-full object-center "
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}