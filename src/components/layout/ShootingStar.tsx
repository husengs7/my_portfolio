"use client";

import { motion } from "framer-motion";

const stars = [
  { id: "star-1", top: "10%", right: "14%", delay: 3.5, duration: 2.8, repeatDelay: 15, length: 156, angle: 26 },
  { id: "star-2", top: "18%", right: "28%", delay: 10.5, duration: 3.2, repeatDelay: 18, length: 132, angle: 24 },
];

export function ShootingStar() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-20] overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0, x: 26, y: -18 }}
          animate={{ opacity: [0, 0, 0.22, 0], x: [0, 0, -172, -208], y: [0, 0, 116, 136] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            ease: "easeOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: star.repeatDelay,
          }}
          className="absolute"
          style={{
            top: star.top,
            right: star.right,
            rotate: `${star.angle}deg`,
          }}
        >
          <div
            className="rounded-full bg-[linear-gradient(90deg,rgba(255,238,204,0.58),rgba(244,181,95,0.22),rgba(244,181,95,0))] blur-[0.7px]"
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
