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
  | { type: 'quote'; text: string; by: string }
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
        { type: 'facts', caption: 'Scope', items: [{ value: '200+', label: 'Screens' }, { value: '8', label: 'Core flows' }] },
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


const jam: Partial<CaseData> = {
  accent: '#3550D4',
  fill: '#8EA2FF',
  facts: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Team', value: '2 designers, 2 PMs' },
    { label: 'Timeline', value: '12 weeks' },
    { label: 'Scope', value: 'Research to hi-fi prototype' },
  ],
  summary: 'Jam is a digital business card: scan a QR code, share your contact.',
  screens: [
    { id: 'overview', nav: 'Overview', title: ['Analytics was the ask.', 'A reason to come back was the need.'],
      lede: 'Jam is a digital business card: scan a QR code, share your contact. The team asked whether Jam should add analytics, and what kind would matter.',
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Product Designer', more: 'Owned research and analytics' },
        { label: 'Team', value: '2 designers, 2 PMs' },
        { label: 'Timeline', value: '12 weeks' },
        { label: 'Scope', value: 'Research to hi-fi' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Jam home', spec: 'The connection screen with the QR card.' }] } },

    { id: 'problem', nav: 'Problem', title: ['Networking feels like', 'talking into a void.'],
      blocks: [
        { type: 'quote', text: 'I shared my card with 20 people. Did anyone actually look at it?', by: 'Interview participant' },
        { type: 'cards', items: [
          { title: 'No signal after the scan' },
          { title: 'LinkedIn isn’t enough' },
          { title: 'No reason to return' },
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'Before', spec: 'The scan-and-share flow as it was: share, close, forget.' }] } },

    { id: 'research', nav: 'Research', title: ['What people said,', 'not what we assumed.'],
      blocks: [
        { type: 'facts', caption: 'Research', items: [{ value: '10+', label: 'Interviews' }, { value: '1', label: 'Focus group' }] },
        { type: 'chips', items: ['Competitor audit', 'Heuristic evaluation'] },
      ],
      visual: { layout: 'stack', items: [
        { label: 'Interview notes', spec: 'A crop of your synthesis board.' },
        { label: 'Persona', spec: 'Mark Baker, recent IT grad.' },
        { label: 'Affinity map', spec: 'The clustered findings, wide.' },
      ] } },

    { id: 'findings', nav: 'Findings', title: ['Three findings', 'changed the brief.'],
      blocks: [{ type: 'cards', items: [
        { label: 'Interviews', title: 'Privacy is non-negotiable.', body: 'Control over who sees what came up unprompted in 7 of 10 interviews.' },
        { label: 'Interviews', title: 'Interactions matter beyond the app.', body: 'People wanted to see what happened after the scan, wherever it happened.' },
        { label: 'Focus group', title: 'Without a reason to return, Jam is a one-time tool.' },
      ] }] ,
      visual: { layout: 'single', items: [{ label: 'Evidence', spec: 'Quotes or sticky notes behind the three findings.' }] } },

    { id: 'insight', nav: 'Insight', statement: true, title: ['People didn’t want numbers.', 'They wanted a reason to come back.'] },

    { id: 'alignment', nav: 'Alignment', title: ['Two PMs,', 'two definitions of analytics.'],
      lede: 'An ideation workshop turned them into one definition and three questions.',
      blocks: [{ type: 'cards', items: [
        { label: 'How might we', title: 'Make analytics actionable, not just informational?' },
        { label: 'How might we', title: 'Give people a reason to return between events?' },
        { label: 'How might we', title: 'Surface insights without compromising privacy?' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Workshop', spec: 'The ideation board from the workshop.' }] } },

    { id: 'solution', nav: 'Solution', title: ['One feature,', 'three parts.'],
      blocks: [{ type: 'table', head: ['Part', 'What it does'], rows: [
        ['Weekly digest', 'Link clicks, top platforms and industries reached, built to skim'],
        ['Smart follow-ups', 'Nudges tied to a person and an event: “Remember Alex from last Thursday?”'],
        ['Connection profiles', 'Living contact cards with event history, talking points and notes'],
      ] }],
      visual: { layout: 'row', items: [
        { label: 'Digest', spec: 'The weekly analytics digest.' },
        { label: 'Follow-up', spec: 'A follow-up reminder.' },
        { label: 'Profile', spec: 'A connection profile.' },
      ] } },

    { id: 'testing', nav: 'Testing', title: ['8 usability tests,', '3 changes.'],
      blocks: [{ type: 'table', head: ['What we saw', 'What changed'], rows: [
        ['Icon-only navigation confused 5 of 8 testers', 'Text labels on the bottom navigation'],
        ['Clarity was rated 2', 'Dividers and colour: rated 4.5'],
        ['Contact details came before context', 'Event context first, then the person'],
      ] }],
      visual: { layout: 'stack', items: [
        { label: 'Before', spec: 'A tested screen before the change.' },
        { label: 'After', spec: 'The same screen after.' },
        { label: 'Final flow', spec: 'The tested flow, wide.' },
      ] } },

    { id: 'reflection', nav: 'Reflection', title: ['The brief is rarely', 'the real problem.'],
      blocks: [
        { type: 'decision', rows: [
          ['My part', 'Aligning two PMs on one definition took as much work as the screens.'],
          ['I’d change', 'We tested with people who network easily, not with those who find it hard.'],
        ] },
        { type: 'chain', steps: ['Validate with shipped data', 'Test notification fatigue', 'Onboarding that builds the habit'] },
        { type: 'contact' },
      ],
      visual: { layout: 'single', items: [{ label: 'Final frame', spec: 'The connection profile, on a clean background.' }] } },
  ],
};

const lapunzel: Partial<CaseData> = {
  accent: '#A85F00',
  fill: '#FFB547',
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
        { label: 'Timeline', value: '4 weeks', more: 'Research to handoff' },
        { label: 'Scope', value: 'Mobile UX, research, flows' },
        { label: 'Focus', value: 'Conversion, retention' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'Product page', spec: 'The redesigned product page on a phone.' }] } },

    { id: 'problem', nav: 'Problem', title: ['Not the price.', 'The uncertainty.'],
      blocks: [{ type: 'cards', items: [
        { label: 'Discovery', title: 'Which product fits my pet?' },
        { label: 'Checkout', title: 'A new brand at a premium price, with no proof at the moment of paying.' },
        { label: 'Price', title: 'Value wasn’t visible, so the price felt unjustified.' },
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
        { type: 'chips', items: ['Vet-approved tags', 'Photo and video reviews', 'Real-time availability'] },
      ],
      visual: { layout: 'stack', items: [
        { label: 'Vet-approved tag', spec: 'A close crop.' },
        { label: 'Reviews', spec: 'Photo and video reviews.' },
        { label: 'Checkout', spec: 'Checkout with the trust signals in place.' },
      ] } },

    { id: 'categories', nav: 'Categories', title: ['Categories by use,', 'not by anatomy.'],
      blocks: [{ type: 'contrast',
        from: { label: 'Before', items: ['Fur', 'Eyes', 'Ears'] },
        to: { label: 'After', items: ['Shampoos and conditioners', 'Balms and soaps', 'Tonics and foams'] } }],
      visual: { layout: 'stack', items: [
        { label: 'Old menu', spec: 'Categories by body part.' },
        { label: 'New menu', spec: 'Categories by use.' },
        { label: 'Catalogue', spec: 'The new catalogue, wide.' },
      ] } },

    { id: 'value', nav: 'Value', title: ['Value before', 'price.'],
      blocks: [
        { type: 'chips', items: ['Ingredients', 'Origin', 'Purpose'] },
        { type: 'note', text: 'Made scannable on every product, with guides linked from the products they explain.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Ingredients', spec: 'The product page section with ingredients, origin and purpose.' }] } },

    { id: 'outcome', nav: 'Outcome', title: ['From “Should I trust this?”', 'to “This makes sense.”'],
      blocks: [
        { type: 'note', text: 'Removing the reason someone hesitates mattered more than making it pretty.' },
        { type: 'contact' },
      ],
      visual: { layout: 'row', items: [
        { label: 'Catalogue', spec: 'Final catalogue.' },
        { label: 'Product', spec: 'Final product page.' },
        { label: 'Checkout', spec: 'Final checkout.' },
      ] } },
  ],
};

const greenCredit: Partial<CaseData> = {
  accent: '#17803F',
  fill: '#3CCF7A',
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
      blocks: [{ type: 'contact' }],
      visual: { layout: 'single', items: [{ label: 'Final frame', spec: 'The dashboard on a clean background.' }] } },
  ],
};

export const cases: CaseData[] = [
  { slug: 'pinkwallet', side: 'front', name: 'PinkWallet', tags: ['Fintech', 'AI'], headline: "Crypto that doesn't scare first-time users", color: '#ff8fc8', big: true, facts, highlights, summary, ...pinkwallet },
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
