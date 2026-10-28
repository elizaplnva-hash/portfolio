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
    { label: 'Role', value: 'Product Designer, two-person design team' },
    { label: 'Scope', value: 'Architecture, UX/UI, design system' },
    { label: 'Timeline', value: 'Dec 2025 – Jan 2026, 8 weeks' },
    { label: 'Status', value: 'App Store, July 2026' },
  ],
  summary: 'A crypto wallet for people new to crypto, with PIG, an AI co-pilot that prepares actions and leaves the decision to the user.',
  screens: [
    { id: 'overview', nav: 'Overview', title: ['Crypto for first-timers,', 'through conversation'],
      lede: 'A returning client. After Danart designed the brand, the investor deck and the first concept screens, the client secured funding and came back to build the full product. Eight weeks later: 200+ screens, two themes and a component system for a wallet made for people new to crypto.',
      blocks: [{ type: 'meta', items: [
        { label: 'Role', value: 'Product Designer, two-person design team' },
        { label: 'Scope', value: 'Architecture, UX/UI, design system' },
        { label: 'Team', value: 'Design Manager (Danart), client’s developers' },
        { label: 'Timeline', value: 'Dec 2025 – Jan 2026, 8 weeks' },
        { label: 'Status', value: 'App Store, July 2026' },
      ] }],
      visual: { layout: 'single', items: [{ label: 'The Wallet home in both themes', spec: 'Главный экран кошелька в светлой и тёмной теме рядом. Телефоны прямо, без наклонов и рук, светлый фон.' }] } },

    { id: 'brief', nav: 'Brief', statement: true, title: ['How do you make crypto feel as familiar as a banking app', 'without hiding the parts that can cost someone money?'] },

    { id: 'context', nav: 'Context', wide: true, title: ['Same actions,', 'higher stakes.'],
      lede: 'A crypto wallet does what a banking app does. The difference is what happens when something goes wrong.',
      blocks: [{ type: 'table', head: ['In a banking app', 'In a crypto wallet'], rows: [
        ['Sending money', 'Pick a name or an account number. In crypto, paste a long address: one wrong character and the money is gone.'],
        ['A mistake', 'The bank can reverse it. In crypto, nobody can.'],
        ['Exchanging currency', 'One clear rate. In crypto, a rate, a network fee and sometimes a service fee.'],
        ['Forgotten password', 'Reset it by email. In crypto, lose the 12-word recovery phrase and the wallet is gone forever.'],
      ] }] },

    { id: 'rethinking', nav: 'Rethinking', title: ['What the client asked,', 'and what we solved.'],
      lede: 'This was our second project with the client. In the first, Danart designed his brand, the PinkCoin token site, the investor deck and the first concept screens, and I contributed to that phase. Between the two, the focus moved from a token for crypto-savvy users to a wallet for beginners. He came back with funding, a feature list and a wish for AI, without a defined role for it. We prioritised the features and defined the architecture first.',
      blocks: [{ type: 'decision', rows: [
        ['Build a crypto wallet with AI', 'Help beginners take irreversible financial actions without feeling overwhelmed'],
        ['Add many features', 'Prioritise a safe, understandable core'],
        ['Introduce AI', 'Define where AI adds value, and where it must never act alone'],
      ] }],
      visual: { layout: 'stack', items: [
        { label: 'PinkCoin site', spec: 'Сайт PinkCoin из первого этапа, один кадр.' },
        { label: 'First concept', spec: 'Исходный концепт-экран кошелька из первого этапа.' },
        { label: 'From the first concept to the product architecture', spec: 'Карта информационной архитектуры продукта (IA-карта): разделы, связи, где живёт PIG. Светлый фон.' },
      ] } },

    { id: 'market', nav: 'Market', title: ['Not afraid.', 'Unfamiliar.'],
      blocks: [
        { type: 'facts', caption: 'Market context', items: [
          { value: '27% vs 11%', label: 'US men vs women who have used crypto' },
          { value: '49%', label: 'Non-owners who don’t understand how crypto works' },
          { value: '43%', label: 'Non-owners worried about fraud' },
        ] },
        { type: 'note', text: 'Sources: Pew Research Center, 2026; NCA × Harris Poll, 2025. Market data on crypto users in general, not PinkWallet users.' },
      ],
      visual: { layout: 'single', items: [{ label: 'Who is held back, and why', spec: 'Простой график из двух пар столбцов: 27% и 11% (мужчины и женщины в США пользовались криптой), 49% и 43% (не понимают, как работает; боятся мошенничества). Цвета кейса, без осей и сетки.' }] } },

    { id: 'research', nav: 'Research', title: ['No research budget.', 'Still evidence.'],
      blocks: [
        { type: 'list', numbered: true, items: [
          { title: 'Competitor audit', body: 'Where common wallet experiences create friction for beginners.' },
          { title: 'App Store and Reddit reviews', body: 'Overloaded screens, fees that don’t match the final amount, failed sends, warnings for familiar addresses.' },
          { title: 'Borrowed conventions', body: 'Contacts from messaging apps, the review step from banking.' },
        ] },
        { type: 'cards', items: [
          { label: 'Assumption', title: 'Users bring banking habits: resets and refunds.' },
          { label: 'Assumption', title: 'The cost must be clear before the decision.' },
          { label: 'Assumption', title: 'People recognise names, not addresses.' },
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'What reviews say', spec: 'Коллаж из 6–8 стикеров с цитатами-жалобами из отзывов App Store и Reddit, сгруппированных по темам: fees, failed sends, overload, warnings.' }] } },

    { id: 'competitors', nav: 'Competitors', title: ['Built for people who', 'already know crypto.'],
      blocks: [
        { type: 'cards', items: [
          { label: 'Sending', title: 'Phantom: contacts, QR. Trust Wallet: addresses, QR.', body: 'PinkWallet: people with several wallets each.' },
          { label: 'Swap', title: 'Phantom: “You pay / You receive”. Trust Wallet: fees by provider.', body: 'PinkWallet: fee in % and dollars.' },
          { label: 'Security', title: 'Phantom: transaction checks. Trust Wallet: security scanner.', body: 'PinkWallet: friction only at irreversible moments.' },
          { label: 'Scope', title: 'Phantom: NFTs, DeFi. Trust Wallet: 100+ networks.', body: 'PinkWallet: 6 assets, core actions.' },
        ] },
        { type: 'contrast',
          from: { label: 'Typical wallet', items: ['Technical language', 'Raw addresses', 'No explanation', 'Hidden risk'] },
          to: { label: 'PinkWallet', items: ['Familiar actions', 'Saved contacts', 'Progressive explanation', 'Visible confirmation'] } },
      ],
      visual: { layout: 'row', items: [
        { label: 'Phantom', spec: 'Экран отправки в Phantom.' },
        { label: 'Trust Wallet', spec: 'Экран отправки в Trust Wallet.' },
        { label: 'PinkWallet', spec: 'Экран отправки в PinkWallet. Подпись под рядом: The same task in three wallets.' },
      ] } },

    { id: 'direction', nav: 'Direction', title: ['A familiar core,', 'two differences.'],
      lede: 'A beginner shouldn’t learn a new interface and a new kind of money at the same time.',
      blocks: [
        { type: 'bento', cells: [
          { icon: 'wallet', title: 'Wallet' },
          { icon: 'send', title: 'Send & receive' },
          { icon: 'repeat', title: 'Swap' },
          { icon: 'history', title: 'History' },
          { icon: 'contact', title: 'Contacts' },
          { icon: 'settings', title: 'Settings' },
          { icon: 'sparkles', title: 'PIG', body: 'AI co-pilot', fill: true },
          { icon: 'newspaper', title: 'Feed', body: 'Discovery, with a guide', fill: true },
        ] },
      ],
      visual: { layout: 'single', items: [{ label: 'Five tabs, two that are new', spec: 'Нижняя навигация из пяти вкладок крупно. PIG и Feed подсвечены цветом кейса, остальные три спокойные.' }] } },

    { id: 'priorities', nav: 'Priorities', wide: true, title: ['Four priorities,', 'in this order.'],
      blocks: [
        { type: 'table', head: ['Priority', 'Product goal'], rows: [
          ['1', 'Make core wallet actions understandable'],
          ['2', 'Prevent avoidable mistakes in irreversible actions'],
          ['3', 'Add AI assistance without removing user control'],
          ['4', 'Encourage discovery without pushing impulsive decisions'],
        ] },
      ] },

    { id: 'pig', nav: 'PIG', title: ['A co-pilot,', 'not an autopilot.'],
      lede: 'The cheaper path was no AI: tooltips and an FAQ. But crypto forces constant decisions about networks, fees and addresses. PIG helps at the moment of the decision.',
      blocks: [
        { type: 'chain', steps: ['User asks', 'PIG prepares the transaction', 'User reviews the details', 'User confirms'] },
        { type: 'cards', items: [
          { icon: 'sparkles', hi: true, title: 'PIG can explain, fill in details and flag risks.' },
          { icon: 'hand', title: 'Only the user can send money.' },
          { icon: 'mic', title: 'Optional: text, voice or call.' },
        ] },
        { type: 'quote', text: 'Totally fine. Everyone starts confused.', by: 'PIG' },
      ],
      visual: { layout: 'row', items: [
        { label: 'Ask', spec: 'Запрос пользователя в чате с PIG.' },
        { label: 'Prepare', spec: 'Подготовленная PIG транзакция: получатель, сумма, комиссия.' },
        { label: 'PIG prepares, the person decides', spec: 'Подтверждение пользователем. Три экрана по шагам цепочки.' },
      ] } },

    { id: 'feed', nav: 'Feed', title: ['Discovery,', 'with a guide.'],
      lede: 'News, videos and posts from X inside the wallet. A feed drives engagement, but crypto content can push impulsive decisions. PIG offers a way to slow down.',
      blocks: [
        { type: 'quote', text: 'Not sure what to make of this?', by: 'PIG in the Feed' },
        { type: 'note', text: 'For the first three visits, the Feed explains itself as part of onboarding, then gets out of the way.' },
      ],
      visual: { layout: 'row', items: [
        { label: 'Video post', spec: 'Пост-видео в ленте.' },
        { label: 'Post from X', spec: 'Пост из X в ленте.' },
        { label: 'PIG on the post', spec: 'Тот же пост со всплывающим PIG и вопросом «Not sure what to make of this?».' },
      ] } },

    { id: 'risk', nav: 'Risk', title: ['Friction only', 'where it protects.'],
      lede: 'Everywhere else, friction is the enemy. At irreversible moments, it is the safeguard.',
      blocks: [
        { type: 'decision', rows: [
          ['Wallet setup: losing access forever', 'Three progressive warnings, an acknowledgement, a PIN that can’t be recovered'],
          ['Transaction review: wrong address, network or amount', 'An explicit review step instead of one-tap sending'],
          ['During the transaction: unclear status', 'Progress and errors, never a guess'],
          ['After the transaction: unclear outcome', 'Done, or what needs attention'],
        ] },
        { type: 'note', text: 'I proposed splitting the recovery warnings into three short steps instead of one long message, to explain without overwhelming.' },
      ],
      visual: { layout: 'stack', items: [
        { label: 'Recovery phrase', spec: 'Экран recovery phrase с предупреждениями.' },
        { label: 'Review before sending', spec: 'Экран подтверждения перед отправкой.' },
        { label: 'Before, during, after', spec: 'Поток Before → During → After: три маленьких экрана в ряд (подтверждение, прогресс, результат).' },
      ] } },

    { id: 'costs', nav: 'Costs', title: ['Readable costs,', 'recognisable people.'],
      blocks: [
        { type: 'cards', items: [
          { icon: 'receipt', hi: true, label: 'Cost before commitment', title: 'Every amount in crypto and dollars.', body: '3% is easy to ignore, $3.60 is not.' },
          { icon: 'contact', label: 'Sending to people', title: 'Several wallets per contact, notes, invalid addresses flagged.' },
        ] },
        { type: 'note', text: 'PinkWallet launched with a 0% fee. The fee component supports percentage and fiat display for future charges.' },
      ],
      visual: { layout: 'stack', items: [
        { label: 'Fee component, designed for future charges', spec: 'Превью обмена с комиссией в процентах и в долларах.' },
        { label: 'Contact', spec: 'Карточка контакта с несколькими кошельками и заметкой.' },
        { label: 'Invalid address', spec: 'Ошибка адреса: как экран сообщает, что адрес неверный.' },
      ] } },

    { id: 'onboarding', nav: 'Onboarding', title: ['Introduced in the', 'order it’s used.'],
      lede: 'Eleven screens follow the app’s own logic: welcome and wallet, then Feed, PIG, Swap and Contacts, then theme, language and currency. Only then wallet creation.',
      blocks: [{ type: 'facts', caption: 'Onboarding', items: [
        { value: '11', label: 'Screens' }, { value: '5', label: 'Areas' }, { value: '3', label: 'Versions of the Feed screen' },
      ] }],
      visual: { layout: 'stack', items: [
        { label: 'Exploring the Feed screen', spec: 'Три версии слайда Feed рядом: V1, V2, V3.' },
        { label: 'Final screens', spec: 'Ряд финальных экранов онбординга: Welcome, Feed, PIG, Swap, Contacts.' },
      ] } },

    { id: 'cut', nav: 'What we cut', title: ['Saying no was', 'most of the job.'],
      blocks: [
        { type: 'callout', text: 'Does this reduce the chance someone loses money or gives up?' },
        { type: 'cards', items: [
          { label: 'Product', title: 'Trader-grade analytics', body: 'Beginners needed context, not a trading terminal.' },
          { label: 'Product', title: 'Autonomous transactions', body: 'PIG never moves money on its own.' },
          { label: 'Product', title: 'Buy recommendations', body: 'They pushed beginners toward speculation.' },
          { label: 'Product', title: 'Android', body: 'The budget covered one platform.' },
          { label: 'Process', title: 'Wireframes', body: 'Skipped to fit eight weeks. We defined the information architecture first, built on proven competitor patterns, and reviewed every section with the client.' },
        ] },
      ] },

    { id: 'ownership', nav: 'Ownership', title: ['Who owned', 'what.'],
      blocks: [
        { type: 'decision', rows: [
          ['Product direction and architecture', 'Shared with the Design Manager'],
          ['UX flows and interaction design', 'Me'],
          ['UI and design system', 'Me'],
          ['Client coordination', 'Design Manager'],
          ['Development', 'Client’s team'],
        ] },
        { type: 'note', text: 'We debated choices like how much fee detail to show, and aligned with the client section by section. With no direct line to the developers, motion was less specified, and the shipped transitions show it.' },
      ] },

    { id: 'system', nav: 'Design system', title: ['One product,', 'two moods.'],
      blocks: [{ type: 'bento', cells: [
        { icon: 'sun-moon', title: 'Two themes, same components', fill: true },
        { icon: 'component', title: 'Anything used twice became a component' },
        { icon: 'eye', title: 'WCAG AA', body: 'States by shape and label.' },
        { icon: 'box', title: '3D assets made with AI', body: 'Curated to one material, light and palette.' },
        { icon: 'pencil-line', title: 'Copy written by me, AI-assisted' },
      ] }],
      visual: { layout: 'stack', items: [
        { label: 'Coin card anatomy', spec: 'Карточка монеты с вариантами и разметкой анатомии: что из чего состоит, какие состояния.' },
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
      visual: { layout: 'single', items: [{ label: 'From first screen to a wallet', spec: 'Горизонтальная воронка: онбординг 80% → создание кошелька 85%. Отдельно 65% и 98% крупными цифрами. Без лишних осей и сетки.' }] } },

    { id: 'reflection', nav: 'Reflection', title: ['Built on convention,', 'never tested.'],
      lede: 'Everything here rests on convention and on reducing the cost of a mistake. That was the right call for eight weeks, but it’s still an assumption.',
      blocks: [
        { type: 'list', items: [
          { title: 'Test the confirmation step', body: 'Safety or friction?' },
          { title: 'Test trust in PIG', body: 'After its first prepared transaction.' },
          { title: 'Work with developers', body: 'Regular reviews and interaction specs.' },
          { title: 'Connect decisions to data', body: 'Before handoff.' },
        ] },
        { type: 'chain', steps: ['You send / They receive', 'Say a transfer is final', 'Check recovery understanding'] },
      ],
      visual: { layout: 'single', items: [{ label: 'Concept for the next iteration', spec: 'Экран подтверждения до и после: слева текущий, справа с блоком «You send / They receive» и фразой о том, что перевод окончательный.' }] } },

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
const parked = new Set(['world-of-colors', 'reboot-hub', 'bobyard']);
export const bySide = (side: Side) => cases.filter((c) => c.side === side && !parked.has(c.slug));
