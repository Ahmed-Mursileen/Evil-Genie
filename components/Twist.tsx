import type { CSSProperties } from "react";

// The twist sprays onto the wall one sentence at a time.
export function Twist({ text, safety = false }: { text: string; safety?: boolean }) {
  const sentences = text.match(/[^.!?]+(?:[.!?]+["”']?|$)\s*/g) ?? [text];
  return (
    <p className={`twist${safety ? " safety" : ""}`}>
      {sentences.map((s, i) => (
        <span key={i} className="spray" style={{ "--i": i } as CSSProperties}>
          {s}
        </span>
      ))}
    </p>
  );
}
