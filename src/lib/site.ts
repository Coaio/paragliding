export const SITE = {
  title: 'Paragliding App',
  description:
    'Curated directory of paragliding apps, websites, maps, instruments, weather tools, and tutorials for free-flight pilots.',
  keywords:
    'paragliding, hang gliding, free flight, paragliding apps, flight instruments, weather, launch sites, cross country, tutorials',
  author: 'Paragliding App',
  url: 'https://paragliding.app',
  footerBlurb: 'A directory of paragliding applications, websites, and tutorials.',
} as const;

export const MENU = [
  { name: 'Home', href: '/' },
  { name: 'Applications', href: '/applications/' },
  { name: 'Tutorials', href: '/tutorials/' },
  { name: 'Contact us', href: '/contact-us/' },
] as const;

export const SECTIONS = {
  applications: {
    title: 'Applications',
    description:
      'Android, iOS, and web tools for instruments, maps, weather, contests, and the sites pilots keep open.',
  },
  tutorials: {
    title: 'Tutorials',
    description:
      'Films to watch between real lessons. They are not a school, so practice overhead, stall, and near-ground skills with an instructor.',
  },
} as const;

export const PAGE_SIZE = 9;

export const CONTACT = {
  title: 'Contact us',
  description: 'Send a message about the paragliding app directory.',
  form: 'https://docs.google.com/forms/d/e/1FAIpQLSe3x0SUON0z69YPTavCd7b-tlsclAROdXXgjwixlSoW407Mmw/viewform?embedded=true',
} as const;

export function pageTitle(title?: string) {
  if (!title || title === SITE.title) return SITE.title;
  return `${SITE.title} - ${title}`;
}

export function pageKeywords(extra: string[] = []) {
  const parts = extra.map((item) => item.trim()).filter(Boolean);
  if (parts.length === 0) return SITE.keywords;
  return `${SITE.keywords}, ${parts.join(', ')}`;
}

export function plain(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

export function humanize(value: string) {
  const spaced = value.replace(/[-_]/g, ' ').trim();
  if (!spaced) return spaced;
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function machineDate(date: Date) {
  return date.toISOString().replace('.000Z', '+00:00');
}

export function longDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function cardDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function readingMinutes(body: string | undefined) {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function withBase(path: string) {
  if (!path || /^(https?:)?\/\//.test(path) || path.startsWith('mailto:')) return path;
  const base = import.meta.env.BASE_URL || '/';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (base === '/') return normalized;
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  if (normalized === prefix || normalized.startsWith(`${prefix}/`)) return normalized;
  if (normalized === '/') return base.endsWith('/') ? base : `${prefix}/`;
  return `${prefix}${normalized}`;
}

export function imageSrc(image: string) {
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  return withBase(image.startsWith('/') ? image : `/${image}`);
}

export function absoluteUrl(path: string, origin: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return new URL(path, origin).href;
}

export type MenuState = 'page' | 'ancestor' | null;

export function menuState(href: string, pathname: string): MenuState {
  const target = withBase(href);
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const home = withBase('/');
  if (target === home) return path === home ? 'page' : null;
  if (path === target) return 'page';
  if (path.startsWith(target)) return 'ancestor';
  return null;
}
