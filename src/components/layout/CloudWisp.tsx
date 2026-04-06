"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type CloudWispProps = {
  className?: string;
  layers?: number;
};

const wisps = [
  {
    id: "wisp-1",
    d: "M18 60C46 28 98 25 144 39C171 47 199 64 241 61C280 59 321 39 359 49C384 56 397 76 404 94C411 113 405 131 384 140C337 160 277 146 233 144C186 141 161 156 121 158C82 159 39 149 17 125C1 108 1 79 18 60Z",
    opacity: 0.09,
  },
  {
    id: "wisp-2",
    d: "M34 92C61 72 102 68 147 74C191 80 210 102 251 100C286 98 316 77 347 82C379 88 398 114 392 137C385 162 351 171 317 170C272 169 227 149 188 149C146 149 109 173 70 167C41 162 14 140 13 118C11 108 17 97 34 92Z",
    opacity: 0.07,
  },
  {
    id: "wisp-3",
    d: "M29 70C57 53 91 55 124 57C171 59 212 77 247 74C290 70 320 47 358 54C386 59 401 83 399 104C396 124 377 137 350 141C308 147 265 131 224 128C181 124 153 136 110 140C75 144 31 139 13 114C1 96 8 79 29 70Z",
    opacity: 0.06,
  },
  {
    id: "wisp-4",
    d: "M21 83C34 56 74 42 111 47C161 54 192 92 235 91C281 90 316 57 356 61C378 63 401 77 405 101C410 129 389 154 356 164C320 175 281 165 246 160C202 154 170 159 130 169C89 179 35 179 13 146C1 128 4 102 21 83Z",
    opacity: 0.05,
  },
];

export function CloudWisp({ className = "", layers = 4 }: CloudWispProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 0.5, 1], [52, 0, -72]);

  return (
    <div ref={ref} className={`relative h-56 overflow-hidden ${className}`}>
      {wisps.slice(0, layers).map((wisp, index) => (
        <motion.div
          key={wisp.id}
          style={{
            y: useTransform(parallaxY, (value) => value * (1 - index * 0.12)),
          }}
          className="absolute inset-0"
        >
          <motion.svg
            viewBox="0 0 420 210"
            className="absolute left-1/2 top-[42%] h-[190px] w-[min(86vw,780px)] -translate-x-1/2 -translate-y-1/2"
            animate={{
              x: index % 2 === 0 ? [-34, 32, -34] : [30, -28, 30],
              y: index % 2 === 0 ? [-8, 10, -8] : [10, -6, 10],
              scale: [1, 1.03, 0.985, 1],
            }}
            transition={{
              duration: 18 + index * 4,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <defs>
              <filter id={`cloud-blur-${index}`}>
                <feGaussianBlur stdDeviation={7 + index * 1.8} />
              </filter>
            </defs>
            <path
              d={wisp.d}
              fill="#ffffff"
              fillOpacity={wisp.opacity}
              filter={`url(#cloud-blur-${index})`}
            />
            <path
              d={wisp.d}
              fill="none"
              stroke="#fffef8"
              strokeOpacity={0.06 - index * 0.008}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#cloud-blur-${index})`}
            />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
}
