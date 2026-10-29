import { tidyDeep } from './typo';
export type Side = 'front' | 'back';

/* ---------- Product case: one screen = one question ---------- */
export type Visual =
  | { layout: 'single'; items: Ph[] }          // one big image
  | { layout: 'stack'; items: Ph[] }           // two small on top, one wide below
  | { layout: 'row'; items: Ph[] };            // three phones in a row
export interface Ph { label: string; spec: string; src?: string; srcs?: string[]; combo?: string[]; audit?: { name: string; logo: string; phone: string; cards: { tag: 'Sending' | 'Swap' | 'Security'; text: string }[] }[]; reviews?: { tag: string; text: string; source: 'appstore' | 'reddit' | 'github'; meta: string; from?: string }[]; stats?: { lead: string; items: { value: string; text: string }[] }; scope?: { name: string; why: string; d: 'keep' | 'limit' | 'cut' }[]; compare?: { cols: string[]; rows: { label: string; a: boolean; b: boolean }[] }; zoom?: boolean; trio?: { src: string; label: string; icon: string }[]; alt?: string }   // srcs = transparent device renders composed on the tint

export type Block =
  | { type: 'meta'; items: { label: string; value: string }[] }
  | { type: 'bento'; cells: { title: string; body?: string; icon?: string; wide?: boolean; fill?: boolean }[] }
  | { type: 'contrast'; from: { label: string; items: string[] }; to: { label: string; items: string[]; icons?: string[] } }
  | { type: 'table'; head: [string, string]; rows: [string, string][] }
  | { type: 'decision'; rows: [string, string][] }
  | { type: 'cards'; items: { label?: string; title: string; body?: string; icon?: string; hi?: boolean }[] }
  | { type: 'list'; numbered?: boolean; items: { label?: string; title: string; body?: string; icon?: string }[] }
  | { type: 'callout'; text: string }
  | { type: 'chain'; steps: string[] }
  | { type: 'chips'; items: string[] }
  | { type: 'facts'; caption: string; items: { value: string; label: string }[] }
  | { type: 'note'; text: string }
  | { type: 'pull'; text: string }
  | { type: 'quote'; text: string; by: string; me?: boolean }
  | { type: 'numbered'; plain?: boolean; items: { title: string; body: string }[] }
  | { type: 'fromto'; from: string; to: string }
  | { type: 'steps'; items: { title: string; body: string }[] }
  | { type: 'theme' }
  | { type: 'contact' };

export interface Screen {
  id: string;
  nav: string;                     // label in the left track
  title: [string, string?];        // second part is set in the case colour
  lede?: string;
  statement?: boolean;             // one huge line, no image
  wide?: boolean;                  // text only, spans the frame
  group?: string;                  // rail category for brand cases (set on the first shot of each group)
  link?: { label: string; href: string };   // outward button under the lede
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
  noNameTag: true,
  accent: '#E0408F',
  fill: '#E0408F',
  tint: '#FFE6F1',
  panel: '#F6F6F4',
  facts: [
    { label: 'Role', value: 'Product Designer, two-person design team' },
    { label: 'Scope', value: 'Architecture, UX/UI, design system' },
    { label: 'Timeline', value: 'Dec 2025 – Jan 2026, 8 weeks' },
    { label: 'Status', value: 'App Store, July 2026' },
  ],
  summary: 'A crypto wallet for people new to crypto, with PIG, an AI co-pilot that prepares actions and leaves the decision to the user.',
  screens: [
    { id: 'overview', nav: 'Overview', title: ['Crypto for first-timers,', 'through conversation'],
      lede: 'Most crypto wallets assume you already know what you’re doing. PinkWallet doesn’t.\nIt’s a self-custody wallet that works like a banking app and says plainly that a sent transaction can’t be undone.\nPIG, an AI assistant, explains each action and sets it up. You press confirm.',
      blocks: [{ type: 'meta', items: [
        { label: 'Collaboration', value: 'Design Manager\nClient development team' },
        { label: 'Timeline', value: '8 weeks\nLaunched July 2026' },
        { label: 'Responsibilities', value: 'Product architecture\nUX/UI, design system' },
        { label: 'Position', value: 'Product Designer' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'The Wallet home in both themes', spec: '', srcs: ['/images/pw-home-dark.webp', '/images/pw-home-light.webp'], alt: 'The PinkWallet home screen in the dark and the light theme' }] } },

    { id: 'background', nav: 'Brief', title: ['The brief changed before','we started designing.'],
      lede: 'The first project was a crypto token for experienced users. Then the client came back with funding and a new idea: a wallet.',
      blocks: [
        { type: 'numbered', items: [
          { title: 'A new audience', body: 'People with little or no crypto experience.' },
          { title: 'The feature list', body: 'What belongs in version one, and what can wait.' },
          { title: 'The AI request', body: 'A useful role for AI that never controls users’ money.' },
        ] },
        { type: 'note', text: 'My first job was to turn that wish list into a point of view.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Where we started', spec: '', combo: ['/images/pw-pinkcoin-site.webp', '/images/pw-wallet-phone.webp'], alt: 'The PinkCoin token website from the first project, and the first concept of the wallet screen' }] } },

    { id: 'stakes', nav: 'Context', title: ['Crypto without a bank', 'in the middle.'],
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

    { id: 'research', nav: 'Research', title: ['The challenge wasn’t','to simplify everything.'],
      lede: 'People new to crypto need familiar ways to manage money, but they also need to know when an action can’t easily be undone. With no budget for interviews or usability testing, I used market data, wallet reviews and competitor analysis to find where first-timers get stuck.',
      blocks: [
        { type: 'numbered', plain: true, items: [
          { title: 'Make core actions easy to find', body: 'Essential actions stay on Home, no trading terminal.' },
          { title: 'Make recipients and costs clear', body: 'Saved contacts, swap fees in % and $ before confirming.' },
          { title: 'Use warnings where they matter', body: 'Extra checks only before irreversible sends and recovery.' },
        ] },
      ],
      visual: { layout: 'stack', items: [
        { label: 'Market context', spec: '', alt: 'Why do some U.S. non‑owners stay away from crypto? 49% don’t understand how crypto works, 43% worry about fraud (NCA × Harris Poll, 2025)', stats: { lead: 'Why do some U.S. non‑owners stay away from crypto?', items: [
          { value: '49', text: 'Don’t understand\nhow crypto works' },
          { value: '43', text: 'Worry\nabout fraud' },
        ] } },
        { label: 'What people say', spec: '', alt: 'Three public posts about wallet friction: network fees, a security warning and an address typo', reviews: [
          { tag: 'Fees', from: 'Trust · App Store', source: 'appstore', text: '“The app keeps saying the network fee is not enough no matter how much I adjust the amount.”', meta: 'Trust Wallet · App Store · Apr 2024' },
          { tag: 'Warnings', from: 'Phantom · GitHub', source: 'github', text: '“No balance change found. This transaction maybe malicious.”', meta: 'Phantom · GitHub · Nov 2023' },
          { tag: 'Addresses', source: 'reddit', text: '“The last number of the address is changed.”', meta: 'r/CryptoHelp · Oct 2026' },
        ] },
        { label: 'Competitor audit', spec: '', alt: 'The Phantom and Trust Wallet home screens with the points where a beginner meets friction', audit: [
          { name: 'Phantom', logo: 'phantom', phone: '/images/pw-audit-phantom.webp', cards: [
            { tag: 'Sending', text: 'Send isn’t a top-level action' },
            { tag: 'Swap', text: 'Trading sits in a separate tab' },
            { tag: 'Security', text: 'Leverage up to 40× is promoted on the home screen' } ] },
          { name: 'Trust Wallet', logo: 'trust', phone: '/images/pw-audit-trust.webp', cards: [
            { tag: 'Sending', text: 'Send is one of four primary actions' },
            { tag: 'Swap', text: 'Swap has a dedicated shortcut' },
            { tag: 'Security', text: 'WETH appears as separate entries across two networks' } ] },
        ] },
      ] } },

    { id: 'choices', nav: 'Choices', title: ['A familiar core,','with two new additions.'],
      lede: 'A beginner shouldn’t have to learn a new interface and a new kind of money at once.\nWe kept everyday wallet actions familiar: managing assets, sending, receiving and swapping.',
      blocks: [
        { type: 'pull', text: 'Two new parts, two roles: Feed for exploring crypto, PIG for understanding and preparing actions across the wallet.' },
      ],
      visual: { layout: 'single', items: [
        { label: 'Product structure', spec: '', src: '/images/pw-structure.webp', zoom: true, alt: 'PinkWallet structure: Core wallet, PIG and Feed are three equal entry points; Core wallet and PIG lead to the same five actions.' },
      ] } },

    { id: 'pig', nav: 'PIG', title: ['A co-pilot,', 'not an autopilot.'],
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

    { id: 'feed', nav: 'Feed', title: ['Discovery,', 'without impulse.'],
      lede: 'On the first three visits, a short pop-up introduces PIG in the Feed. Users can ask what’s going on in crypto, and PIG answers with a story to open. They can also browse the Feed directly.',
      blocks: [
        { type: 'pull', text: 'A place to understand crypto, not a source of buy recommendations.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Feed with PIG', spec: '', trio: [
        { src: '/images/pw-feed-1.webp', label: 'Meet PIG', icon: 'heart' },
        { src: '/images/pw-feed-2.webp', label: 'Ask PIG', icon: 'message' },
        { src: '/images/pw-feed-3.webp', label: 'Read the story', icon: 'article' },
      ], alt: 'Three screens: a pop-up in the Feed introduces PIG, PIG answers with an article card, and the article opens in the Feed.' }] } },

    { id: 'safeguards', nav: 'Safeguards', title: ['Friction only', 'where it protects.'],
      lede: 'In a self-custody wallet, losing the recovery phrase can mean losing access to your funds. Before the wallet is created, three short warnings explain why the phrase matters. Continue stays disabled until users confirm they understand the risk.\nAfter saving the phrase, users create a PIN. If they forget it, it cannot be recovered.',
      blocks: [{ type: 'pull', text: 'Viewing the phrase again requires PIN verification.' }],
      visual: { layout: 'single', items: [{ label: 'Wallet setup', spec: '', trio: [
        { src: '/images/pw-safe-1.webp', label: 'Understand the risk', icon: 'shield' },
        { src: '/images/pw-safe-2.webp', label: 'Save the phrase', icon: 'key' },
        { src: '/images/pw-safe-3.webp', label: 'Create a PIN', icon: 'lock' },
      ], alt: 'Three wallet setup screens: three warnings with a confirmation checkbox, the 12-word recovery phrase, and PIN creation.' }] } },

    { id: 'tradeoffs', nav: 'Scope', title: ['One question', 'decided the scope.'],
      lede: 'With eight weeks, two designers and a budget for one platform, we had to be selective. We kept what beginners need, limited what could add risk, and cut the rest.',
      blocks: [{ type: 'pull', text: 'Does this reduce the chance that someone loses money or gives up?' }],
      visual: { layout: 'single', items: [{ label: 'Scope decisions', spec: '', scope: [
        { name: 'Portfolio overview', why: 'Simple allocation and performance views.', d: 'keep' },
        { name: 'Feed', why: 'Explains crypto, no buy recommendations.', d: 'keep' },
        { name: 'PIG', why: 'Prepares transactions; the user confirms.', d: 'limit' },
        { name: 'Trading analytics', why: 'Dense charts and technical indicators.', d: 'cut' },
        { name: 'Buy recommendations', why: 'Speculative purchase signals.', d: 'cut' },
      ], alt: 'Five product decisions sorted into keep, limit or cut.' }] } },

    { id: 'system', nav: 'Design system', title: ['One product,', 'two moods.'],
      blocks: [{ type: 'bento', cells: [
        { icon: 'sun-moon', title: 'Two themes on the same components', fill: true },
        { icon: 'component', title: 'Anything used twice became a component' },
        { icon: 'eye', title: 'WCAG AA', body: 'States by shape and label.' },
        { icon: 'box', title: '3D assets made with AI', body: 'Curated to one material and palette.' },
        { icon: 'pencil-line', title: 'Copy written by me, AI-assisted' },
      ] }],
      visual: { layout: 'stack', items: [
        { label: 'Coin card anatomy', spec: 'Ты рисуешь: карточка монеты с вариантами и разметкой анатомии.' },
        { label: 'Same screen, two themes', spec: 'Один и тот же экран в светлой и тёмной теме.' },
        { label: 'Asset sheet', spec: 'Лист ассетов: монеты, иконки транзакций, два PIG.' },
      ] } },

    { id: 'outcome', nav: 'Outcome', title: ['Launched,', 'and in use.'],
      blocks: [{ type: 'facts', caption: 'Product analytics provided by the client, July–September 2026', items: [
        { value: '80%', label: 'Onboarding completion' },
        { value: '85%', label: 'Wallet creation completion' },
        { value: '3 min', label: 'Median wallet setup' },
        { value: '65%', label: 'Swap conversion' },
        { value: '98%', label: 'Transaction success' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'From first screen to a wallet', spec: 'Ты рисуешь: горизонтальная воронка онбординг 80% → создание кошелька 85%, отдельно 65% и 98% крупными цифрами. Без осей и сетки.' }] } },

    { id: 'reflection', nav: 'Reflection', title: ['Built on convention,', 'never tested.'],
      lede: 'Everything here rests on convention and on lowering the cost of a mistake. That was right for eight weeks, but it is still an assumption.',
      blocks: [{ type: 'list', items: [
        { title: 'Test the confirmation step', body: 'Does it protect or annoy?' },
        { title: 'Test trust in PIG', body: 'After its first prepared transaction.' },
        { title: 'Work with developers through interaction specs', body: 'With no direct line to them, motion was less specified, and the shipped transitions show it.' },
        { title: 'Connect decisions to data', body: 'Before handoff.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Concept for the next iteration', spec: 'Ты рисуешь: экран подтверждения до и после, справа блок «You send / They receive» и фраза, что перевод окончательный. Рядом можно план теста на одну страницу.' }] } },

    { id: 'closing', nav: 'Closing', statement: true, title: ['Crypto shouldn’t require people to think like traders', 'before they can participate.'] },
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
    { id: 'overview', nav: 'Overview', title: ['Analytics was the ask.', 'A reason to come back was the need.'],
      lede: 'Jam Social is an existing networking app: scan a QR code, share your contact. The team asked whether to add analytics, and what kind would matter. I owned the research and the analytics feature.',
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Team', value: '2 designers, 2 PMs' },
        { label: 'Timeline', value: '12 weeks' },
        { label: 'Scope', value: 'Research to hi-fi' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Jam Social', spec: '', src: '/images/jam-overview.webp', alt: 'Jam Social on three phones: the weekly analytics notification, the Analytics screen and the Instagram clicks screen' }] } },

    { id: 'problem', nav: 'Problem', title: ['Networking feels like', 'talking into a void.'],
      blocks: [
        { type: 'quote', text: 'I shared my card with 20 people. Did anyone actually look at it?', by: 'Interview participant' },
        { type: 'cards', items: [
          { icon: 'eye-off', title: 'No signal after the scan' },
          { icon: 'link', title: 'LinkedIn isn’t enough' },
          { icon: 'rotate-ccw', hi: true, title: 'No reason to reopen the app' },
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'Problem', spec: '', src: '/images/jam-problem.webp', alt: 'The existing Jam Social app: sign-up, the QR code card and the Jams form' }] } },

    { id: 'research', nav: 'Research', title: ['What people said,', 'not what we assumed.'],
      blocks: [
        { type: 'cards', items: [
          { icon: 'route', label: 'Interviews', title: 'Analytics should reach beyond the app.' },
          { icon: 'lock', label: 'Interviews', title: 'Privacy is essential.', body: 'Control over who sees what came up unprompted in 7 of 10 interviews.' },
          { icon: 'repeat', hi: true, label: 'Focus group', title: 'Without a reason to return, Jam Social is a one-time tool.' },
        ] },
        { type: 'note', text: '10+ interviews, one focus group, a competitor audit and a heuristic evaluation.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Research', spec: '', src: '/images/jam-research.webp', alt: 'The interview findings board' }] } },

    { id: 'insight', nav: 'Insight', statement: true, title: ['People didn’t want numbers.', 'They wanted a reason to come back.'] },

    { id: 'alignment', nav: 'Alignment', title: ['Two PMs,', 'two definitions of analytics.'],
      lede: 'A workshop turned them into one definition and three questions.',
      blocks: [{ type: 'list', items: [
        { icon: 'zap', label: 'How might we', title: 'Make analytics actionable, not just informational?' },
        { icon: 'calendar-clock', label: 'How might we', title: 'Give people a reason to return between events?' },
        { icon: 'shield', label: 'How might we', title: 'Surface insights without compromising privacy?' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Workshop', spec: '', src: '/images/jam-workshop.webp', alt: 'Workshop board of How-might-we notes grouped by theme' }] } },

    { id: 'analytics', nav: 'Analytics', title: ['Analytics you', 'can skim.'],
      lede: 'A dashboard and a weekly digest, built for a glance between events.',
      blocks: [{ type: 'cards', items: [
        { icon: 'mouse-pointer-click', title: 'Clicks per Jam', body: 'By day' },
        { icon: 'briefcase', title: 'Top job titles', body: 'Who opens your Jams' },
        { icon: 'bell', hi: true, title: 'Weekly digest', body: 'Arrives as a notification' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Analytics', spec: '', src: '/images/jam-analytics.webp', alt: 'The new Analytics screen and the New Spreads weekly trends' }] } },

    { id: 'followups', nav: 'Follow-ups', title: ['Analytics says who.', 'Reminders say when.'],
      lede: 'Each connection gets a profile with event history, talking points and notes.',
      blocks: [{ type: 'list', items: [
        { icon: 'user-round-check', title: 'Follow-up reminders', body: 'Tied to a person and an event' },
        { icon: 'chart-no-axes-column', title: 'Engagement updates', body: 'When your clicks go up' },
        { icon: 'calendar-search', title: 'Event suggestions', body: 'Networking events worth attending' },
        { icon: 'coffee', title: 'Coffee chat refreshers', body: 'A reminder before you meet' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Follow-ups', spec: '', src: '/images/jam-follow.webp', alt: 'Jam Social: Notifications, Calendar and a connection Profile' }] } },

    { id: 'testing', nav: 'Testing', title: ['8 usability tests,', '3 changes.'],
      blocks: [{ type: 'table', head: ['What we saw', 'What changed'], rows: [
        ['Icon-only navigation confused 5 of 8 testers', 'Text labels on the bottom navigation'],
        ['Clarity was rated 2', 'Dividers and colour: rated 4.5'],
        ['Contact details came before context', 'Event context first, then the person'],
      ] }],
      visual: { layout: 'single', items: [{ label: 'Instagram analytics', spec: '', src: '/images/jam-hifi.webp', alt: 'The Instagram clicks screens: clicks per day and top demographics by industry and job title' }] } },

    { id: 'reflection', nav: 'Reflection', wide: true, title: ['The brief is rarely', 'the real problem.'],
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
  accent: '#E58A1F',
  fill: '#E58A1F',
  tint: '#FFEBD6',
  facts: [
    { label: 'Role', value: 'UX Lead' },
    { label: 'Scope', value: 'Mobile UX, research, flows' },
    { label: 'Focus', value: 'Conversion and retention' },
    { label: 'Timeline', value: '4 weeks' },
  ],
  summary: 'A mobile-first, ethical pet cosmetics brand: vegan ingredients, premium price.',
  screens: [
    { id: 'overview', nav: 'Overview', title: ['Make buying feel', 'as safe as the product is.'],
      lede: 'Lapunzel sells ethical pet cosmetics: vegan ingredients, premium price. People arrived ready to buy and left without buying.',
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'UX Lead' },
        { label: 'Timeline', value: '4 weeks' },
        { label: 'Scope', value: 'Mobile UX, research, flows' },
        { label: 'Focus', value: 'Conversion, retention' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Lapunzel', spec: '', src: '/images/lap-hero.webp', alt: 'Lapunzel mobile site: the home hero, a product page and the shampoos and conditioners list' }] } },

    { id: 'problem', nav: 'Problem', title: ['Not the price.', 'The uncertainty.'],
      blocks: [{ type: 'list', items: [
        { icon: 'search', label: 'Discovery', title: 'Which product fits my pet?' },
        { icon: 'credit-card', label: 'Checkout', title: 'A new brand at a premium price, with no proof at the moment of paying.' },
        { icon: 'tag', label: 'Price', title: 'Value wasn’t visible, so the price felt unjustified.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Problem', spec: '', src: '/images/lap-problem.webp', alt: 'Lapunzel: Bestsellers and the “Our product is true craft” page' }] } },

    { id: 'research', nav: 'Research', title: ['We asked before', 'we redesigned.'],
      blocks: [{ type: 'facts', caption: 'Research', items: [{ value: '50+', label: 'Survey responses' }, { value: '15', label: 'Interviews' }] }],
      visual: { layout: 'single', items: [{ label: 'Research', spec: '', src: '/images/lap-research.webp', alt: 'Interview quotes and survey results: accounts, reviews, sources of pet-care information, categories bought' }] } },

    { id: 'insight', nav: 'Insight', statement: true, title: ['Trust is a UX feature,', 'not a marketing claim.'],
      lede: 'People needed reassurance, not persuasion.' },

    { id: 'trust', nav: 'Trust', title: ['Proof where', 'the doubt happens.'],
      blocks: [
        { type: 'decision', rows: [
          ['Decision', 'Trust signals live inside the product and purchase flows.'],
          ['Chose', 'Proof in the flow, over an About page.'],
          ['Because', 'Reassurance only works at the right moment and place.'],
        ] },
        { type: 'cards', items: [
          { icon: 'badge-check', title: 'Vet-approved tags' },
          { icon: 'camera', title: 'Photo and video reviews' },
          { icon: 'clock', title: 'Real-time availability' },
        ] },
      ],
      visual: { layout: 'stack', items: [
        { label: 'Vet-approved tag', spec: '', src: '/images/lap-trust-1.webp', alt: 'Product list with Bestseller and Vet recommended tags' },
        { label: 'Reviews', spec: '', src: '/images/lap-trust-2.webp', alt: 'Reviews with photo and video' },
        { label: 'Checkout', spec: '', src: '/images/lap-trust-3.webp', alt: 'Checkout with payment, order summary and log in' },
      ] } },

    { id: 'categories', nav: 'Categories', title: ['Categories by use,', 'not by anatomy.'],
      blocks: [{ type: 'contrast',
        from: { label: 'Before', items: ['Fur', 'Eyes', 'Ears'] },
        to: { label: 'After', items: ['Shampoos and conditioners', 'Balms and soaps', 'Tonics and foams'], icons: ['droplets', 'bubbles', 'sparkles'] } }],
      visual: { layout: 'single', items: [{ label: 'Menu and catalogue', spec: '', src: '/images/lap-categories.webp', alt: 'The new menu and the Catalogue grouped by use' }] } },

    { id: 'value', nav: 'Value', title: ['Value before', 'price.'],
      blocks: [
        { type: 'cards', items: [
          { icon: 'flask-conical', title: 'Ingredients' },
          { icon: 'map-pin', title: 'Origin' },
          { icon: 'target', title: 'Purpose' },
        ] },
        { type: 'callout', text: 'Made scannable on every product, with guides linked from the products they explain.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Product page', spec: '', src: '/images/lap-value.webp', alt: 'Product page and the “Our product is true craft” section' }] } },

    { id: 'outcome', nav: 'Outcome', title: ['From “Should I trust this?”', 'to “This makes sense.”'],
      blocks: [
        { type: 'callout', text: 'Removing the reason someone hesitates mattered more than making it pretty.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Final', spec: '', src: '/images/lap-outcome.webp', alt: 'Final checkout and the Blog' }] } },
  ],
};

const greenCredit: Partial<CaseData> = {
  accent: '#22A55E',
  fill: '#22A55E',
  tint: '#DDF7D0',
  facts: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Timeline', value: '4 weeks' },
    { label: 'Platform', value: 'Web, mobile' },
    { label: 'Status', value: 'In development' },
  ],
  summary: 'A credit-score product that makes credit data easier to understand and act on.',
  screens: [
    { id: 'overview', nav: 'Overview', title: ['Making credit data easier to understand and act on.'],
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Timeline', value: '4 weeks' },
        { label: 'Platform', value: 'Web, mobile' },
        { label: 'Status', value: 'In development' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Dashboard', spec: '', src: '/images/gcs-overview.webp', alt: 'Green Credit Score dashboard on a monitor' }] } },

    { id: 'challenge', nav: 'Challenge', title: ["The problem wasn't too much data. It was too little clarity."],
      lede: 'Credit information lives in many places. The challenge was to show what matters and what to do next.',
      blocks: [{ type: 'list', numbered: true, items: [
        { title: 'Scores without context', body: 'A number without a clear explanation of what it means.' },
        { title: 'Fragmented data', body: 'Users compare information across separate bureaus.' },
        { title: 'No clear priorities', body: 'Every metric competes for attention.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Problem', spec: '', src: '/images/gcs-challenge.webp', alt: 'The three areas of credit data: accounts, inquiries and records, payment history' }] } },

    { id: 'research', nav: 'Research', title: ['Three patterns shaped the direction.'],
      lede: 'We reviewed existing credit and finance products to see where reading credit data gets hard.',
      blocks: [{ type: 'table', head: ['Pattern in the market', 'Direction'], rows: [
        ['A number, with no explanation', 'Say what the score means'],
        ['Each bureau in its own report', 'One view for all three'],
        ['Every metric looks equally important', 'Rank factors by impact'],
      ] }],
      visual: { layout: 'single', items: [{ label: 'Benchmark', spec: '', src: '/images/gcs-research.webp', alt: 'Score factors screen on a laptop' }] } },

    { id: 'principles', nav: 'Principles', title: ['Three decisions defined the product.'],
      lede: 'Each principle set one consistent way to present credit information so users understand it faster.',
      blocks: [{ type: 'cards', items: [
        { icon: 'gauge', title: '01. Score first', body: 'The score and its status appear before supporting details.' },
        { icon: 'palette', title: '02. Color communicates status', body: 'A shared five-level scale keeps status meanings consistent.' },
        { icon: 'columns-2', title: '03. Bureaus side by side', body: 'A consistent layout makes differences easier to spot.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Principles', spec: '', src: '/images/gcs-principles.webp', alt: 'Score, status colours and bureau comparison' }] } },

    { id: 'landing', nav: 'Landing', title: ['Explain the value before asking for commitment.'],
      lede: 'The landing page introduces the product, shows its benefits and gives users a clear path to getting started.',
      blocks: [{ type: 'list', numbered: true, items: [
        { label: 'Explain', title: 'Introduce the product', body: 'Show what users can understand and manage.' },
        { label: 'Build confidence', title: 'Answer key questions', body: 'Present features, pricing and FAQs.' },
        { label: 'Convert', title: 'Make the next step clear', body: 'Keep the path to sign-up easy to find.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Landing', spec: '', src: '/images/gcs-landing.webp', alt: 'The landing page: hero, reviews, pricing and FAQ' }] } },

    { id: 'dashboard', nav: 'Dashboard', title: ['Your credit, at a glance.'],
      lede: 'The dashboard brings scores, credit factors and debt information into one view, a clear starting point.',
      blocks: [{ type: 'cards', items: [
        { icon: 'layout-dashboard', title: 'A clear entry point', body: 'Key information first, deeper sections one tap away.' },
        { icon: 'gauge', title: 'Factors under the score', body: 'The factors behind the score sit right below it.' },
        { icon: 'mouse-pointer-click', title: 'Details on demand', body: 'Users open individual sections to explore more.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Dashboard', spec: '', src: '/images/gcs-dashboard.webp', alt: 'The dashboard on a tablet' }] } },

    { id: 'simulator', nav: 'Simulator', title: ['Explore possible outcomes before making a decision.'],
      lede: 'Users try hypothetical scenarios and see how different choices could affect their score.',
      blocks: [
        { type: 'list', numbered: true, items: [
          { title: 'Open a new credit card', body: 'Explore the potential impact of a new account.' },
          { title: 'Get a new loan', body: 'Understand the possible effect of additional credit.' },
          { title: 'Increase a credit limit', body: 'Explore changes in credit utilization.' },
          { title: 'Close an existing card', body: 'Consider how closing an account could affect the score.' },
        ] },
        { type: 'note', text: 'Simulated outcomes are estimates, not guarantees.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Simulator', spec: '', src: '/images/gcs-simulator.webp', alt: 'The score simulator with its scenarios' }] } },

    { id: 'report', nav: 'Report', title: ['A complete report without the information overload.'],
      lede: 'Personal information, account details, balances and payment history sit in one consistent, readable structure.',
      blocks: [{ type: 'cards', items: [
        { label: 'Layer 01', title: 'Personal information', body: 'Compare the details reported by each bureau.' },
        { label: 'Layer 02', title: 'Account overview', body: 'Review balances, limits, utilization and status.' },
        { label: 'Layer 03', title: 'Payment history', body: 'Explore month-by-month account records.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Credit report', spec: '', src: '/images/gcs-report.webp', alt: 'The accounts report compared across bureaus' }] } },

    { id: 'delivery', nav: 'Delivery', title: ['From brief to a development-ready product.'],
      lede: 'The work connected product logic, UX exploration, interface design, reusable components and responsive layouts.',
      blocks: [
        { type: 'facts', caption: 'Scope', items: [{ value: '140+', label: 'Screens designed: dashboard, reports, account details and supporting flows' }] },
        { type: 'cards', items: [
          { label: 'System', title: 'Reusable components', body: 'Shared patterns for scores, statuses, account data and comparisons.' },
          { label: 'Workflow', title: 'AI-supported exploration', body: 'AI helped early exploration and design-system cleanup. Final decisions stayed with the team.' },
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'System', spec: '', src: '/images/gcs-delivery.webp', alt: 'The score simulator on a laptop' }] } },
  ],
};

export const cases: CaseData[] = [
  { slug: 'pinkwallet', side: 'front', name: 'PinkWallet', tags: ['Fintech', 'End-to-end', 'AI'], headline: 'Crypto for first-timers, through conversation', color: '#ff8fc8', image: '/images/pinkwallet-hero.webp', phones: ['/images/pw-phone-wallet.webp', '/images/pw-phone-pig.webp', '/images/pw-phone-dashboard.webp'], big: true, facts, highlights, summary, ...pinkwallet },
  { slug: 'green-credit-score', side: 'front', name: 'Green Credit Score', tags: ['Fintech', 'Web + mobile', '0-to-1'], headline: 'Credit health, readable in 5 seconds', color: '#3ccf7a', image: '/images/gcs-overview.webp', phones: ['/images/gcs-monitor.webp', '/images/gcs-phone.webp'], desk: true, mark: 'Green Score', facts, highlights, summary, ...greenCredit },
  { slug: 'jam', side: 'front', name: 'Jam Social', tags: ['Consumer', 'Networking', 'Mobile app'], headline: 'Reopen rate up 2.5× after the first scan', color: '#6b8cff', image: '/images/jam-home.webp', phones: ['/images/jam-phone-lock.webp', '/images/jam-phone-analytics.webp'], facts, highlights, summary, ...jam },
  { slug: 'lapunzel', side: 'front', name: 'Lapunzel', tags: ['E-commerce', 'Conversion', 'UX research'], headline: 'Product-page exits down 20%', color: '#ffb547', image: '/images/lap-hero.webp', phones: ['/images/lap-phone-home.webp', '/images/lap-phone-product.webp'], facts, highlights, summary, ...lapunzel },
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
