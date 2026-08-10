// Libellés lisibles pour les valeurs d'enum du schéma de contenu (src/content.config.ts).
// Un bloc de métadonnées qui doit « avoir de la présence » ne peut pas afficher
// les slugs bruts du schéma (cf. brief de phase 3).
import type { CollectionEntry } from 'astro:content';

type Lang = 'fr' | 'en';
type Ressource = CollectionEntry<'ressources'>['data'];

export const typeLabels: Record<Ressource['type'], Record<Lang, string>> = {
  rapport: { fr: 'Rapport', en: 'Report' },
  avis: { fr: 'Avis', en: 'Formal opinion' },
  note: { fr: 'Note', en: 'Note' },
  article: { fr: 'Article', en: 'Article' },
  tribune: { fr: 'Tribune', en: 'Op-ed' },
  guidelines: { fr: 'Lignes directrices', en: 'Guidelines' },
  audition: { fr: 'Audition', en: 'Hearing' },
  entretien: { fr: 'Entretien', en: 'Interview' },
  cours: { fr: 'Cours', en: 'Course' },
  reference: { fr: 'Référence', en: 'Reference' },
  appel: { fr: 'Appel à engagements', en: 'Call for commitments' },
};

export const roleLabels: Record<
  NonNullable<Ressource['role']>,
  Record<Lang, string>
> = {
  auteur: { fr: 'Auteur', en: 'Author' },
  'co-auteur': { fr: 'Co-auteur', en: 'Co-author' },
  coordinateur: { fr: 'Coordinateur', en: 'Coordinator' },
  contributeur: { fr: 'Contributeur', en: 'Contributor' },
  'membre du groupe': { fr: 'Membre du groupe', en: 'Group member' },
  interviewe: { fr: 'Interviewé', en: 'Interviewee' },
  'co-pilote': { fr: 'Co-pilote', en: 'Co-lead' },
};

export const roleContributionLabels: Record<
  Ressource['contributions'][number]['role'],
  Record<Lang, string>
> = {
  'membre-pilote': { fr: 'Membre pilote', en: 'Lead member' },
  president: { fr: 'Président', en: 'Chair' },
  rapporteurs: { fr: 'Rapporteurs', en: 'Rapporteurs' },
  'groupe-de-travail': { fr: 'Groupe de travail', en: 'Working group' },
};

export const themeLabels: Record<
  Ressource['themes'][number],
  Record<Lang, string>
> = {
  ia: { fr: 'Intelligence artificielle', en: 'Artificial intelligence' },
  cybersecurite: { fr: 'Cybersécurité', en: 'Cybersecurity' },
  souverainete: { fr: 'Souveraineté numérique', en: 'Digital sovereignty' },
  'politiques-publiques': { fr: 'Politiques publiques', en: 'Public policy' },
  education: { fr: 'Éducation', en: 'Education' },
  sante: { fr: 'Santé', en: 'Health' },
  travail: { fr: 'Travail', en: 'Labour' },
  environnement: { fr: 'Environnement', en: 'Environment' },
};

export function labelType(type: Ressource['type'], lang: Lang) {
  return typeLabels[type][lang];
}

export function labelRole(role: NonNullable<Ressource['role']>, lang: Lang) {
  return roleLabels[role][lang];
}

export function labelRoleContribution(
  role: Ressource['contributions'][number]['role'],
  lang: Lang,
) {
  return roleContributionLabels[role][lang];
}

export function labelTheme(theme: Ressource['themes'][number], lang: Lang) {
  return themeLabels[theme][lang];
}
