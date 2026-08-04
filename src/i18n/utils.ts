import { getCollection, type CollectionEntry } from 'astro:content';
import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

type Langue = 'fr' | 'en';

export function autreLangue(lang: Langue): Langue {
  return lang === 'fr' ? 'en' : 'fr';
}

export function prefixLangue(lang: Langue): string {
  return lang === 'fr' ? '' : '/en';
}

export function slugSansPrefixe(id: string): string {
  return id.replace(/^(fr|en)\//, '');
}

/**
 * URL de la fiche jumelle dans l'autre langue (reliée par `groupe`), ou
 * `undefined` si aucune jumelle n'existe encore — auquel cas l'appelant doit
 * replier vers l'accueil de l'autre langue pour l'affichage du sélecteur,
 * mais ne doit émettre aucune balise hreflang (pas de jumelle réelle).
 */
export async function urlJumelleFiche(
  entry: CollectionEntry<'ressources'>,
): Promise<string | undefined> {
  const langActuelle: Langue = entry.id.startsWith('fr/') ? 'fr' : 'en';
  const langCible = autreLangue(langActuelle);
  const jumelles = await getCollection(
    'ressources',
    (e) => e.id.startsWith(`${langCible}/`) && e.data.groupe === entry.data.groupe,
  );
  const jumelle = jumelles[0];
  if (!jumelle) return undefined;
  return `${prefixLangue(langCible)}/ressources/${slugSansPrefixe(jumelle.id)}/`;
}

/**
 * URL de la même page de thème dans l'autre langue, seulement si au moins
 * une fiche y porte ce thème — sinon `undefined` (repli sur l'accueil).
 */
export async function urlJumelleTheme(
  lang: Langue,
  theme: string,
): Promise<string | undefined> {
  const langCible = autreLangue(lang);
  const entrees = await getCollection(
    'ressources',
    (e) => e.id.startsWith(`${langCible}/`) && e.data.themes.includes(theme as never),
  );
  if (entrees.length === 0) return undefined;
  return `${prefixLangue(langCible)}/ressources/theme/${theme}/`;
}
