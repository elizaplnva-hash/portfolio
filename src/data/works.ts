// Single works (pictures), filtered by skill on /brand/work. Not cases.
export type Work = {
  src: string; alt: string; project: string; skill: string;
  role: 'mine' | 'contributed'; note: string; caseSlug?: string; side: 'brand' | 'product'; side_work?: boolean;
};

const P = '/images/';
const seq = (src: string, alt: string, skill: string, note: string, role: Work['role'] = 'mine'): Work => ({ src: P + src, alt, project: 'Sequoia', skill, role, note, caseSlug: 'sequoia', side: 'brand' });
const ben = (src: string, alt: string, skill: string, note: string, role: Work['role'] = 'mine'): Work => ({ src: P + src, alt, project: 'Ben AI', skill, role, note, caseSlug: 'ben-ai', side: 'brand' });
const tor = (src: string, alt: string, skill: string, note: string): Work => ({ src: P + src, alt, project: 'Insider Talks', skill, role: 'contributed', note, caseSlug: 'insider-talks', side: 'brand' });
const prod = (src: string, alt: string, project: string, caseSlug: string, note: string, skill = 'Product design'): Work => ({ src: P + src, alt, project, skill, role: 'mine', note, caseSlug, side: 'product' });

export const works: Work[] = [
  // Product design: screens from the product cases
  prod('pinkwallet-hero.webp', 'PinkWallet home screens in dark and light themes', 'PinkWallet', 'pinkwallet', 'Wallet screens for first-time crypto users.'),
  prod('pw-swap.webp', 'PinkWallet swap flow on three phones', 'PinkWallet', 'pinkwallet', 'Swap flow.'),
  prod('pw-onboarding.webp', 'PinkWallet onboarding screens with the PIG assistant', 'PinkWallet', 'pinkwallet', 'Onboarding.'),
  prod('pw-system.webp', 'PinkWallet UI kit: coins, lists, buttons and states', 'PinkWallet', 'pinkwallet', 'UI kit in two themes.', 'Design system'),
  prod('gcs-dashboard.webp', 'Green Credit Score dashboard with three bureau scores', 'Green Credit Score', 'green-credit-score', 'Dashboard.'),
  prod('gcs-landing.webp', 'Green Credit Score landing page and phone view', 'Green Credit Score', 'green-credit-score', 'Landing page.', 'Landing pages'),
  prod('jam-hifi.webp', 'Jam Social analytics screens on three phones', 'Jam Social', 'jam', 'Analytics screens.'),
  prod('jam-home.webp', 'Jam Social app screens', 'Jam Social', 'jam', 'App screens.'),
  prod('lap-hero.webp', 'Lapunzel store on three phones', 'Lapunzel', 'lapunzel', 'Mobile store.'),

  // Sequoia
  seq('seq-brand.webp', 'Sequoia logo, mark parts and colour palette on a brand board', 'Brand book', 'The logo is by the agency team; I built the brand book.'),
  seq('seq-system-left.webp', 'Sequoia type and colour specimen', 'Colour & type', 'Colour and type system.'),
  seq('seq-system-right.webp', 'Sequoia plumbing icon set on dark', 'Iconography', 'Icon set.'),
  seq('seq-van-hero.webp', 'Sequoia branded white and green service van', 'Vehicle wrap', 'I helped with the van wrap.', 'contributed'),
  seq('seq-cards.webp', 'Sequoia business cards, stacked and scattered', 'Business cards', 'I helped with the cards.', 'contributed'),
  seq('seq-sticker-emergency.webp', 'Emergency number sticker on a water heater', 'Stickers & labels', 'Service stickers for water heaters.'),
  seq('seq-sticker-service.webp', 'Water heater service record sticker', 'Stickers & labels', 'Service record label.'),
  seq('seq-caps-green.webp', 'Green Sequoia caps, front and back', 'Merch & apparel', 'Caps.'),
  seq('seq-cap-worn.webp', 'White Sequoia cap worn from behind', 'Merch & apparel', 'Caps.'),
  seq('seq-polo-green.webp', 'Green Sequoia polo, front and back', 'Merch & apparel', 'Polos.'),
  seq('seq-polo-white.webp', 'White Sequoia polo, front and back', 'Merch & apparel', 'Polos.'),
  seq('seq-polo-back-team.webp', 'Plumbers wearing green Sequoia polos, seen from behind', 'Merch & apparel', 'Polos.'),
  seq('seq-1.webp', 'Sequoia website open on a laptop', 'Mockups', 'Website mockup.'),
  seq('seq-home.webp', 'Sequoia home page', 'Website', 'I briefed the site and laid out all seven pages.'),
  seq('seq-2.webp', 'Sequoia deals and quote form page', 'Website', 'Seven pages in two days.'),
  seq('seq-3.webp', 'Sequoia services grid page', 'Website', 'Seven pages in two days.'),
  seq('seq-5.webp', 'Sequoia reviews and service area page', 'Website', 'Seven pages in two days.'),
  seq('seq-9.webp', 'Sequoia smart water shutoff service page', 'Website', 'Service page.'),

  // Ben AI
  ben('ben-concept-1.webp', 'Ben AI robot logo concept on white', 'Logo', 'Logo direction: robot face.'),
  ben('ben-concept-2.webp', 'Ben AI speech bubble with eyes on dark', 'Logo', 'Logo direction: bubble with eyes.'),
  ben('ben-concept-3.webp', 'Ben AI rounded mascot logo concept', 'Logo', 'Logo direction: rounded mascot.'),
  ben('ben-concept-4.webp', 'Ben AI robot with antenna logo concept', 'Logo', 'Logo direction: robot with antenna.'),
  ben('ben-colors.webp', 'Ben AI mark on a grid with a six-colour palette', 'Colour & type', 'Palette and mark construction.'),
  ben('ben-monitors.webp', 'Ben AI website on three monitors', 'Website', 'Lead Designer at Danart: brand and website.'),
  ben('ben-c-yelp-ads.webp', 'Ben AI Yelp Ads page', 'Landing pages', 'Product page for one lead source.'),
  ben('ben-c-pricing.webp', 'Ben AI pricing page', 'Website', 'Pricing page.'),
  ben('ben-print-brochure.webp', 'Ben AI brochure with Yelp lead stats', 'Print collateral', 'Brochure for events.'),
  ben('ben-print-cards.webp', 'Ben AI business cards', 'Business cards', 'Cards.'),
  ben('ben-banner.webp', 'Ben AI street banner: never miss a Yelp lead', 'Signage', 'Event banner.'),

  // Insider Talks
  tor('insider-s1.webp', 'Insider Talks title slide', 'Presentations & decks', 'I set the direction; a designer on my team built the basics.'),
  tor('insider-s3.webp', 'Insider Talks slide with three large numbers', 'Presentations & decks', 'Deck slide.'),
  tor('insider-s4.webp', 'Insider Talks slide: speed turns leads into revenue', 'Presentations & decks', 'Deck slide.'),
  tor('insider-p-first.webp', 'Instagram post: first reply always wins', 'Social media', 'Vertical post template.'),
  tor('insider-p-invite.webp', 'Instagram post: you are invited to Insider Talks', 'Social media', 'Vertical post template.'),
  tor('insider-p-handles.webp', 'Instagram post: how AI actually handles leads', 'Social media', 'Vertical post template.'),
];

const slug = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const skillSlug = slug;

// chips: Product design first, then the rest by number of works
export const skills = (() => {
  const m = new Map<string, number>();
  works.forEach((w) => m.set(w.skill, (m.get(w.skill) ?? 0) + 1));
  const list = [...m.entries()].map(([name, count]) => ({ name, slug: slug(name), count }));
  const pd = list.filter((s) => s.name === 'Product design');
  const rest = list.filter((s) => s.name !== 'Product design').sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  return [...pd, ...rest];
})();
export const projectCount = new Set(works.map((w) => w.project)).size;
