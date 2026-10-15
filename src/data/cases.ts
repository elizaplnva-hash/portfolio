export type Side = 'front' | 'back';

/* ---------- Product case: one screen = one question ---------- */
export type Visual =
  | { layout: 'single'; items: Ph[] }          // one big image
  | { layout: 'stack'; items: Ph[] }           // two small on top, one wide below
  | { layout: 'row'; items: Ph[] };            // three phones in a row
export interface Ph { label: string; spec: string; src?: string; alt?: string }

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
  | { type: 'quote'; text: string; by: string }
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
  big?: boolean;              // large tile on home
  facts: { label: string; value: string }[];   // role, timeline, platform...
  highlights: string[];       // selling points (Product pages)
  summary: string;            // short intro
  accent?: string;            // case colour, safe for text on white
  fill?: string;              // case colour for small dots and marks
  tint?: string;              // pastel behind the case images
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
  accent: '#E0408F',
  fill: '#E0408F',
  tint: '#FFE6F1',
  facts: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Timeline', value: '8 weeks' },
    { label: 'Platform', value: 'iOS' },
    { label: 'Status', value: 'Launched July 2026' },
  ],
  summary: 'A multi-chain crypto wallet, redesigned around PIG, an AI companion.',
  screens: [
    { id: 'overview', nav: 'Overview', title: ['Crypto,', 'without learning crypto.'],
      lede: 'A multi-chain wallet redesigned around PIG, an AI companion that helps users manage crypto through natural conversation instead of complex navigation.',
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Timeline', value: '8 weeks' },
        { label: 'Platform', value: 'iOS' },
        { label: 'Status', value: 'Launched July 2026' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Home screen', spec: '', src: '/images/pinkwallet-hero.webp', alt: 'PinkWallet on two phones: the wallet home with balances and the My card screen with recent transactions' }] } },

    { id: 'product', nav: 'Product', title: ['One wallet,', 'more ways to manage crypto.'],
      lede: 'PinkWallet brings asset management, AI assistance, crypto news and everyday wallet tools into one mobile experience.',
      blocks: [{ type: 'bento', cells: [
        { icon: 'sparkles', title: 'AI companion', body: 'Ask questions, explore crypto and start actions through PIG.', wide: true, fill: true },
        { icon: 'wallet', title: 'Multi-chain wallet', body: 'Assets across five networks: BTC, ETH, SOL, TRX and XRP.' },
        { icon: 'newspaper', title: 'Crypto feed', body: 'Market news, and a way to discuss stories with PIG.' },
        { icon: 'layout-grid', title: 'Everyday tools', body: 'Swap assets, manage contacts, reach wallet settings.' },
        { icon: 'key-round', title: 'Self-custody', body: 'Users keep control of their wallet and private keys.' },
      ] }],
      visual: { layout: 'stack', items: [
        { label: 'Cards', spec: '', src: '/images/pw-cards.webp', alt: 'PinkWallet card designs, stacked' },
        { label: 'App icon', spec: '', src: '/images/pw-app-icon.webp', alt: 'The PinkWallet app icon on an iPhone home screen' },
        { label: 'Crypto feed', spec: '', src: '/images/pw-feed.webp', alt: 'The crypto feed on a tilted phone: a story opened with an NFT card, and 3D icons for video, news and X' },
      ] } },

    { id: 'problem', nav: 'Problem', title: ['Crypto asks people to think', 'like a blockchain.'],
      lede: 'Sending crypto can involve unfamiliar concepts before users even reach their goal. Networks, addresses, fees and transaction details add complexity to what should feel like a simple action.',
      blocks: [
        { type: 'contrast',
          from: { label: 'The technical model', items: ['Addresses', 'Networks', 'Gas fees', 'Transactions'] },
          to: { label: 'The user’s mental model', items: ['Send', 'Receive', 'Swap'], icons: ['send', 'inbox', 'blend'] } },
        { type: 'callout', text: 'The challenge was to bridge that gap without sacrificing transparency or control.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Confirmation', spec: '', src: '/images/pw-confirmation.webp', alt: 'The Confirmation screen before sending Bitcoin, on a phone held in a hand' }] } },

    { id: 'insight', nav: 'Insight', statement: true, title: ['Users think in outcomes,', 'not interfaces.'],
      lede: 'People don’t open a wallet to navigate menus. They open it to do something with their money.',
      blocks: [
        { type: 'fromto', from: 'Finding features, navigating menus, understanding technical options.', to: 'Expressing an intention, reviewing the details, confirming the action.' },
      ] },

    { id: 'approach', nav: 'Approach', title: ['Every crypto concept got', 'a simpler answer.'],
      lede: 'The goal wasn’t to hide complexity. It was to remove unnecessary decisions while keeping important information visible.',
      blocks: [{ type: 'list', items: [
        { icon: 'receipt', title: 'Fees', body: 'Make transaction costs understandable before confirmation.' },
        { icon: 'network', title: 'Networks', body: 'Remove network decisions wherever the product can handle them.' },
        { icon: 'compass', title: 'Navigation', body: 'Let users say what they want through PIG, not only through menus.' },
        { icon: 'shield-check', title: 'Confirmation', body: 'Show the essential details before users approve an action.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Swap flow', spec: '', src: '/images/pw-swap.webp', alt: 'The swap flow on four phones: amount, token select, confirmation and swap completed, in dark and light themes' }] } },

    { id: 'pig', nav: 'PIG', title: ['AI built in,', 'not bolted on.'],
      lede: 'PIG isn’t a separate chatbot. It is another way to use the wallet itself, while the familiar controls stay where they are.',
      blocks: [
        { type: 'cards', items: [
          { icon: 'message-circle', hi: true, label: 'Conversational', title: 'Ask, explore and start actions in natural language.' },
          { icon: 'layout-dashboard', label: 'Traditional', title: 'Familiar wallet features and controls, one tap away.' },
        ] },
        { type: 'note', text: 'The way people interact can change without splitting the product in two.' },
      ],
      visual: { layout: 'single', items: [{ label: 'PIG', spec: '', src: '/images/pw-pig.webp', alt: 'PIG, the AI companion, greeting the user, with example prompts around the phone' }] } },

    { id: 'trust', nav: 'Trust', title: ['Conversational doesn’t mean', 'casual.'],
      lede: 'When money is involved, a simple interface isn’t enough. People need to know what they approve, what is happening and how it ended.',
      blocks: [{ type: 'list', numbered: true, items: [
        { label: 'Before', title: 'Make the decision clear', body: 'Essential transaction details before confirmation.' },
        { label: 'During', title: 'Keep the user informed', body: 'Progress and errors, never a guess.' },
        { label: 'After', title: 'Close the loop', body: 'A clear result: done, or what needs attention.' },
      ] }],
      visual: { layout: 'stack', items: [
        { label: 'Choose a wallet', spec: '', src: '/images/pw-chat-wallets.webp', alt: 'PIG chat asking which of two wallets to send to' },
        { label: 'Send preview', spec: '', src: '/images/pw-chat-preview.webp', alt: 'PIG chat showing a send preview with recipient, amount and fee' },
        { label: 'Sent', spec: '', src: '/images/pw-sent.webp', alt: 'The Sent receipt, with PIG waving next to it' },
      ] } },

    { id: 'onboarding', nav: 'Onboarding', title: ['More than a wallet,', 'from the first screen.'],
      lede: 'Onboarding introduces PinkWallet as an everyday crypto companion before asking anyone to create or import a wallet.',
      blocks: [{ type: 'steps', items: [
        { title: 'Welcome', body: 'PinkWallet and its promise of simpler crypto.' },
        { title: 'Meet PIG', body: 'How an AI companion fits into the wallet.' },
        { title: 'Explore', body: 'The crypto feed, and talking about news with PIG.' },
        { title: 'Get started', body: 'Create a new wallet or import an existing one.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Onboarding', spec: '', src: '/images/pw-onboarding.webp', alt: 'Three onboarding screens: Meet PIG, Your crypto feed and Welcome to PinkWallet' }] } },

    { id: 'states', nav: 'Every state', title: ['Every state is part', 'of the experience.'],
      lede: 'A wallet is more than its home screen. First use, empty balances, progress, errors and conversations with PIG all decide how reliable it feels.',
      blocks: [
        { type: 'table', head: ['State', 'What is covered'], rows: [
          ['First use', 'Empty wallet, first balance'],
          ['Transactions', 'Confirmation, progress'],
          ['Recovery', 'Errors, next steps'],
          ['Conversations', 'First chat, AI responses'],
        ] },
        { type: 'theme' },
      ],
      visual: { layout: 'single', items: [{ label: 'PIG conversations', spec: '', src: '/images/pw-states.webp', alt: 'PIG on a phone held in a hand, with a Bitcoin chart reply and a wallet choice when sending' }] } },

    { id: 'process', nav: 'Process', title: ['This wasn’t', 'a concept exercise.'],
      lede: 'PinkWallet was designed for release: from early explorations through iteration and testing into development and launch.',
      blocks: [
        { type: 'chain', steps: ['Exploration', 'Iteration', 'Testing', 'Development', 'Launch'] },
        { type: 'note', text: 'A shared component library kept the core flows and states consistent. PIG’s character and the custom 3D icons were made with generative AI, then refined by hand.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Screens', spec: '', src: '/images/pw-process.webp', alt: 'A grid of PinkWallet screens: filters, history, swap, contacts and PIG chat' }] } },

    { id: 'outcome', nav: 'Outcome', title: ['From first screen', 'to launch.'],
      lede: 'One mobile experience that brings together a multi-chain wallet, AI-assisted interactions and everyday crypto tools.',
      blocks: [
        { type: 'facts', caption: 'Scope', items: [{ value: '200+', label: 'Screens' }, { value: '8', label: 'Core flows' }, { value: '5', label: 'Networks' }] },
      ],
      visual: { layout: 'single', items: [{ label: 'Final frame', spec: '', src: '/images/pw-outcome.webp', alt: 'The PinkWallet home and Dashboard on two phones in the dark theme' }] } },
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
  summary: 'Jam is a digital business card: scan a QR code, share your contact.',
  screens: [
    { id: 'overview', nav: 'Overview', title: ['Analytics was the ask.', 'A reason to come back was the need.'],
      lede: 'Jam is an existing networking app: scan a QR code, share your contact. The team asked whether to add analytics, and what kind would matter. I owned the research and the analytics feature.',
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Team', value: '2 designers, 2 PMs' },
        { label: 'Timeline', value: '12 weeks' },
        { label: 'Scope', value: 'Research to hi-fi' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Jam', spec: '', src: '/images/jam-overview.webp', alt: 'Jam on three phones: the weekly analytics notification, the Analytics screen and the Instagram clicks screen' }] } },

    { id: 'problem', nav: 'Problem', title: ['Networking feels like', 'talking into a void.'],
      blocks: [
        { type: 'quote', text: 'I shared my card with 20 people. Did anyone actually look at it?', by: 'Interview participant' },
        { type: 'cards', items: [
          { icon: 'eye-off', title: 'No signal after the scan' },
          { icon: 'link', title: 'LinkedIn isn’t enough' },
          { icon: 'rotate-ccw', hi: true, title: 'No reason to reopen the app' },
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'Problem', spec: '', src: '/images/jam-problem.webp', alt: 'The existing Jam app: sign-up, the QR code card and the Jams form' }] } },

    { id: 'research', nav: 'Research', title: ['What people said,', 'not what we assumed.'],
      blocks: [
        { type: 'cards', items: [
          { icon: 'route', label: 'Interviews', title: 'Analytics should reach beyond the app.' },
          { icon: 'lock', label: 'Interviews', title: 'Privacy is essential.', body: 'Control over who sees what came up unprompted in 7 of 10 interviews.' },
          { icon: 'repeat', hi: true, label: 'Focus group', title: 'Without a reason to return, Jam is a one-time tool.' },
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
      visual: { layout: 'single', items: [{ label: 'Follow-ups', spec: '', src: '/images/jam-follow.webp', alt: 'Jam: Notifications, Calendar and a connection Profile' }] } },

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
      visual: { layout: 'single', items: [{ label: 'Dashboard', spec: 'The main product mockup.' }] } },

    { id: 'challenge', nav: 'Challenge', title: ["The problem wasn't too much data. It was too little clarity."],
      lede: 'Credit information is spread across scores, accounts, payment histories and reports. The challenge was to show what matters and what to do next.',
      blocks: [{ type: 'list', numbered: true, items: [
        { title: 'Scores without context', body: 'A number without a clear explanation of what it means.' },
        { title: 'Fragmented data', body: 'Users compare information across separate bureaus.' },
        { title: 'No clear priorities', body: 'Every metric competes for attention.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Problem', spec: 'An interface or a diagram of the problem.' }] } },

    { id: 'research', nav: 'Research', title: ['Three patterns shaped the direction.'],
      lede: 'We benchmarked existing financial products to find where credit information becomes hard to read.',
      blocks: [{ type: 'table', head: ['Finding', 'Opportunity'], rows: [
        ['Scores lack context', 'Explain score status'],
        ['Data is fragmented', 'Compare bureaus side by side'],
        ['No clear priorities', 'Highlight key factors'],
      ] }],
      visual: { layout: 'single', items: [{ label: 'Benchmark', spec: 'Competitor analysis or interface examples.' }] } },

    { id: 'principles', nav: 'Principles', title: ['Three decisions defined the product.'],
      lede: 'Each principle set one consistent way to present credit information so users understand it faster.',
      blocks: [{ type: 'cards', items: [
        { icon: 'gauge', title: '01. Score first', body: 'The score and its status appear before supporting details.' },
        { icon: 'palette', title: '02. Color communicates status', body: 'A shared five-level scale keeps status meanings consistent.' },
        { icon: 'columns-2', title: '03. Bureaus side by side', body: 'A consistent layout makes differences easier to spot.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Principles', spec: 'Score cards, the colour scale and the bureau comparison.' }] } },

    { id: 'landing', nav: 'Landing', title: ['Explain the value before asking for commitment.'],
      lede: 'The landing page introduces the product, shows its benefits and gives users a clear path to getting started.',
      blocks: [{ type: 'list', numbered: true, items: [
        { label: 'Explain', title: 'Introduce the product', body: 'Show what users can understand and manage.' },
        { label: 'Build confidence', title: 'Answer key questions', body: 'Present features, pricing and FAQs.' },
        { label: 'Convert', title: 'Make the next step clear', body: 'Keep the path to sign-up easy to find.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Landing', spec: 'The full landing page or a few of its sections.' }] } },

    { id: 'dashboard', nav: 'Dashboard', title: ['Your credit, at a glance.'],
      lede: 'The dashboard brings scores, credit factors and debt information into one view, a clear starting point.',
      blocks: [{ type: 'cards', items: [
        { icon: 'layout-dashboard', title: 'A clear entry point', body: 'Key information first, deeper sections one tap away.' },
        { icon: 'columns-2', title: 'Consistent comparison', body: 'All three bureaus follow the same layout.' },
        { icon: 'mouse-pointer-click', title: 'Details on demand', body: 'Users open individual sections to explore more.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Dashboard', spec: 'The real dashboard screen.' }] } },

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
      visual: { layout: 'single', items: [{ label: 'Simulator', spec: 'The simulator screen with an example scenario.' }] } },

    { id: 'report', nav: 'Report', title: ['A complete report without the information overload.'],
      lede: 'Personal information, account details, balances and payment history sit in one consistent, readable structure.',
      blocks: [{ type: 'cards', items: [
        { label: 'Layer 01', title: 'Personal information', body: 'Compare the details reported by each bureau.' },
        { label: 'Layer 02', title: 'Account overview', body: 'Review balances, limits, utilization and status.' },
        { label: 'Layer 03', title: 'Payment history', body: 'Explore month-by-month account records.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Credit report', spec: 'The bureau table and an account detail.' }] } },

    { id: 'monitoring', nav: 'Monitoring', title: ['Know when something changes.'],
      lede: 'Monitoring keeps users informed about relevant changes without a full report review every time.',
      blocks: [{ type: 'cards', items: [
        { icon: 'trending-up', title: 'Credit score updated', body: 'Your TransUnion score went up 6 points. 2 days ago' },
        { icon: 'gauge', title: 'Credit utilization', body: 'Credit utilization decreased to 24%. 5 days ago' },
        { icon: 'credit-card', title: 'New account', body: 'American Express card added to your report. 1 week ago' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Alerts', spec: 'The notifications screen.' }] } },

    { id: 'delivery', nav: 'Delivery', title: ['From brief to a development-ready product.'],
      lede: 'The work connected product logic, UX exploration, interface design, reusable components and responsive layouts.',
      blocks: [
        { type: 'facts', caption: 'Scope', items: [{ value: '140+', label: 'Screens designed: dashboard, reports, account details and supporting flows' }] },
        { type: 'cards', items: [
          { label: 'System', title: 'Reusable components', body: 'Shared patterns for scores, statuses, account data and comparisons.' },
          { label: 'Workflow', title: 'AI-supported exploration', body: 'AI helped early exploration and design-system cleanup. Final decisions stayed with the team.' },
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'System', spec: 'The design system, components and responsive screens.' }] } },
  ],
};

export const cases: CaseData[] = [
  { slug: 'pinkwallet', side: 'front', name: 'PinkWallet', tags: ['Fintech', 'AI'], headline: "Crypto that doesn't scare first-time users", color: '#ff8fc8', image: '/images/pw-home.webp', big: true, facts, highlights, summary, ...pinkwallet },
  { slug: 'jam', side: 'front', name: 'Jam', tags: ['Consumer', 'UX research'], headline: 'Turned a contact-collecting app into a reason to follow up', color: '#6b8cff', image: '/images/jam-home.webp', facts, highlights, summary, ...jam },
  { slug: 'lapunzel', side: 'front', name: 'Lapunzel', tags: ['E-commerce', 'Conversion'], headline: 'Reframed a redesign as a trust problem', color: '#ffb547', image: '/images/lap-hero.webp', facts, highlights, summary, ...lapunzel },
  { slug: 'green-credit-score', side: 'front', name: 'Green Credit Score', tags: ['Fintech', 'Web'], headline: 'A credit-score dashboard, designed in one month', color: '#3ccf7a', facts, highlights, summary, ...greenCredit },
  { slug: 'world-of-colors', side: 'back', name: 'World of Colors', tags: ['Brand', 'Website'], headline: '[Headline: what was hard and what we achieved]', color: '#ff5a36', big: true, facts: facts.slice(0, 3), highlights, summary },
  { slug: 'ben-ai', side: 'back', name: 'Ben AI', tags: ['AI SaaS', 'Web design'], headline: 'A brand and product system for an award-winning AI startup', color: '#7b61ff', image: '/images/ben-tablets.webp', facts: facts.slice(0, 3), highlights, summary,
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

export const bySide = (side: Side) => cases.filter((c) => c.side === side);
