"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type StoryLanternSectionProps = {
  eyebrow: string;
  title: string;
  body: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
};

export function StoryLanternSection({
  eyebrow,
  title,
  body,
  align = "center",
  className = "",
}: StoryLanternSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 20%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.65, 1], [0.28, 0.72, 1, 0.72]);
  const brightness = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.74, 0.9, 1.12, 0.88]);
  const brightnessFilter = useTransform(brightness, (value) => `brightness(${value})`);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.05, 0.12, 0.22, 0.1]);
  const xClass =
    align === "left" ? "mr-auto max-w-xl text-left" : align === "right" ? "ml-auto max-w-xl text-left" : "mx-auto max-w-2xl text-center";

  return (
    <motion.section
      ref={ref}
      style={{ opacity, filter: brightnessFilter }}
      className={`relative my-28 ${xClass} ${className}`}
    >
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-[-2rem] rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(245,197,108,0.24),rgba(245,197,108,0.08)_38%,rgba(5,5,26,0)_72%)] blur-xl"
      />
      <div className="relative rounded-[2rem] border border-parchment/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-8 py-12 shadow-glow backdrop-blur-[1px]">
        <p className="mb-4 text-[0.72rem] uppercase tracking-[0.3em] text-amber-100/60">{eyebrow}</p>
        <h2 className="font-serifStory text-3xl leading-tight text-parchment sm:text-4xl">{title}</h2>
        <div className="mt-5 text-sm leading-8 text-parchment/74 sm:text-base">{body}</div>
      </div>
    </motion.section>
  );
}
