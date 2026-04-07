"use client";

import { motion } from "framer-motion";
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
): LampNode[] => [
  { id: "opening-left", side: "left", top: "8rem", x: "15%", lit: leftLampLit, delay: 0.08, scale: 0.98 },
  { id: "opening-right", side: "right", top: "8rem", x: "75%", lit: rightLampLit, delay: 0.16, scale: 0.98 },
  { id: "path-1", side: "right", top: "42rem", x: "88%", lit: isLit, delay: 0.1, scale: 0.9 },
  { id: "path-2", side: "left", top: "72rem", x: "4%", lit: isLit, delay: 0.16, scale: 0.88 },
  { id: "path-3", side: "right", top: "107rem", x: "82%", lit: isLit, delay: 0.22, scale: 0.93 },
  { id: "path-4", side: "left", top: "140rem", x: "16%", lit: isLit, delay: 0.14, scale: 0.86 },
];

const mobileLampNodes = (
  leftLampLit: boolean,
  rightLampLit: boolean,
  isLit: boolean,
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
  { id: "path-1-mobile", side: "right", top: "42rem", x: "calc(100% - 88px)", lit: isLit, delay: 0.1, scale: 0.6 },
  { id: "path-2-mobile", side: "left", top: "72rem", x: "5px", lit: isLit, delay: 0.16, scale: 0.6 },
  { id: "path-3-mobile", side: "right", top: "107rem", x: "calc(100% - 94px)", lit: isLit, delay: 0.22, scale: 0.6 },
  { id: "path-4-mobile", side: "left", top: "140rem", x: "8px", lit: isLit, delay: 0.14, scale: 0.6 },
];

function LampPathItem({ node }: { node: LampNode }) {
  return (
    <motion.div
      style={{ top: node.top, left: node.x, scale: node.scale ?? 1 }}
      className="pointer-events-none absolute z-10"
    >
      <GasLamp side={node.side} isLit={node.lit} delay={node.delay} />
    </motion.div>
  );
}

export function GasLampPath({ isLit, leftLampLit, rightLampLit }: GasLampPathProps) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="hidden md:block">
        {lampNodes(leftLampLit, rightLampLit, isLit).map((node) => (
          <LampPathItem key={node.id} node={node} />
        ))}
      </div>
      <div className="block md:hidden">
        {mobileLampNodes(leftLampLit, rightLampLit, isLit).map((node) => (
          <LampPathItem key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}
