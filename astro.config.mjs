import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

// lastmod du sitemap : dérivé du dernier commit git du fichier source de
// chaque page, jamais d'une date inventée ou de la date de build (qui serait
// identique pour toutes les pages à chaque déploiement, donc sans valeur).
// Nécessite un historique complet (fetch-depth: 0 dans le workflow de déploiement) —
// un clone superficiel ne verrait qu'un seul commit par fichier.
const dateDernierCommitCache = new Map();
function dateDernierCommit(cheminRelatif) {
  if (dateDernierCommitCache.has(cheminRelatif)) return dateDernierCommitCache.get(cheminRelatif);
  let date;
  if (existsSync(cheminRelatif)) {
    try {
      const sortie = execSync(`git log -1 --format=%cI -- "${cheminRelatif}"`, {
        encoding: 'utf-8',
      }).trim();
      date = sortie || undefined;
    } catch {
      date = undefined;
    }
  }
  dateDernierCommitCache.set(cheminRelatif, date);
  return date;
}

// Correspondance URL → fichier source, pour les pages statiques comme pour
// les fiches de contenu. Les pages de thème renvoient au fichier modèle
// [theme].astro plutôt qu'à une fiche précise, faute d'un fichier unique à
// désigner pour une page qui agrège plusieurs ressources.
function fichierPourChemin(pathname) {
  let m;
  if ((m = pathname.match(/^\/communs\/theme\/[^/]+\/$/))) {
    return 'src/pages/communs/theme/[theme].astro';
  }
  if ((m = pathname.match(/^\/en\/commons\/theme\/[^/]+\/$/))) {
    return 'src/pages/en/commons/theme/[theme].astro';
  }
  if ((m = pathname.match(/^\/communs\/([^/]+)\/$/))) {
    return `src/content/ressources/fr/${m[1]}.md`;
  }
  if ((m = pathname.match(/^\/en\/commons\/([^/]+)\/$/))) {
    return `src/content/ressources/en/${m[1]}.md`;
  }
  if (pathname === '/communs/') return 'src/pages/communs/index.astro';
  if (pathname === '/en/commons/') return 'src/pages/en/commons/index.astro';
  if (pathname === '/en/a-propos/') return 'src/pages/en/a-propos.astro';
  if (pathname === '/a-propos/') return 'src/pages/a-propos.astro';
  if (pathname === '/en/mentions-legales/') return 'src/pages/en/mentions-legales.astro';
  if (pathname === '/mentions-legales/') return 'src/pages/mentions-legales.astro';
  if (pathname === '/en/') return 'src/pages/en/index.astro';
  if (pathname === '/') return 'src/pages/index.astro';
  return undefined;
}

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
      // Note : /en/commons/ reste listée même tant qu'elle est vide (le
      // filtre n'a pas accès aux collections de contenu à ce stade du build) ;
      // la balise noindex de la page, elle, est correcte et dynamique — c'est
      // elle qui empêche réellement l'indexation, indépendamment du sitemap.
      filter: (page) => !page.includes('/404/'),
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const fichier = fichierPourChemin(pathname);
        const lastmod = fichier ? dateDernierCommit(fichier) : undefined;
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
});
