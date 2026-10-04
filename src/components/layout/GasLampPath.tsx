"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GasLamp } from "@/components/ui/GasLamp";

type LampNode = {
  id: string;
  side: "left" | "right";
  top: string;
  x: string;
  lit: boolean;
  delay: number;
  scale?: number;
};

type GasLampPathProps = {
  isLit: boolean;
  leftLampLit: boolean;
  rightLampLit: boolean;
};

const lampNodes = (
  leftLampLit: boolean,
  rightLampLit: boolean,
  isLit: boolean,
  count: number,
): LampNode[] => [
  { id: "opening-left", side: "left", top: "8rem", x: "15%", lit: leftLampLit, delay: 0.08, scale: 0.98 },
  { id: "opening-right", side: "right", top: "8rem", x: "75%", lit: rightLampLit, delay: 0.16, scale: 0.98 },
  ...Array.from({ length: count }, (_, index): LampNode => ({
    id: `path-${index}`,
    side: index % 2 === 0 ? "left" : "right",
    top: `${72 + index * 34}rem`,
    x: index % 2 === 0 ? "calc(50% - min(48%, 39rem))" : "calc(50% + min(48%, 39rem))",
    lit: isLit,
    delay: index % 2 === 0 ? 0.16 : 0.22,
    scale: 0.9,
  })),
];

const mobileLampNodes = (
  leftLampLit: boolean,
  rightLampLit: boolean,
  isLit: boolean,
  count: number,
): LampNode[] => [
  { id: "opening-left-mobile", side: "left", top: "8rem", x: "-32px", lit: leftLampLit, delay: 0.08, scale: 0.6 },
  {
    id: "opening-right-mobile",
    side: "right",
    top: "8rem",
    x: "calc(100% - 96px)",
    lit: rightLampLit,
    delay: 0.16,
    scale: 0.6,
  },
  ...Array.from({ length: count }, (_, index): LampNode => ({
    id: `path-${index}-mobile`,
    side: index % 2 === 0 ? "left" : "right",
    top: `${72 + index * 34}rem`,
    x: index % 2 === 0 ? "2%" : "98%",
    lit: isLit,
    delay: index % 2 === 0 ? 0.16 : 0.22,
    scale: 0.6,
  })),
];

function LampPathItem({ node }: { node: LampNode }) {
  const isPathLamp = node.id.startsWith("path-");
  return (
    <motion.div
      style={{
        top: node.top,
        left: node.x,
        scale: node.scale ?? 1,
        // The SVG is 9rem wide inside the lamp's 10rem wrapper.
        width: isPathLamp ? "9rem" : undefined,
        x: isPathLamp ? "-50%" : 0,
      }}
      className="pointer-events-none absolute z-10"
    >
      <GasLamp side={node.side} isLit={node.lit} delay={node.delay} />
    </motion.div>
  );
}

export function GasLampPath({ isLit, leftLampLit, rightLampLit }: GasLampPathProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const rem = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
      // Reserve the lamp's full height so the final lamp stays inside the page.
      setCount(Math.max(0, Math.floor((entry.contentRect.height / rem - 72 - 26) / 34) + 1));
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      <div className="hidden md:block">
        {lampNodes(leftLampLit, rightLampLit, isLit, count).map((node) => (
          <LampPathItem key={node.id} node={node} />
        ))}
      </div>
      <div className="block md:hidden">
        {mobileLampNodes(leftLampLit, rightLampLit, isLit, count).map((node) => (
          <LampPathItem key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}
