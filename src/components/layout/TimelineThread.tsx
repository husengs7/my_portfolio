"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { type CSSProperties, useRef } from "react";

type TimelineItem = {
  date: string;
  title: string;
  description: string;
  hasAward?: boolean;
};

type TimelineThreadProps = {
  items: TimelineItem[];
  className?: string;
};

function AwardCrown() {
  return (
    <svg viewBox="0 0 24 24" className="h-12 w-12 fill-none stroke-[#F6E08A] opacity-60 drop-shadow-[0_0_8px_rgba(245,197,108,0.2)] md:h-14 md:w-14">
      <path
        d="M4 17L6.4 11.3L9.2 14.2L12 9.8L14.8 14.2L17.6 11.3L20 17L4 17Z"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.4" cy="8.1" r="1.35" strokeWidth="1.5" />
      <circle cx="12" cy="6.4" r="1.35" strokeWidth="1.5" />
      <circle cx="17.6" cy="8.1" r="1.35" strokeWidth="1.5" />
      <path
        d="M6 17H18"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
      className={`relative left-0 right-0 mx-auto mt-12 w-full max-w-4xl overflow-hidden overflow-x-hidden max-md:h-auto max-md:overflow-visible ${className} md:min-h-[var(--timeline-height)]`}
      style={{ "--timeline-height": `${totalHeight}px` } as CSSProperties}
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
          const revealDelay = Math.min(index * 0.08, 0.32);

          return (
            <motion.div
              key={`${item.date}-${item.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10% 0px -20% 0px" }}
              transition={{ duration: 0.6, delay: revealDelay, ease: "easeOut" }}
              style={{ "--item-top": `${top}px` } as CSSProperties}
              className="max-md:relative max-md:left-auto max-md:right-auto max-md:mb-20 max-md:top-0 md:absolute md:left-0 md:right-0 md:top-[var(--item-top)]"
            >
              <div className="hidden md:flex items-center">
                {isLeft ? (
                  <>
                    <div className="flex w-1/2 justify-end pr-[0.95rem]">
                      <div className="w-fit max-w-[22rem]">
                        <div className="relative rounded-2xl border border-parchment/10 bg-[linear-gradient(180deg,rgba(245,197,108,0.08),rgba(255,255,255,0.02))] px-6 py-4 shadow-[0_0_20px_rgba(245,197,108,0.06)] backdrop-blur-[1px]">
                          {item.hasAward ? (
                            <div className="absolute right-[-24px] top-[-24px] z-20 rotate-[15deg]">
                              <AwardCrown />
                            </div>
                          ) : null}
                          <span className="block text-[0.75rem] uppercase tracking-[0.24em] text-amber-100/55">{item.date}</span>
                          <h3 className="mb-2 mt-2 text-lg font-bold tracking-tight text-amber-100/90 md:text-xl">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-slate-300/80 md:text-base">{item.description}</p>
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
                        <div className="relative rounded-2xl border border-parchment/10 bg-[linear-gradient(180deg,rgba(245,197,108,0.08),rgba(255,255,255,0.02))] px-6 py-4 shadow-[0_0_20px_rgba(245,197,108,0.06)] backdrop-blur-[1px]">
                          {item.hasAward ? (
                            <div className="absolute right-[-24px] top-[-24px] z-20 rotate-[15deg]">
                              <AwardCrown />
                            </div>
                          ) : null}
                          <span className="block text-[0.75rem] uppercase tracking-[0.24em] text-amber-100/55">{item.date}</span>
                          <h3 className="mb-2 mt-2 text-lg font-bold tracking-tight text-amber-100/90 md:text-xl">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-slate-300/80 md:text-base">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center md:hidden">
                <div className="mr-4 ml-[3.05rem] relative z-10 h-2.5 w-2.5 rounded-full bg-amber-100/70 shadow-[0_0_10px_rgba(245,197,108,0.18)]" />
                <div className="max-w-[18rem]">
                  <div className="relative rounded-2xl border border-parchment/10 bg-[linear-gradient(180deg,rgba(245,197,108,0.08),rgba(255,255,255,0.02))] px-6 py-4 shadow-[0_0_20px_rgba(245,197,108,0.06)] backdrop-blur-[1px]">
                    {item.hasAward ? (
                      <div className="absolute right-[-24px] top-[-24px] z-20 rotate-[15deg]">
                        <AwardCrown />
                      </div>
                    ) : null}
                    <span className="block text-[0.75rem] uppercase tracking-[0.24em] text-amber-100/55">{item.date}</span>
                    <h3 className="mb-2 mt-2 text-lg font-bold tracking-tight text-amber-100/90 md:text-xl">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-300/80 md:text-base">{item.description}</p>
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
