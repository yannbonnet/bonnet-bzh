import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://bonnet.bzh',
  // build.format par défaut ('directory') : chaque route sort en dossier/index.html.
  // trailingSlash explicite en 'always' pour que ce soit une politique déclarée plutôt
  // qu'un défaut implicite — les liens internes (hrefs écrits à la main, non générés
  // par Astro) doivent être alignés à la main sur cette même convention.
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
});
