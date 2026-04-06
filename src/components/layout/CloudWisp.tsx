"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type CloudWispProps = {
  className?: string;
  layers?: number;
};

type CloudSpec = {
  id: string;
  d: string;
  top: number;
  left: number;
  scale: number;
  opacity: number;
  flip: number;
  duration: number;
  drift: number;
  depth: number;
};

const cloudShapes = [
  "M18 60C46 28 98 25 144 39C171 47 199 64 241 61C280 59 321 39 359 49C384 56 397 76 404 94C411 113 405 131 384 140C337 160 277 146 233 144C186 141 161 156 121 158C82 159 39 149 17 125C1 108 1 79 18 60Z",
  "M34 92C61 72 102 68 147 74C191 80 210 102 251 100C286 98 316 77 347 82C379 88 398 114 392 137C385 162 351 171 317 170C272 169 227 149 188 149C146 149 109 173 70 167C41 162 14 140 13 118C11 108 17 97 34 92Z",
  "M29 70C57 53 91 55 124 57C171 59 212 77 247 74C290 70 320 47 358 54C386 59 401 83 399 104C396 124 377 137 350 141C308 147 265 131 224 128C181 124 153 136 110 140C75 144 31 139 13 114C1 96 8 79 29 70Z",
  "M21 83C34 56 74 42 111 47C161 54 192 92 235 91C281 90 316 57 356 61C378 63 401 77 405 101C410 129 389 154 356 164C320 175 281 165 246 160C202 154 170 159 130 169C89 179 35 179 13 146C1 128 4 102 21 83Z",
];

function createClouds(count: number): CloudSpec[] {
  return Array.from({ length: count }, (_, index) => {
    const seed = index + 1;
    const randomA = Math.sin(seed * 13.41) * 10000;
    const randomB = Math.sin(seed * 27.73) * 10000;
    const randomC = Math.sin(seed * 41.19) * 10000;
    const randomD = Math.sin(seed * 56.83) * 10000;
    const randomE = Math.sin(seed * 68.97) * 10000;
    const normalize = (value: number) => value - Math.floor(value);
    const baseLeft = -10 + (110 / Math.max(count - 1, 1)) * index;
    const leftJitter = -6 + normalize(randomB) * 12;
    const clampedLeft = Math.max(-10, Math.min(100, baseLeft + leftJitter));

    return {
      id: `cloud-${seed}`,
      d: cloudShapes[index % cloudShapes.length],
      top: 10 + normalize(randomA) * 70,
      left: clampedLeft,
      scale: 0.8 + normalize(randomC) * 0.7,
      opacity: 0.03 + normalize(randomD) * 0.05,
      flip: normalize(randomE) > 0.5 ? -1 : 1,
      duration: 30 + normalize(randomA * 0.6) * 30,
      drift: -26 + normalize(randomB * 0.7) * 52,
      depth: 0.55 + normalize(randomC * 0.8) * 0.6,
    };
  });
}

const clouds = createClouds(8);

export function CloudWisp({ className = "", layers = 8 }: CloudWispProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.9,
  });

  return (
    <div
      ref={ref}
      className={`relative left-1/2 h-[22rem] w-screen -translate-x-1/2 overflow-hidden overflow-x-hidden ${className}`}
    >
      {clouds.slice(0, layers).map((cloud, index) => {
        const parallaxY = useTransform(smoothProgress, [0, 1], [18 * cloud.depth, -26 * cloud.depth]);

        return (
          <motion.div
            key={cloud.id}
            style={{
              top: `${cloud.top}%`,
              left: `${cloud.left}%`,
              y: parallaxY,
            }}
            className="absolute"
          >
            <motion.svg
              viewBox="0 0 420 210"
              className="h-[180px] w-[min(92vw,820px)] -translate-x-1/2 -translate-y-1/2"
              animate={{
                x: [0, cloud.drift, 0],
              }}
              transition={{
                duration: cloud.duration,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.8,
              }}
              style={{
                scale: `${cloud.scale * cloud.flip} ${cloud.scale}`,
              }}
            >
              <defs>
                <filter id={`cloud-blur-${index}`}>
                  <feGaussianBlur stdDeviation={7 + cloud.scale * 1.6} />
                </filter>
              </defs>
              <path
                d={cloud.d}
                fill="#ffffff"
                fillOpacity={cloud.opacity}
                filter={`url(#cloud-blur-${index})`}
              />
              <path
                d={cloud.d}
                fill="none"
                stroke="#fffef8"
                strokeOpacity={Math.max(cloud.opacity - 0.01, 0.02)}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#cloud-blur-${index})`}
              />
            </motion.svg>
          </motion.div>
        );
      })}
    </div>
  );
}
