// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Root user-site: served at https://benja8151.github.io (no base path).
// i18n: English (default, at /) and Slovenian (at /sl/).
export default defineConfig({
  site: 'https://benja8151.github.io',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sl'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
