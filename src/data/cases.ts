export type Side = 'front' | 'back';

export interface Step {
  id: string;
  n: string;
  title: string;
  short?: string;            // label in the left step track
  body: string[];
  table?: { head?: string[]; rows: string[][] };
  nums?: { value: string; label: string }[];
  visual: { label: string; spec: string };   // placeholder: what the right-hand picture should be
}

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
  story?: Step[];            // Product pages; falls back to a generic skeleton
}

const facts = [
  { label: 'Role', value: '[Role]' },
  { label: 'Timeline', value: '[Months, year]' },
  { label: 'Platform', value: '[Web / iOS / Android]' },
  { label: 'Team', value: '[Who you worked with]' },
];
const highlights = ['[Selling point 1: what was hard and what you did]', '[Selling point 2]', '[Selling point 3]'];
const summary = '[Two sentences: what the product or brand is, and your part in it.]';


const pinkwallet: Partial<CaseData> = {
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
  story: [
    { id: 'context', n: '01', title: 'Context',
      body: ['PinkWallet is a mobile crypto wallet for people who want to use crypto without becoming traders first. It brings everyday wallet actions, financial education and an AI assistant, PIG, into one app.'],
      table: { rows: [['Role', 'Product Designer'], ['Timeline', '8 weeks'], ['Platform', 'iOS'], ['Team', 'Two-person design team']] },
      visual: { label: 'Home screen, light and dark', spec: 'Two phones side by side: wallet home in the light theme and in the dark theme.' } },
    { id: 'problem', n: '02', title: 'Problem',
      body: ['How do you make crypto feel as familiar as a banking app without hiding the risks that can cost people money? Typical wallets assume crypto fluency. PinkWallet’s users are beginners.'],
      table: { head: ['Typical wallet', 'PinkWallet'], rows: [['Technical language', 'Familiar actions'], ['Raw wallet addresses', 'Saved contacts'], ['No explanation', 'Explained as you go'], ['Irreversible, no warning', 'Visible confirmation']] },
      visual: { label: 'The same send screen, before and after', spec: 'A typical wallet’s send screen next to PinkWallet’s, with short annotations.' } },
    { id: 'inputs', n: '03', title: 'Inputs',
      body: ['There was no budget for user interviews. I used three sources instead.'],
      table: { head: ['Source', 'What I found', 'What I did'], rows: [['Competitor audit', '[Finding]', '[Decision]'], ['App Store reviews', '[Finding]', '[Decision]'], ['Banking and messaging apps', '[Pattern]', '[Decision]']] },
      visual: { label: 'Evidence', spec: 'A collage: competitor screens or App Store review quotes, with your marks on them.' } },
    { id: 'architecture', n: '04', title: 'Architecture',
      body: ['Five connected areas.'],
      table: { head: ['Area', 'Its job'], rows: [['Wallet', '[One line]'], ['PIG', '[One line]'], ['Contacts', '[One line]'], ['Feed', '[One line]'], ['Transactions', '[One line]']] },
      visual: { label: 'Five areas', spec: 'Five screens in a row, labelled Wallet, PIG, Contacts, Feed, Transactions.' } },
    { id: 'decision-1', n: '05', title: 'Familiar actions, visible risk', short: 'Visible risk',
      body: ['Sending crypto should feel like any other app, but transactions can’t be reversed. So there is a deliberate extra confirmation step before sending.'],
      visual: { label: 'The send flow', spec: 'Three phones: enter amount, review, confirm. The extra confirmation step is highlighted.' } },
    { id: 'decision-2', n: '06', title: 'An assistant that acts without taking control', short: 'PIG',
      body: ['PIG prepares transactions and explains them. The user always makes the final tap.'],
      table: { head: ['PIG does', 'The user does'], rows: [['Prepares the transaction', 'Reviews it'], ['Explains what will happen', 'Decides'], ['Stops at the confirmation', 'Makes the final tap']] },
      visual: { label: 'PIG in action', spec: 'Two phones: PIG proposes a transaction in chat, then the user confirms it.' } },
    { id: 'cut', n: '07', title: 'What I cut',
      body: ['The filter: does this reduce the chance someone loses money or gives up?'],
      table: { head: ['Cut', 'Why'], rows: [['Trader-grade analytics', '[Why]'], ['Autonomous transactions', '[Why]'], ['Buy recommendations', '[Why]']] },
      visual: { label: 'What was removed', spec: 'One trader-style analytics screen, greyed out and crossed through.' } },
    { id: 'system', n: '08', title: 'System',
      body: ['A design system with light and dark themes on shared components. Both themes are built to WCAG AA contrast, with states shown by shape and label as well as colour.'],
      nums: [{ value: '200+', label: 'Screens' }, { value: '2', label: 'Themes' }, { value: '8', label: 'Core flows' }, { value: 'AA', label: 'WCAG contrast' }],
      visual: { label: 'One screen, two themes', spec: 'The same screen in light and dark, identical size (it will become a theme switch).' } },
    { id: 'next', n: '09', title: 'What I’d test next', short: 'Test next',
      body: ['The design rests on convention and is untested. Next I would test the confirmation step, and whether people trust PIG more or less after it handles a transaction correctly.'],
      visual: { label: 'Closing frame', spec: 'The wallet home screen on a clean background, as the last image.' } },
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
