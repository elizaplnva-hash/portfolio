export type Side = 'front' | 'back';

export interface CaseData {
  slug: string;
  side: Side;                 // front = Product, back = Brand & Visual
  name: string;               // product / client name, first tag
  tags: string[];             // domain tags
  headline: string;           // the one selling headline (also used on the home tile)
  color: string;              // placeholder fill until real images arrive
  image?: string;             // cover, /images/...
  big?: boolean;              // large tile on home
  facts: { label: string; value: string }[];   // role, timeline, platform...
  highlights: string[];       // selling points (Product pages)
  summary: string;            // short intro
}

const facts = [
  { label: 'Role', value: '[Role]' },
  { label: 'Timeline', value: '[Months, year]' },
  { label: 'Platform', value: '[Web / iOS / Android]' },
  { label: 'Team', value: '[Who you worked with]' },
];
const highlights = ['[Selling point 1: what was hard and what you did]', '[Selling point 2]', '[Selling point 3]'];
const summary = '[Two sentences: what the product or brand is, and your part in it.]';

export const cases: CaseData[] = [
  { slug: 'pinkwallet', side: 'front', name: 'PinkWallet', tags: ['Fintech', 'AI'], headline: "Crypto that doesn't scare first-time users", color: '#ff8fc8', big: true, facts, highlights, summary },
  { slug: 'jam', side: 'front', name: 'Jam', tags: ['Consumer', 'UX research'], headline: 'Turned a contact-collecting app into a reason to follow up', color: '#6b8cff', facts, highlights, summary },
  { slug: 'lapunzel', side: 'front', name: 'Lapunzel', tags: ['E-commerce', 'Conversion'], headline: 'Reframed a redesign as a trust problem', color: '#ffb547', facts, highlights, summary },
  { slug: 'green-credit-score', side: 'front', name: 'Green Credit Score', tags: ['Fintech', 'Web'], headline: '[Headline: what was hard and what we achieved]', color: '#3ccf7a', facts, highlights, summary },
  { slug: 'world-of-colors', side: 'back', name: 'World of Colors', tags: ['Brand', 'Website'], headline: '[Headline: what was hard and what we achieved]', color: '#ff5a36', big: true, facts: facts.slice(0, 3), highlights, summary },
  { slug: 'ben-ai', side: 'back', name: 'Ben AI', tags: ['AI SaaS', 'Brand system'], headline: 'A brand system that won the client its first industry award', color: '#7b61ff', facts: facts.slice(0, 3), highlights, summary },
  { slug: 'reboot-hub', side: 'back', name: 'Re:Boot Hub', tags: ['Consulting', 'Brandbook'], headline: 'A brand built on speed, structure and truth', color: '#e8ff3a', facts: facts.slice(0, 3), highlights, summary },
  { slug: 'bobyard', side: 'back', name: 'Bobyard', tags: ['Construction AI', 'Illustration'], headline: 'Visuals for a construction-AI startup, later backed by a $35M Series A', color: '#e8541e', facts: facts.slice(0, 3), highlights, summary },
];

export const bySide = (side: Side) => cases.filter((c) => c.side === side);
