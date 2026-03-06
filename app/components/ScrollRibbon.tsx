"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  "{ Full-Stack Developmen }",
  "{ Rapid MVP Launch }",
  "{ Cloud & DevOps }",
  "{ UI / UX Design }",
  "{ API Integrations }",
  "{ Scalable Systems }",
];

const TRACK = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

export default function ScrollRibbon() {
  const rowTopRef = useRef<HTMLDivElement>(null);
  const rowBotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topEl = rowTopRef.current;
    const botEl = rowBotRef.current;
    if (!topEl || !botEl) return;

    const BASE_TOP = -0.45;   
    const BASE_BOT = 0.38;   

    let topX = 0;
    let botX = 0;
    let currentSpeedTop = BASE_TOP;
    let currentSpeedBot = BASE_BOT;
    let targetSpeedTop  = BASE_TOP;
    let targetSpeedBot  = BASE_BOT;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const boost = gsap.utils.clamp(-4, 4, self.getVelocity() / 700);
        targetSpeedTop = BASE_TOP + boost * 1.6;
        targetSpeedBot = BASE_BOT - boost * 1.6;
      },
    });

    const onTick = () => {
      currentSpeedTop += (targetSpeedTop - currentSpeedTop) * 0.07;
      currentSpeedBot += (targetSpeedBot - currentSpeedBot) * 0.07;

      targetSpeedTop += (BASE_TOP - targetSpeedTop) * 0.045;
      targetSpeedBot += (BASE_BOT - targetSpeedBot) * 0.045;

      topX += currentSpeedTop;
      botX += currentSpeedBot;

      const topHalf = topEl.scrollWidth / 2;
      const botHalf = botEl.scrollWidth / 2;

      if (topX <= -topHalf) topX += topHalf;
      if (topX >= 0)        topX -= topHalf;
      if (botX <= -botHalf) botX += botHalf;
      if (botX >= 0)        botX -= botHalf;

      gsap.set(topEl, { x: topX });
      gsap.set(botEl, { x: botX });
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0); 

    return () => {
      gsap.ticker.remove(onTick);
      st.kill();
    };
  }, []);

  return (
    <div className="w-full bg-black border-y border-white/10 overflow-hidden select-none">
      <div className="overflow-hidden w-full border-b border-white/[0.07]">
        <div
          ref={rowTopRef}
          className="flex shrink-0 whitespace-nowrap will-change-transform text-white/55"
        >
          {TRACK.map((text, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-6 py-3 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-hidden w-full">
        <div
          ref={rowBotRef}
          className="flex shrink-0 whitespace-nowrap will-change-transform text-white/30"
        >
          {TRACK.map((text, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-6 py-3 text-xs sm:text-sm font-medium tracking-[0.18em] uppercase"
            >
              <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
