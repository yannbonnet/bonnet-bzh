import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

function dateDe(entry) {
  return entry.data.dateExacte ? new Date(entry.data.dateExacte) : new Date(`${entry.data.annee}-01-01`);
}

export async function GET(context) {
  const ressources = (
    await getCollection('ressources', (entry) => entry.id.startsWith('fr/'))
  ).sort((a, b) => dateDe(b).getTime() - dateDe(a).getTime());

  return rss({
    title: 'bonnet.bzh — Ressources',
    description: 'Ressources sur les politiques publiques du numérique.',
    site: context.site,
    items: ressources.map((entry) => ({
      title: entry.data.titre,
      description: entry.data.resume,
      pubDate: dateDe(entry),
      link: `/communs/${entry.id.replace(/^fr\//, '')}/`,
    })),
  });
}
