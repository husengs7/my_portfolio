"use client";

import { AnimatePresence, motion } from "framer-motion";

type TheSparkProps = {
  isIgniting: boolean;
  onIgnite: () => void;
};

const particleOffsets = [
  { x: -58, y: -10 },
  { x: -34, y: -34 },
  { x: 0, y: -46 },
  { x: 38, y: -28 },
  { x: 54, y: 4 },
  { x: 18, y: 38 },
  { x: -28, y: 34 },
  { x: -50, y: 12 },
];

export function TheSpark({ isIgniting, onIgnite }: TheSparkProps) {
  return (
    <button
      type="button"
      onClick={onIgnite}
      disabled={isIgniting}
      aria-label="はじまりの星を灯す"
      className="relative flex h-48 w-48 items-center justify-center rounded-full bg-transparent outline-none transition-transform duration-500 hover:scale-[1.02] disabled:cursor-default"
    >
      <AnimatePresence>
        {!isIgniting && (
          <motion.div
            initial={{ opacity: 0.32, scale: 0.94 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-amber-200/10"
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={
          isIgniting
            ? { scale: [1, 0.9, 0], opacity: [1, 0.6, 0] }
            : { scale: [0.98, 1.04, 0.98], opacity: [0.7, 1, 0.7] }
        }
        transition={
          isIgniting
            ? { duration: 0.85, ease: "easeInOut" }
            : { duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
        }
        className="absolute h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(255,226,168,0.95)_0%,rgba(245,197,108,0.55)_34%,rgba(210,141,55,0.18)_62%,rgba(5,5,26,0)_100%)] blur-[2px]"
      />

      <motion.div
        animate={
          isIgniting
            ? { rotate: [0, 8, -10], scale: [1, 1.08, 0.15], opacity: [1, 1, 0] }
            : { rotate: [0, -2, 2, 0], scale: [0.94, 1, 0.94] }
        }
        transition={
          isIgniting
            ? { duration: 0.9, ease: "easeOut" }
            : { duration: 4.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
        }
        className="relative z-10 h-9 w-9"
      >
        <svg viewBox="0 0 80 80" className="h-full w-full overflow-visible fill-none">
          <path
            d="M40 6C43 24 49 31 68 40C50 45 44 53 40 73C36 53 30 46 12 40C31 33 37 25 40 6Z"
            fill="#ffe2a8"
            stroke="#fff1c8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {particleOffsets.map((particle, index) => (
        <motion.span
          key={`${particle.x}-${particle.y}`}
          animate={
            isIgniting
              ? {
                  x: particle.x * (index < 4 ? 3.8 : -3.8),
                  y: particle.y * 0.3,
                  opacity: [0, 1, 0],
                  scale: [0.6, 1.3, 0.3],
                }
              : {
                  x: [particle.x * 0.6, particle.x, particle.x * 0.55],
                  y: [particle.y * 0.55, particle.y, particle.y * 0.5],
                  opacity: [0.3, 0.8, 0.3],
                }
          }
          transition={
            isIgniting
              ? {
                  duration: 0.95,
                  ease: "easeOut",
                  delay: index * 0.03,
                }
              : {
                  duration: 3.6 + index * 0.18,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }
          }
          className="absolute h-2.5 w-2.5 rounded-full bg-amber-100/90 shadow-[0_0_18px_rgba(255,226,168,0.8)]"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: "-0.3125rem",
            marginTop: "-0.3125rem",
          }}
        />
      ))}

      <AnimatePresence>
        {!isIgniting && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.72, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute -bottom-11 whitespace-nowrap text-[0.72rem] uppercase tracking-[0.32em] text-parchment/55"
          >
            Touch the Star
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
