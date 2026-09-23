"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { DEFAULT_MOOD, MOODS, WISH_MAX, WISH_MIN, moodLabel, type MoodId } from "@/lib/moods";
import { encodeShare } from "@/lib/share";
import { Masthead } from "./Masthead";
import { Twist } from "./Twist";
import { Wall } from "./Wall";

type Result = { wish: string; twist: string; mood: string; safety?: boolean; at: number };

const HISTORY_KEY = "evil-genie:history";
const HISTORY_MAX = 20;

const WAKING_LINES = [
  "Deewar ke peeche kuch hil raha hai…",
  "Woh tumhara naam seekh raha hai…",
  "Hazaar aankhen khul rahi hain…",
  "Qeemat ka hisaab ho raha hai…",
  "Something older than the sun is reading your wish…",
];

function readHistory(): Result[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.slice(0, HISTORY_MAX) : [];
  } catch {
    return [];
  }
}

function writeHistory(items: Result[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
  } catch {
    // Private mode or blocked storage: history just won't persist.
  }
}

function shareLink(r: Result) {
  return `${location.origin}/t?d=${encodeShare(r)}`;
}

function shareText(r: Result) {
  return `Maine maanga: "${r.wish}"\nEvil Genie: ${r.twist}\n\n${shareLink(r)}`;
}

export function GenieApp() {
  const [wish, setWish] = useState("");
  const [mood, setMood] = useState<MoodId>(DEFAULT_MOOD);
  const [loading, setLoading] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [reveal, setReveal] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [history, setHistory] = useState<Result[]>([]);
  const [notice, setNotice] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const verdictRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Hydrate from localStorage after mount; the server has no history to render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(readHistory());
  }, []);

  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => setLineIdx((i) => (i + 1) % WAKING_LINES.length), 1800);
    return () => clearInterval(id);
  }, [loading]);

  useEffect(() => {
    const el = verdictRef.current;
    if (!reveal || !el) return;
    el.focus({ preventScroll: true });
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "center" });
  }, [reveal]);

  const trimmed = wish.trim();
  const tooLong = trimmed.length > WISH_MAX;
  const selected = MOODS.find((m) => m.id === mood)!;
  const wallMood = mood === "yellow" || result?.mood === "yellow" ? "yellow" : undefined;

  async function summon(e?: FormEvent) {
    e?.preventDefault();
    if (loading) return;
    if (trimmed.length < WISH_MIN) {
      setError("Kuch toh likho, faani. The wall cannot grant silence.");
      inputRef.current?.focus();
      return;
    }
    if (tooLong) {
      setError(`Itni lambi khwahish? ${WISH_MAX} characters, bas.`);
      return;
    }
    setError("");
    setNotice("");
    setLineIdx(Math.floor(Math.random() * WAKING_LINES.length));
    setLoading(true);
    try {
      const res = await fetch("/api/twist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wish: trimmed, mood }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || typeof data.twist !== "string") {
        setError(data.error ?? "Woh so gaya. Something older than time is not answering. Try again.");
        return;
      }
      const next: Result = { wish: trimmed, twist: data.twist, mood: data.mood, safety: data.safety, at: Date.now() };
      setResult(next);
      setReveal((n) => n + 1);
      if (!next.safety) {
        const items = [next, ...history].slice(0, HISTORY_MAX);
        setHistory(items);
        writeHistory(items);
      }
    } catch {
      setError("Load shedding in the void. Connection gone. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) summon();
  }

  async function copy(r: Result) {
    try {
      await navigator.clipboard.writeText(shareText(r));
      setNotice("Copy ho gaya. Spread the curse.");
    } catch {
      setNotice("Copy nahi hua. Select the text and copy it yourself, mortal.");
    }
  }

  async function share(r: Result) {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Evil Genie", text: `Maine maanga: "${r.wish}"\nEvil Genie: ${r.twist}`, url: shareLink(r) });
      } catch {
        // User closed the share sheet.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(shareLink(r));
      setNotice("Link copy ho gaya. Send it to someone who deserves it.");
    } catch {
      setNotice("Share nahi hua. Try Copy instead.");
    }
  }

  function again() {
    setWish("");
    setResult(null);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
    inputRef.current?.focus({ preventScroll: true });
  }

  function reopen(r: Result) {
    setResult(r);
    setReveal((n) => n + 1);
    setNotice("");
  }

  function clearHistory() {
    setHistory([]);
    writeHistory([]);
  }

  return (
    <Wall mood={wallMood}>
      <Masthead waking={loading} />

      <form onSubmit={summon} noValidate>
        <div className="panel">
          <div className="whitewash" aria-hidden="true" />
          <label className="wish-label" htmlFor="wish">
            Apni khwahish likho
          </label>
          <textarea
            id="wish"
            ref={inputRef}
            className="wish-input"
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Mujhe 100 ton sona chahiye…"
            rows={3}
            maxLength={WISH_MAX + 50}
            autoComplete="off"
            aria-describedby="wish-count"
            aria-invalid={tooLong || undefined}
          />
          <div className="wish-meta" id="wish-count">
            <span>Enter to summon</span>
            <span className={tooLong ? "over" : undefined}>
              {trimmed.length}/{WISH_MAX}
            </span>
          </div>
        </div>

        <fieldset className="moods">
          <legend>Mizaj</legend>
          <div className="mood-list">
            {MOODS.map((m) => (
              <label key={m.id} className="mood">
                <input
                  type="radio"
                  name="mood"
                  value={m.id}
                  checked={mood === m.id}
                  onChange={() => setMood(m.id)}
                />
                <span>{m.label}</span>
              </label>
            ))}
          </div>
          <p className="mood-hint">{selected.hint}</p>
        </fieldset>

        <button type="submit" className="summon" disabled={loading}>
          {loading ? "Jaag raha hai…" : "Murad maango"}
        </button>
        <p className={`status${error ? " error" : ""}`} role="status" aria-live="polite">
          {loading ? WAKING_LINES[lineIdx] : error}
        </p>
      </form>

      {result && (
        <section className="verdict" aria-labelledby="verdict-title" key={reveal}>
          <h2 id="verdict-title" className="stamp" tabIndex={-1} ref={verdictRef}>
            {result.safety ? "Nahi." : "Manzoor."}
          </h2>
          <Twist text={result.twist} safety={result.safety} />
          <p className="verdict-wish">
            Khwahish thi: <q>{result.wish}</q>
            {!result.safety && <> · <span className="nowrap">Mizaj: {moodLabel(result.mood)}</span></>}
          </p>
          <div className="actions">
            {!result.safety && (
              <>
                <button type="button" className="act" onClick={() => copy(result)}>
                  Copy karo
                </button>
                <button type="button" className="act" onClick={() => share(result)}>
                  Share karo
                </button>
              </>
            )}
            <button type="button" className="act act-quiet" onClick={again}>
              Aur maango
            </button>
          </div>
          <p className="status" role="status" aria-live="polite">
            {notice}
          </p>
        </section>
      )}

      <section className="history" aria-labelledby="history-title">
        <div className="history-head">
          <h2 id="history-title">Purani muradein</h2>
          {history.length > 0 && (
            <button type="button" className="act act-quiet" onClick={clearHistory}>
              Mita do
            </button>
          )}
        </div>
        {history.length === 0 ? (
          <p className="history-empty">Deewar abhi khaali hai. Your wishes will be scrawled here, only on this phone.</p>
        ) : (
          <ol>
            {history.map((h) => (
              <li key={h.at}>
                <button type="button" onClick={() => reopen(h)}>
                  <span className="h-wish">&ldquo;{h.wish}&rdquo;</span>
                  <span className="h-twist">{h.twist}</span>
                </button>
              </li>
            ))}
          </ol>
        )}
      </section>

      <footer className="foot">
        <p className="rabta">Rabta: kabhi mat karna</p>
        <p>Twists are AI-generated dark fiction. Don&rsquo;t take wishes from walls.</p>
      </footer>
    </Wall>
  );
}
