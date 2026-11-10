import { tidyDeep } from './typo';
export type Side = 'front' | 'back';

/* ---------- Product case: one screen = one question ---------- */
export type Visual =
  | { layout: 'single'; items: Ph[] }          // one big image
  | { layout: 'stack'; items: Ph[] }           // two small on top, one wide below
  | { layout: 'row'; items: Ph[] };            // three phones in a row
export interface Ph { label: string; spec: string; src?: string; srcs?: string[]; combo?: string[]; audit?: { name: string; logo: string; phone: string; cards: { tag: 'Sending' | 'Swap' | 'Risk exposure' | 'Clarity'; text: string }[] }[]; reviews?: { tag: string; text: string; source: 'appstore' | 'reddit' | 'github'; meta: string; from?: string }[]; evid?: { top: { lead: string; source?: string; items: { value: string; scope?: string; text: string }[] }; frames: { ratio?: string; shots: { src: string; name: string; alt: string; logo: string }[]; finds?: { kind: 'first' | 'deeper'; tag: string; icon: string; text: string }[] }[] }; soft?: boolean; pan?: { src: string; wide?: boolean; alt?: string; marks?: { n: number; x: number; y: number }[] }[]; scroll?: boolean; sys?: boolean; cost?: { on: number; total: number; value: string; text: string; ring: number; ringText: string; source: string }; stages?: { items: { value: string; icon?: string; stage: string; metric: string; what: string; how: string }[]; note?: string }; hyps?: { saw: string; q: string; a: string; icon?: string }[]; stats?: { lead: string; items: { value: string; text: string; label?: string }[]; source?: string; nopct?: boolean }; metrics?: { title: string; items: { value: string; label: string; note: string; wide?: boolean }[] }[]; scope?: { name: string; why: string; d: 'keep' | 'limit' | 'cut' }[]; compare?: { cols: string[]; rows: { label: string; a: boolean | 'part'; b: boolean | 'part' }[]; note?: string }; zoom?: boolean; pad?: boolean; bleed?: boolean; dm?: boolean; wipph?: boolean; big?: boolean; noconf?: boolean; cut?: string; chain?: { icon: string; label: string }[]; trio?: { src: string; label: string; icon: string }[]; alt?: string; flip?: boolean; finds?: { icon: string; cat: string; level: 'critical' | 'serious' | 'moderate'; score: string; title: string; text: string; src: string; pos?: string; alt?: string }[] }   // srcs = transparent device renders composed on the tint

export type Block =
  | { type: 'meta'; items: { label: string; value: string }[] }
  | { type: 'bento'; cells: { title: string; body?: string; icon?: string; wide?: boolean; fill?: boolean }[] }
  | { type: 'contrast'; from: { label: string; items: string[] }; to: { label: string; items: string[]; icons?: string[] } }
  | { type: 'table'; head: [string, string]; rows: [string, string][] }
  | { type: 'decision'; rows: [string, string][] }
  | { type: 'glance'; items: { icon: string; label: string; text: string; href: string }[] }
  | { type: 'cards'; items: { label?: string; title: string; body?: string; icon?: string; hi?: boolean }[] }
  | { type: 'list'; numbered?: boolean; card?: boolean; split?: boolean; tabs?: boolean; noHover?: boolean; items: { label?: string; title: string; body?: string; icon?: string; hl?: boolean; parts?: string[] }[] }
  | { type: 'callout'; text: string }
  | { type: 'chain'; steps: string[] }
  | { type: 'chips'; items: string[] }
  | { type: 'facts'; caption: string; items: { value: string; label: string }[] }
  | { type: 'note'; text: string }
  | { type: 'pull'; text: string }
  | { type: 'quote'; text: string; by: string; me?: boolean }
  | { type: 'numbered'; react?: boolean; plain?: boolean; items: { title: string; body: string; icon?: string }[] }
  | { type: 'fromto'; from: string; to: string }
  | { type: 'steps'; items: { title: string; body: string }[] }
  | { type: 'theme' }
  | { type: 'contact' };

export interface Screen {
  id: string;
  toggle?: boolean | 'landing' | 'ai';                // theme switch beside the title; flips the pan visual
  wip?: boolean;                   // shows a "Work in progress" mark on the visual
  nav: string;                     // label in the left track
  title: [string, string?];        // second part is set in the case colour
  lede?: string;
  statement?: boolean;             // one huge line, no image
  wide?: boolean;                  // text only, spans the frame
  group?: string;                  // rail category for brand cases (set on the first shot of each group)
  link?: { label: string; href: string };   // outward button under the lede
  links?: { label: string; href: string }[];   // several outward buttons under the lede
  shot?: boolean;                  // no text: the visual fills the frame (brand cases)
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
  noNameTag?: boolean;        // case page: don't show the product name as the first tag
  mark?: string;              // name written behind the cover, if shorter than the product name
  desk?: boolean;             // cover is a monitor + a phone
  phones?: string[];          // layered home cover: transparent phone renders over a tinted fill
  big?: boolean;              // large tile on home
  facts: { label: string; value: string }[];   // role, timeline, platform...
  highlights: string[];       // selling points (Product pages)
  summary: string;            // short intro
  accent?: string;            // case colour, safe for text on white
  fill?: string;              // case colour for small dots and marks
  tint?: string;              // pastel behind the case images
  panel?: string;             // overrides the image panel background (e.g. white)
  closing?: { title: string; lede: string };   // last screen: the case's takeaway and how it carries over to working together
  screens?: Screen[];         // Product pages; falls back to a generic skeleton
  shots?: Ph[];               // Brand pages: the images shown one by one while scrolling
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
  closing: {
    title: 'Make it simple first, then make it <em>safe</em>',
    lede: 'That’s how I designed PinkWallet, and how I’d approach your product.',
  },
  noNameTag: true,
  accent: '#E0408F',
  fill: '#E0408F',
  tint: '#FFE6F1',
  panel: '#F6F6F4',
  facts: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Responsibilities', value: 'Architecture, UX/UI, design system' },
    { label: 'Timeline', value: 'Dec 2025 – Jan 2026, 8 weeks' },
    { label: 'Status', value: 'App Store, July 2026' },
  ],
  summary: 'A crypto wallet for people new to crypto, with PIG, an AI co-pilot that prepares actions and leaves the decision to the user.',
  screens: [
    { id: 'overview', nav: 'Overview', title: ['Crypto for first-timers,', 'through conversation'],
      lede: 'Most crypto wallets assume you already know what you’re doing. PinkWallet doesn’t.\nIt’s a self-custody wallet that works like a banking app and says plainly that a sent transaction can’t be undone.\nPIG, an AI assistant, explains each action and sets it up. You press confirm.',
      links: [
        { label: 'Visit website', href: 'https://pinkwallet.pink/' },
        { label: 'Try the app', href: 'https://apps.apple.com/ca/app/pink-wallet-crypto-ai/id6762203790' },
        { label: 'Behance case study', href: 'https://www.behance.net/gallery/258269441/AI-Crypto-Wallet-Mobile-App-UXUI-Design' },
      ],
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Collaboration', value: 'Design Manager at Danart\nClient development team' },
        { label: 'Timeline', value: '8 weeks\nLaunched July 2026' },
        { label: 'Responsibilities', value: 'Product architecture\nUX/UI, design system' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'The Wallet home in both themes', spec: '', srcs: ['/images/pw-home-dark.webp', '/images/pw-home-light.webp'], alt: 'The PinkWallet home screen in the dark and the light theme' }] } },

    { id: 'glance', nav: 'TLDR', title: ['PinkWallet', 'at a glance'],
      blocks: [{ type: 'glance', items: [
        { icon: 'alert-triangle', label: 'Problem', text: 'Crypto wallets assume knowledge first-timers don’t have, and a mistake can’t be undone.', href: '#stakes' },
        { icon: 'bulb', label: 'Solution', text: 'A familiar wallet with guidance built in: Feed explains crypto, PIG prepares actions.', href: '#choices' },
        { icon: 'chart-bar', label: 'Outcome', text: '80% of users who started onboarding finished it; 65% who requested a swap quote completed it.', href: '#outcome' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Key screens', spec: '', trio: [
        { src: '/images/pw-tl-1.webp', label: 'See what happened', icon: 'history' },
        { src: '/images/pw-tl-2.webp', label: 'Send to a contact', icon: 'send' },
        { src: '/images/pw-tl-3.webp', label: 'See what you get', icon: 'repeat' },
      ], alt: 'Three key PinkWallet screens: transaction history, choosing an amount to send, and swap.' }] } },

    { id: 'background', nav: 'Client ask', title: ['The brief changed before','we started designing'],
      lede: 'The first project was a crypto token for experienced users. The client came back with funding and a new idea: a wallet for people who are new to crypto.',
      blocks: [
        { type: 'note', text: 'My first job was to turn that idea into a point of view.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Where we started', spec: '', combo: ['/images/pw-pinkcoin-site.webp', '/images/pw-wallet-phone.webp'], alt: 'The PinkCoin token website from the first project, and the first concept of the wallet screen' }] } },

    { id: 'tradeoffs', nav: 'Scope', title: ['One question', 'decided the scope'],
      lede: 'With eight weeks and a budget for one platform, we had to be selective. We kept what beginners need, limited what could add risk, and cut the rest.',
      blocks: [{ type: 'pull', text: 'Does this reduce the chance that someone loses money or gives up?' }],
      visual: { layout: 'single', items: [{ label: 'Scope decisions', spec: '', scope: [
        { name: 'Portfolio overview', why: 'Simple allocation and performance views.', d: 'keep' },
        { name: 'Feed', why: 'Explains crypto, no buy recommendations.', d: 'keep' },
        { name: 'PIG', why: 'Prepares transactions; the user confirms.', d: 'limit' },
        { name: 'Trading analytics', why: 'Dense charts and technical indicators.', d: 'cut' },
        { name: 'Buy recommendations', why: 'Speculative purchase signals.', d: 'cut' },
      ], alt: 'Five product decisions sorted into keep, limit or cut.' }] } },

    { id: 'stakes', nav: 'Context', title: ['Crypto without a bank', 'in the middle'],
      lede: 'Crypto is digital money people can send directly to each other through a blockchain, without a bank processing the transfer.\nWith a self-custody wallet like PinkWallet, you control the keys to your money. Access depends on a 12-word recovery phrase. Lose it, and there may be no way to get back into your wallet.\nOnce a transaction is confirmed, it can’t be reversed.',
      blocks: [
        { type: 'pull', text: 'That changes what the interface needs to do: make every transaction clear before the user commits to it.' },
      ],
      visual: { layout: 'single', items: [{ label: 'After you press send', spec: '', alt: 'A mistake can be fixed in a banking app and cannot be fixed in a crypto wallet', compare: { cols: ['Banking app', 'Crypto wallet'], rows: [
        { label: 'Cancel a payment before it settles', a: true, b: false },
        { label: 'Dispute a mistake', a: true, b: false },
        { label: 'Call someone who can help', a: true, b: false },
        { label: 'Reset your access', a: true, b: false },
        { label: 'Get the money back', a: true, b: false },
      ] } }] } },

    { id: 'research', nav: 'Research', title: ['The challenge wasn’t','to simplify everything'],
      lede: 'With no budget for interviews or usability testing, I used market data, wallet reviews and competitor analysis to see where first-timers get stuck.',
      blocks: [
        { type: 'numbered', plain: true, items: [
          { title: 'Make core actions easy to find', body: 'Essential actions stay on Home, no trading terminal.' },
          { title: 'Make recipients and costs clear', body: 'Saved contacts, swap fees in % and $ before confirming.' },
          { title: 'Use warnings where they matter', body: 'Extra checks only before irreversible sends and recovery.' },
        ] },
      ],
      visual: { layout: 'stack', items: [
        { label: 'Market context', spec: '', alt: 'Why do some U.S. non‑owners stay away from crypto? 49% name not understanding crypto as the biggest barrier, 43% are concerned about security and fraud (National Cryptocurrency Association, Harris Poll, 2025)', stats: { lead: 'Why do some U.S. non‑owners stay away from crypto?', items: [
          { value: '49', text: 'Say not understanding\ncrypto is the biggest barrier' },
          { value: '43', text: 'Are concerned about\nsecurity and fraud' },
        ], source: 'Source: National Cryptocurrency Association, survey by The Harris Poll, May 2025. 2,000 U.S. adults who don’t own crypto.' } },
        { label: 'What people say', spec: '', alt: 'Three public posts about wallet friction: network fees, a security warning and an address typo', reviews: [
          { tag: 'Fees', from: 'Trust · App Store', source: 'appstore', text: '“The app keeps saying the network fee is not enough no matter how much I adjust the amount.”', meta: 'Trust Wallet · App Store · Apr 2024' },
          { tag: 'Warnings', from: 'Phantom · GitHub', source: 'github', text: '“No balance change found. This transaction maybe malicious.”', meta: 'Phantom · GitHub · Nov 2023' },
          { tag: 'Addresses', source: 'reddit', text: '“The last number of the address is changed.”', meta: 'r/CryptoHelp · Oct 2026' },
        ] },
        { label: 'Competitor audit', spec: '', alt: 'The Phantom and Trust Wallet home screens with the points where a beginner meets friction', audit: [
          { name: 'Phantom', logo: 'phantom', phone: '/images/pw-audit-phantom.webp', cards: [
            { tag: 'Sending', text: 'Send isn’t a top-level action' },
            { tag: 'Swap', text: 'Trading sits in a separate tab' },
            { tag: 'Risk exposure', text: 'Leverage up to 40× is promoted on the home screen' } ] },
          { name: 'Trust Wallet', logo: 'trust', phone: '/images/pw-audit-trust.webp', cards: [
            { tag: 'Sending', text: 'Send is one of four primary actions' },
            { tag: 'Swap', text: 'Swap has a dedicated shortcut' },
            { tag: 'Clarity', text: 'WETH appears as separate entries across two networks' } ] },
        ] },
      ] } },

    { id: 'choices', nav: 'Structure', title: ['A familiar core,','with two new additions'],
      lede: 'The research gave three rules. They shaped the structure.\nA beginner shouldn’t have to learn a new interface and a new kind of money at once.\nWe kept everyday wallet actions familiar: managing assets, sending, receiving and swapping.',
      blocks: [
        { type: 'pull', text: 'Two new parts, two roles: Feed for exploring crypto, PIG for understanding and preparing actions across the wallet.' },
      ],
      visual: { layout: 'single', items: [
        { label: 'Product structure', spec: '', src: '/images/pw-structure.webp', zoom: true, alt: 'PinkWallet structure: Core wallet, PIG and Feed are three equal entry points; Core wallet and PIG lead to the same five actions.' },
      ] } },

    { id: 'pig', nav: 'PIG', title: ['A co-pilot,', 'not an autopilot'],
      lede: 'Sending crypto takes more than a recipient and an amount. A contact can have several wallets, so PIG first helps choose the right one, then prepares the transaction and explains its details.',
      blocks: [
        { type: 'pull', text: 'The user reviews everything and confirms. PIG never sends money on their behalf.' },
      ],
      visual: { layout: 'single', items: [
        { label: 'Send to a contact', spec: '', trio: [
          { src: '/images/pw-pig-1.webp', label: 'Choose the wallet', icon: 'wallet' },
          { src: '/images/pw-pig-2.webp', label: 'Review and send', icon: 'eye' },
          { src: '/images/pw-pig-3.webp', label: 'Sent', icon: 'circle-check' },
        ], alt: 'PIG chat: the user asks to send ETH to Smith, PIG asks which of two wallets, shows a send preview, and the user confirms.' },
      ] } },

    { id: 'feed', nav: 'Feed', title: ['Discovery,', 'without impulse'],
      lede: 'On the first three visits, a short pop-up introduces PIG in the Feed. Users can ask what’s going on in crypto, and PIG answers with a story to open. They can also browse the Feed directly.',
      blocks: [
        { type: 'pull', text: 'A place to understand crypto, not a source of buy recommendations.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Feed with PIG', spec: '', trio: [
        { src: '/images/pw-feed-1.webp', label: 'Meet PIG', icon: 'heart' },
        { src: '/images/pw-feed-2.webp', label: 'Ask PIG', icon: 'message' },
        { src: '/images/pw-feed-3.webp', label: 'Read the story', icon: 'article' },
      ], alt: 'Three screens: a pop-up in the Feed introduces PIG, PIG answers with an article card, and the article opens in the Feed.' }] } },

    { id: 'safeguards', nav: 'Safeguards', title: ['Friction only', 'where it protects'],
      lede: 'Before the wallet is created, three short warnings explain why the recovery phrase matters. Continue stays disabled until users confirm they understand the risk.\nAfter saving the phrase, users create a PIN. If they forget it, it cannot be recovered.',
      blocks: [{ type: 'pull', text: 'Viewing the phrase again requires PIN verification.' }],
      visual: { layout: 'single', items: [{ label: 'Wallet setup', spec: '', trio: [
        { src: '/images/pw-safe-1.webp', label: 'Understand the risk', icon: 'shield' },
        { src: '/images/pw-safe-2.webp', label: 'Save the phrase', icon: 'key' },
        { src: '/images/pw-safe-3.webp', label: 'Create a PIN', icon: 'lock' },
      ], alt: 'Three wallet setup screens: three warnings with a confirmation checkbox, the 12-word recovery phrase, and PIN creation.' }] } },

    { id: 'system', nav: 'Design system', title: ['One product,', 'two moods'],
      lede: '200+ screens in eight weeks, built from one set of components.',
      blocks: [{ type: 'numbered', items: [
        { icon: 'sun-moon', title: 'Two themes, one component set', body: 'Light and dark share the same components.' },
        { icon: 'component', title: 'A rule, not a library', body: 'Repeated patterns became components.' },
        { icon: 'eye', title: 'Contrast by design', body: 'WCAG AA targets, no state by colour alone.' },
        { icon: 'box', title: 'One material, one palette', body: '3D assets made with AI, in one style.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Design system', spec: '', src: '/images/pw-system.webp', zoom: true, bleed: true, alt: 'The PinkWallet interface components in one canvas: inputs, chips, buttons, navigation, 3D coins and transaction receipts in light and dark.' }] } },

    { id: 'outcome', nav: 'Outcome', title: ['Launched,', 'and in use'],
      lede: 'PinkWallet launched in July 2026. Most people who started setup finished it, and some went on to swap and send.',
      blocks: [
        { type: 'pull', text: 'Friction at setup didn’t stop people: most who started finished, in about three minutes.' },
        { type: 'note', text: 'Client analytics, measured with Amplitude and backend data, July–September 2026.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Launch analytics', spec: '', alt: 'Launch analytics, July to September 2026', metrics: [
        { title: 'Setting up', items: [
          { value: '80%', label: 'Finished onboarding', note: 'of users who started it' },
          { value: '85%', label: 'Created a wallet', note: 'of users who started setup' },
          { value: '3 min', label: 'Median setup time', note: 'From security setup to PIN, for users who finished', wide: true },
        ] },
        { title: 'Using the wallet', items: [
          { value: '65%', label: 'Completed a swap', note: 'of users who requested a quote' },
          { value: '98%', label: 'Transactions confirmed', note: 'of those submitted to the network' },
        ] },
      ] }] } },

    { id: 'reflection', nav: 'Reflection', title: ['Built on convention,', 'never tested'],
      lede: 'Without a usability-testing budget, I relied on familiar patterns and safeguards. Key assumptions remained untested.',
      blocks: [{ type: 'numbered', items: [
        { title: 'Test the confirmation step', body: 'Does it prevent mistakes or add friction?' },
        { title: 'Validate trust in PIG', body: 'Do users trust PIG’s prepared transfer enough to confirm it?' },
        { title: 'Spec interactions with developers', body: 'Document states and motion to close implementation gaps.' },
        { title: 'Measure what matters', body: 'Define success metrics for key flows and track them after launch.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'PinkWallet screens', spec: '', src: '/images/pw-reflection.webp', zoom: true, bleed: true, alt: 'A board of PinkWallet screens in light and dark: filters, transaction history, the PIG chat, a transfer confirmation, swap and contacts.' }] } },
  ],
};

const jam: Partial<CaseData> = {
  accent: '#5B6EF0',
  fill: '#5B6EF0',
  tint: '#E4E6FF',
  facts: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Team', value: '2 designers, 2 PMs' },
    { label: 'Timeline', value: '12 weeks' },
    { label: 'Scope', value: 'Research to hi-fi prototype' },
  ],
  summary: 'Jam Social is a digital business card: scan a QR code, share your contact.',
  screens: [
    { id: 'overview', nav: 'Overview', title: ['Analytics was the ask.', 'A reason to come back was the need'],
      lede: 'Jam Social is an existing networking app: scan a QR code, share your contact. The team asked whether to add analytics, and what kind would matter. I owned the research and the analytics feature.',
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Team', value: '2 designers, 2 PMs' },
        { label: 'Timeline', value: '12 weeks' },
        { label: 'Scope', value: 'Research to hi-fi' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Jam Social', spec: '', src: '/images/jam-overview.webp', alt: 'Jam Social on three phones: the weekly analytics notification, the Analytics screen and the Instagram clicks screen' }] } },

    { id: 'problem', nav: 'Problem', title: ['Networking feels like', 'talking into a void'],
      blocks: [
        { type: 'quote', text: 'I shared my card with 20 people. Did anyone actually look at it?', by: 'Interview participant' },
        { type: 'cards', items: [
          { icon: 'eye-off', title: 'No signal after the scan' },
          { icon: 'link', title: 'LinkedIn isn’t enough' },
          { icon: 'rotate-ccw', hi: true, title: 'No reason to reopen the app' },
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'Problem', spec: '', src: '/images/jam-problem.webp', alt: 'The existing Jam Social app: sign-up, the QR code card and the Jams form' }] } },

    { id: 'research', nav: 'Research', title: ['What people said,', 'not what we assumed'],
      blocks: [
        { type: 'cards', items: [
          { icon: 'route', label: 'Interviews', title: 'Analytics should reach beyond the app.' },
          { icon: 'lock', label: 'Interviews', title: 'Privacy is essential.', body: 'Control over who sees what came up unprompted in 7 of 10 interviews.' },
          { icon: 'repeat', hi: true, label: 'Focus group', title: 'Without a reason to return, Jam Social is a one-time tool.' },
        ] },
        { type: 'note', text: '10+ interviews, one focus group, a competitor audit and a heuristic evaluation.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Research', spec: '', src: '/images/jam-research.webp', alt: 'The interview findings board' }] } },

    { id: 'insight', nav: 'Insight', statement: true, title: ['People didn’t want numbers.', 'They wanted a reason to come back'] },

    { id: 'alignment', nav: 'Alignment', title: ['Two PMs,', 'two definitions of analytics'],
      lede: 'A workshop turned them into one definition and three questions.',
      blocks: [{ type: 'list', items: [
        { icon: 'zap', label: 'How might we', title: 'Make analytics actionable, not just informational?' },
        { icon: 'calendar-clock', label: 'How might we', title: 'Give people a reason to return between events?' },
        { icon: 'shield', label: 'How might we', title: 'Surface insights without compromising privacy?' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Workshop', spec: '', src: '/images/jam-workshop.webp', alt: 'Workshop board of How-might-we notes grouped by theme' }] } },

    { id: 'analytics', nav: 'Analytics', title: ['Analytics you', 'can skim'],
      lede: 'A dashboard and a weekly digest, built for a glance between events.',
      blocks: [{ type: 'cards', items: [
        { icon: 'mouse-pointer-click', title: 'Clicks per Jam', body: 'By day' },
        { icon: 'briefcase', title: 'Top job titles', body: 'Who opens your Jams' },
        { icon: 'bell', hi: true, title: 'Weekly digest', body: 'Arrives as a notification' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Analytics', spec: '', src: '/images/jam-analytics.webp', alt: 'The new Analytics screen and the New Spreads weekly trends' }] } },

    { id: 'followups', nav: 'Follow-ups', title: ['Analytics says who.', 'Reminders say when'],
      lede: 'Each connection gets a profile with event history, talking points and notes.',
      blocks: [{ type: 'list', items: [
        { icon: 'user-round-check', title: 'Follow-up reminders', body: 'Tied to a person and an event' },
        { icon: 'chart-no-axes-column', title: 'Engagement updates', body: 'When your clicks go up' },
        { icon: 'calendar-search', title: 'Event suggestions', body: 'Networking events worth attending' },
        { icon: 'coffee', title: 'Coffee chat refreshers', body: 'A reminder before you meet' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Follow-ups', spec: '', src: '/images/jam-follow.webp', alt: 'Jam Social: Notifications, Calendar and a connection Profile' }] } },

    { id: 'testing', nav: 'Testing', title: ['8 usability tests,', '3 changes'],
      blocks: [{ type: 'table', head: ['What we saw', 'What changed'], rows: [
        ['Icon-only navigation confused 5 of 8 testers', 'Text labels on the bottom navigation'],
        ['Clarity was rated 2', 'Dividers and colour: rated 4.5'],
        ['Contact details came before context', 'Event context first, then the person'],
      ] }],
      visual: { layout: 'single', items: [{ label: 'Instagram analytics', spec: '', src: '/images/jam-hifi.webp', alt: 'The Instagram clicks screens: clicks per day and top demographics by industry and job title' }] } },

    { id: 'reflection', nav: 'Reflection', wide: true, title: ['The brief is rarely', 'the real problem'],
      blocks: [
        { type: 'cards', items: [
          { icon: 'users', label: 'My part', title: 'Aligning two PMs took as much work as the screens.' },
          { icon: 'flag', hi: true, label: 'I’d change', title: 'We tested with people who network easily, not with those who find it hard.' },
        ] },
        { type: 'chain', steps: ['Validate with shipped data', 'Test notification fatigue', 'Prime users for analytics in onboarding'] },
      ] },
  ],
};

const lapunzel: Partial<CaseData> = {
  closing: {
    title: 'Answer the hesitation <em>where it happens</em>',
    lede: 'That’s how I worked on Lapunzel, and how I’d approach your product.',
  },
  accent: '#8A3FD0',
  fill: '#8A3FD0',
  tint: '#F1E7FB',
  panel: '#F6F6F4',
  facts: [
    { label: 'Role', value: 'UX Lead, freelance project' },
    { label: 'Scope', value: 'Research, prioritization, usability testing' },
    { label: 'Focus', value: 'Trust and conversion' },
    { label: 'Timeline', value: '4 weeks, spring 2024' },
  ],
  summary: 'An online store for vegan pet cosmetics. I led UX for a new team of three designers and found where shoppers hesitated.',
  screens: [
    { id: 'overview', nav: 'Overview', title: ['Product page exits', 'down 20%'],
      lede: 'We all want the best for our pets. Online, that’s hard to judge: you can’t read the label in your hand or ask a clerk, and you’re paying a premium for a brand you don’t know yet.\nLapunzel is a young brand making vegan pet cosmetics: shampoos, balms, tonics, perfumes and tooth gel.\nI led UX for a team of three designers, from the first research call to the redesign, so that shoppers felt sure enough to order.',
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'UX Lead\nFreelance project' },
        { label: 'Collaboration', value: '3 designers\nBrand owner, stakeholder' },
        { label: 'Timeline', value: '4 weeks\nSpring 2024' },
        { label: 'Responsibilities', value: 'Research, prioritization\nDelivery, usability testing' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Product page and catalogue', spec: '', srcs: ['/images/lap-ov-product.webp', '/images/lap-ov-list.webp'], flip: true, alt: 'The Lapunzel product page and the shampoos and conditioners list on a phone' }] } },

    { id: 'glance', nav: 'TLDR', title: ['Lapunzel', 'at a glance'],
      blocks: [{ type: 'glance', items: [
        { icon: 'alert-triangle', label: 'Problem', text: 'Interested visitors never committed. The owner couldn’t tell what stopped them, or what would settle it.', href: '#client' },
        { icon: 'bulb', label: 'Solution', text: 'Products grouped by type, and the facts people check before paying moved next to the buy button.', href: '#strategy' },
        { icon: 'chart-bar', label: 'Outcome', text: 'Launched. Client-reported GA4 data shows more shoppers ordering.', href: '#outcome' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Before and after', spec: '', trio: [
        { src: '/images/lap-tldr-before.webp', label: 'Before', icon: 'history' },
        { src: '/images/lap-tldr-after.webp', label: 'After', icon: 'sparkles' },
      ], alt: 'The product page before and after the redesign: a long description with collapsed sections, then stock status above the price and delivery, payment and reviews in accordions.' }] } },

    { id: 'client', nav: 'Client ask', title: ['The owner had a theory.', 'I wanted proof'],
      lede: 'She believed shoppers were wary of the site, and that vegan cosmetics weren’t getting credit for their higher price. Both were plausible, and neither was tested.\nI started with what we could check ourselves: a heuristic review of the old site. It turned up 35 issues, and three of them shaped the redesign.',
      blocks: [{ type: 'pull', text: 'So before anyone opened Figma, I proposed we test the rest.' }],
      visual: { layout: 'single', items: [{ label: 'Three issues from the heuristic review', spec: '', alt: 'Three issues from the heuristic review of the old site: filters open categories (critical, 4 of 4), delivery information only in the footer (moderate, 2 of 4), and no average rating on reviews (moderate, 2 of 4). Screenshots are of the old site in its original Ukrainian.', finds: [
        { icon: 'layout-grid', cat: 'Consistency and standards', level: 'critical', score: '4 of 4', title: 'Filters open categories', text: 'Tapping Filters opened the category list instead of filters.', src: '/images/lap-find-menu.webp', pos: '50% 0%', alt: 'Old mobile site: the category list that opens from Filters (in Ukrainian)' },
        { icon: 'help-circle', cat: 'Help and documentation', level: 'moderate', score: '2 of 4', title: 'Delivery info only in the footer', text: 'Nothing about delivery or payment on the product page. Shoppers had to look for it in the footer.', src: '/images/lap-find-footer.webp', pos: '50% 0%', alt: 'Old site footer, For customers: payment and delivery, contacts, user agreement, FAQ (in Ukrainian)' },
        { icon: 'eye', cat: 'System status visibility', level: 'moderate', score: '2 of 4', title: 'No average rating', text: 'Reviews had stars, but the product never showed an overall rating.', src: '/images/lap-find-review.webp', pos: '50% 0%', alt: 'Old product page: a single five-star review (in Ukrainian)' },
      ] }] } },

    { id: 'team', nav: 'Collaboration', title: ['A new team,', 'and a project to run'],
      lede: 'This was our first project together, and none of us had worked as a team before. Someone had to set up how we’d work. That was my job: I ran every call, split the tasks, kept findings in shared tables and presented the results. It took a real share of the four weeks.',
      visual: { layout: 'single', items: [{ label: 'Who did what', spec: '', alt: 'Who did what. I planned and split the tasks, ran the team calls, did the heuristic review, built the user flow and findings tables. The designers did the competitor analysis and UI components. Interviews, the affinity map and the final presentation were shared.', compare: {
        cols: ['Me', 'Designers'],
        rows: [
          { label: 'Planning, tasks, team calls', a: true, b: false },
          { label: 'Heuristic review', a: true, b: false },
          { label: 'Competitor analysis and UI components', a: false, b: true },
          { label: 'Owner interview: questions and asking', a: true, b: 'part' },
          { label: 'Five owner interviews (I ran one)', a: 'part', b: true },
          { label: 'Affinity map and hypotheses', a: true, b: 'part' },
          { label: 'User flow and findings tables', a: true, b: false },
          { label: 'Presenting to the owner’s team', a: true, b: 'part' },
        ],
        note: 'A dash means shared work.',
      } }] } },

    { id: 'research', nav: 'Research', title: ['Three angles', 'on one drop-off'],
      lede: 'We split the research so each method answered a different question: what breaks on the site, what competitors do well, and what owners need before they pay.',
      blocks: [{ type: 'list', items: [
        { icon: 'layout-dashboard', label: 'The site', title: 'A heuristic review against 10 principles. It found confusing categories.' },
        { icon: 'clipboard-list', label: 'The market', title: 'Five competitor stores. The stronger ones, Masterzoo and Groomer, lead with filters, reviews and full ingredient lists.' },
        { icon: 'message-circle', label: 'The people', title: 'Five 45-minute interviews and a survey of 55 owners, plus a 12-question interview with the owner. Every quote went onto an affinity map.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Research', spec: '', alt: 'Research in numbers: five interviews, 55 survey responses, five competitors and 10 heuristics.', stats: { lead: 'The research in numbers', nopct: true, items: [
        { value: '5', text: 'owner interviews, 45 minutes each' },
        { value: '55', text: 'survey responses' },
        { value: '5', text: 'competitor stores reviewed' },
        { value: '10', text: 'heuristics applied to the old site' },
      ] } }] } },

    { id: 'insight', nav: 'Insight', title: ['Shoppers weren’t afraid of the site.', 'They had no one to ask'],
      lede: 'In a store, a consultant or a vet answers the question on the spot. Online, the page has to do that job.',
      blocks: [{ type: 'pull', text: '“Vegan” didn’t set the brand apart: several owners assumed all pet cosmetics already were. What they looked for was proof: ingredients, certificates, no animal testing.' }],
      visual: { layout: 'single', items: [{ label: 'Survey', spec: '', alt: 'Survey of 55 pet owners: 38 buy pet care in physical stores, 36 ask a vet when unsure, 27 learn from other owners.', stats: { lead: 'What 55 pet owners told us', nopct: true, items: [
        { value: '38', text: 'buy pet care in physical stores', label: 'of 55' },
        { value: '36', text: 'ask a vet when unsure', label: 'of 55' },
        { value: '27', text: 'learn about care from other owners', label: 'of 55' },
      ], source: 'Survey of 55 pet owners, March 2024' } }] } },

    { id: 'strategy', nav: 'Strategy', title: ['Three priorities,', 'in the order people shop'],
      lede: 'I led the session that turned our findings into three priorities, each tied to a step of the purchase: find the product, trust it enough to pay, and come back. Every hypothesis had to serve one of them, which also showed us what to drop.',
      blocks: [{ type: 'note', text: 'The blog didn’t make the cut: 26 of 55 owners don’t notice a store blog.' }],
      visual: { layout: 'single', items: [{ label: 'Three priorities', spec: '', alt: 'Three priorities. Categories were confusing: it became the product-type menu. Online, nothing replaces a store consultant: it became the product card. Rewards interested more people than accounts: we recommended an optional account.', hyps: [
        { saw: 'Categories were confusing', icon: 'search', q: 'Group products by how people look for them?', a: 'Became the product-type menu' },
        { saw: 'Online, nothing replaces a store consultant', icon: 'shopping-cart', q: 'Put the answers next to the buy button?', a: 'Became the product card' },
        { saw: 'Rewards interested more people than accounts', icon: 'gift', q: 'Give people a reason to come back?', a: 'We recommended an optional account' },
      ] }] } },

    { id: 'categories', nav: 'Findability', title: ['Categories by use,', 'not by anatomy'],
      lede: 'The old menu grouped products by body area. We card-sorted three structures and chose product type. A shopper looking for shampoo shouldn’t have to guess whether it lives under Fur or Paws.',
      blocks: [{ type: 'contrast',
        from: { label: 'Before', items: ['Fur', 'Eyes', 'Ears'] },
        to: { label: 'After', items: ['Shampoos and conditioners', 'Balms and soaps', 'Tonics and foams', 'About, Blog and FAQ apart'], icons: ['droplets', 'bubbles', 'sparkles', 'info-circle'] } }],
      visual: { layout: 'single', items: [{ label: 'Menu and catalogue', spec: 'The new menu and catalogue, plus the card sort', alt: 'The new menu and the Catalogue grouped by use' }] } },

    { id: 'trust', nav: 'Trust', title: ['Proof at the point', 'of decision'],
      lede: 'Owners turned to a vet or a store clerk for certainty. We moved that certainty onto the product card: stock status first, delivery and payment one tap away, composition and usage in plain language, and the manufacturer’s certificates a link away.',
      blocks: [{ type: 'pull', text: 'Every answer on the page is one less reason to leave it.' }],
      visual: { layout: 'stack', items: [
        { label: 'Product card', spec: 'Stock status, rating, and the accordions: delivery and payment, ingredients', alt: 'Product list with Bestseller and Vet recommended tags' },
        { label: 'Vet recommended', spec: 'The tag on the product list', alt: 'Reviews with photo and video' },
        { label: 'About page', spec: 'The manufacturer’s certificates', alt: 'Checkout with payment, order summary and log in' },
      ] } },

    { id: 'account', nav: 'Registration', title: ['When the owner', 'said no accounts'],
      lede: 'The owner didn’t want accounts. The survey showed why a mandatory one would cost sales: only 8 of 55 wanted an account, while 20 would sign up for bonuses. Asking for an account is itself a reason to hesitate, so I recommended an optional one at checkout.',
      blocks: [
        { type: 'pull', text: 'The decision was hers. My job was to make the trade-off visible, not to win the argument.' },
        { type: 'table', head: ['Who', 'Position'], rows: [
          ['Shoppers', 'Bonuses win, guests stay'],
          ['Owner', 'Wary of accounts'],
          ['I recommended', 'Optional account at checkout'],
          ['Shipped', 'Not confirmed'],
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'Accounts', spec: '', alt: 'Would you want an account? 20 of 55 would sign up for bonuses, 18 didn’t mind, 9 wanted to buy as guests, 8 wanted an account.', stats: { lead: 'Would you want an account?', nopct: true, items: [
        { value: '20', text: 'would sign up for bonuses', label: 'of 55' },
        { value: '18', text: 'don’t mind either way', label: 'of 55' },
        { value: '9', text: 'want to buy as guests', label: 'of 55' },
        { value: '8', text: 'want an account', label: 'of 55' },
      ], source: 'Survey of 55 pet owners, March 2024' } }] } },

    { id: 'validation', nav: 'Validation', wide: true, title: ['5 usability tests,', '3 changes'],
      lede: 'We tested the wireframes with five people before any visual design, while changes were still cheap.',
      blocks: [{ type: 'list', numbered: true, items: [
        { title: 'The header felt too heavy', body: '“The header font and icons are a bit large.” We made both lighter.' },
        { title: 'Products, blog and FAQ blurred together', body: '“Better to have separate sections for products, the blog and FAQ.” We split the menu into groups.' },
        { title: 'The card said nothing about other buyers', body: '“No information about reviews, the average rating or how many there are.” We added both to the card.' },
      ] }] },

    { id: 'outcome', nav: 'Outcome', title: ['Launched,', 'and tracked by the client'],
      lede: 'The client tracked the store in Google Analytics 4 and shared before-and-after numbers with us. Fewer people left product pages, and more of those who stayed went on to order. I didn’t have access to the raw data, so these are the client’s figures.',
      blocks: [{ type: 'note', text: 'Comparison period and traffic mix weren’t shared with me.' }],
      visual: { layout: 'single', items: [{ label: 'Client-reported GA4 results', spec: '', alt: 'Client-reported results from Google Analytics 4. Product page exit rate 60% to 48%. Add-to-cart rate 6% to 7.2%. Checkout completion 48% to 54%. Purchase conversion 1.5% to 1.8%.', metrics: [
        { title: 'Browsing', items: [
          { value: '60% → 48%', label: 'Product page exits', note: 'exits divided by product page views' },
          { value: '6% → 7.2%', label: 'Add to cart', note: 'additions per product view' },
        ] },
        { title: 'Buying', items: [
          { value: '48% → 54%', label: 'Checkout completion', note: 'purchases per checkout started' },
          { value: '1.5% → 1.8%', label: 'Purchase conversion', note: 'sessions with a purchase' },
        ] },
      ] }] } },

    { id: 'reflection', nav: 'Reflection', wide: true, title: ['Good numbers,', 'not yet verified'],
      lede: 'The results point the right way, but I couldn’t check them myself. Next time I’d set up the measurement with the client before launch.',
      blocks: [
        { type: 'cards', items: [
          { label: 'We cut', title: 'Secondary user flows', body: 'Only the main buying path was mapped, so the four weeks went to the journey that decides a sale.', icon: 'scissors' },
          { label: 'I’d change', title: 'Get the raw data', body: 'Ask for access to the GA4 report so every figure can be checked.', icon: 'flag', hi: true },
          { label: 'I’d change', title: 'Set roles on day one', body: 'Setting up a new team took more of the four weeks than I planned.', icon: 'compass' },
        ] },
        { type: 'chain', steps: ['GA4 events from product list to purchase', 'Same-length periods before and after launch', 'Same traffic sources and devices'] },
      ] },
  ],
};

const greenCredit: Partial<CaseData> = {
  closing: {
    title: 'One layer <em>at a time</em>',
    lede: 'Complex data doesn’t need less information. It needs an order.',
  },
  accent: '#22A55E',
  fill: '#22A55E',
  tint: '#DDF7D0',
  panel: '#F6F6F4',
  facts: [
    { label: 'Role', value: 'Lead Product Designer' },
    { label: 'Timeline', value: '6 weeks, planned 8' },
    { label: 'Platform', value: 'Web, mobile' },
    { label: 'Status', value: 'In development' },
  ],
  summary: 'A credit-monitoring app that gathers three bureau reports in one place, shows where you stand at a glance and explains what moves the score.',
  screens: [
    { id: 'overview', nav: 'Overview', title: ['Credit health,', 'readable in 5 seconds'],
      lede: 'Green Credit Score brings three bureau reports into one app. I cut nothing from them. I gave every piece a place.\nI led the design from a client’s page list to a system ready for development.',
      links: [
        { label: 'Behance case study', href: 'https://www.behance.net/gallery/258270109/Fintech-Dashboard-Web-Mobile-UXUI-Design' },
      ],
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Lead Product Designer\nDanart Agency' },
        { label: 'Collaboration', value: 'Design Manager\nJunior Designer\nDeveloper, contract' },
        { label: 'Timeline', value: '6 weeks, planned 8\nHanded off July 2026' },
        { label: 'Responsibilities', value: 'Strategy, UX/UI\nDesign system, AI workflow' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Dashboard and mobile', spec: '', combo: ['/images/gcs-dash.webp', '/images/gcs-mob.webp'], dm: true, alt: 'The Green Credit Score dashboard on the web, with the same dashboard on a phone in front of it' }] } },

    { id: 'glance', nav: 'TLDR', title: ['Green Credit Score', 'at a glance'],
      blocks: [{ type: 'glance', items: [
        { icon: 'alert-triangle', label: 'Problem', text: 'Three bureau reports show different snapshots of one credit history. Members need one place to see their overall credit health.', href: '#context' },
        { icon: 'bulb', label: 'Solution', text: 'A dashboard to read the status, factor pages to explain it, a simulator to test a change.', href: '#strategy' },
        { icon: 'chart-bar', label: 'Outcome', text: 'Approved by the client and handed to development two weeks early. Not launched yet, so there is no usage data.', href: '#measure' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Credit report', spec: '', alt: 'The Green Credit Score credit report page.', pan: [{ src: '/images/gcs-report-full.webp', alt: 'The Green Credit Score credit report page.' }] }] } },

    { id: 'context', nav: 'Context', title: ['Your score decides', 'what you can borrow'],
      lede: 'Usually between 300 and 850, it tells a lender how reliably you repay.\nThe higher it is, the better the terms on a home, a car or a business loan.\nIn the US, three companies keep these records: Equifax, Experian and TransUnion.',
      blocks: [{ type: 'pull', text: 'One credit history, in three versions.' }],
      visual: { layout: 'single', items: [{ label: 'From borrowing to a score', spec: '', chain: [
        { icon: 'wallet', label: 'You borrow and repay' },
        { icon: 'landmark', label: 'Banks report it' },
        { icon: 'file-analytics', label: 'Bureaus build reports' },
        { icon: 'gauge', label: 'Three bureaus, three numbers' },
      ], alt: 'You borrow and repay, banks report it, bureaus build reports, and three bureaus give three numbers.' }] } },

    { id: 'brief', nav: 'Client ask', title: ['A page list,', 'not a goal'],
      lede: 'A credit-history expert wanted a paid subscription app, so people could manage their credit without a consultation.\nThe Design Manager ran the client conversations and passed the brief to me: eight pages and one standard, better than existing credit apps.',
      blocks: [
        { type: 'pull', text: 'It named pages, not what a member should leave with. That became my question.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Initial product structure', spec: '', src: '/images/gcs-brief-map.webp', zoom: true, pad: true, alt: 'The client’s initial structure: a marketing site, registration and a member area. The member area holds the dashboard, credit report and account settings and is the core product.' }] } },

    { id: 'research', nav: 'Research', title: ['Plenty of data,', 'little meaning'],
      lede: 'No user research was possible, so I worked from what existed: a survey, credit competitors and finance apps. Evidence for hypotheses, not proof.',
      blocks: [
        { type: 'list', split: true, tabs: true, noHover: true, items: [
          { icon: 'layout-dashboard', title: 'Competitor review', body: 'Credit competitors that, like Green Credit Score, show all three bureaus.' },
          { icon: 'photo', title: 'Visual benchmarks', body: 'Not credit products: picked for how they keep complex financial data easy to scan.' },
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'Research evidence', spec: '', alt: 'Experian survey numbers, two credit dashboards and two financial apps with the findings taken from them.', evid: {
        top: { lead: 'What can misunderstanding credit cost?', source: 'Experian survey by Atomik Research, March 2024, 2,005 US adults.', items: [
          { value: '3 in 5', text: 'US adults say limited credit knowledge led to financial mistakes.' },
          { value: '60%', text: 'of that group say those mistakes cost $1,000 or more.' },
        ] },
        frames: [
          { shots: [
              { src: '/images/gcs-ref-chs.webp', name: 'Credit Hero Score', logo: '/images/logo-credithero.png', alt: 'Credit Hero Score: three bureau scores with trend charts above debt analysis.' },
              { src: '/images/gcs-ref-iiq.webp', name: 'IdentityIQ', logo: '/images/logo-identityiq.png', alt: 'IdentityIQ dashboard: three bureau scores, credit summary and score tracker.' },
            ], finds: [
              { kind: 'first', tag: 'What they show', icon: 'eye', text: 'Three bureau scores, score history and account summaries.' },
              { kind: 'deeper', tag: 'What needs more context', icon: 'help-circle', text: 'Why individual scores differ, what drives them and which next step matters most.' },
            ] },
          { ratio: '16 / 9', shots: [
              { src: '/images/gcs-ref-rev.webp', name: 'Revolut', logo: '/images/logo-revolut.png', alt: 'Revolut home: accounts and transactions with the details of one transaction opened beside them.' },
              { src: '/images/gcs-ref-kr.webp', name: 'Kraken', logo: '/images/logo-kraken.png', alt: 'Kraken home: portfolio value, suggestions, watchlist and markets, with the buy panel beside them.' },
            ], finds: [
              { kind: 'first', tag: 'Summary first', icon: 'eye', text: 'Revolut leads with the balance, Kraken with portfolio value.' },
              { kind: 'deeper', tag: 'Actions in reach', icon: 'pointer', text: 'Add money and Deposit sit one step under the number.' },
            ] },
        ],
      } }] } },

    { id: 'strategy', nav: 'Hypothesis', title: ['How might we turn', 'a number into a plan?'],
      lede: 'Each research finding became a hypothesis, and each hypothesis a screen.',
      blocks: [{ type: 'pull', text: 'The result was three layers: an overview, a deeper explanation and a way to test a decision.' }],
      visual: { layout: 'single', items: [{ label: 'Three hypotheses', spec: '', alt: 'Three hypotheses. Finance apps lead with one number: how might we show where a person stands at a glance? It became the dashboard. Limited knowledge can lead to costly mistakes: how might we explain what moves the score? It became the factor pages. Reviewed apps leave little room to test a change: how might we let a person test a change before making it? It became the simulator.', hyps: [
        { saw: 'Finance apps lead with one number', icon: 'gauge', q: 'Show where a person stands at a glance?', a: 'Became the dashboard' },
        { saw: 'Limited knowledge can lead to costly mistakes', icon: 'coin', q: 'Explain what moves the score?', a: 'Became the factor pages' },
        { saw: 'Reviewed apps leave little room to test a change', icon: 'arrow-big-right', q: 'Let a person test a change before making it?', a: 'Became the simulator' },
      ] }] } },

    { id: 'priorities', nav: 'Dashboard', title: ['Where I stand,', 'in one place'],
      lede: 'The first hypothesis became the screen people see right after sign-up. It reads top to bottom, and each block leads to the section behind it.',
      blocks: [
        { type: 'list', split: true, numbered: true, items: [
          { title: 'Status', body: 'Where do I stand? All three bureaus, the monthly change and the next milestone.' },
          { title: 'Score factors', body: 'What moves it? Six factors labelled by impact, each with one tip.' },
          { title: 'Debt analysis', body: 'What do I owe? Open balances, monthly payments, debt-to-income and the standing of each account.' },
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'Dashboard', spec: '', alt: 'The Green Credit Score dashboard with status, score factors and debt analysis.', pan: [
        { src: '/images/gcs-dash.webp', alt: 'The Green Credit Score dashboard on the web.' },
      ] }] } },

    { id: 'guidance', nav: 'Explain and test', title: ['Understand the score,', 'then change it'],
      lede: 'Two sections follow the dashboard, one for each question a person asks next.',
      blocks: [
        { type: 'list', split: true, tabs: true, noHover: true, items: [
          { icon: 'zoom-question', title: 'Score factors', body: 'Why is it this number? Every factor has its own page with five blocks.', parts: ['Where you stand', 'Why', 'Accounts behind it', '12 months of history', 'If you miss a payment'] },
          { icon: 'compass', title: 'Score simulator', body: 'What if I change it? Pick one of eight decisions and the new score appears beside the current one.', parts: ['Open or close accounts', 'Use my cards', 'Payment habits'] },
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'Score factors and score simulator', spec: '', alt: 'The payment history page of score factors, and the score simulator with the open new credit card scenario.', pan: [
        { src: '/images/gcs-factors-page.webp', alt: 'Score factors: the payment history page with where you stand, why, accounts behind it, twelve months of history and what happens if you miss a payment.' },
        { src: '/images/gcs-simulator-page.webp', alt: 'Score simulator: decisions grouped by opening or closing accounts, using cards and payment habits, with current and simulated score side by side.' },
      ] }] } },

    { id: 'colour', nav: 'Status color', toggle: true, title: ['When the brief', 'said monochrome'],
      lede: 'The client asked for minimalism and a monochrome palette, taken from his Instagram. A score alone doesn’t show its health at a glance, so I explored a second direction: status color and a clearer layout.',
      blocks: [
        { type: 'list', split: true, items: [
          { title: 'Informal preference check', body: 'We showed both directions to 30 people from our networks. The Design Manager and I each asked our own contacts.' },
        ] },
        { type: 'pull', text: '25 of 30 preferred the second, and the client approved it. Brand green stays in the shades for impact.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Green only and status color', spec: '', alt: 'The same credit report dashboard in two directions: green only, and status color with red, amber and green.', pan: [
        { src: '/images/gcs-theme-green.webp', alt: 'Green-only direction of the credit report dashboard.' },
        { src: '/images/gcs-theme-status.webp', alt: 'Status color direction of the credit report dashboard, with red, amber and green.' },
      ] }] } },

    { id: 'landing', nav: 'Landing tone', toggle: 'landing', title: ['Two landings,', 'one decision'],
      lede: 'The landing set the visual style for the whole product, and the client had to approve it first. The Design Manager wanted it cooler; I wanted it friendlier.\nSo we designed both. The designer on my team built the cooler one from my brief, and I built the friendlier one around real product screens.',
      blocks: [
        { type: 'pull', text: 'For a product built around personal financial information, I leaned toward a more human presentation.' },
        { type: 'note', text: 'So the friendlier one has mockups with hands and plain-language explanations, without the fancy visuals of a SaaS. The client chose it.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Two landing concepts', spec: '', scroll: true, alt: 'Two landing page concepts: a cooler, SaaS-style one and a friendlier one built around real product screens.', pan: [
        { src: '/images/gcs-landing-a.webp', alt: 'Concept A: a cooler, SaaS-style landing page.' },
        { src: '/images/gcs-landing-b.webp', alt: 'Concept B: a friendlier landing page with real product screens.' },
      ] }] } },

    { id: 'ai', nav: 'AI workflow', toggle: 'ai', title: ['Prompts', 'instead of wireframes'],
      lede: 'Figma agents drafted the wireframes from my prompts. Neither the junior designer nor I drew them by hand, so we reached production much faster.',
      blocks: [
        { type: 'list', split: true, items: [
          { icon: 'file-description', label: 'Me', title: 'Wrote the structure and requirements for each section' },
          { icon: 'sparkles', label: 'Figma agents', title: 'Returned a first layout to react to' },
          { icon: 'users', label: 'The designer on my team, and me', title: 'Refined the visuals and components; I owned the final pass' },
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'Final design and AI draft', spec: '', alt: 'The debt analysis page as the final design and as the AI draft.', pan: [
        { src: '/images/gcs-debt-final.webp', alt: 'Final debt analysis page: totals, balances by account and a payment history timeline per account with status legend.' },
        { src: '/images/gcs-debt-draft.webp', alt: 'AI draft of the debt analysis page: three totals and grouped account tables.' },
      ] }] } },

    { id: 'handoff', nav: 'Handoff', title: ['Built for the developer', 'we work with'],
      lede: 'We’ve worked with this developer before, so the file followed the structure he prefers.',
      blocks: [
        { type: 'list', split: true, tabs: true, items: [
          { icon: 'palette', title: 'A system he can read', body: 'Colors named by brightness, from Green 900 to Green 100.' },
          { icon: 'article', title: 'Type scale', body: 'Display, heading, title, body and small, each with size, line height and weight.' },
          { icon: 'puzzle', title: 'Comments where precision mattered', body: 'States, spacing and edge cases are marked in the file. We walked through the tricky parts together before the start.' },
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'Design system', spec: '', alt: 'Parts of the Green Credit Score design system in Figma: the accent and dark colors, the type scale, and the components with their states.', soft: true, pan: [
        { src: '/images/gcs-sys-colors.webp', alt: 'Accent colors from Green 900 to Green 100 and the dark colors, each with its hex value.' },
        { src: '/images/gcs-sys-type.webp', alt: 'The type scale: display, heading, title, body and small, with size, line height and weight.' },
        { src: '/images/gcs-sys-comp.webp', wide: true, alt: 'Components with their states: sidebar, header, toggle, label, progress bar, marks, action, input and button, icons.' },
      ] }] } },

    { id: 'measure', nav: 'Success metrics', title: ['How I’d measure', 'success'],
      lede: 'With no product usage data yet, these are the measures I’d track after launch: one for each stage, from activation to retention.',
      blocks: [
        { type: 'pull', text: 'The goal wasn’t to check a score. It was to make credit information easy to understand and act on.' },
        { type: 'note', text: 'Targets are set after a baseline is measured.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Success metrics', spec: '', alt: 'Four metrics to track: activation rate, comprehension rate, task success rate and month 2 retention, each with what it measures and how.', stages: {
        items: [
          { value: '1', icon: 'user-plus', stage: 'Activate', metric: 'Activation rate', what: 'New users who view their score in session one.', how: 'Product analytics · by bureau and channel' },
          { value: '2', icon: 'eye', stage: 'Understand', metric: 'Comprehension rate', what: 'Users who identify their score and status in 5 seconds.', how: '5-second test · by score band' },
          { value: '3', icon: 'circle-check', stage: 'Act', metric: 'Task success rate', what: 'Users who find a factor or run the simulator unaided.', how: 'Usability testing · time and drop-off' },
          { value: '4', icon: 'calendar-event', stage: 'Return', metric: 'Month 2 retention', what: 'Activated users who return in month two.', how: 'Cohort analysis · simulator users' },
        ],
      } }] } },
  ],
};

// Green Credit Score: everything after the brief is still being finished; the product structure is confirmed.
{
  const ss = greenCredit.screens ?? [];
  const from = ss.findIndex((x) => x.id === 'brief');
  ss.forEach((x, i) => { if (i >= from && x.id !== 'strategy' && x.id !== 'measure' && x.id !== 'brief' && x.id !== 'research' && x.id !== 'priorities' && x.id !== 'guidance' && x.id !== 'colour' && x.id !== 'landing' && x.id !== 'ai' && x.id !== 'handoff' && x.id !== 'measure' && x.id !== 'reflection') x.visual = { layout: 'single', items: [{ label: 'Work in progress', spec: '', wipph: true }] }; });
}

export const cases: CaseData[] = [
  { slug: 'pinkwallet', side: 'front', name: 'PinkWallet', tags: ['Fintech', 'End-to-end', 'AI'], headline: 'Crypto for first-timers, through conversation', color: '#ff8fc8', image: '/images/pinkwallet-hero.webp', phones: ['/images/pw-phone-wallet.webp', '/images/pw-phone-pig.webp', '/images/pw-phone-dashboard.webp'], big: true, facts, highlights, summary, ...pinkwallet },
  { slug: 'green-credit-score', side: 'front', name: 'Green Credit Score', tags: ['Fintech', 'Web + mobile', '0-to-1'], headline: 'Credit health, readable in 5 seconds', color: '#3ccf7a', image: '/images/gcs-overview.webp', phones: ['/images/gcs-monitor.webp', '/images/gcs-phone.webp'], desk: true, mark: 'Green Score', facts, highlights, summary, ...greenCredit },
  { slug: 'jam', side: 'front', name: 'Jam Social', tags: ['Consumer', 'Networking', 'Mobile app'], headline: 'Reopen rate up 2.5× after the first scan', color: '#6b8cff', image: '/images/jam-home.webp', phones: ['/images/jam-phone-lock.webp', '/images/jam-phone-analytics.webp'], facts, highlights, summary, ...jam },
  { slug: 'lapunzel', side: 'front', name: 'Lapunzel', tags: ['E-commerce', 'Conversion', 'UX research'], headline: 'Product-page exits down 20%', color: '#8A3FD0', image: '/images/lap-hero.webp', phones: ['/images/lap-phone-home.webp', '/images/lap-phone-product.webp'], facts, highlights, summary, ...lapunzel },
  { slug: 'world-of-colors', side: 'back', name: 'World of Colors', tags: ['Brand', 'Website'], headline: '[Headline: what was hard and what we achieved]', color: '#ff5a36', facts: facts.slice(0, 3), highlights, summary },
  { slug: 'ben-ai', side: 'back', name: 'Ben AI', tags: ['AI SaaS', 'Web design'], headline: 'A brand and product system for an award-winning AI startup', color: '#7b61ff', image: '/images/ben-tablets.webp', big: true, facts: facts.slice(0, 3), highlights, summary,
    accent: '#8b78ff', fill: '#8b78ff',
    screens: [
    { id: 'overview', nav: 'Overview', wide: true, title: ['Ben AI'],
      lede: 'A complete website redesign for an AI tool that outgrew its first version, and went on to win a Yelp industry award.',
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Lead Designer' },
        { label: 'Timeline', value: '2024–2025' },
        { label: 'Scope', value: 'Web design, UX, visual system' },
        { label: 'Outcome', value: 'Yelp Award 2025' },
      ] }] },

    { id: 'shot-tablets', nav: 'Tablets', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Tablets', spec: '', src: '/images/ben-tablets.webp', alt: "Three tablets showing the Ben AI product pages" }] } },
    { id: 'shot-print', nav: 'Print', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Print', spec: '', src: '/images/ben-print.webp', alt: "Ben AI print: a brochure, an event banner and business cards" }] } },
    { id: 'shot-yelp-leads', nav: 'Yelp leads', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Yelp leads', spec: '', src: '/images/ben-yelp-leads.webp', alt: "Turn Yelp Leads Into Booked Jobs" }] } },
    { id: 'shot-yelp-ads', nav: 'Yelp ads', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Yelp ads', spec: '', src: '/images/ben-yelp-ads.webp', alt: "Yelp Ads Campaign Management System" }] } },
    { id: 'shot-thumbtack', nav: 'Thumbtack', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Thumbtack', spec: '', src: '/images/ben-thumbtack.webp', alt: "Win More Thumbtack Jobs" }] } },
    { id: 'shot-website', nav: 'Live chat', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Live chat', spec: '', src: '/images/ben-website.webp', alt: "Your Website’s 24/7 Assistant" }] } },
    { id: 'shot-convert', nav: 'Convert', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Convert', spec: '', src: '/images/ben-convert.webp', alt: "Convert Visitors Into Real Customers" }] } },
    { id: 'shot-recognition', nav: 'Recognition', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Recognition', spec: '', src: '/images/ben-recognition.webp', alt: "We Received Industry Recognition, and Ben Supports Every Job" }] } },
    { id: 'shot-why-ben', nav: 'Why Ben', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Why Ben', spec: '', src: '/images/ben-why-ben.webp', alt: "Not Just Smart, Human-Smart" }] } },
    { id: 'shot-clients', nav: 'Clients', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Clients', spec: '', src: '/images/ben-clients.webp', alt: "Clients, and Start Turning Leads Into Booked Jobs" }] } },
    { id: 'shot-pricing', nav: 'Pricing', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Pricing', spec: '', src: '/images/ben-pricing.webp', alt: "Plans That Grow With Your Business" }] } },
    { id: 'shot-results', nav: 'Results', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Results', spec: '', src: '/images/ben-results.webp', alt: "The Results Speak For Ben" }] } },
    { id: 'shot-faq', nav: 'FAQ', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'FAQ', spec: '', src: '/images/ben-faq.webp', alt: "Got Questions? Ben’s Got Answers, with the footer" }] } },

  ],
  },
  { slug: 'sequoia', side: 'back', name: 'Sequoia', tags: ['Home Services', 'Web Design', 'Brand Identity'], headline: 'A distinctive brand, built for digital and physical experiences', color: '#2f7d63', image: '/images/seq-1.webp', facts: facts.slice(0, 3), highlights, summary,
    accent: '#3f9a7c', fill: '#3f9a7c',
    screens: [
    { id: 'overview', nav: 'Overview', wide: true, title: ['Sequoia Plumbing & Air'],
      lede: 'A custom visual identity and multi-page website for a Bay Area plumbing and air company, extended across branded merchandise and print materials.',
      link: { label: 'View live website', href: 'https://www.sequoiaplumbingandair.com/' },
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Brand & Web Designer' },
        { label: 'Timeline', value: 'July 2026' },
        { label: 'Scope', value: 'Brand identity, UX/UI, web design' },
        { label: 'Deliverables', value: 'Website, logo, merchandise & print' },
      ] }] },
    { id: 'shot-1', nav: 'Website', group: 'Website', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Sequoia 1', spec: '', src: '/images/seq-1.webp', alt: 'Sequoia Plumbing & Mechanical, image 1' }] } },
    { id: 'shot-2', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Sequoia 2', spec: '', src: '/images/seq-2.webp', alt: 'Sequoia Plumbing & Mechanical, image 2' }] } },
    { id: 'shot-3', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Sequoia 3', spec: '', src: '/images/seq-3.webp', alt: 'Sequoia Plumbing & Mechanical, image 3' }] } },
    { id: 'shot-4', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Sequoia 4', spec: '', src: '/images/seq-4.webp', alt: 'Sequoia Plumbing & Mechanical, image 4' }] } },
    { id: 'shot-5', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Sequoia 5', spec: '', src: '/images/seq-5.webp', alt: 'Sequoia Plumbing & Mechanical, image 5' }] } },
    { id: 'shot-6', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Sequoia 6', spec: '', src: '/images/seq-6.webp', alt: 'Sequoia Plumbing & Mechanical, image 6' }] } },
    { id: 'shot-7', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Sequoia 7', spec: '', src: '/images/seq-7.webp', alt: 'Sequoia Plumbing & Mechanical, image 7' }] } },
    { id: 'shot-8', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Sequoia 8', spec: '', src: '/images/seq-8.webp', alt: 'Sequoia Plumbing & Mechanical, image 8' }] } },
    { id: 'shot-9', nav: 'Inner Pages', group: 'Inner Pages', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Sequoia 9', spec: '', src: '/images/seq-9.webp', alt: 'Sequoia Plumbing & Mechanical, image 9' }] } },
    { id: 'shot-10', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Sequoia 10', spec: '', src: '/images/seq-10.webp', alt: 'Sequoia Plumbing & Mechanical, image 10' }] } },
    { id: 'shot-11', nav: 'Brand Applications', group: 'Brand Applications', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Sequoia 11', spec: '', src: '/images/seq-11.webp', alt: 'Sequoia Plumbing & Mechanical, image 11' }] } },
    { id: 'shot-12', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Sequoia 12', spec: '', src: '/images/seq-12.webp', alt: 'Sequoia Plumbing & Mechanical, image 12' }] } },
    { id: 'shot-13', shot: true, title: [''],
      visual: { layout: 'single', items: [{ label: 'Sequoia 13', spec: '', src: '/images/seq-13.webp', alt: 'Sequoia Plumbing & Mechanical, image 13' }] } },
    ],
  },
  { slug: 'reboot-hub', side: 'back', name: 'Re:Boot Hub', tags: ['Consulting', 'Brandbook'], headline: 'A brand built on speed, structure and truth', color: '#e8ff3a', highlights,
    summary: 'A brand identity and brandbook for a consulting hub: logo concepts first, then the full system once the client chose a direction.',
    facts: [{ label: 'Role', value: 'Brand Designer' }, { label: 'Deliverables', value: 'Logo concepts, brandbook' }, { label: 'Type', value: 'Gotham, Open Sans' }] },
  { slug: 'bobyard', side: 'back', name: 'Bobyard', tags: ['Construction AI', 'Illustration'], headline: 'Illustration and visuals for a construction-AI startup', color: '#e8541e', facts: facts.slice(0, 3), highlights, summary },
];

// cases whose pages exist but are not on the home sheet yet
for (const c of cases) { tidyDeep(c.screens); c.headline = tidyDeep(c.headline, "headline"); }

const parked = new Set(['world-of-colors', 'reboot-hub', 'bobyard']);
export const bySide = (side: Side) => cases.filter((c) => c.side === side && !parked.has(c.slug));
