export type Side = 'front' | 'back';

/* ---------- Product case: one screen = one question ---------- */
export type Visual =
  | { layout: 'single'; items: Ph[] }          // one big image
  | { layout: 'stack'; items: Ph[] }           // two small on top, one wide below
  | { layout: 'row'; items: Ph[] };            // three phones in a row
export interface Ph { label: string; spec: string }

export type Block =
  | { type: 'meta'; items: { label: string; value: string; more?: string }[] }
  | { type: 'bento'; cells: { title: string; body?: string; chips?: string[]; wide?: boolean; fill?: boolean }[] }
  | { type: 'contrast'; from: { label: string; items: string[] }; to: { label: string; items: string[] } }
  | { type: 'table'; head: [string, string]; rows: [string, string][] }
  | { type: 'decision'; rows: [string, string][] }
  | { type: 'cards'; items: { label?: string; title: string; body?: string }[] }
  | { type: 'chain'; steps: string[] }
  | { type: 'chips'; items: string[] }
  | { type: 'facts'; caption: string; items: { value: string; label: string }[] }
  | { type: 'note'; text: string }
  | { type: 'theme' }
  | { type: 'contact' };

export interface Screen {
  id: string;
  nav: string;                     // label in the left track
  title: [string, string?];        // second part is set in the case colour
  lede?: string;
  statement?: boolean;             // one huge line, no image
  blocks?: Block[];
  visual?: Visual;
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
  accent?: string;            // case colour, safe for text on white
  fill?: string;              // case colour for filled cards
  screens?: Screen[];         // Product pages; falls back to a generic skeleton
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
  accent: '#D3127A',
  fill: '#FA5EB5',
  facts: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Timeline', value: '8 weeks' },
    { label: 'Platform', value: 'iOS' },
    { label: 'Status', value: 'Launched July' },
  ],
  summary: 'A multi-chain crypto wallet, redesigned around PIG, an AI companion.',
  screens: [
    { id: 'overview', nav: 'Overview', title: ['Crypto,', 'without learning crypto.'],
      lede: 'A multi-chain wallet, redesigned around PIG, an AI companion that lets people say what they want instead of learning how crypto works.',
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Product Designer', more: 'Co-designed end to end with a second designer' },
        { label: 'Timeline', value: '8 weeks' },
        { label: 'Platform', value: 'iOS' },
        { label: 'Status', value: 'Launched July' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Home screen', spec: 'The wallet home in the light theme. Your strongest frame, on a phone mockup.' }] } },

    { id: 'product', nav: 'Product', title: ['One wallet,', 'five networks.'],
      blocks: [{ type: 'bento', cells: [
        { title: 'PIG', body: 'An AI companion for every transaction.', wide: true, fill: true },
        { title: 'Built for newcomers', body: 'Women taking their first steps in crypto.' },
        { title: 'Non-custodial', body: 'Your keys, your funds.' },
        { title: 'Five networks', chips: ['BTC', 'ETH', 'SOL', 'TRX', 'XRP'], wide: true },
      ] }],
      visual: { layout: 'stack', items: [
        { label: 'Wallet card', spec: 'A crop of the wallet card component.' },
        { label: 'PIG', spec: 'The PIG avatar on its own.' },
        { label: 'Light and dark', spec: 'The same home screen in both themes, side by side.' },
      ] } },

    { id: 'problem', nav: 'Problem', title: ['Crypto asks people to think', 'like a blockchain.'],
      blocks: [{ type: 'contrast',
        from: { label: 'Crypto makes you think in', items: ['Addresses', 'Networks', 'Gas', 'Transactions'] },
        to: { label: 'People think in', items: ['Send', 'Receive', 'Swap'] } }],
      visual: { layout: 'single', items: [{ label: 'Before: the old send screen', spec: 'The send screen before the redesign. Add one line on what was wrong with it.' }] } },

    { id: 'insight', nav: 'Insight', statement: true, title: ['Users think in outcomes,', 'not interfaces.'],
      lede: 'What if they didn’t have to learn the wallet?' },

    { id: 'approach', nav: 'Approach', title: ['Every crypto concept got', 'a plain answer.'],
      blocks: [{ type: 'table', head: ['Crypto concept', 'Our decision'], rows: [
        ['Network fees', 'One fee, paid in the asset you send'],
        ['Network choice', 'Handled behind the scenes'],
        ['Navigation', 'Tell PIG what you want to do'],
        ['Confirmation', 'A clear summary before every action'],
      ] }],
      visual: { layout: 'single', items: [{ label: 'The send flow', spec: 'The new send flow: amount, the one fee, summary.' }] } },

    { id: 'pig', nav: 'PIG', title: ['AI built in,', 'not bolted on.'],
      blocks: [{ type: 'decision', rows: [
        ['Decision', 'PIG is a way into the wallet, not a chat tab.'],
        ['Chose', 'AI alongside the classic wallet, over an AI-only app.'],
        ['Because', 'The interface changes. The product doesn’t.'],
      ] }],
      visual: { layout: 'single', items: [{ label: 'PIG chat', spec: 'A conversation with PIG that ends in a ready transaction.' }] } },

    { id: 'trust', nav: 'Trust', title: ['In finance, conversational', 'doesn’t mean casual.'],
      lede: 'Simpler interaction never meant less control. We designed for the moments where trust matters most.',
      blocks: [{ type: 'cards', items: [
        { label: 'Before', title: 'Does the user understand what will happen?' },
        { label: 'During', title: 'Does the user know what is happening?' },
      ] }],
      visual: { layout: 'stack', items: [
        { label: 'Progress', spec: 'A transaction in progress.' },
        { label: 'Error', spec: 'A failed transaction and what to do next.' },
        { label: 'Confirmation', spec: 'The summary screen before signing.' },
      ] } },

    { id: 'onboarding', nav: 'Onboarding', title: ['Your keys, explained', 'before you need them.'],
      blocks: [{ type: 'chain', steps: ['Create a wallet', 'Save your secret phrase', 'Confirm it'] }],
      visual: { layout: 'row', items: [
        { label: 'Welcome', spec: 'The first onboarding screen.' },
        { label: 'Secret phrase', spec: 'The secret phrase screen.' },
        { label: 'Confirm', spec: 'Confirming the phrase.' },
      ] } },

    { id: 'states', nav: 'Every state', title: ['Every state', 'is designed.'],
      lede: 'For the wallet and for conversations with PIG.',
      blocks: [{ type: 'chips', items: ['First balance', 'Confirmation', 'Errors', 'Empty screens'] }, { type: 'theme' }],
      visual: { layout: 'row', items: [
        { label: 'First balance', spec: 'The wallet right after the first deposit.' },
        { label: 'Empty wallet', spec: 'The wallet before anything arrives.' },
        { label: 'First chat', spec: 'PIG before the first question.' },
      ] } },

    { id: 'process', nav: 'Process', title: ['This wasn’t', 'a concept exercise.'],
      blocks: [
        { type: 'chain', steps: ['Early screens', 'Iteration', 'Testing', 'Development', 'Launch'] },
        { type: 'note', text: 'PIG’s character and the custom 3D icons were made with generative AI, then refined by hand.' },
      ],
      visual: { layout: 'stack', items: [
        { label: 'Early screen', spec: 'One early screen.' },
        { label: 'Final screen', spec: 'The same screen, shipped.' },
        { label: 'Early screens', spec: 'A wide strip of early explorations.' },
      ] } },

    { id: 'outcome', nav: 'Outcome', title: ['From first screen', 'to launch.'],
      blocks: [
        { type: 'facts', caption: 'Scope', items: [{ value: '100+', label: 'Screens' }, { value: '8', label: 'Core flows' }] },
        { type: 'note', text: 'One component library and a set of custom 3D icons hold it together.' },
        { type: 'contact' },
      ],
      visual: { layout: 'stack', items: [
        { label: '3D icons', spec: 'A few of the custom 3D icons.' },
        { label: 'Components', spec: 'A crop of the component sheet.' },
        { label: 'Final frame', spec: 'The closing image: the app on a clean background.' },
      ] } },
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
