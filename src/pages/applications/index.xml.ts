import type { APIRoute } from 'astro';
import { entryHref, loadApplications, rssFeed } from '../../lib/content';
import { SECTIONS, SITE, withBase } from '../../lib/site';

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? SITE.url;
  const entries = await loadApplications();
  const body = rssFeed({
    title: `${SITE.title} - ${SECTIONS.applications.title}`,
    link: new URL(withBase('/applications/'), origin).href,
    description: SECTIONS.applications.description,
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
