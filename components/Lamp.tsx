// A painted chiragh. It rattles and smokes while the thing inside wakes up.
export function Lamp({ waking = false }: { waking?: boolean }) {
  return (
    <svg className="lamp" viewBox="0 0 122 92" data-waking={waking} aria-hidden="true" focusable="false">
      <g className="smoke" fill="none" stroke="var(--bone-dim)" strokeWidth="3" strokeLinecap="round">
        <path d="M7 34 C1 27 13 22 7 13" />
        <path d="M12 32 C18 24 8 19 14 10" />
        <path d="M4 30 C-2 22 6 18 2 9" />
      </g>
      <g className="lamp-body" filter="url(#rough-sm)">
        <path
          d="M94 50 C108 43 118 54 109 62 C105 66 99 66 94 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path d="M34 55 C24 53 16 45 6 38 C9 47 14 58 31 65 Z" fill="currentColor" />
        <path
          d="M30 58 C30 44 50 38 64 38 C80 38 97 44 97 56 C97 66 82 72 64 72 C46 72 30 68 30 58 Z"
          fill="currentColor"
        />
        <path d="M52 39 C52 30 76 30 76 39 Z" fill="currentColor" />
        <circle cx="64" cy="28" r="4.2" fill="currentColor" />
        <path d="M52 72 L47 81 L81 81 L76 72 Z" fill="currentColor" />
        <path
          d="M38 55 C46 60 82 61 90 54"
          fill="none"
          stroke="var(--gold-deep)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path d="M47 81 L81 81" stroke="var(--gold-deep)" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
