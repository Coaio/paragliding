import type { APIRoute } from 'astro';
import { loadEntries, entryHref, rssFeed } from '../lib/content';
import { SITE, withBase } from '../lib/site';

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? SITE.url;
  const { all } = await loadEntries();
  const body = rssFeed({
    title: SITE.title,
    link: new URL(withBase('/'), origin).href,
    description: SITE.description,
    items: all.map((entry) => ({
      title: entry.data.title,
      link: new URL(entryHref(entry), origin).href,
      description: entry.data.description,
      date: entry.data.date,
    })),
  });
  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
