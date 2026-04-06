"use client";

import { motion } from "framer-motion";

const stars = [
  { id: 1, x: "6%", y: "10%", size: 4, type: "dot", delay: 0.1, duration: 3.6, opacity: 0.4 },
  { id: 2, x: "12%", y: "20%", size: 8, type: "cross", delay: 0.4, duration: 4.8, opacity: 0.55 },
  { id: 3, x: "21%", y: "9%", size: 5, type: "dot", delay: 0.7, duration: 4.2, opacity: 0.34 },
  { id: 4, x: "28%", y: "18%", size: 6, type: "cross", delay: 0.2, duration: 3.9, opacity: 0.5 },
  { id: 5, x: "36%", y: "8%", size: 4, type: "dot", delay: 1, duration: 5.2, opacity: 0.3 },
  { id: 6, x: "45%", y: "16%", size: 7, type: "cross", delay: 0.3, duration: 4.6, opacity: 0.48 },
  { id: 7, x: "54%", y: "11%", size: 4, type: "dot", delay: 0.9, duration: 4.1, opacity: 0.36 },
  { id: 8, x: "62%", y: "7%", size: 5, type: "dot", delay: 0.5, duration: 3.8, opacity: 0.28 },
  { id: 9, x: "69%", y: "18%", size: 7, type: "cross", delay: 1.2, duration: 4.9, opacity: 0.54 },
  { id: 10, x: "77%", y: "10%", size: 4, type: "dot", delay: 0.6, duration: 3.7, opacity: 0.33 },
  { id: 11, x: "84%", y: "22%", size: 5, type: "cross", delay: 0.8, duration: 4.3, opacity: 0.46 },
  { id: 12, x: "91%", y: "14%", size: 4, type: "dot", delay: 0.15, duration: 3.5, opacity: 0.3 },
];

function StarGlyph({ type, size }: { type: "dot" | "cross"; size: number }) {
  if (type === "cross") {
    return (
      <svg
        viewBox="0 0 20 20"
        className="fill-none stroke-[#fff1c8] stroke-[1.5] drop-shadow-[0_0_8px_rgba(255,241,200,0.2)]"
        style={{ width: size, height: size }}
      >
        <path d="M10 2L10.8 8.8L18 10L10.8 11.1L10 18L9 11.1L2 10L9 8.8Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <span
      className="block rounded-[40%_55%_45%_60%] bg-[#fff1c8] blur-[0.2px] drop-shadow-[0_0_6px_rgba(255,241,200,0.18)]"
      style={{ width: size, height: size }}
    />
  );
}

export function StarrySky() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#020212_0%,rgba(3,3,17,0.94)_34%,rgba(5,5,26,0.58)_72%,rgba(5,5,26,0)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(245,197,108,0.08),transparent_50%)]" />

      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{ left: star.x, top: star.y }}
          animate={{
            opacity: [star.opacity, Math.min(star.opacity + 0.28, 0.92), star.opacity],
            scale: [1, 1.12, 0.96, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <StarGlyph type={star.type as "dot" | "cross"} size={star.size} />
        </motion.div>
      ))}
    </div>
  );
}
