import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://bonnet.bzh',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
