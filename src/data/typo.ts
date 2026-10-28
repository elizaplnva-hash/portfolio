// Typographic tidy-up for running copy: keeps short words with the word that follows
// and never leaves the last word of a paragraph alone on its line.
const NB = ' ';
const SHORT = /(^|\s)(a|an|the|to|of|in|on|at|by|for|and|or|but|is|it|its|I|we|no|as|if|so|my|our|his|her|with|from|than|that|then|when|each|every|one|two|three)\s+/gi;

export function tidy(s: string): string {
  if (s.includes('\n')) return s.split('\n').map(tidy).join('\n');
  if (s.length < 24) return s;
  let t = s.replace(/(^|[.!?:]\s+)([A-Za-z’']{1,5})\s+/g, (_m, p, w) => p + w + NB);
  t = t.replace(SHORT, (_m, p, w) => p + w + NB);
  t = t.replace(SHORT, (_m, p, w) => p + w + NB); // second pass catches chains like "and a"
  t = t.replace(/\s+(\S+)$/, NB + '$1');
  return t;
}

const KEYS = new Set(['lede', 'text', 'body', 'title', 'summary', 'rows', 'caption', 'items', 'headline', 'pitchSub', 'desc']);

export function tidyDeep<T>(v: T, key = ''): T {
  if (typeof v === 'string') return (KEYS.has(key) ? tidy(v) : v) as T;
  if (Array.isArray(v)) return v.map((x) => tidyDeep(x, key)) as T;
  if (v && typeof v === 'object') {
    for (const k of Object.keys(v as object)) (v as Record<string, unknown>)[k] = tidyDeep((v as Record<string, unknown>)[k], k);
  }
  return v;
}
