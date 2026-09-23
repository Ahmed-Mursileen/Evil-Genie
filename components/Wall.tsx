import type { CSSProperties, ReactNode } from "react";

// Hairline plaster cracks, placed at fixed size so they never stretch.
const CRACKS: CSSProperties[] = [
  { top: "9%", right: 0 },
  { top: "47%", left: 0, transform: "scaleX(-1)" },
  { top: "78%", right: 0, transform: "rotate(8deg)" },
  { top: 0, left: "30%", transform: "rotate(-70deg) scale(0.7)", transformOrigin: "top left" },
];

// The night wall: SVG filters for the painted look, hairline cracks, and the page content.
export function Wall({ mood, children }: { mood?: string; children: ReactNode }) {
  return (
    <main className="wall" data-mood={mood}>
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <filter id="rough" x="-4%" y="-12%" width="108%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.09" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="7" />
        </filter>
        <filter id="rough-sm" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="2.5" />
        </filter>
      </svg>

      {CRACKS.map((style, i) => (
        <svg key={i} className="crack" viewBox="0 0 200 120" width="200" height="120" style={style} aria-hidden="true" focusable="false">
          <path className="chip" d="M200 26 L187 31 L179 49 L162 57 L156 79 L142 89 L131 110" />
          <path
            className="gap"
            d="M200 18 L184 24 L176 42 L159 50 L153 72 L139 83 L128 110 L141 86 L156 76 L162 54 L179 47 L187 28 L200 23 Z M176 44 L187 57 L185 73 L190 57 Z M153 72 L140 70 L128 76 L141 72 Z"
          />
        </svg>
      ))}

      {/* Older chalkings, half-washed off the wall. Decorative only. */}
      <div className="ghosts" aria-hidden="true">
        <span style={{ top: "9%", left: "-4%", rotate: "-6deg" }}>Kala jadu ka tor</span>
        <span style={{ top: "38%", right: "-8%", rotate: "4deg" }}>Mehboob aap ke qadmon mein</span>
        <span style={{ top: "66%", left: "-10%", rotate: "-3deg" }}>24 ghante har murad poori</span>
        <span style={{ top: "88%", right: "-4%", rotate: "5deg" }}>Rishta masla? Rabta karein</span>
      </div>

      <div className="wall-inner">{children}</div>
    </main>
  );
}
