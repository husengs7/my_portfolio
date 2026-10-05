"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TimelineThread, type TimelineItem } from "./TimelineThread";

export function ExpandableTimeline({ items }: { items: TimelineItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState<number>();
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const canExpand = items.length > 10;
  const showPreview = !expanded && canExpand;

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const updateHeight = () => {
      const preview = content.querySelector<HTMLElement>("[data-timeline-preview]");
      if (showPreview && preview?.parentElement) {
        const parentTop = preview.parentElement.getBoundingClientRect().top - content.getBoundingClientRect().top;
        const previous = preview.previousElementSibling as HTMLElement | null;
        const bottom = Math.max(preview.offsetTop + 100, previous ? previous.offsetTop + previous.offsetHeight + 16 : 0);
        setHeight(parentTop + bottom);
      } else {
        setHeight(content.getBoundingClientRect().height);
      }
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(content);
    return () => observer.disconnect();
  }, [showPreview]);

  return (
    <div ref={sectionRef}>
      <motion.div
        id="locus-timeline"
        initial={false}
        animate={{ height: height ?? "auto" }}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="flow-root">
          <TimelineThread items={expanded ? items : items.slice(0, 11)} previewFrom={showPreview ? 10 : undefined} />
        </div>
      </motion.div>
      {canExpand && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="locus-timeline"
            onClick={() => {
              if (expanded) sectionRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
              setExpanded(!expanded);
            }}
            className="inline-flex min-h-11 items-center gap-2 border-b border-amber-100/30 px-4 py-2 text-sm text-amber-100/80 transition-colors hover:border-amber-100/70 hover:text-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-100"
          >
            {expanded ? "Show less" : `Show more (${items.length - 10} remaining)`}
            {expanded ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
          </button>
        </div>
      )}
    </div>
  );
}
