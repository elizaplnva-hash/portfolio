export type Side = 'front' | 'back';

export interface Fig { src: string; alt: string; caption?: string; }
export type Block =
  | { type: 'text'; heading?: string; paragraphs: string[] }
  | { type: 'figs'; cols: 1 | 2 | 3; figs: Fig[] };
export interface Section { id: string; n: string; title: string; blocks: Block[]; }

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
  intro?: { parts: { text: string; tone: 'ink' | 'dim' | 'accent' | 'pig' }[]; note: string };
  stats?: { value: string; label: string; count?: number; suffix?: string; icon: 'rocket' | 'themes' | 'screens' | 'flows'; tilt?: boolean }[];
  sections?: Section[];       // Product pages; falls back to placeholders
}

const facts = [
  { label: 'Role', value: '[Role]' },
  { label: 'Timeline', value: '[Months, year]' },
  { label: 'Platform', value: '[Web / iOS / Android]' },
  { label: 'Team', value: '[Who you worked with]' },
];
const highlights = ['[Selling point 1: what was hard and what you did]', '[Selling point 2]', '[Selling point 3]'];
const summary = '[Two sentences: what the product or brand is, and your part in it.]';


const img = (f: string) => `/images/pinkwallet/${f}.webp`;
const pinkwallet: Partial<CaseData> = {
  image: img('cover-light'),
  facts: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Timeline', value: '8 weeks' },
    { label: 'Platform', value: 'iOS' },
    { label: 'Team', value: 'Two-person design team' },
  ],
  highlights: [
    'No budget for interviews, so decisions came from a competitor audit, App Store reviews and conventions people already know',
    'Familiar actions, visible risk: one deliberate extra step before an irreversible send',
    'PIG, the AI assistant, prepares and explains transactions. The user makes the final tap',
  ],
  summary: 'A mobile crypto wallet for people who want to use crypto without becoming traders first.',
  intro: {
    parts: [
      { text: 'PinkWallet ', tone: 'ink' },
      { text: '/images/pinkwallet/pig-head.webp', tone: 'pig' },
      { text: ' is a wallet ', tone: 'dim' },
      { text: 'you can talk to', tone: 'accent' },
      { text: ', designed to make digital finance simpler, more intuitive and more ', tone: 'dim' },
      { text: 'approachable', tone: 'ink' },
    ],
    note: 'We redesigned the existing product and introduced PIG, an AI companion that gives users a new way to interact with their wallet.',
  },
  stats: [
    { value: 'July', label: 'Launched', icon: 'rocket' },
    { value: '2', label: 'Themes', count: 2, icon: 'themes' },
    { value: '200+', label: 'Screens', count: 200, suffix: '+', icon: 'screens', tilt: true },
    { value: '8', label: 'Core flows', count: 8, icon: 'flows' },
  ],
  sections: [
    { id: 'context', n: '01', title: 'Context', blocks: [
      { type: 'text', paragraphs: [
        'PinkWallet is a mobile crypto wallet for people who want to use crypto without becoming traders first. It brings everyday wallet actions, financial education and an AI assistant, PIG, into one app.',
        'I was the product designer in a two-person design team: architecture, UX/UI and the design system, over 8 weeks, for iOS.',
      ] },
      { type: 'figs', cols: 2, figs: [
        { src: img('pig-intro'), alt: 'PIG, the AI assistant, greeting the user' },
        { src: img('pig-wallet'), alt: 'The wallet home screen in dark theme' },
      ] },
    ] },
    { id: 'problem', n: '02', title: 'Problem', blocks: [
      { type: 'text', paragraphs: [
        'How do you make crypto feel as familiar as a banking app without hiding the risks that can cost people money?',
        'Typical wallets assume crypto fluency. PinkWallet’s users are beginners.',
      ] },
    ] },
    { id: 'process', n: '03', title: 'Process', blocks: [
      { type: 'text', heading: 'Inputs', paragraphs: [
        'There was no budget for user interviews. Instead I ran a competitor audit, read App Store reviews, and borrowed conventions people already know from messaging and banking apps.',
      ] },
      { type: 'text', heading: 'Architecture', paragraphs: ['Five connected areas: Wallet, PIG, Contacts, Feed and Transactions.'] },
      { type: 'figs', cols: 2, figs: [
        { src: img('arch-wallet'), alt: 'Wallet and dashboard', caption: 'Wallet' },
        { src: img('arch-pig'), alt: 'PIG assistant', caption: 'PIG' },
      ] },
      { type: 'figs', cols: 3, figs: [
        { src: img('arch-contacts'), alt: 'Contacts', caption: 'Contacts' },
        { src: img('arch-feed'), alt: 'Feed', caption: 'Feed' },
        { src: img('arch-swap'), alt: 'Swap and transactions', caption: 'Transactions' },
      ] },
    ] },
    { id: 'solution', n: '04', title: 'Solution', blocks: [
      { type: 'text', heading: 'Familiar actions, visible risk', paragraphs: ['Sending crypto should feel like any other app, but transactions can’t be reversed. So there is a deliberate extra confirmation step before sending.'] },
      { type: 'figs', cols: 1, figs: [{ src: img('decision-contacts'), alt: 'Contacts flow with saved wallets' }] },
      { type: 'text', heading: 'An assistant that acts without taking control', paragraphs: ['PIG prepares transactions and explains them. The user always makes the final tap.'] },
      { type: 'figs', cols: 1, figs: [{ src: img('decision-pig'), alt: 'PIG answering questions and preparing actions' }] },
      { type: 'text', heading: 'What I cut', paragraphs: ['Trader-grade analytics, autonomous transactions and buy recommendations. The filter: does this reduce the chance someone loses money or gives up?'] },
      { type: 'text', heading: 'System', paragraphs: ['A design system with light and dark themes on shared components: 200+ screens, states and theme variations. Both themes are built to WCAG AA contrast, with states shown by shape and label as well as colour.'] },
      { type: 'figs', cols: 2, figs: [
        { src: img('cover-light'), alt: 'Landing hero, light theme', caption: 'Light' },
        { src: img('cover-dark'), alt: 'Landing hero, dark theme', caption: 'Dark' },
      ] },
      { type: 'figs', cols: 1, figs: [{ src: img('card-themes'), alt: 'Debit card screen in light and dark themes' }] },
    ] },
    { id: 'outcome', n: '05', title: 'What I’d test next', blocks: [
      { type: 'text', paragraphs: [
        'The design rests on convention and is untested. Next I would test the confirmation step, and whether people trust PIG more or less after it handles a transaction correctly.',
      ] },
    ] },
  ],
};

export const cases: CaseData[] = [
  { slug: 'pinkwallet', side: 'front', name: 'PinkWallet', tags: ['Fintech', 'AI'], headline: "Crypto that doesn't scare first-time users", color: '#ff8fc8', big: true, facts, highlights, summary, ...pinkwallet },
  { slug: 'jam', side: 'front', name: 'Jam', tags: ['Consumer', 'UX research'], headline: 'Turned a contact-collecting app into a reason to follow up', color: '#6b8cff', facts, highlights, summary },
  { slug: 'lapunzel', side: 'front', name: 'Lapunzel', tags: ['E-commerce', 'Conversion'], headline: 'Reframed a redesign as a trust problem', color: '#ffb547', facts, highlights, summary },
  { slug: 'green-credit-score', side: 'front', name: 'Green Credit Score', tags: ['Fintech', 'Web'], headline: '[Headline: what was hard and what we achieved]', color: '#3ccf7a', facts, highlights, summary },
  { slug: 'world-of-colors', side: 'back', name: 'World of Colors', tags: ['Brand', 'Website'], headline: '[Headline: what was hard and what we achieved]', color: '#ff5a36', big: true, facts: facts.slice(0, 3), highlights, summary },
  { slug: 'ben-ai', side: 'back', name: 'Ben AI', tags: ['AI SaaS', 'Brand system'], headline: 'A brand system that won the client its first industry award', color: '#7b61ff', facts: facts.slice(0, 3), highlights, summary },
  { slug: 'reboot-hub', side: 'back', name: 'Re:Boot Hub', tags: ['Consulting', 'Brandbook'], headline: 'A brand built on speed, structure and truth', color: '#e8ff3a', facts: facts.slice(0, 3), highlights, summary },
  { slug: 'bobyard', side: 'back', name: 'Bobyard', tags: ['Construction AI', 'Illustration'], headline: 'Visuals for a construction-AI startup, later backed by a $35M Series A', color: '#e8541e', facts: facts.slice(0, 3), highlights, summary },
];

export const bySide = (side: Side) => cases.filter((c) => c.side === side);
