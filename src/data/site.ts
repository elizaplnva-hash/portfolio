import skills from './skills.json';

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
  linkedin: { label: 'LinkedIn', href: '#', kind: 'linkedin' },
  instagram: { label: 'Instagram', href: '#', kind: 'instagram' },
  behance: { label: 'Behance', href: '#', kind: 'behance' },
  email: { label: 'Email', href: 'mailto:elizaplnva@gmail.com', kind: 'email' },
  cv: { label: 'CV, PDF', href: '#', kind: 'cv' },
};

export const sides = {
  front: {
    title: 'Eliza Popelinova — Senior Product Designer',
    pitch: 'Research first, pixels second. I design products people understand on the first try.',
    socials: [socials.linkedin, socials.instagram, socials.behance, socials.email, socials.cv],
    skills: skills.front as { svg: string; label: string }[],
    cases: [
      { name: 'PinkWallet', tags: ['Fintech', 'AI'], headline: "Crypto that doesn't scare first-time users", color: '#ff8fc8', href: '#', big: true },
      { name: 'Jam', tags: ['Consumer', 'UX research'], headline: 'Turned a contact-collecting app into a reason to follow up', color: '#6b8cff', href: '#' },
      { name: 'Lapunzel', tags: ['E-commerce', 'Conversion'], headline: 'Reframed a redesign as a trust problem', color: '#ffb547', href: '#' },
      { name: 'Green Credit Score', tags: ['Fintech', 'Web'], headline: '[Headline: what was hard and what we achieved]', color: '#3ccf7a', href: '#' },
    ] as Case[],
    turn: { small: 'Seen enough screens?', big: 'Now the brand work', href: '/visual', label: 'Turn over to Brand and Visual work' },
  },
  back: {
    title: 'Eliza Popelinova — Brand & Visual Designer',
    pitch: 'Story first, style second. Identities, websites and illustration that feel like one brand.',
    socials: [socials.behance, socials.instagram, socials.linkedin, socials.email, socials.cv],
    skills: skills.back as { svg: string; label: string }[],
    cases: [
      { name: 'World of Colors', tags: ['Brand', 'Website'], headline: '[Headline: what was hard and what we achieved]', color: '#ff5a36', href: '#', big: true },
      { name: 'Ben AI', tags: ['AI SaaS', 'Brand system'], headline: 'A brand system that won the client its first industry award', color: '#7b61ff', href: '#' },
      { name: 'Re:Boot Hub', tags: ['Consulting', 'Brandbook'], headline: 'A brand built on speed, structure and truth', color: '#e8ff3a', href: '#' },
      { name: 'Bobyard', tags: ['Construction AI', 'Illustration'], headline: 'Visuals for a construction-AI startup, later backed by a $35M Series A', color: '#e8541e', href: '#' },
    ] as Case[],
    turn: { small: 'Curious how I design products?', big: 'Flip to the front', href: '/', label: 'Turn over to Product work' },
  },
} as const;
