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
  integrations: [
    sitemap({
      // La 404 racine (src/pages/404.astro) est déjà exclue automatiquement
      // par l'intégration ; la 404 anglaise (src/pages/en/404.astro), route
      // imbriquée ordinaire pour Astro, ne l'est pas — exclue ici à la main.
      // Note : /en/ressources/ reste listée même tant qu'elle est vide (le
      // filtre n'a pas accès aux collections de contenu à ce stade du build) ;
      // la balise noindex de la page, elle, est correcte et dynamique — c'est
      // elle qui empêche réellement l'indexation, indépendamment du sitemap.
      filter: (page) => !page.includes('/404/'),
    }),
  ],
});
