import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lienComplementaire = z.object({
  // Pas de .url() : accueille aussi bien une URL externe qu'un chemin local
  // (/pdf/xxx.pdf), sur le même principe que `copieLocale`.
  url: z.string(),
  label: z.string(),
  type: z.enum(['video', 'article', 'conference', 'page', 'donnees']).optional(),
});

// Composition d'une mission par rôle (ex. CNNum : membre pilote, président,
// rapporteurs, groupe de travail) — distinct du champ `role` ci-dessous, qui
// décrit la contribution personnelle de Yann Bonnet, pas celle de l'équipe.
// N'ajouter que les rôles réellement rencontrés, sur le modèle de `role`.
const contribution = z.object({
  role: z.enum(['membre-pilote', 'president', 'rapporteurs', 'groupe-de-travail']),
  personnes: z.array(z.string()).min(1),
});

const ressources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ressources' }),
  schema: z.object({
    titre: z.string(),
    sousTitre: z.string().optional(),
    annee: z.number(),
    dateExacte: z.string().optional(),
    // Date de rédaction de LA NOTICE (ce texte-ci), pas du document commenté :
    // annee/dateExacte décrivent le document, dateNotice la relecture critique
    // qui l'accompagne — les deux peuvent différer de plusieurs décennies.
    dateNotice: z.string().optional(),

    type: z.enum([
      'rapport', 'avis', 'note', 'article', 'tribune',
      'guidelines', 'audition', 'entretien', 'cours', 'reference', 'appel',
    ]),

    cadre: z.string(),

    // Ampleur du document, en clair (« 119 pages · 40 recommandations · 8 axes ») —
    // facultatif, affiché seulement quand renseigné.
    volume: z.string().optional(),

    // Distinction contribution personnelle / référence externe.
    externe: z.boolean().default(false),
    role: z
      .enum([
        'auteur', 'co-auteur', 'coordinateur', 'cofondateur',
        'contributeur', 'membre du groupe', 'interviewe', 'co-pilote',
      ])
      .optional(),

    coAuteurs: z.array(z.string()).default([]),
    // Composition détaillée par rôle, quand une simple liste de co-auteurs ne
    // rend pas compte de l'organisation d'une mission (§ contribution ci-dessus).
    // Coexiste avec coAuteurs plutôt que de le remplacer dans le schéma : les
    // fiches existantes gardent coAuteurs, une fiche donnée n'utilise que l'un
    // des deux en pratique.
    contributions: z.array(contribution).default([]),
    langueDocument: z.enum(['fr', 'en']),
    groupe: z.string(),
    themes: z
      .array(
        z.enum([
          'ia', 'cybersecurite', 'souverainete',
          'politiques-publiques', 'education', 'sante', 'travail', 'environnement',
        ]),
      )
      .min(1),

    lienCanonique: z.string().url().optional(),
    lienArchive: z.string().url().optional(),
    copieLocale: z.string().optional(),
    liensComplementaires: z.array(lienComplementaire).default([]),
    accesRestreint: z.boolean().default(false),

    licence: z.string().optional(),
    // Lien vers le texte de la licence — optionnel, la licence peut rester un
    // simple libellé (cas des dix-sept fiches existantes). N'ajoute pas de lien
    // sur `licence` par défaut : certaines licences n'ont pas d'URL stable, et
    // forcer le lien casserait ces fiches.
    lienLicence: z.string().url().optional(),
    resume: z.string().max(300),
    aVerifier: z.boolean().default(false),

    // Déclenche le rendu de CarrouselCampusCyber.astro depuis RessourceLayout.
    // Un booléen plutôt qu'un composant importé dans le Markdown : les fiches
    // sont du Markdown pur (glob('**/*.md')), sans import ESM possible pour
    // <Image /> d'astro:assets — la seule fiche qui a besoin d'un carrousel
    // passe par ce drapeau, le contenu du carrousel reste codé en dur dans le
    // composant (légendes trop spécifiques à cette fiche pour justifier un
    // champ de schéma générique).
    carrousel: z.boolean().default(false),
  })
  // Un travail personnel déclare son rôle ; une référence externe n'en a pas.
  // Exception : quand `contributions` détaille déjà qui a fait quoi (une
  // mission à plusieurs rôles, cf. § contribution ci-dessus), `role` devient
  // facultatif plutôt que redondant avec une ligne de `contributions`.
  .refine(
    (d) => {
      if (d.externe) return d.role === undefined;
      return d.role !== undefined || d.contributions.length > 0;
    },
    {
      message:
        'role est interdit si externe: true ; obligatoire si externe: false, sauf si contributions renseigne déjà qui a fait quoi',
    },
  ),
});

// Jalons de la frise chronologique : pas d'auteur, pas de rôle, pas de notice.
const jalons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/jalons' }),
  schema: z.object({
    intitule: z.string(),
    date: z.string(),
    echelle: z.enum(['france', 'union-europeenne', 'international']),
    nature: z.enum(['loi', 'reglement', 'rapport', 'institution', 'incident', 'decision']),
    themes: z.array(z.string()).min(1),
    lien: z.string().url().optional(),
    // `groupe` d'une ressource, si l'un de tes travaux se rattache à ce jalon.
    ressourceLiee: z.string().optional(),
    aVerifier: z.boolean().default(false),
  }),
});

export const collections = { ressources, jalons };
