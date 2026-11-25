import { getCollection, type CollectionEntry } from 'astro:content';
import { APP_CATEGORIES, PAGE_SIZE, SECTIONS, humanize, withBase } from './site';

export type Application = CollectionEntry<'applications'>;
export type Tutorial = CollectionEntry<'tutorials'>;
export type Entry = Application | Tutorial;
export type SectionKey = keyof typeof SECTIONS;

export function entryHref(entry: Entry) {
  return withBase(`/${entry.collection}/${entry.id}/`);
}

export function sortEntries<T extends Entry>(entries: T[]) {
  return [...entries].sort((a, b) => {
    const byWeight = a.data.weight - b.data.weight;
    if (byWeight !== 0) return byWeight;
    return a.data.title.localeCompare(b.data.title, 'en', { sensitivity: 'base' });
  });
}

export async function loadApplications() {
  return sortEntries(await getCollection('applications'));
}

export async function loadTutorials() {
  return sortEntries(await getCollection('tutorials'));
}

export async function loadEntries() {
  const [applications, tutorials] = await Promise.all([loadApplications(), loadTutorials()]);
  return { applications, tutorials, all: [...applications, ...tutorials] };
}

export function groupApplications(applications: Application[]) {
  return APP_CATEGORIES.map((category) => ({
    ...category,
    entries: applications.filter((entry) => entry.data.category === category.id),
  })).filter((group) => group.entries.length > 0);
}

export function relatedEntries(entry: Entry, all: Entry[], count = 2) {
  const tags = new Set(entry.data.tags);
  return all
    .filter((item) => !(item.collection === entry.collection && item.id === entry.id))
    .map((item) => ({
      item,
      score: item.data.tags.filter((tag) => tags.has(tag)).length,
    }))
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.item.data.title.localeCompare(b.item.data.title, 'en', { sensitivity: 'base' }),
    )
    .slice(0, count)
    .map((item) => item.item);
}

export function paginate<T>(items: T[], page: number) {
  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const current = Math.min(Math.max(page, 1), pages);
  const start = (current - 1) * PAGE_SIZE;
  return {
    page: current,
    pages,
    items: items.slice(start, start + PAGE_SIZE),
    hasPrev: current > 1,
    hasNext: current < pages,
  };
}

export function pageHref(base: string, page: number) {
  const root = base.endsWith('/') ? base : `${base}/`;
  if (page <= 1) return withBase(root);
  return withBase(`${root}page/${page}/`);
}

export async function sectionEntries(section: SectionKey) {
  return section === 'applications' ? loadApplications() : loadTutorials();
}

export function sectionPages(count: number) {
  const pages = Math.ceil(count / PAGE_SIZE);
  const paths: { page: string }[] = [];
  for (let page = 2; page <= pages; page += 1) paths.push({ page: String(page) });
  return paths;
}

export interface TagGroup {
  slug: string;
  title: string;
  entries: Entry[];
}

export async function tagGroups() {
  const { all } = await loadEntries();
  const groups = new Map<string, Entry[]>();
  for (const entry of all) {
    for (const tag of entry.data.tags) {
      const list = groups.get(tag) ?? [];
      list.push(entry);
      groups.set(tag, list);
    }
  }
  return [...groups.entries()]
    .map(([slug, entries]) => ({
      slug,
      title: humanize(slug),
      entries: sortEntries(entries),
    }))
    .sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));
}

export function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function rssFeed(options: {
  title: string;
  link: string;
  description: string;
  items: { title: string; link: string; description: string; date: Date }[];
}) {
  const items = options.items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid>${escapeXml(item.link)}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(options.title)}</title>
    <link>${escapeXml(options.link)}</link>
    <description>${escapeXml(options.description)}</description>
${items}
  </channel>
</rss>
`;
}
