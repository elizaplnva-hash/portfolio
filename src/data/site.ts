import skills from './skills.json';
import { bySide, type CaseData } from './cases';

export type Side = 'front' | 'back';

export interface Case {
  phones?: string[];
  desk?: boolean;
  mark?: string;
  name: string;          // first tag, product name
  tags: string[];        // domain tags
  headline: string;      // one selling headline
  color: string;         // placeholder fill until real images arrive
  image?: string;        // /images/... when ready
  slug: string;
  href: string;
  big?: boolean;
  sub?: string;
}

export interface Social { label: string; href: string; kind: 'linkedin' | 'instagram' | 'behance' | 'email' | 'cv'; }

const socials: Record<string, Social> = {
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/elizaplnva/', kind: 'linkedin' },
  behance: { label: 'Behance', href: 'https://www.behance.net/lizapopelinova', kind: 'behance' },
  email: { label: 'Email', href: 'mailto:elizaplnva@gmail.com', kind: 'email' },
  cv: { label: 'CV', href: '/Eliza_Popelinova_Senior_Product_Designer_Resume.pdf', kind: 'cv' },
};

const toTile = (c: CaseData): Case => ({ name: c.name, tags: c.tags, headline: c.headline, color: c.color, image: c.image, phones: c.phones, desk: c.desk, mark: c.mark, sub: c.sub, big: c.big, slug: c.slug, href: `/work/${c.slug}` });

const process = [
  { title: 'Research', text: 'I never skip it. Who is already on the market, how they look, what they changed and how it worked.', tags: ['Market scan', 'Competitor audit', 'Reference search', 'Interviews', 'Surveys'] },
  { title: 'Understand', text: 'I look past what the client asks for to the reason behind it. Like a prompt: taken literally, the answer can miss the point.', tags: ['Stakeholder talks', 'Business priorities', 'Problem framing', 'Hypotheses'] },
  { title: 'Design', text: 'Flows, screens and a system that scales, checked against what we found.', tags: ['User flows', 'Wireframes', 'UI design', 'Prototyping', 'Design system'] },
  { title: 'Deliver', text: 'Specs and documentation that developers can build from.', tags: ['Handoff specs', 'Documentation', 'Dev collaboration', 'Design QA', 'Reflection'] },
];

const brandProcess = [
  { title: 'Research', text: 'Who the business is, who it talks to and who else is in the room, before anything is drawn.', tags: ['Market scan', 'Competitor audit', 'Reference search', 'Stakeholder talks'] },
  { title: 'Concept', text: 'One idea the whole brand can lean on, tested against the audience and the category.', tags: ['Positioning', 'Moodboards', 'Naming', 'Direction'] },
  { title: 'Identity', text: 'Logo, type and colour that hold together from a favicon to a billboard.', tags: ['Logo', 'Typography', 'Colour', 'Guidelines'] },
  { title: 'Apply', text: 'The identity at work: the website, print and merch that people actually touch.', tags: ['Website', 'Print', 'Merch', 'Handoff'] },
];

export const sides = {
  front: {
    title: 'Eliza Popelinova — Senior Product Designer',
    role: 'Complex <b>fintech and AI</b> products, made <b>clear</b>',
    pitch: '',
    pitchSub: 'Senior Product Designer bringing order from the first wireframe to launch.',
    process,
    photo: '/images/eliza-home.webp', photoPos: '62% 35%',
    socials: [socials.linkedin, socials.behance, socials.email, socials.cv],
    skills: skills.front as { svg: string; label: string }[],
    cases: bySide('front').map(toTile),
    turn: { small: 'Seen enough screens?', big: 'Now the brand work', href: '/visual', label: 'Turn over to Brand and Visual work' },
  },
  back: {
    title: 'Eliza Popelinova — Brand & Visual Designer',
    role: '<b>Brand and visual</b> designer',
    pitch: '',
    pitchSub: 'Story first, style second: identities, websites and illustration that feel like one brand.',
    process: brandProcess,
    photo: '/images/eliza-dark.webp', photoPos: '50% 0%',
    socials: [socials.behance, socials.linkedin, socials.email, socials.cv],
    skills: skills.back as { svg: string; label: string }[],
    cases: bySide('back').map(toTile),
    turn: { small: 'Curious how I design products?', big: 'Flip to the front', href: '/', label: 'Turn over to Product work' },
  },
} as const;
