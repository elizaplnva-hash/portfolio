import { readFileSync } from 'node:fs';

// Build-time only: inlines a Lucide SVG so the page ships no icon library and no client JS.
const cache = new Map<string, string>();
export function icon(name?: string): string {
  if (!name) return '';
  if (!cache.has(name)) {
    try {
      cache.set(name, readFileSync(`${process.cwd()}/node_modules/lucide-static/icons/${name}.svg`, 'utf8').replace(/<!--[\s\S]*?-->/g, '').trim());
    } catch { cache.set(name, ''); }
  }
  return cache.get(name)!;
}

export const metaIcon: Record<string, string> = {
  Role: 'briefcase', Timeline: 'clock', Platform: 'smartphone', Status: 'circle-check', Team: 'users', Scope: 'layers', Outcome: 'award', Deliverables: 'package',
};
