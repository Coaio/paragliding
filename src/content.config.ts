import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const entrySchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  image: z.string(),
  tags: z.array(z.string()).default([]),
  weight: z.number().default(0),
  aliases: z.array(z.string()).default([]),
  summary: z.string().optional(),
});

const applications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/applications' }),
  schema: entrySchema,
});

const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tutorials' }),
  schema: entrySchema,
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { applications, tutorials, pages };
