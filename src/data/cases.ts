import { tidyDeep } from './typo';
export type Side = 'front' | 'back';

/* ---------- Product case: one screen = one question ---------- */
export type Visual =
  | { layout: 'single'; items: Ph[] }          // one big image
  | { layout: 'stack'; items: Ph[] }           // two small on top, one wide below
  | { layout: 'row'; items: Ph[] };            // three phones in a row
export interface ShowScreen { id: string; nav: string; ch?: string; kind: 'soon' | 'intro' | 'full' | 'slide' | 'v2a' | 'v3s' | 'v2s' | 'v3h' | 'v3l' | 'v4d' | 'v3c' | 'stack' | 'outro'; tone: string; title?: string; lede?: string; link?: { label: string; href: string }; links?: { label: string; href: string }[]; twin?: string[]; pages?: boolean; cut?: number; fit?: boolean; fill?: boolean; flush?: boolean; asp?: number; flushLeft?: boolean; pad?: boolean; zoom?: boolean; flushBoth?: boolean; cols?: boolean; swap?: boolean; src?: string; alt?: string; cells?: { label?: string; spec?: string; src?: string; alt?: string; pos?: string; fit?: boolean; bg?: string }[]; caption?: string }
export interface Show { oneLiner: string; meta: { label: string; value: string }[]; about: { text: string; credits: { label: string; value: string }[] }; screens: ShowScreen[]; closing?: { title: string; lede: string }; next?: { slug: string; name: string } }
export interface Ph { label: string; spec: string; src?: string; srcs?: string[]; combo?: string[]; audit?: { name: string; logo: string; phone: string; cards: { tag: 'Sending' | 'Swap' | 'Risk exposure' | 'Clarity'; text: string }[] }[]; reviews?: { tag: string; text: string; source: 'appstore' | 'reddit' | 'github'; meta: string; from?: string }[]; evid?: { top: { lead: string; source?: string; items: { value: string; scope?: string; text: string }[] }; frames: { ratio?: string; shots: { src: string; name: string; alt: string; logo: string }[]; plan?: { week: string; name: string; line: string; tags: string[]; color: string }[]; finds?: { kind: 'first' | 'deeper'; tag: string; icon: string; text: string }[] }[] }; soft?: boolean; pan?: { src: string; wide?: boolean; alt?: string; marks?: { n: number; x: number; y: number }[] }[]; scroll?: boolean; sys?: boolean; cost?: { on: number; total: number; value: string; text: string; ring: number; ringText: string; source: string }; stages?: { items: { value: string; icon?: string; stage: string; metric: string; what: string; how: string }[]; note?: string }; hyps?: { saw: string; q: string; a: string; icon?: string }[]; stats?: { lead: string; items: { value: string; text: string; label?: string }[]; source?: string; nopct?: boolean }; metrics?: { title: string; items: { value: string; label: string; note: string; wide?: boolean; pair?: { before: number; after: number; max: number; unit: string } }[] }[]; scope?: { name: string; why: string; d: 'keep' | 'limit' | 'cut' }[]; compare?: { cols: string[]; rows: { label: string; a: boolean | 'part'; b: boolean | 'part' }[]; note?: string }; zoom?: boolean; pad?: boolean; bleed?: boolean; peek?: boolean; twin?: { src: string }[]; slide?: boolean; pn?: string; dm?: boolean; wipph?: boolean; big?: boolean; noconf?: boolean; cut?: string; chain?: { icon: string; label: string }[]; flat?: boolean; trio?: { src?: string; label?: string; icon?: string; facts?: { caption: string; items: { value: string; label: string }[] } }[]; alt?: string; flip?: boolean; matrix?: { title: string; cols: { name: string; logo: string }[]; groups: { label: string; rows: { label: string; v: boolean[] }[] }[] }; voices?: { num: string; label: string; quote: string; who: string; sub?: string; tag: string; tagIcon: string }[]; finds?: { icon: string; cat: string; level: 'catastrophe' | 'major' | 'minor'; score: string; title: string; text: string; src: string; pos?: string; alt?: string }[] }   // srcs = transparent device renders composed on the tint

export type Block =
  | { type: 'meta'; items: { label: string; value: string }[] }
  | { type: 'bento'; cells: { title: string; body?: string; icon?: string; wide?: boolean; fill?: boolean }[] }
  | { type: 'contrast'; from: { label: string; items: string[] }; to: { label: string; items: string[]; icons?: string[] } }
  | { type: 'table'; head: [string, string]; rows: [string, string][] }
  | { type: 'decision'; rows: [string, string][] }
  | { type: 'glance'; row?: boolean; items: { icon: string; label: string; text: string; href?: string }[] }
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

export interface CaseData { show?: Show;
  slug: string;
  side: Side;                 // front = Product, back = Brand & Visual
  name: string;               // product / client name, first tag
  tags: string[];             // domain tags
  headline: string;           // the one selling headline (also used on the home tile)
  sub?: string;               // optional grey line under the headline on the home tile (a confirmed fact)
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
  light?: boolean;            // back-side case shown in the light Product template
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
        { label: 'Collaboration', value: 'Design Manager at Danart\n(client and review)\nClient development team' },
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
  closing: {
    title: 'A product people use once <em>and forget?</em>',
    lede: 'I find the reason to come back, then design it.',
  },
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
        { icon: 'alert-triangle', label: 'Problem', text: 'Visitors browsed the store but left without ordering. The owner couldn’t tell what stopped them.', href: '#client' },
        { icon: 'bulb', label: 'Solution', text: 'Products grouped by type, and the facts people check before paying moved next to the buy button.', href: '#strategy' },
        { icon: 'chart-bar', label: 'Outcome', text: 'Launched. The client reported fewer exits from product pages.', href: '#outcome' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Before and after', spec: '', trio: [
        { src: '/images/lap-tldr-before.webp', label: 'Before', icon: 'history' },
        { src: '/images/lap-tldr-after.webp', label: 'After', icon: 'sparkles' },
      ], alt: 'The product page before and after the redesign: a long description with collapsed sections, then stock status above the price and delivery, payment and reviews in accordions.' }] } },

    { id: 'client', nav: 'Client ask', title: ['The owner had two guesses'],
      lede: 'The brand owner believed shoppers were wary of the site, and that vegan cosmetics weren’t getting credit for their price. We hadn’t checked either.\nSo I started with a heuristic review: going through the old site against ten standard usability rules (Nielsen’s) and rating each problem from 0 to 4. It needs no participants and shows whether the site itself gives people a reason to hesitate.\nIt found 35 issues. Three shaped the redesign.',
      blocks: [{ type: 'pull', text: 'I proposed we test both before anyone opened Figma.' }],
      visual: { layout: 'single', items: [{ label: 'Three issues from the heuristic review', spec: '', alt: 'Three issues from the heuristic review of the old site: filters open categories (catastrophe, 4 of 4), delivery information only in the footer (minor, 2 of 4), and no average rating on reviews (minor, 2 of 4).', finds: [
        { icon: 'layout-grid', cat: 'Consistency and standards', level: 'catastrophe', score: '4 of 4', title: 'Filters open categories', text: 'Tapping Filters opened the category list instead of filters.', src: '/images/lap-find-menu.webp', pos: '50% 0%', alt: 'Old mobile site: the category list that opens from Filters (wool, paws, scent, eyes, sets, blog, FAQ)' },
        { icon: 'help-circle', cat: 'Help and documentation', level: 'minor', score: '2 of 4', title: 'Delivery info only in the footer', text: 'Nothing about delivery or payment on the product page. Shoppers had to look for it in the footer.', src: '/images/lap-find-footer.webp', pos: '50% 0%', alt: 'Old site footer, Customers: payment and delivery, contacts, user agreement, FAQ' },
        { icon: 'eye', cat: 'System status visibility', level: 'minor', score: '2 of 4', title: 'No average rating', text: 'Reviews had stars, but the product never showed an overall rating.', src: '/images/lap-find-review.webp', pos: '50% 0%', alt: 'Old product page: a single five-star review' },
      ] }] } },

    { id: 'team', nav: 'Collaboration', title: ['Four weeks to test them'],
      lede: 'With four weeks and a team that had never worked together, each week had one job: listen, make sense, shape, prove.',
      blocks: [{ type: 'glance', items: [
        { icon: 'user', label: 'I ran the work', text: 'Set the rhythm, split the tasks, led every call, presented the results.' },
        { icon: 'users', label: 'Three designers', text: 'Each owned their tasks, including the competitor analysis.' },
        { icon: 'calendar', label: 'Two or three calls a week', text: 'Tasks in Notion, findings in FigJam.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Four weeks, four stages', spec: '', alt: 'Four weeks, four stages. Week 1, Listen: heuristic evaluation, competitive analysis, user interviews. Week 2, Make sense: survey, brainstorm, hypothesis framing. Week 3, Shape: information architecture, user flow. Week 4, Prove: prototype and usability testing.', plan: [
        { week: 'Week 1', name: 'Listen', line: 'Hear the site, the market and the owners.', tags: ['Heuristic evaluation', 'Competitive analysis', 'User interviews'], color: '#c9a4ea' },
        { week: 'Week 2', name: 'Make sense', line: 'Turn what we heard into bets we could test.', tags: ['Survey', 'Brainstorm', 'Hypothesis framing'], color: '#a86fdc' },
        { week: 'Week 3', name: 'Shape', line: 'Give every product a clear place to live.', tags: ['Information architecture', 'User flow'], color: '#8A3FD0' },
        { week: 'Week 4', name: 'Prove', line: 'Check the flow with people before launch.', tags: ['Prototype', 'Usability testing'], color: '#6a2aa8' },
      ] }] } },

    { id: 'research', nav: 'Research', title: ['Competitors had the basics, not the answers'],
      lede: 'We compared five competitor stores across 18 elements. Three things stood out.',
      blocks: [{ type: 'glance', items: [
        { icon: 'circle-check', label: 'Same basics', text: 'All five split cats and dogs and had search, descriptions and instructions. Nothing to win there.' },
        { icon: 'chart-bar', label: 'Proof differed', text: 'Ingredients, reviews, storage conditions and shelf life each appeared in only two or three stores.' },
        { icon: 'puzzle', label: 'The gap', text: 'No store had all four. The two closest had three, but no reviews.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Competitors', spec: '', alt: 'Comparison of five competitor stores: all had the basics, but none had ingredients, reviews, storage conditions and shelf life together.', matrix: { title: '',
        cols: [{ name: 'Provet', logo: '/images/lap-logo-provet.webp' }, { name: 'Priroda', logo: '/images/lap-logo-priroda.webp' }, { name: 'Petmarket', logo: '/images/lap-logo-petmarket.webp' }, { name: 'Masterzoo', logo: '/images/lap-logo-masterzoo.webp' }, { name: 'Groomer', logo: '/images/lap-logo-groomer.webp' }],
        groups: [
          { label: 'Everyone had', rows: [
            { label: 'Cats and dogs separately', v: [true, true, true, true, true] },
            { label: 'Search', v: [true, true, true, true, true] },
            { label: 'Product description', v: [true, true, true, true, true] },
            { label: 'Instructions', v: [true, true, true, true, true] } ] },
          { label: 'Only some had', rows: [
            { label: 'Ingredients', v: [true, true, true, false, false] },
            { label: 'Reviews', v: [false, false, true, true, true] },
            { label: 'Storage conditions', v: [true, true, false, false, false] },
            { label: 'Shelf life', v: [true, true, false, false, false] } ] } ] } }] } },

    { id: 'insight', nav: 'Insight', title: ['Shoppers had no one to ask'],
      lede: 'To see what shoppers actually needed, we ran five 45-minute interviews, surveyed 55 pet owners and sorted every answer on an affinity map.',
      blocks: [{ type: 'pull', text: 'So the page’s job was to answer the way a store consultant would.' }],
      visual: { layout: 'single', items: [{ label: 'Interviews and survey', spec: '', alt: 'Three pet owners from the interviews and the survey numbers beside them: 77% trust information from a veterinarian, 63% look at composition and ingredients, 80% read reviews always or sometimes.', voices: [
        { num: '77%', label: 'trust information from a veterinarian', quote: 'Only from acquaintances I trust and follow.', who: 'Viktoria, 23', photo: '/images/lap-p-viktoria.webp', sub: 'Chihuahua owner', tag: 'Sources' },
        { num: '63%', label: 'look at composition and ingredients', quote: 'I check the composition, but usually on a doctor’s recommendation, especially for shampoo.', who: 'Vika, 33', photo: '/images/lap-p-vika.webp', sub: 'Golden retriever owner', tag: 'Composition' },
        { num: '80%', label: 'read reviews, always or sometimes', quote: 'I like reading reviews. But reviews get faked, so you can’t really believe them, 50/50.', who: 'Valeria, 23', photo: '/images/lap-p-valeria.webp', sub: 'Toy poodle owner', tag: 'Reviews' },
      ] }] } },

    { id: 'strategy', nav: 'Strategy', title: ['So the page had to answer at every step'],
      lede: 'I led the session that turned our findings into priorities, one for each step of the purchase: find the product, trust it enough to pay, come back.',
      blocks: [
        { type: 'pull', text: 'If a hypothesis didn’t help someone find, trust or come back, it didn’t make the list.' },
        { type: 'note', text: 'That’s why the blog got no push of its own. 45% of owners ignore store blogs, so its articles moved next to the products they relate to.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Purchase path', spec: '', src: '/images/lap-structure.webp', zoom: true, pad: true, alt: 'The new purchase path in four steps. Find: product-type menu, filters and sorting, product page. Decide: composition, stock and delivery, reviews. Buy: buy or subscribe, enter details, save details. Come back: order status, leave a review, offers by email. New elements are highlighted.' }] } },

    { id: 'categories', nav: 'Findability', title: ['First, help them find it'],
      lede: 'We came up with three structures, compared them with competitors’ menus and agreed as a team. I made the final call.',
      blocks: [
        { type: 'list', numbered: true, split: true, items: [
          { label: 'Chosen', title: 'By product type', body: 'A direct route to what shoppers came for.' },
          { title: 'By place of use', body: 'Fur and skin took 8 of the 15 products.' },
          { title: 'Like a competitor', body: 'Two broad groups, too wide to narrow down.' },
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'Menu before and after', spec: '', trio: [
        { src: '/images/lap-menu-before.webp', label: 'Before', icon: 'history' },
        { src: '/images/lap-menu-after.webp', label: 'After', icon: 'sparkles' },
      ], alt: 'The mobile menu before and after. Before: wool, paws, scent, eyes and sets. After: bestsellers, shampoos and conditioners, balms and soaps, tonics and foams, perfumes and tooth gel.' }] } },

    { id: 'trust', nav: 'Trust', title: ['Then, answer before they pay'],
      lede: 'Owners trusted a vet or a store clerk. A website had to earn the same trust, with no one to ask.',
      blocks: [{ type: 'note', text: 'I put the answers where the doubt appears: a vet’s mark on the list, stock and delivery on the card, other owners’ photos and videos in the reviews.' }],
      visual: { layout: 'single', items: [{ label: 'Product list, card and reviews', spec: '', trio: [
        { src: '/images/lap-trust-list.webp', label: 'Choose', icon: 'layout-grid' },
        { src: '/images/lap-trust-card.webp', label: 'Check', icon: 'circle-check' },
        { src: '/images/lap-trust-reviews.webp', label: 'Hear from others', icon: 'message' },
      ], alt: 'Three mobile screens. Choose: the product list with Bestseller and Vet recommended tags. Check: the product card with rating, stock status and expandable sections including delivery and payment. Hear from others: a customer review with photo and video, and related articles.' }] } },

    { id: 'account', nav: 'Registration', title: ['Without forcing an account'],
      lede: 'The owner worried that mandatory registration would add friction and put off first-time buyers. So I went back to our survey, which had asked shoppers about this.',
      blocks: [
        { type: 'pull', text: 'I kept guest checkout as the default and proposed login as an option.' },
        { type: 'note', text: 'The owner made the final call, and the button was removed. I brought the evidence, laid out the trade-off and designed the proposal.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Survey and checkout concept', spec: '', trio: [
        { facts: { caption: 'What shoppers said', items: [
          { value: '40%', label: 'prefer one for quick purchases' },
          { value: '30%', label: 'want one for offers and discounts' },
          { value: '30%', label: 'don’t mind if they can still buy' },
        ] } },
        { src: '/images/lap-checkout-concept.webp' },
      ], alt: 'Proposed checkout on mobile: contact details form with a note that logging in pre-fills your info and gives faster checkout and order tracking, and a Log in button. Guests can still check out without an account. Beside it, the survey: 40% prefer an account for quick purchases, 30% want one for offers and discounts, 30% don’t mind if they can still buy.' }] } },

    { id: 'validation', nav: 'Validation', title: ['Five people tried it first'],
      lede: 'We tested the wireframes with five people before any visual design, while changes were still cheap.',
      blocks: [{ type: 'list', numbered: true, split: true, items: [
        { title: 'The header felt too heavy', body: '“The header font and icons are a bit large.” We made both lighter.' },
        { title: 'Products, blog and FAQ blurred together', body: '“Better to have separate sections for products, the blog and FAQ.” We split the menu into groups.' },
        { title: 'The card said nothing about other buyers', body: '“No information about reviews, the average rating or how many there are.” We added both to the card.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Wireframes we tested', spec: '', flat: true, trio: [
        { src: '/images/lap-wf-menu.webp' },
        { src: '/images/lap-wf-results.webp' },
        { src: '/images/lap-wf-product.webp' },
      ], alt: 'The three wireframes we tested, in grey. Menu: search, a short list of product groups, customer care and social links. Search results: a category header, product count and sort, and two product cards with Vet recommended and New tags and a five-star row without a number. Product page: image gallery, five stars, stock status, price, Buy button and a collapsed Description section.' }] } },

    { id: 'outcome', nav: 'Outcome', title: ['Fewer exits, more orders'],
      lede: 'These are the client’s before-and-after figures from Google Analytics 4. Fewer people left product pages, and more of those who stayed went on to order.',
      visual: { layout: 'single', items: [{ label: 'Client-reported GA4 results', spec: '', alt: 'Client-reported results from Google Analytics 4. Product page exit rate 60% to 48%. Add-to-cart rate 6% to 7.2%. Checkout completion 48% to 54%. Purchase conversion 1.5% to 1.8%.', metrics: [
        { title: 'Browsing', items: [
          { value: '60% → 48%', label: 'Product page exits', note: 'exits divided by product page views', pair: { before: 60, after: 48, max: 100, unit: '%' } },
          { value: '6% → 7.2%', label: 'Add to cart', note: 'additions per product view', pair: { before: 6, after: 7.2, max: 10, unit: '%' } },
        ] },
        { title: 'Buying', items: [
          { value: '48% → 54%', label: 'Checkout completion', note: 'purchases per checkout started', pair: { before: 48, after: 54, max: 100, unit: '%' } },
          { value: '1.5% → 1.8%', label: 'Purchase conversion', note: 'sessions with a purchase', pair: { before: 1.5, after: 1.8, max: 3, unit: '%' } },
        ] },
      ] }] } },

    { id: 'reflection', nav: 'Reflection', title: ['What the numbers', 'couldn’t tell me'],
      lede: 'The metrics moved the right way. They didn’t show which decision moved them.',
      blocks: [{ type: 'list', numbered: true, split: true, items: [
        { title: 'Results', body: 'I’d tie each decision to a behavior I can measure, so I know which change made the difference.' },
        { title: 'Trust', body: 'It is built across the journey, not on one screen. I’d map what shoppers need to believe at each step.' },
        { title: 'After purchase', body: 'The first purchase was the priority. Next: what brings customers back.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Beyond the buying path', spec: '', flat: true, trio: [
        { src: '/images/lap-about.webp' },
        { src: '/images/lap-blog.webp' },
        { src: '/images/lap-footer.webp' },
      ], alt: 'Three mobile screens of the store outside the buying path. About us: a brand intro and a note on the contract manufacturer and its certifications. Blog: a category filter and an article about paw care in winter. Footer: a ten percent off first order newsletter signup, store links and social icons.' }] } },
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
    { id: 'overview', nav: 'Overview', title: ['Three credit reports,', 'one clear order'],
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
        { type: 'note', text: 'So the friendlier one has mockups with hands and plain-language explanations, without the fancy visuals of a SaaS. The client chose it: it was simpler, more accessible and easier to understand, and the client agreed with our view that it should feel friendly.' },
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
  { slug: 'pinkwallet', side: 'front', name: 'PinkWallet', tags: ['Fintech', 'End-to-end', 'AI'], headline: 'Crypto for first-timers, through conversation', sub: '80% finished onboarding · Launched July 2026', color: '#ff8fc8', image: '/images/pinkwallet-hero.webp', phones: ['/images/pw-phone-wallet.webp', '/images/pw-phone-pig.webp', '/images/pw-phone-dashboard.webp'], big: true, facts, highlights, summary, ...pinkwallet },
  { slug: 'green-credit-score', side: 'front', name: 'Green Credit Score', tags: ['Fintech', 'Web + mobile', '0-to-1'], headline: 'Three credit reports, one clear order', color: '#3ccf7a', image: '/images/gcs-overview.webp', phones: ['/images/gcs-monitor.webp', '/images/gcs-phone.webp'], desk: true, mark: 'Green Score', facts, highlights, summary, ...greenCredit },
  { slug: 'jam', side: 'front', name: 'Jam Social', tags: ['Consumer', 'Networking', 'Mobile app'], headline: 'Reopen rate up 2.5× after the first scan', color: '#6b8cff', image: '/images/jam-home.webp', phones: ['/images/jam-phone-lock.webp', '/images/jam-phone-analytics.webp'], facts, highlights, summary, ...jam },
  { slug: 'lapunzel', side: 'front', name: 'Lapunzel', tags: ['E-commerce', 'Conversion', 'UX research'], headline: 'Product-page exits down 20%', color: '#8A3FD0', image: '/images/lap-hero.webp', phones: ['/images/lap-phone-home.webp', '/images/lap-phone-product.webp'], facts, highlights, summary, ...lapunzel },
  { slug: 'world-of-colors', side: 'back', name: 'World of Colors', tags: ['Brand', 'Website'], headline: '[Headline: what was hard and what we achieved]', color: '#ff5a36', facts: facts.slice(0, 3), highlights, summary },
  { slug: 'sequoia', side: 'back', light: true, name: 'Sequoia', tags: ['Home services', 'Brand book and print', 'Website design'], headline: 'Rebranding a plumbing company', color: '#2f7d63', image: '/images/seq-van-hero.webp', big: true, facts: facts.slice(0, 3), highlights, summary,
    accent: '#2f7a55', fill: '#2f7a55', tint: '#2f7a55', panel: '#2f7a55',
    show: {
      closing: { title: 'Every touchpoint from <em>one brand book</em>', lede: 'I’d bring the same order to your brand, from the van to the website.' },
      oneLiner: 'Brand book, print, merch and website for a plumbing company',
      meta: [{ label: 'Client', value: 'Sequoia Plumbing' }, { label: 'Year', value: '2026' }, { label: 'Discipline', value: 'Brand, web' }, { label: 'Agency', value: 'Danart' }],
      about: { text: 'Sequoia’s plumbing side was growing and going independent, and its brand had to follow. The agency team designed the identity. I built the brand book and mockups, designed the stickers and apparel, helped with the van wrap and business cards, and led the website layouts.', credits: [{ label: 'Role', value: 'Brand & Web Designer' }, { label: 'Timeline', value: 'July 2026' }, { label: 'Responsibilities', value: 'Brand book, mockups, print, website' }] },
      next: { slug: 'ben-ai', name: 'Ben AI' },
      screens: [
        { id: 'intro', ch: 'Story', nav: 'Story', kind: 'full', tone: '#1F5A40', title: 'Rebranding a plumbing company as it goes independent', lede: 'Sequoia Plumbing was breaking away from its parent company and needed an identity of its own: brand, print, crew wear and website.', src: '/images/seq-van-hero.webp', alt: 'Sequoia van wrap: green and white livery with services list, logo, phone number and website' },
        { id: 'book', ch: 'Identity', nav: 'Identity', kind: 'slide', tone: '#24413A', src: '/images/seq-brand.webp', alt: 'Brand book slide: the Sequoia logo on a business card mockup, the logo mark and tree it combines, the full logo and four brand colours', title: 'A mark rooted in the place the company works', lede: 'Logo, colours and type went into one short book, so everything after stays consistent.' },
        { id: 'system', ch: 'Identity', nav: 'Identity', kind: 'intro', fill: true, tone: '#121A1A', twin: ['/images/seq-system-left.webp', '/images/seq-system-right.webp'], title: 'Built to be reused, not redrawn', lede: 'Every page and printed piece is assembled from the same type, colour and icon set, which is how seven pages came together in two days.', alt: 'Sequoia design system: Lexend in four sizes on green, orange, amber and white bands with hex codes, and 16 white service icons on a dark grid' },
        { id: 'stickers', ch: 'Print', nav: 'Print', kind: 'v2a', tone: '#A9542A', title: 'A plumber is judged before anyone opens the door', lede: 'Nobody browses for a plumber with water on the floor. Most plumbing stickers look alike; this one carries the number large enough to read across the kitchen and is recognisably Sequoia.', cells: [{ src: '/images/seq-sticker-emergency.webp', alt: 'Emergency sticker on a water heater: phone number, QR code and website' }, { src: '/images/seq-sticker-service.webp', alt: 'Water heater service record sticker with a table for dates and technicians' }] },
        { id: 'cards', ch: 'Print', nav: 'Print', kind: 'full', tone: '#1F3A30', title: 'A card for every taste', lede: 'We designed several options and offered the client the strongest two, dark and light, because people like different things.', src: '/images/seq-cards.webp', alt: 'Stacks of Sequoia business cards in black, green and white, with the logo, contacts and a QR code' },
        { id: 'caps', ch: 'Merch', nav: 'Merch', kind: 'v3h', tone: '#6B4A1F', title: 'Tested on real caps', lede: 'A logo that works on screen can vanish on a curved brim, so the client picked colours and sizes on mockups of the real item, before anything went to print.', cells: [{ src: '/images/seq-caps-green.webp', alt: 'Dark green Sequoia cap, front with the mark and back with a flag patch' }, { src: '/images/seq-caps-white.webp', alt: 'White Sequoia cap with the full logo, front and back' }, { src: '/images/seq-cap-worn.webp', pos: '50% 38%', alt: 'White Sequoia cap worn, seen from behind' }] },
        { id: 'crew', ch: 'Merch', nav: 'Merch', kind: 'full', tone: '#1F3A30', title: 'The crew wears it first', lede: 'Polos, caps and the van put the brand on the people customers actually meet.', src: '/images/seq-crew.webp', alt: 'Three Sequoia plumbers in white polos outside a house, a work van behind them' },
        { id: 'polos', ch: 'Merch', nav: 'Merch', kind: 'v3l', tone: '#1F3A30', title: 'A stranger at the door should feel expected', lede: 'A customer lets in someone they have never met. A clean polo with the company mark is the first proof it is who they called.', cells: [{ src: '/images/seq-polo-back-team.webp', pos: '50% 30%', alt: 'Green Sequoia polo seen from the back, crew walking past' }, { src: '/images/seq-polo-chest.webp', pos: '50% 45%', alt: 'Close-up of the Sequoia mark embroidered on a green polo' }, { src: '/images/seq-crew-work.webp', pos: '50% 40%', alt: 'Two Sequoia plumbers in white polos fixing a water heater' }] },
        { id: 'website', ch: 'Website', nav: 'Website', kind: 'intro', tone: '#1F5A40', title: 'Seven pages in two days', lede: 'The site had stalled at one page in a week. I wrote the brief and laid out all seven, then reviewed another designer’s build.', link: { label: 'Visit website', href: 'https://www.sequoiaplumbingandair.com/' }, twin: ['/images/seq-home-1.webp', '/images/seq-home-2.webp'], alt: 'The Sequoia Plumbing website: the home page with the branded van and offers, and below it the services section' },
        { id: 'service', ch: 'Website', nav: 'Website', kind: 'intro', tone: '#5A3220', pages: true, cut: 31.66, twin: ['/images/seq-service.webp', '/images/seq-service.webp'], alt: 'A Sequoia Plumbing service page: the top on the left, and from the How it works section on the right' },
        { id: 'blog', ch: 'Website', nav: 'Website', kind: 'intro', tone: '#3E2E22', pages: true, twin: ['/images/seq-blog.webp', '/images/seq-article.webp'], alt: 'The Sequoia Plumbing blog page on the left and an article page on the right' },
        { id: 'contact', ch: 'Website', nav: 'Website', kind: 'intro', tone: '#2A2E2D', pages: true, twin: ['/images/seq-area.webp', '/images/seq-contact.webp'], alt: 'The Sequoia Plumbing service area page on the left and the contact page on the right' },
        { id: 'outcome', ch: 'Next', nav: 'Next', kind: 'outro', tone: '#2A2E2D', },
      ],
    },
    screens: [
    { id: 'overview', nav: 'Overview', title: ['Looking like the company', 'it had become'],
      lede: 'Site and visuals hadn’t kept up as the plumbing side went independent. Our team designed the identity; I carried it onto print, merch and the website.',
      links: [{ label: 'Visit website', href: 'https://www.sequoiaplumbingandair.com/' }],
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Brand & Web Designer' },
        { label: 'Collaboration', value: '3 designers, Danart' },
        { label: 'Timeline', value: 'July 2026' },
        { label: 'Responsibilities', value: 'Brand book, mockups, print, website' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Website', twin: [{ src: '/images/seq-home-1.webp' }, { src: '/images/seq-home-2.webp' }], alt: 'The Sequoia Plumbing website: the home page with the branded van and offers, and below it the services section' }] } },
    { id: 'challenge', nav: 'Challenge', title: ['An established business,', 'a dated look'],
      lede: 'Sequoia had years of work behind it, but its site and visuals hadn’t kept up as the plumbing side went independent.',
      blocks: [{ type: 'table', head: ['Piece', 'Who'], rows: [
        ['Logo', 'Agency team'], ['Brand book, mockups', 'Me'], ['Stickers, apparel', 'Me'],
        ['Van wrap, business cards', 'With the team'], ['Website brief and layouts', 'Me'],
      ] }],
      visual: { layout: 'single', items: [{ label: 'Old site', spec: 'Old site, one screenshot, 4:5' }] } },
    { id: 'book', nav: 'Brand book', title: ['One identity,', 'a short set of rules'],
      lede: 'Logo use, color pairs and type, so every piece after it followed the same rules.',
      visual: { layout: 'single', items: [{ label: 'Brand book', src: '/images/seq-brand.webp', slide: true, pn: '#24413A', alt: 'Brand book slide: the Sequoia logo on a business card mockup, the logo mark and tree it combines, the full logo and four brand colours' }] } },
    { id: 'mockups', nav: 'Mockups', title: ['See it', 'before it’s printed'],
      lede: 'I generated mockups with AI on real products, so the client chose in context, before production.',
      visual: { layout: 'single', items: [{ label: 'Mockups', spec: '2–3 variants of one item side by side' }] } },
    { id: 'stickers', nav: 'Service stickers', title: ['Built for the moment', 'something breaks'],
      lede: 'The phone number reads first, the brand second. Below it, a service record the technician fills in on site.',
      visual: { layout: 'single', items: [{ label: 'Stickers', spec: 'Emergency sticker and service record on a boiler' }] } },
    { id: 'apparel', nav: 'Apparel', title: ['The brand', 'at every service visit'],
      lede: 'Caps and T-shirts for the crew, often the first part of the brand a customer meets in person.',
      visual: { layout: 'single', items: [{ label: 'Apparel', spec: 'Crew in T-shirts, cap close-up' }] } },
    { id: 'van', nav: 'Van and print', title: ['The system,', 'at vehicle size'],
      lede: 'With the team, I adapted the identity to the van wrap and business cards.',
      visual: { layout: 'single', items: [{ label: 'Van and cards', spec: 'Wrapped van and business cards' }] } },
    { id: 'site', nav: 'Website', title: ['The site had stalled.', 'I took over.'],
      lede: 'One of seven pages was done after a week. I wrote the brief and laid out all seven in two days.',
      visual: { layout: 'single', items: [{ label: 'Website', spec: '2–3 pages: offers, services, form' }] } },
    { id: 'review', nav: 'Design review', title: ['Delegated,', 'not disconnected'],
      lede: 'Another designer finished the build. I reviewed it and gave references and feedback.',
      visual: { layout: 'single', items: [{ label: 'Review', spec: 'Figma comments on the other designer’s layout' }] } },
    ] },
  { slug: 'ben-ai', side: 'back', name: 'Ben AI', tags: ['AI SaaS', 'Brand', 'Website'], headline: 'A brand that makes AI feel safe', color: '#EF5A5A', image: '/images/ben-monitors.webp', facts: facts.slice(0, 3), highlights, summary,
    accent: '#EF5A5A', fill: '#EF5A5A',
    show: {
      oneLiner: 'Brand, website and print for an AI that answers leads',
      meta: [{ label: 'Client', value: 'Ben AI' }, { label: 'Year', value: '2025–2026' }, { label: 'Discipline', value: 'Brand, web, print' }, { label: 'Agency', value: 'Danart' }],
      about: { text: 'Ben AI replies to leads from Yelp, Thumbtack and website chat for home-service businesses. As Lead Designer at Danart, I created its brand and website for the July 2025 launch and led the second phase in January 2026.', credits: [{ label: 'Role', value: 'Lead Designer' }, { label: 'Timeline', value: 'July 2025 – January 2026' }, { label: 'Responsibilities', value: 'Brand, website, motion, print' }] },
      closing: { title: 'Trust first, <em>then the technology</em>', lede: 'I’d design your brand and your website the same way.' },
      screens: [
        { id: 'intro', ch: 'Story', nav: 'Story', kind: 'v2a', tone: '#0c0b10', title: 'Making AI feel human', links: [{ label: 'Behance case study', href: 'https://www.behance.net/gallery/246929869/AI-AUTORESPONDER-WEB-AND-BRAND-DESIGN' }, { label: 'Live website', href: 'https://ben24.ai' }], lede: 'Its buyers run plumbing and HVAC companies and judge a tool by booked jobs. The brand had to win their trust before any word about the technology.', cells: [
          { src: '/images/ben-monitors.webp', pos: '50% 50%', alt: 'Ben AI website on three monitors: Respond To Every Lead, Turn Visitors Into Bookings and Smarter Yelp Ads' }] },
        { id: 'logos', ch: 'Logo', nav: 'Logo', kind: 'v4g', tone: '#242322', title: 'Four ways to give AI a face', lede: 'Each direction weighed how technical the product should look against how much personality it could carry.', cells: [
          { src: '/images/ben-concept-1.webp', bg: '#ffffff', alt: 'Ben AI logo direction: a robot head with ears and a speech-bubble face, on white' },
          { src: '/images/ben-concept-2.webp', bg: '#242322', alt: 'Ben AI logo direction: a gradient speech bubble with two eyes, on dark' },
          { src: '/images/ben-concept-3.webp', bg: '#242322', alt: 'Ben AI logo direction: a round mascot with a speech-bubble mouth, on dark' },
          { src: '/images/ben-concept-4.webp', bg: '#ffffff', alt: 'Ben AI logo direction: a blue robot head with an antenna, on white' }] },
        { id: 'mark', ch: 'Logo', nav: 'Logo', kind: 'full', tone: '#ffffff', title: 'The bubble with eyes', lede: 'The client chose it because it shows what Ben does: it talks to customers. Cool tones carry the technology, warm ones the personality.', src: '/images/ben-colors.webp', alt: 'The final Ben AI logo, a gradient speech bubble with two eyes, on a construction grid, with six brand colours and their hex codes' },
        { id: 'web-a', ch: 'Website', nav: 'Website', kind: 'intro', title: 'Start where the leads come from', lede: 'Owners skim for their own platform first, so the page meets them there and explains the AI later.', tone: '#92303C', cols: true, twin: ['/images/ben-site-p1.webp', '/images/ben-site-p2.webp'], alt: 'The Ben AI website, first part: Yelp leads and Yelp Ads management on the left, Thumbtack and the website assistant on the right' },
        { id: 'web-b', ch: 'Website', nav: 'Website', kind: 'intro', title: 'Proof before the price', lede: 'A skeptical owner needs to see Ben in a real conversation and hear from peers before a number means anything.', tone: '#46478A', cols: true, twin: ['/images/ben-site-p3.webp', '/images/ben-site-p4.webp'], alt: 'The Ben AI website, middle part: visitors to customers and industry recognition on the left, why Ben and clients on the right' },
        { id: 'web-c', ch: 'Website', nav: 'Website', kind: 'intro', title: 'Short enough to decide', lede: 'In January 2026 we redesigned about half of the site. The ending keeps one choice, so a busy owner doesn’t have to compare.', tone: '#0B4F82', cols: true, swap: true, twin: ['/images/ben-site-p5.webp', '/images/ben-site-p6.webp'], alt: 'The Ben AI website, last part: pricing and the closing call to action on the left, results, FAQ and the footer on the right' },
        { id: 'print', ch: 'Print', nav: 'Print', kind: 'v3l', tone: '#1C1630', title: 'Off-screen for the first time', lede: 'For AHR Expo in Las Vegas. Each piece carries the same line, sized to be read in the hand, across a table or across a hall.', cells: [
          { src: '/images/ben-print-brochure.webp', pos: '50% 50%', alt: 'Ben AI three-panel brochure: Never miss a Yelp lead, Yelp leads are expensive, Why Ben AI' },
          { src: '/images/ben-print-cards.webp', pos: '50% 52%', alt: 'Ben AI business cards with the speech-bubble logo' },
          { src: '/images/ben-banner.webp', pos: '50% 55%', alt: 'Ben AI event banner on a fence: Never miss a Yelp lead' }] },
        { id: 'outcome', ch: 'Next', nav: 'Next', kind: 'outro', tone: '#1C1630' },
      ],
    },
    screens: [
    { id: 'overview', nav: 'Overview', wide: true, title: ['Ben AI'],
      lede: 'A complete website redesign for an AI tool that outgrew its first version, and went on to win a Yelp industry award.',
      link: { label: 'Behance case study', href: 'https://www.behance.net/gallery/246929869/AI-AUTORESPONDER-WEB-AND-BRAND-DESIGN' },
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
  { slug: 'reboot-hub', side: 'back', name: 'Re:Boot Hub', tags: ['Consulting', 'Brandbook'], headline: 'A brand built on speed and truth', color: '#e8ff3a', highlights,
    summary: 'A brand identity and brandbook for a consulting hub: logo concepts first, then the full system once the client chose a direction.',
    facts: [{ label: 'Role', value: 'Brand Designer' }, { label: 'Deliverables', value: 'Logo concepts, brandbook' }, { label: 'Type', value: 'Gotham, Open Sans' }],
    show: {
      oneLiner: 'Brand identity and brandbook for a consulting hub',
      meta: [{ label: 'Client', value: 'Re:Boot Hub' }, { label: 'Discipline', value: 'Brand' }],
      about: { text: 'A brand identity and brandbook for a consulting hub: logo concepts first, then the full system once the client chose a direction. The full case is being written up.', credits: [{ label: 'Role', value: 'Brand Designer' }, { label: 'Responsibilities', value: 'Logo concepts, brandbook' }] },
      closing: { title: 'This case is <em>in progress</em>', lede: 'More work is on the way. Until then, say hello.' },
      screens: [
        { id: 'soon', ch: 'Soon', nav: 'Soon', kind: 'soon', tone: '#2A2D12', title: 'Case in progress', lede: 'The brandbook is being written up. Check back soon.' },
        { id: 'outcome', ch: 'Next', nav: 'Next', kind: 'outro', tone: '#2A2D12' },
      ],
    } },
  { slug: 'fantabase', side: 'back', name: 'Fantabase', tags: ['Brand'], headline: 'Case coming soon', color: '#ff7a3d', highlights,
    summary: 'A brand project, the case is being written up.',
    facts: [],
    show: {
      oneLiner: 'Case in progress',
      meta: [{ label: 'Client', value: 'Fantabase' }],
      about: { text: 'This case is being written up. More soon.', credits: [] },
      closing: { title: 'This case is <em>in progress</em>', lede: 'More work is on the way. Until then, say hello.' },
      screens: [
        { id: 'soon', ch: 'Soon', nav: 'Soon', kind: 'soon', tone: '#3A2314', title: 'Case in progress', lede: 'This project is being written up. Check back soon.' },
        { id: 'outcome', ch: 'Next', nav: 'Next', kind: 'outro', tone: '#3A2314' },
      ],
    } },
  { slug: 'bobyard', side: 'back', name: 'Bobyard', tags: ['Construction AI', 'Illustration'], headline: 'Illustration and visuals for a construction-AI startup', color: '#e8541e', facts: facts.slice(0, 3), highlights, summary },
];

// cases whose pages exist but are not on the home sheet yet
for (const c of cases) { tidyDeep(c.screens); c.headline = tidyDeep(c.headline, "headline"); }

const parked = new Set(['world-of-colors', 'bobyard']);
export const bySide = (side: Side) => cases.filter((c) => c.side === side && !parked.has(c.slug));
