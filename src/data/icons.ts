import { readFileSync, existsSync } from 'node:fs';

// Build-time only: inlines an SVG so the page ships no icon library and no client JS.
// Case pages use Tabler's filled set; a Lucide outline is the fallback for names Tabler has no filled twin for.
const cache = new Map<string, string>();
const alias: Record<string, string> = {
  wallet: 'credit-card', send: 'arrow-big-right', repeat: 'exchange', blend: 'exchange', history: 'clock', users: 'user',
  'user-round-check': 'user', contact: 'book', sparkles: 'stars', newspaper: 'file-text', 'sun-moon': 'moon', component: 'puzzle',
  box: 'box-multiple', package: 'box-multiple', 'pencil-line': 'file-description', layers: 'stack-2', rocket: 'bolt', zap: 'bolt',
  inbox: 'mail-opened', receipt: 'file-invoice', network: 'sitemap', 'key-round': 'key', smartphone: 'device-mobile',
  'badge-check': 'rosette-discount-check', 'calendar-clock': 'calendar', 'calendar-search': 'calendar', 'chart-no-axes-column': 'chart-pie',
  'eye-off': 'eye', 'flask-conical': 'flask', 'mouse-pointer-click': 'pointer', search: 'zoom', route: 'timeline-event',
};
export function icon(name?: string): string {
  if (!name) return '';
  if (!cache.has(name)) {
    const cwd = process.cwd();
    const filled = `${cwd}/node_modules/@tabler/icons/icons/filled/${alias[name] ?? name}.svg`;
    try {
      const file = existsSync(filled) ? filled : `${cwd}/node_modules/lucide-static/icons/${name}.svg`;
      cache.set(name, readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '').trim());
    } catch { cache.set(name, ''); }
  }
  return cache.get(name)!;
}

export const metaIcon: Record<string, string> = {
  Role: 'briefcase', Timeline: 'clock', Platform: 'smartphone', Status: 'circle-check', Team: 'users', Scope: 'layers', Launch: 'rocket', Collaboration: 'users', Responsibilities: 'layers', Position: 'briefcase', Outcome: 'award', Deliverables: 'package',
};
