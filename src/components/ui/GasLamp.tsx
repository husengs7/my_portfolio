"use client";

import { motion } from "framer-motion";

type GasLampProps = {
  side: "left" | "right";
  isLit: boolean;
  delay?: number;
};

export function GasLamp({ side, isLit, delay = 0 }: GasLampProps) {
  const alignClass = side === "left" ? "items-start" : "items-end";
  const frameColor = "#052015";
  const frameHighlight = "#15392b";
  const poleShadow = "#03140d";
  const metalStroke = "#0d3124";
  const glowFill = isLit ? "rgba(255, 209, 120, 0.56)" : "rgba(98, 101, 104, 0.1)";
  const mantleFill = isLit ? "#ffd27d" : "#8d9091";
  const mantleStroke = isLit ? "#fff0bf" : "#a6a8ab";

  return (
    <div className={`pointer-events-none relative flex h-[26rem] w-40 ${alignClass} justify-start`}>
      <motion.div
        initial={false}
        animate={{
          opacity: isLit ? 1 : 0,
          scale: isLit ? 1 : 0.72,
        }}
        transition={{
          duration: 1.2,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`absolute top-6 ${side === "left" ? "-left-2" : "-right-2"} h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,224,165,0.42)_0%,rgba(245,197,108,0.26)_24%,rgba(210,141,55,0.18)_44%,rgba(5,5,26,0)_76%)] blur-3xl`}
      />

      <motion.div
        initial={false}
        animate={
          isLit
            ? {
                opacity: [0.72, 1, 0.84, 0.94],
                scale: [0.985, 1.018, 0.994, 1.01],
              }
            : {
                opacity: 0.14,
                scale: 0.97,
              }
        }
        transition={
          isLit
            ? {
                duration: 1.9,
                delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }
            : {
                duration: 0.5,
              }
        }
        className={`relative mt-0 flex h-full w-36 ${alignClass}`}
      >
        <svg viewBox="0 0 160 360" className="h-full w-full overflow-visible">
          <defs>
            <filter id={`lamp-blur-${side}`}>
              <feGaussianBlur stdDeviation="4.2" />
            </filter>
            <linearGradient id={`pole-gradient-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={frameHighlight} />
              <stop offset="48%" stopColor={frameColor} />
              <stop offset="100%" stopColor={poleShadow} />
            </linearGradient>
            <linearGradient id={`frame-gradient-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1b4232" />
              <stop offset="55%" stopColor={frameColor} />
              <stop offset="100%" stopColor="#02100b" />
            </linearGradient>
            <linearGradient id={`glass-gradient-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(241,244,233,0.3)" />
              <stop offset="45%" stopColor="rgba(193,201,187,0.16)" />
              <stop offset="100%" stopColor="rgba(82,92,88,0.12)" />
            </linearGradient>
            <radialGradient id={`inner-glow-${side}`} cx="50%" cy="42%" r="58%">
              <stop offset="0%" stopColor="rgba(255,227,167,0.95)" />
              <stop offset="34%" stopColor="rgba(245,197,108,0.52)" />
              <stop offset="70%" stopColor="rgba(210,141,55,0.16)" />
              <stop offset="100%" stopColor="rgba(5,5,26,0)" />
            </radialGradient>
          </defs>

          <motion.path
            d="M80 63L111 75L102 122L80 138L58 122L49 75Z"
            initial={false}
            animate={{
              opacity: isLit ? [0.62, 0.98, 0.76] : 0,
              scale: isLit ? [0.97, 1.03, 0.99] : 0.84,
            }}
            transition={{
              duration: 1.4,
              delay,
              repeat: isLit ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
            fill={`url(#inner-glow-${side})`}
            filter={`url(#lamp-blur-${side})`}
            style={{ transformOrigin: "80px 101px" }}
          />

          <path
            d="M76 140L84 140L84 316L76 316Z"
            fill={`url(#pole-gradient-${side})`}
            stroke={metalStroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M68 316L92 316L100 328L60 328Z"
            fill={`url(#pole-gradient-${side})`}
            stroke={metalStroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <path
            d="M77 18L83 18L87 34L73 34Z"
            fill={`url(#frame-gradient-${side})`}
            stroke="#1f4a38"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M66 34L94 34L98 42L62 42Z"
            fill={`url(#frame-gradient-${side})`}
            stroke="#1f4a38"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M61 42L99 42L106 52L54 52Z"
            fill={`url(#frame-gradient-${side})`}
            stroke="#1f4a38"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M54 52L106 52L114 62L108 66L52 66L46 62Z"
            fill={`url(#frame-gradient-${side})`}
            stroke="#173a2c"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path
            d="M52 66L108 66L101 124L80 140L59 124Z"
            fill="rgba(8,18,14,0.9)"
            stroke={`url(#frame-gradient-${side})`}
            strokeWidth="3.6"
            strokeLinejoin="round"
          />
          <path
            d="M59 68L101 68L96 120L80 132L64 120Z"
            fill={`url(#glass-gradient-${side})`}
            stroke="rgba(220,231,212,0.16)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M52 66L59 68M108 66L101 68M80 66L80 132M59 68L64 120M101 68L96 120"
            fill="none"
            stroke="rgba(43,105,81,0.88)"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path
            d="M58 142L102 142"
            fill="none"
            stroke={metalStroke}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M64 84L80 80L96 84"
            fill="none"
            stroke="rgba(231,236,225,0.14)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M73 55L87 55L91 60L69 60Z"
            fill="rgba(10,20,16,0.9)"
            stroke="rgba(31,83,64,0.82)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M75 60L85 60L87 66L73 66Z"
            fill="rgba(15,25,22,0.86)"
            stroke="rgba(31,83,64,0.72)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          <motion.path
            d="M68 80L92 80L88 110L80 120L72 110Z"
            initial={false}
            animate={{
              opacity: isLit ? [0.24, 0.44, 0.28] : 0.04,
            }}
            transition={{
              duration: 1.2,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            fill={glowFill}
            filter={`url(#lamp-blur-${side})`}
          />

          <motion.path
            d="M80 78L87 91L84 110L80 121L76 110L73 91Z"
            initial={false}
            animate={{
              opacity: isLit ? [0.22, 0.46, 0.26] : 0.12,
            }}
            transition={{
              duration: 1.4,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            fill={isLit ? "rgba(248,196,92,0.56)" : "rgba(142,144,146,0.28)"}
            filter={`url(#lamp-blur-${side})`}
          />

          <motion.path
            d="M80 75L88 90L85 111L80 124L75 111L72 90Z"
            initial={false}
            animate={
              isLit
                ? {
                    opacity: [0.7, 1, 0.85],
                    scaleY: [0.9, 1.08, 0.95],
                    scaleX: [0.97, 1.02, 0.99],
                    y: [-1, 0, 1],
                  }
                : {
                    opacity: 0.22,
                    scaleY: 0.82,
                    scaleX: 0.94,
                    y: 2,
                  }
            }
            transition={
              isLit
                ? {
                    duration: 0.72,
                    delay,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }
                : {
                    duration: 0.35,
                  }
            }
            fill={mantleFill}
            stroke={mantleStroke}
            strokeWidth="1.4"
            strokeLinejoin="round"
            style={{ transformOrigin: "80px 100px" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
