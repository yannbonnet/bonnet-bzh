// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const ressources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ressources' }),
  schema: z.object({
    titre: z.string(),
    sousTitre: z.string().optional(),
    annee: z.number(),
    dateExacte: z.string().optional(),            // ISO, si connue
    type: z.enum(['rapport', 'avis', 'note', 'article', 'tribune',
                  'guidelines', 'audition']),
    cadre: z.string(),                             // institution commanditaire
    role: z.enum(['auteur', 'co-auteur', 'coordinateur',
                  'contributeur', 'membre du groupe']),
    coAuteurs: z.array(z.string()).default([]),
    langueDocument: z.enum(['fr', 'en']),          // langue du document archivé, pas du site
    groupe: z.string(),                            // identifiant partagé FR/EN de la ressource
    themes: z.array(z.enum(['ia', 'cybersecurite', 'souverainete',
                            'politiques-publiques', 'education',
                            'sante', 'travail'])).min(1),
    lienCanonique: z.string().url().optional(),    // source officielle
    lienArchive: z.string().url().optional(),      // Wayback Machine
    copieLocale: z.string().optional(),            // /pdf/xxx.pdf
    licence: z.string().optional(),                // ex. « Licence Ouverte 2.0 »
    resume: z.string().max(300),                   // factuel, une ligne, ce que dit le texte
    aVerifier: z.boolean().default(false),         // lien mort ou info à confirmer
  }),
});

export const collections = { ressources };
