import type { APIRoute } from 'astro';
import { entryHref, loadTutorials, rssFeed } from '../../lib/content';
import { SECTIONS, SITE, withBase } from '../../lib/site';

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? SITE.url;
  const entries = await loadTutorials();
  const body = rssFeed({
    title: `${SITE.title} - ${SECTIONS.tutorials.title}`,
    link: new URL(withBase('/tutorials/'), origin).href,
    description: SECTIONS.tutorials.description,
    items: entries.map((entry) => ({
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
