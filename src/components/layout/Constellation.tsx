"use client";

type ConstellationTone = "orion" | "cassiopeia" | "lyra" | "cygnus" | "triangulum" | "aries";

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
    // Simplified main-star outline, not a scaled sky chart.
    lines: [
      "M88 30L164 44L142 82L172 150L92 142L114 94L88 30",
      "M114 94L128 88L142 82",
    ],
    points: [
      { cx: 88, cy: 30, accent: true }, // Betelgeuse
      { cx: 164, cy: 44, r: 2.8 }, // Bellatrix
      { cx: 114, cy: 94, r: 2.5 }, // Alnitak
      { cx: 128, cy: 88, r: 2.7 }, // Alnilam
      { cx: 142, cy: 82, r: 2.4 }, // Mintaka
      { cx: 92, cy: 142, r: 2.7 }, // Saiph
      { cx: 172, cy: 150, accent: true }, // Rigel
    ],
  },
  lyra: {
    lines: ["M82 34L108 76L174 64L194 132L128 144L108 76"],
    points: [
      { cx: 82, cy: 34, accent: true }, // Vega
      { cx: 108, cy: 76, r: 2.3 }, // Zeta Lyrae
      { cx: 174, cy: 64, r: 2.4 }, // Delta Lyrae
      { cx: 194, cy: 132, r: 2.8 }, // Sulafat
      { cx: 128, cy: 144, r: 2.6 }, // Sheliak
    ],
  },
  cygnus: {
    lines: ["M130 26L130 76L130 154", "M48 110L88 92L130 76L174 66L220 48"],
    points: [
      { cx: 130, cy: 26, accent: true }, // Deneb
      { cx: 130, cy: 76, r: 3 }, // Sadr
      { cx: 130, cy: 154, r: 2.6 }, // Albireo
      { cx: 48, cy: 110, r: 2.3 }, // Zeta Cygni
      { cx: 88, cy: 92, r: 2.7 }, // Gienah
      { cx: 174, cy: 66, r: 2.5 }, // Delta Cygni
      { cx: 220, cy: 48, r: 2.2 }, // Iota Cygni
    ],
  },
  triangulum: {
    lines: ["M62 136L170 40L198 78Z"],
    points: [
      { cx: 62, cy: 136, r: 2.7 }, // Alpha Trianguli
      { cx: 170, cy: 40, accent: true }, // Beta Trianguli
      { cx: 198, cy: 78, r: 2.3 }, // Gamma Trianguli
    ],
  },
  aries: {
    lines: ["M58 60L154 86L188 124"],
    points: [
      { cx: 58, cy: 60, accent: true }, // Hamal
      { cx: 154, cy: 86, r: 2.8 }, // Sheratan
      { cx: 188, cy: 124, r: 2.2 }, // Mesarthim
    ],
  },
  cassiopeia: {
    lines: [
      "M34 58L82 118L130 76L170 124L222 46",
    ],
    points: [
      { cx: 34, cy: 58, r: 2.7 }, // Caph
      { cx: 82, cy: 118, accent: true }, // Schedar
      { cx: 130, cy: 76, accent: true }, // Gamma Cassiopeiae
      { cx: 170, cy: 124, r: 2.5 }, // Ruchbah
      { cx: 222, cy: 46, r: 2.3 }, // Segin
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
