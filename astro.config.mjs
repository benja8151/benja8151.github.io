// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Root user-site: served at https://benja8151.github.io (no base path).
export default defineConfig({
  site: 'https://benja8151.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
