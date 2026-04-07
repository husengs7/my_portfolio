"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type TimelineItem = {
  date: string;
  label: string;
};

type TimelineThreadProps = {
  items: TimelineItem[];
  className?: string;
};

function buildDesktopPath(count: number) {
  const centerX = 320;
  const startY = 82;
  const stepY = 132;
  let path = `M ${centerX} ${startY - 36}`;

  for (let index = 0; index < count; index += 1) {
    const y = startY + index * stepY;
    const nextY = y + stepY;
    const direction = index % 2 === 0 ? -1 : 1;
    const hookX = centerX + direction * 34;

    path += ` C ${centerX} ${y - 18}, ${hookX} ${y - 8}, ${hookX} ${y + 8}`;
    path += ` C ${hookX} ${y + 24}, ${centerX + direction * 12} ${y + 30}, ${centerX} ${y + 46}`;

    if (index < count - 1) {
      path += ` C ${centerX - direction * 10} ${y + 68}, ${centerX + direction * 10} ${nextY - 68}, ${centerX} ${nextY - 44}`;
    }
  }

  return path;
}

function buildMobilePath(count: number) {
  const railX = 56;
  const startY = 82;
  const stepY = 132;
  let path = `M ${railX} ${startY - 36}`;

  for (let index = 0; index < count; index += 1) {
    const y = startY + index * stepY;
    const nextY = y + stepY;

    path += ` C ${railX} ${y - 14}, ${railX + 26} ${y - 8}, ${railX + 26} ${y + 10}`;
    path += ` C ${railX + 26} ${y + 24}, ${railX + 10} ${y + 30}, ${railX} ${y + 44}`;

    if (index < count - 1) {
      path += ` C ${railX - 6} ${y + 66}, ${railX + 6} ${nextY - 66}, ${railX} ${nextY - 42}`;
    }
  }

  return path;
}

export function TimelineThread({ items, className = "" }: TimelineThreadProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 20%"],
  });

  const totalHeight = Math.max(280, 96 + items.length * 132);
  const pathLength = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <div
      ref={ref}
      className={`relative left-0 right-0 mx-auto mt-12 w-full max-w-4xl overflow-x-hidden ${className}`}
      style={{ minHeight: `${totalHeight}px` }}
    >
      <div className="absolute inset-y-0 left-14 w-px bg-gradient-to-b from-amber-100/10 via-amber-200/20 to-transparent md:left-1/2 md:-translate-x-1/2" />

      <svg
        viewBox={`0 0 640 ${totalHeight}`}
        className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
        aria-hidden="true"
      >
        <motion.path
          d={buildDesktopPath(items.length)}
          style={{ pathLength }}
          fill="none"
          stroke="rgba(253, 230, 176, 0.3)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <svg
        viewBox={`0 0 320 ${totalHeight}`}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible md:hidden"
        aria-hidden="true"
      >
        <motion.path
          d={buildMobilePath(items.length)}
          style={{ pathLength }}
          fill="none"
          stroke="rgba(253, 230, 176, 0.3)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          const top = 36 + index * 132;

          return (
            <motion.div
              key={`${item.date}-${item.label}`}
              initial={false}
              style={{
                opacity: useTransform(scrollYProgress, [index * 0.1, index * 0.1 + 0.14], [0, 1]),
                y: useTransform(scrollYProgress, [index * 0.1, index * 0.1 + 0.14], [20, 0]),
                top: `${top}px`,
              }}
              className="absolute left-0 right-0"
            >
              <div className="hidden md:flex items-center">
                {isLeft ? (
                  <>
                    <div className="flex w-1/2 justify-end pr-[0.95rem]">
                      <div className="w-fit max-w-[22rem]">
                        <div className="rounded-2xl border border-parchment/10 bg-[linear-gradient(180deg,rgba(245,197,108,0.08),rgba(255,255,255,0.02))] px-6 py-4 shadow-[0_0_20px_rgba(245,197,108,0.06)] backdrop-blur-[1px]">
                          <span className="block text-[0.75rem] uppercase tracking-[0.24em] text-amber-100/55">{item.date}</span>
                          <span className="mt-1 block text-[0.95rem] leading-relaxed text-parchment/78">{item.label}</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 h-2.5 w-2.5 rounded-full bg-amber-100/70 shadow-[0_0_10px_rgba(245,197,108,0.18)]" />
                    <div className="w-1/2" />
                  </>
                ) : (
                  <>
                    <div className="w-1/2" />
                    <div className="relative z-10 h-2.5 w-2.5 rounded-full bg-amber-100/70 shadow-[0_0_10px_rgba(245,197,108,0.18)]" />
                    <div className="flex w-1/2 justify-start pl-[0.95rem]">
                      <div className="w-fit max-w-[22rem]">
                        <div className="rounded-2xl border border-parchment/10 bg-[linear-gradient(180deg,rgba(245,197,108,0.08),rgba(255,255,255,0.02))] px-6 py-4 shadow-[0_0_20px_rgba(245,197,108,0.06)] backdrop-blur-[1px]">
                          <span className="block text-[0.75rem] uppercase tracking-[0.24em] text-amber-100/55">{item.date}</span>
                          <span className="mt-1 block text-[0.95rem] leading-relaxed text-parchment/78">{item.label}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center md:hidden">
                <div className="mr-4 ml-[3.05rem] relative z-10 h-2.5 w-2.5 rounded-full bg-amber-100/70 shadow-[0_0_10px_rgba(245,197,108,0.18)]" />
                <div className="max-w-[18rem]">
                  <div className="rounded-2xl border border-parchment/10 bg-[linear-gradient(180deg,rgba(245,197,108,0.08),rgba(255,255,255,0.02))] px-6 py-4 shadow-[0_0_20px_rgba(245,197,108,0.06)] backdrop-blur-[1px]">
                    <span className="block text-[0.75rem] uppercase tracking-[0.24em] text-amber-100/55">{item.date}</span>
                    <span className="mt-1 block text-[0.95rem] leading-relaxed text-parchment/78">{item.label}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
