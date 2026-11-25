import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const site = (process.env.SITE || 'https://paragliding.app').replace(/\/$/, '');
const rawBase = process.env.BASE_PATH || '/';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/|\/$/g, '')}`;

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  publicDir: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 1313,
    host: true,
  },
});
