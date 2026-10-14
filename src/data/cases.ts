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
    { id: 'overview', nav: 'Overview', title: ['A digital card that', 'still feels personal.'],
      lede: 'People share a QR code instead of a paper card. I worked with a small team from first interviews to final screens.',
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Team', value: '2 designers, 2 PMs' },
        { label: 'Timeline', value: '12 weeks' },
        { label: 'Scope', value: 'Research to hi-fi' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Jam', spec: '', src: '/images/jam-overview.webp', alt: 'Jam on two phones: the weekly report notification on the lock screen and the Analytics screen' }] } },

    { id: 'problem', nav: 'Problem', title: ['A digital card is fast,', 'but a name on a screen is easy to forget.'],
      blocks: [
        { type: 'contrast',
          from: { label: 'Paper card', items: ['Personal', 'Gets lost'] },
          to: { label: 'Digital card', items: ['Fast to share', 'Easy to forget', 'Nothing after the scan'], icons: ['zap', 'user-round-x', 'circle-off'] } },
        { type: 'note', text: 'After the event nothing connects the two people.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Problem', spec: '', src: '/images/jam-problem.webp', alt: 'Jam: an empty Jams list and a shareable QR code with contact icons' }] } },

    { id: 'research', nav: 'Research', title: ['People like the speed', 'and worry about the personal touch.'],
      blocks: [
        { type: 'quote', text: 'Digital tools can enhance networking, but they cannot replace personal connections.', by: 'Interview finding' },
        { type: 'note', text: '10+ interviews and one focus group. People asked for a photo and job title, follow-up reminders and messages in the app.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Research', spec: '', src: '/images/jam-research.webp', alt: 'The interview findings board' }] } },

    { id: 'decisions', nav: 'Decisions', title: ['Every feature answers', 'one worry.'],
      blocks: [{ type: 'table', head: ['Worry', 'Answer'], rows: [
        ['A card feels impersonal', 'A profile for each person: photo, job title, where we met'],
        ['I forget to follow up', 'Reminders tied to a person and an event'],
        ['I can’t tell what works', 'Clicks per Jam and top job titles'],
      ] }],
      visual: { layout: 'single', items: [{ label: 'Workshop', spec: '', src: '/images/jam-workshop.webp', alt: 'Workshop board of How-might-we notes grouped by theme' }] } },

    { id: 'jams', nav: 'Jams', title: ['One QR code,', 'all your contacts.'],
      lede: 'Add a Jam for each way to reach you: phone, Discord, LinkedIn, email, Instagram. One QR code shares them all.',
      visual: { layout: 'single', items: [{ label: 'Jams', spec: '', src: '/images/jam-jams.webp', alt: 'Jam: the Jams list and the QR code screen' }] } },

    { id: 'followups', nav: 'Follow-ups', title: ['The app remembers', 'so you don’t have to.'],
      lede: 'Each person gets a profile with the date and place you met and talking points for later.',
      blocks: [{ type: 'list', items: [
        { icon: 'user-round-check', title: 'Follow-up reminders', body: 'Tied to a person and an event' },
        { icon: 'chart-no-axes-column', title: 'Engagement updates', body: 'When your clicks go up' },
        { icon: 'calendar-search', title: 'Event suggestions', body: 'Networking events worth attending' },
        { icon: 'coffee', title: 'Coffee chat refreshers', body: 'A reminder before you meet' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Follow-ups', spec: '', src: '/images/jam-follow.webp', alt: 'Jam: Notifications and a connection Profile' }] } },

    { id: 'analytics', nav: 'Analytics', title: ['See which Jam', 'people open.'],
      blocks: [{ type: 'callout', text: 'Clicks per Jam by day, and the job titles of the people who open them. A weekly report arrives as a notification.' }],
      visual: { layout: 'single', items: [{ label: 'Analytics', spec: '', src: '/images/jam-analytics.webp', alt: 'Jam: the Instagram analytics screen and the weekly report notification' }] } },

    { id: 'hifi', nav: 'Hi-fi', title: ['Minimal', 'on purpose.'],
      lede: 'Eight usability tests praised the minimalism and convenience.',
      visual: { layout: 'single', items: [{ label: 'Hi-fi', spec: '', src: '/images/jam-hifi.webp', alt: 'All Jam app screens' }] } },

    { id: 'reflection', nav: 'Reflection', wide: true, title: ['Personal touch is a product feature,', 'not decoration.'],
      blocks: [{ type: 'decision', rows: [
        ['Learned', 'Contradictions in the interviews pointed to the real problem.'],
        ['Next', 'See whether reminders bring people back over time.'],
      ] }] },
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
      visual: { layout: 'single', items: [{ label: 'Product page', spec: 'The redesigned product page on a phone.' }] } },

    { id: 'problem', nav: 'Problem', title: ['Not the price.', 'The uncertainty.'],
      blocks: [{ type: 'list', items: [
        { icon: 'search', label: 'Discovery', title: 'Which product fits my pet?' },
        { icon: 'credit-card', label: 'Checkout', title: 'A new brand at a premium price, with no proof at the moment of paying.' },
        { icon: 'tag', label: 'Price', title: 'Value wasn’t visible, so the price felt unjustified.' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Before', spec: 'The old catalogue or checkout screen.' }] } },

    { id: 'research', nav: 'Research', title: ['We asked before', 'we redesigned.'],
      blocks: [{ type: 'facts', caption: 'Research', items: [{ value: '50+', label: 'Survey responses' }, { value: '15', label: 'Interviews' }] }],
      visual: { layout: 'stack', items: [
        { label: 'Survey', spec: 'A crop of the survey results.' },
        { label: 'Interviews', spec: 'Interview notes or quotes.' },
        { label: 'Synthesis', spec: 'The findings board, wide.' },
      ] } },

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
        { label: 'Vet-approved tag', spec: 'A close crop.' },
        { label: 'Reviews', spec: 'Photo and video reviews.' },
        { label: 'Checkout', spec: 'Checkout with the trust signals in place.' },
      ] } },

    { id: 'categories', nav: 'Categories', title: ['Categories by use,', 'not by anatomy.'],
      blocks: [{ type: 'contrast',
        from: { label: 'Before', items: ['Fur', 'Eyes', 'Ears'] },
        to: { label: 'After', items: ['Shampoos and conditioners', 'Balms and soaps', 'Tonics and foams'], icons: ['droplets', 'bubbles', 'sparkles'] } }],
      visual: { layout: 'stack', items: [
        { label: 'Old menu', spec: 'Categories by body part.' },
        { label: 'New menu', spec: 'Categories by use.' },
        { label: 'Catalogue', spec: 'The new catalogue, wide.' },
      ] } },

    { id: 'value', nav: 'Value', title: ['Value before', 'price.'],
      blocks: [
        { type: 'cards', items: [
          { icon: 'flask-conical', title: 'Ingredients' },
          { icon: 'map-pin', title: 'Origin' },
          { icon: 'target', title: 'Purpose' },
        ] },
        { type: 'callout', text: 'Made scannable on every product, with guides linked from the products they explain.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Ingredients', spec: 'The product page section with ingredients, origin and purpose.' }] } },

    { id: 'outcome', nav: 'Outcome', title: ['From “Should I trust this?”', 'to “This makes sense.”'],
      blocks: [
        { type: 'callout', text: 'Removing the reason someone hesitates mattered more than making it pretty.' },
      ],
      visual: { layout: 'row', items: [
        { label: 'Catalogue', spec: 'Final catalogue.' },
        { label: 'Product', spec: 'Final product page.' },
        { label: 'Checkout', spec: 'Final checkout.' },
      ] } },
  ],
};

const greenCredit: Partial<CaseData> = {
  accent: '#22A55E',
  fill: '#22A55E',
  tint: '#DDF7D0',
  facts: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Timeline', value: '1 month' },
    { label: 'Scope', value: 'Landing and dashboard' },
    { label: 'Status', value: 'In development' },
  ],
  summary: 'A consumer credit-score product: a landing page and a dashboard behind sign-in.',
  screens: [
    { id: 'overview', nav: 'Overview', title: ['A credit score,', 'behind one sign-in.'],
      lede: 'A consumer credit-score product: a landing page and a four-section dashboard behind sign-in.',
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Timeline', value: '1 month' },
        { label: 'Scope', value: 'Landing, dashboard' },
        { label: 'Status', value: 'In development' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Dashboard', spec: 'The dashboard home.' }] } },

    { id: 'constraint', nav: 'Constraint', title: ['Too little time', 'for the usual cycle.'],
      lede: 'The window was too short for wireframes, then mockups, then a prototype. So we skipped the linear stage.',
      blocks: [{ type: 'table', head: ['Step', 'How'], rows: [
        ['Research', 'Competitive analysis of credit-score products'],
        ['Prototype', 'Figma AI agents instead of a wireframe stage'],
        ['Build', 'An internal component library'],
      ] }],
      visual: { layout: 'stack', items: [
        { label: 'Competitors', spec: 'A collage of competitor screens.' },
        { label: 'AI prototype', spec: 'An early AI-generated prototype.' },
        { label: 'Components', spec: 'The component library, wide.' },
      ] } },

    { id: 'structure', nav: 'Structure', title: ['After the landing,', 'only the core.'],
      lede: 'Attention is limited, so the case shows the landing and the main dashboard, not every screen.',
      blocks: [{ type: 'chain', steps: ['Landing', 'Sign-in', 'Dashboard'] }],
      visual: { layout: 'stack', items: [
        { label: 'Landing', spec: 'The landing hero.' },
        { label: 'Sign-in', spec: 'The sign-in screen.' },
        { label: 'Structure', spec: 'Your Structure block, as it is.' },
      ] } },

    { id: 'dashboard', nav: 'Dashboard', title: ['Four sections,', 'one score.'],
      blocks: [{ type: 'note', text: '[Name the four sections and what each one answers.]' }],
      visual: { layout: 'row', items: [
        { label: 'Section', spec: 'Dashboard section 1.' },
        { label: 'Section', spec: 'Dashboard section 2.' },
        { label: 'Section', spec: 'Dashboard section 3.' },
      ] } },

    { id: 'outcome', nav: 'Outcome', title: ['Concept to clickable', 'in hours, not weeks.'],
      
      visual: { layout: 'single', items: [{ label: 'Final frame', spec: 'The dashboard on a clean background.' }] } },
  ],
};

export const cases: CaseData[] = [
  { slug: 'pinkwallet', side: 'front', name: 'PinkWallet', tags: ['Fintech', 'AI'], headline: "Crypto that doesn't scare first-time users", color: '#ff8fc8', image: '/images/pw-home.webp', big: true, facts, highlights, summary, ...pinkwallet },
  { slug: 'jam', side: 'front', name: 'Jam', tags: ['Consumer', 'UX research'], headline: 'Turned a contact-collecting app into a reason to follow up', color: '#6b8cff', facts, highlights, summary, ...jam },
  { slug: 'lapunzel', side: 'front', name: 'Lapunzel', tags: ['E-commerce', 'Conversion'], headline: 'Reframed a redesign as a trust problem', color: '#ffb547', facts, highlights, summary, ...lapunzel },
  { slug: 'green-credit-score', side: 'front', name: 'Green Credit Score', tags: ['Fintech', 'Web'], headline: 'A credit-score dashboard, designed in one month', color: '#3ccf7a', facts, highlights, summary, ...greenCredit },
  { slug: 'world-of-colors', side: 'back', name: 'World of Colors', tags: ['Brand', 'Website'], headline: '[Headline: what was hard and what we achieved]', color: '#ff5a36', big: true, facts: facts.slice(0, 3), highlights, summary },
  { slug: 'ben-ai', side: 'back', name: 'Ben AI', tags: ['AI SaaS', 'Brand system'], headline: 'A brand and product system for an award-winning AI startup', color: '#7b61ff', facts: facts.slice(0, 3), highlights, summary },
  { slug: 'reboot-hub', side: 'back', name: 'Re:Boot Hub', tags: ['Consulting', 'Brandbook'], headline: 'A brand built on speed, structure and truth', color: '#e8ff3a', highlights,
    summary: 'A brand identity and brandbook for a consulting hub: logo concepts first, then the full system once the client chose a direction.',
    facts: [{ label: 'Role', value: 'Brand Designer' }, { label: 'Deliverables', value: 'Logo concepts, brandbook' }, { label: 'Type', value: 'Gotham, Open Sans' }] },
  { slug: 'bobyard', side: 'back', name: 'Bobyard', tags: ['Construction AI', 'Illustration'], headline: 'Illustration and visuals for a construction-AI startup', color: '#e8541e', facts: facts.slice(0, 3), highlights, summary },
];

export const bySide = (side: Side) => cases.filter((c) => c.side === side);
