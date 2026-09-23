export const MOODS = [
  { id: "classic", label: "Classic Evil", hint: "extreme dark irony" },
  { id: "petty", label: "Petty", hint: "it holds a grudge against you" },
  { id: "literal", label: "Overly Literal", hint: "every word, exactly" },
  { id: "chaotic", label: "Chaotic", hint: "reality gives up" },
  { id: "yellow", label: "The King in Yellow", hint: "have you seen the yellow sign?" },
  { id: "random", label: "Surprise me", hint: "let it choose" },
] as const;

export type MoodId = (typeof MOODS)[number]["id"];
export type ConcreteMood = Exclude<MoodId, "random">;

export const DEFAULT_MOOD: MoodId = "classic";

export function isMood(value: unknown): value is MoodId {
  return typeof value === "string" && MOODS.some((m) => m.id === value);
}

export function moodLabel(id: string): string {
  return MOODS.find((m) => m.id === id)?.label ?? "Classic Evil";
}

export const WISH_MIN = 3;
export const WISH_MAX = 200;
