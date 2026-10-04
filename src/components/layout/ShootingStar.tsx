"use client";

import { motion, useReducedMotion } from "framer-motion";

const stars = [
  { id: "star-1", top: "10%", right: "14%", delay: 3.5, duration: 1.6, repeatDelay: 12, length: 156 },
  { id: "star-2", top: "24%", right: "4%", delay: 8, duration: 1.9, repeatDelay: 17, length: 132 },
  { id: "star-3", top: "8%", right: "42%", delay: 5.5, duration: 1.7, repeatDelay: 19, length: 144 },
  { id: "star-4", top: "32%", right: "30%", delay: 12, duration: 1.8, repeatDelay: 23, length: 128 },
  { id: "star-5", top: "16%", right: "65%", delay: 16, duration: 1.6, repeatDelay: 21, length: 120 },
  { id: "star-6", top: "40%", right: "55%", delay: 21, duration: 2, repeatDelay: 29, length: 140 },
];

export function ShootingStar() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden motion-reduce:hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 0.65, 0.45, 0], x: [0, -70, -210, -280], y: [0, 45, 135, 180] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: star.repeatDelay,
          }}
          className="absolute"
          style={{
            top: star.top,
            right: star.right,
            rotate: "-33deg",
          }}
        >
          <div
            className="rounded-full bg-[linear-gradient(90deg,rgba(255,245,220,0.95),rgba(244,181,95,0.35),rgba(244,181,95,0))]"
            style={{
              width: `${star.length}px`,
              height: "1.5px",
              boxShadow: "0 0 8px rgba(244,181,95,0.12)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
