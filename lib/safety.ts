// Wishes about self-harm are never granted or twisted. This check runs before
// the model so the response never depends on the model behaving.
const SELF_HARM_PATTERNS: RegExp[] = [
  /\bsuicid/i,
  /\bkill(ing)?\s+my\s*self\b/i,
  /\bend\s+(it\s+all|my\s+life|myself)\b/i,
  /\bself[\s-]?harm/i,
  /\bhurt(ing)?\s+my\s*self\b/i,
  /\bcut(ting)?\s+my\s*self\b/i,
  /\b(want|wish|wanna|going)\s+(to\s+)?die\b/i,
  /\bi\s+wish\s+i\s+(was|were)\s+(dead|never\s+born)\b/i,
  /\b(not|never)\s+wake\s+up\b/i,
  /\bdon'?t\s+want\s+to\s+(live|exist|be\s+alive)\b/i,
  /\bkhud\s*ku?shi\b/i,
  /\bmar\s+jaa?(na|un|oon|aun)\b/i,
  /\bmarna\s+chaht[aie]\b/i,
  /\bjeena\s+nahi\s+chaht[aie]\b/i,
];

export function isSelfHarmWish(wish: string): boolean {
  return SELF_HARM_PATTERNS.some((re) => re.test(wish));
}

export const SELF_HARM_RESPONSE =
  "No. Not this one. I have swallowed kings and unmade stars, and even I will not take this wish from you. Your story is not finished, little mortal, and the wall wants you to stay. Talk to someone now: Umang helpline Pakistan 0311-7786264, or findahelpline.com anywhere else.";
