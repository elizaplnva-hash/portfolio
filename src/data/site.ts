import skills from './skills.json';
import { bySide, type CaseData } from './cases';

export type Side = 'front' | 'back';

export interface Case {
  name: string;          // first tag, product name
  tags: string[];        // domain tags
  headline: string;      // one selling headline
  color: string;         // placeholder fill until real images arrive
  image?: string;        // /images/... when ready
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

const toTile = (c: CaseData): Case => ({ name: c.name, tags: c.tags, headline: c.headline, color: c.color, image: c.image, big: c.big, href: `/work/${c.slug}` });

export const sides = {
  front: {
    title: 'Eliza Popelinova — Senior Product Designer',
    pitch: 'Research first, pixels second. I design products people understand on the first try.',
    socials: [socials.linkedin, socials.behance, socials.email, socials.cv],
    skills: skills.front as { svg: string; label: string }[],
    cases: bySide('front').map(toTile),
    turn: { small: 'Seen enough screens?', big: 'Now the brand work', href: '/visual', label: 'Turn over to Brand and Visual work' },
  },
  back: {
    title: 'Eliza Popelinova — Brand & Visual Designer',
    pitch: 'Story first, style second. Identities, websites and illustration that feel like one brand.',
    socials: [socials.behance, socials.linkedin, socials.email, socials.cv],
    skills: skills.back as { svg: string; label: string }[],
    cases: bySide('back').filter((c) => c.slug !== 'bobyard').map(toTile), // grid fits 4 back cases; Bobyard is parked until she picks a slot
    turn: { small: 'Curious how I design products?', big: 'Flip to the front', href: '/', label: 'Turn over to Product work' },
  },
} as const;
