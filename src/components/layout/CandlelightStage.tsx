"use client";

import { motion } from "framer-motion";
import { GasLampPath } from "@/components/layout/GasLampPath";
import { StarrySky } from "@/components/layout/StarrySky";

type CandlelightStageProps = {
  leftLampLit: boolean;
  rightLampLit: boolean;
  isLit: boolean;
  children: React.ReactNode;
};

export function CandlelightStage({
  leftLampLit,
  rightLampLit,
  isLit,
  children,
}: CandlelightStageProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: isLit ? "#05051a" : "#02020b",
      }}
      transition={{ duration: 1.6, ease: "easeInOut" }}
      className="relative min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,197,108,0.06),transparent_28%),linear-gradient(180deg,rgba(6,6,24,0.94),rgba(5,5,26,1))]" />
      <StarrySky />
      <GasLampPath isLit={isLit} leftLampLit={leftLampLit} rightLampLit={rightLampLit} />
      <motion.div
        initial={false}
        animate={{
          opacity: isLit ? 1 : 0.2,
        }}
        transition={{ duration: 1.4, delay: isLit ? 0.2 : 0 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,197,108,0.08),transparent_42%)]"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
