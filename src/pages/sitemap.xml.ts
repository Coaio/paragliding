import type { APIRoute } from 'astro';
import { entryHref, loadEntries, tagGroups } from '../lib/content';
import { SITE, withBase } from '../lib/site';

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? SITE.url;
  const { all } = await loadEntries();
  const tags = await tagGroups();
  const paths = [
    '/',
    '/about/',
    '/applications/',
    '/tutorials/',
    '/contact-us/',
    '/tags/',
    ...all.map((entry) => entryHref(entry)),
    ...tags.map((tag) => `/tags/${tag.slug}/`),
  ];
  const urls = paths
    .map((path) => `  <url><loc>${new URL(withBase(path), origin).href}</loc></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
