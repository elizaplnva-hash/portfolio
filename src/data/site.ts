import skills from './skills.json';
import { bySide, type CaseData } from './cases';

export type Side = 'front' | 'back';

export interface Case {
  name: string;          // first tag, product name
  tags: string[];        // domain tags
  headline: string;      // one selling headline
  color: string;         // placeholder fill until real images arrive
  image?: string;        // /images/... when ready
  slug: string;
  href: string;
  big?: boolean;
}

export interface Social { label: string; href: string; kind: 'linkedin' | 'instagram' | 'behance' | 'email' | 'cv'; }

const socials: Record<string, Social> = {
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/elizaplnva/', kind: 'linkedin' },
  behance: { label: 'Behance', href: 'https://www.behance.net/lizapopelinova', kind: 'behance' },
  email: { label: 'Email', href: 'mailto:elizaplnva@gmail.com', kind: 'email' },
  cv: { label: 'CV', href: 'https://docs.google.com/document/d/1YjUz99y6IoWJ0SpFcVYLKatav0It3E2y/edit?usp=sharing', kind: 'cv' },
};

const toTile = (c: CaseData): Case => ({ name: c.name, tags: c.tags, headline: c.headline, color: c.color, image: c.image, big: c.big, slug: c.slug, href: `/work/${c.slug}` });

const process = [
  { title: 'Research', text: 'I never skip it. Who is already on the market, how they look, what they changed and how it worked.', tags: ['Market scan', 'Competitor audit', 'Reference search', 'Interviews', 'Surveys'] },
  { title: 'Understand', text: 'I look past what the client asks for to the reason behind it. Like a prompt: taken literally, the answer can miss the point.', tags: ['Stakeholder talks', 'Business priorities', 'Problem framing', 'Hypotheses'] },
  { title: 'Design', text: 'Flows, screens and a system that scales, checked against what we found.', tags: ['User flows', 'Wireframes', 'UI design', 'Prototyping', 'Design system'] },
  { title: 'Deliver', text: 'Specs and documentation that developers can build from.', tags: ['Handoff specs', 'Documentation', 'Dev collaboration', 'Design QA', 'Reflection'] },
];

export const sides = {
  front: {
    title: 'Eliza Popelinova — Senior Product Designer',
    role: 'Complex <b>fintech and AI</b> products, made <b>clear</b>.',
    pitch: '',
    pitchSub: 'Senior Product Designer with 6+ years designing products people trust with their money and personal data.',
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
    process, // text to be reworked towards branding
    photo: '/images/eliza-dark.webp', photoPos: '50% 0%',
    socials: [socials.behance, socials.linkedin, socials.email, socials.cv],
    skills: skills.back as { svg: string; label: string }[],
    cases: bySide('back').map(toTile),
    turn: { small: 'Curious how I design products?', big: 'Flip to the front', href: '/', label: 'Turn over to Product work' },
  },
} as const;
