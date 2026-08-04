import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lienComplementaire = z.object({
  // Pas de .url() : accueille aussi bien une URL externe qu'un chemin local
  // (/pdf/xxx.pdf), sur le même principe que `copieLocale`.
  url: z.string(),
  label: z.string(),
  type: z.enum(['video', 'article', 'conference', 'page', 'donnees']).optional(),
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

    // Distinction contribution personnelle / référence externe.
    externe: z.boolean().default(false),
    role: z
      .enum([
        'auteur', 'co-auteur', 'coordinateur',
        'contributeur', 'membre du groupe', 'interviewe', 'co-pilote',
      ])
      .optional(),

    coAuteurs: z.array(z.string()).default([]),
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
    resume: z.string().max(300),
    aVerifier: z.boolean().default(false),
  })
  // Un travail personnel déclare son rôle ; une référence externe n'en a pas.
  .refine((d) => d.externe === (d.role === undefined), {
    message: 'role est obligatoire si externe: false, et interdit si externe: true',
  }),
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
