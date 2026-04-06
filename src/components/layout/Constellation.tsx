"use client";

type ConstellationTone = "orion" | "cassiopeia";

type ConstellationProps = {
  className?: string;
  tone: ConstellationTone;
};

const constellationMap: Record<
  ConstellationTone,
  {
    lines: string[];
    points: Array<{ cx: number; cy: number; r?: number; accent?: boolean }>;
  }
> = {
  orion: {
    lines: [
      "M40 38C52 46 66 58 79 71C95 87 113 101 131 111",
      "M81 72C89 82 97 90 104 100",
      "M78 70C71 88 64 104 57 121",
      "M58 122C72 126 92 130 110 127C126 125 139 117 150 108",
    ],
    points: [
      { cx: 40, cy: 38, r: 3.1 },
      { cx: 79, cy: 71, accent: true },
      { cx: 104, cy: 100, r: 2.5 },
      { cx: 57, cy: 121, r: 2.8 },
      { cx: 110, cy: 127, accent: true },
      { cx: 150, cy: 108, r: 2.7 },
    ],
  },
  cassiopeia: {
    lines: [
      "M34 99C48 88 60 80 74 74C89 69 103 69 116 76",
      "M116 76C126 84 137 94 149 100",
      "M149 100C159 91 170 81 183 75",
      "M183 75C195 84 208 98 222 110",
    ],
    points: [
      { cx: 34, cy: 99, r: 2.7 },
      { cx: 74, cy: 74, accent: true },
      { cx: 116, cy: 76, r: 2.8 },
      { cx: 149, cy: 100, r: 3 },
      { cx: 183, cy: 75, accent: true },
      { cx: 222, cy: 110, r: 3.2 },
    ],
  },
};

function AccentStar({ cx, cy }: { cx: number; cy: number }) {
  return (
    <path
      d={`M ${cx} ${cy - 6} L ${cx + 1.8} ${cy - 1.8} L ${cx + 6} ${cy} L ${cx + 1.8} ${cy + 1.8} L ${cx} ${cy + 6} L ${cx - 1.8} ${cy + 1.8} L ${cx - 6} ${cy} L ${cx - 1.8} ${cy - 1.8} Z`}
      fill="rgba(255,232,190,1)"
      stroke="rgba(244,181,95,0.72)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export function Constellation({ className = "", tone }: ConstellationProps) {
  const data = constellationMap[tone];

  return (
    <div
      className={`pointer-events-none absolute drop-shadow-[0_0_15px_rgba(255,245,220,0.1)] ${className}`}
      style={{ filter: "drop-shadow(0 0 4px rgba(245, 197, 108, 0.4))" }}
    >
      <svg viewBox="0 0 260 180" className="h-full w-full overflow-visible">
        {data.lines.map((line, index) => (
          <path
            key={`${tone}-line-${index}`}
            d={line}
            fill="none"
            stroke="rgba(244,181,95,0.44)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {data.points.map((point, index) =>
          point.accent ? (
            <AccentStar key={`${tone}-point-${index}`} cx={point.cx} cy={point.cy} />
          ) : (
            <circle
              key={`${tone}-point-${index}`}
              cx={point.cx}
              cy={point.cy}
              r={(point.r ?? 2.8) + 0.7}
              fill="rgba(255,232,190,1)"
            />
          ),
        )}
      </svg>
    </div>
  );
}
