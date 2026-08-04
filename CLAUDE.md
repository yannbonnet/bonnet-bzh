# bonnet.bzh — brief de projet

Ce fichier est lu à chaque session Claude Code. Il fait autorité sur les décisions
d'architecture, d'édition et de design. En cas de doute, demander plutôt qu'inventer.

---

## 1. Objectif

Site personnel de Yann Bonnet sur `bonnet.bzh`. Ce n'est **pas** un CV en ligne ni un
site de personal branding. C'est une **bibliothèque d'archives commentées** sur les
politiques publiques du numérique, la gouvernance de l'IA et la cybersécurité — un
endroit où l'on vient chercher un rapport, comprendre pourquoi il a été écrit, et savoir
ce qu'il en est advenu.

Test de validation permanent : *un chercheur, un journaliste ou un fonctionnaire qui ne
sait pas qui est Yann Bonnet doit repartir avec quelque chose d'utile.* Toute page qui
échoue à ce test est à retravailler ou à supprimer.

## 2. Précédent à respecter : genea.bonnet.bzh

Le sous-domaine `genea.bonnet.bzh` existe déjà et donne le standard de qualité :
long-form éditorial, prose française soignée, données chiffrées, cartes et graphiques
SVG faits main, sources listées, et surtout **honnêteté méthodologique** (contradictions
entre sources signalées, biais statistiques explicités, hypothèses présentées comme
telles).

Le nouveau site doit être reconnaissable comme venant de la même main : même voix, même
exigence de sourçage, même couleur de thème (`#222b33`). Ne pas produire un site
« corporate » à côté d'un site « artisanal ».

## 3. Ce qui règle le problème du nombrilisme

Trois règles non négociables. Elles priment sur toute considération esthétique.

1. **Le rôle exact est déclaré, toujours.** Chaque ressource porte un champ `role` :
   `auteur`, `co-auteur`, `coordinateur`, `contributeur`, `membre du groupe`. Jamais de
   flou. « Membre du HLEG, contribution aux volets économiques et sécurité » est plus
   honnête, donc plus solide, que le silence.
2. **La notice critique est obligatoire.** Chaque fiche comporte une rétrospective de
   3 à 6 lignes : ce que le texte visait, ce qu'il a produit, **et ce qui a mal vieilli
   ou n'a pas été suivi d'effet**. Une fiche sans cette dernière partie est incomplète.
3. **On cite les autres.** Co-auteurs nommés systématiquement. Chaque thème comporte au
   moins deux ou trois références *non écrites par Yann Bonnet* qui font autorité sur le
   sujet, clairement identifiées comme telles.

Volume cible : **12 à 20 ressources**, pas davantage. Une sélection resserrée et
commentée vaut mieux qu'un catalogue exhaustif. Si une entrée n'a pas de notice critique
intéressante à porter, elle ne rentre pas.

## 4. Public visé

Par ordre de priorité : chercheurs et étudiants en politiques publiques du numérique ;
journalistes ; agents publics et parlementaires ; pairs internationaux (d'où la version
anglaise). Pas les recruteurs — le CV PDF existe pour ça.

## 5. Architecture

```
/                      Accueil — 2 lignes de présentation, orientation, rien de plus
/ressources            Bibliothèque, filtrable et triable
/ressources/[slug]     Fiche détaillée d'une ressource
/a-propos              Parcours factuel + lien vers le CV PDF
/mentions-legales      Obligatoire (LCEN)
/en/...                Miroir anglais de / et /ressources au minimum
```

Plus un lien net et assumé vers `genea.bonnet.bzh` (projet distinct, sous-domaine
distinct, pas de fusion).

**Accueil — contrainte stricte :** deux lignes de présentation maximum. Poste actuel,
et ce à quoi sert le site. Les fonctions passées (Campus Cyber, ANSSI, CNNum) vont dans
`/a-propos`, pas sur la home. Le premier bloc visible sous l'en-tête doit être la
bibliothèque, pas la biographie.

## 6. Modèle de contenu

Astro 5 content collections avec la **Content Layer API**. Le fichier de définition vit
à la racine de `src/` (**`src/content.config.ts`, pas `src/content/config.ts`**), et
charge les fiches via un `loader: glob(...)`. Le schéma est le cœur du projet : le poser
avant tout le reste.

**Bilingue : un fichier par langue de site.** Chaque ressource a une fiche FR et,
quand elle existe, une fiche EN — deux fichiers Markdown distincts, pas des champs
imbriqués `{ fr, en }`. Ils vivent dans
`src/content/ressources/fr/<slug>.md` et `src/content/ressources/en/<slug>.md`, reliés
par un champ `groupe` commun aux deux fichiers. **Les deux slugs peuvent différer**
(ex. `rapport-villani-2018` en FR, `villani-report-2018` en EN) : sur un site bilingue,
une URL qui se lit naturellement dans sa langue vaut mieux qu'un identifiant unique
forcé. Le slug de chaque fiche est celui de son nom de fichier ; `groupe` est le seul
champ qui les relie (retrouver le pendant EN d'une fiche FR, générer les liens
hreflang, etc.). Absence de fichier dans `en/` = pas encore de traduction : c'est le
signal lui-même, pas un champ vide à gérer — cas fréquent puisque la version française
est toujours rédigée en premier.

**`resume` (front-matter) et notice critique (corps Markdown) sont deux choses
différentes et ne doivent jamais être fusionnées, ni paraphrasées l'une dans l'autre :**
le premier décrit factuellement, en une ligne, ce que dit le document ; le second juge,
en 3 à 6 lignes de prose, ce qu'il en est advenu (§3.2). La notice n'est **pas** un champ
Zod — rédiger du texte long dans une chaîne YAML impose des blocs `|` et une discipline
d'indentation pénible, alors que le corps Markdown s'écrit naturellement (paragraphes,
liens, emphase). Le front-matter porte uniquement les métadonnées et `resume` ; le corps
du fichier porte la notice.

```ts
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
    langueDocument: z.enum(['fr', 'en']),          // langue du DOCUMENT ARCHIVÉ, pas du site
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
```

**`langueDocument` ne décrit pas la langue de la fiche** (celle-ci est déterminée par
son dossier `fr/` ou `en/`), mais celle du document archivé lui-même — un rapport de la
Commission européenne rédigé en anglais reste `langueDocument: 'en'` même sur la fiche
EN *et* sur une éventuelle fiche FR qui le commente.

**Champ `aVerifier` :** beaucoup de liens vers des rapports publics des années 2013-2019
sont morts ou instables (dissolution d'institutions, refonte de sites). Marquer, ne pas
deviner. Ne jamais fabriquer une URL plausible : si le lien canonique n'est pas confirmé,
laisser vide et passer `aVerifier: true`.

**Listes du front-matter : toujours à tirets, jamais entre crochets.** `coAuteurs`,
`themes`, `liensComplementaires` — toute liste YAML s'écrit un élément par ligne, précédé
d'un tiret :
```yaml
coAuteurs:
  - "Daniel Kaplan"
  - "Jan Krewer"
```
jamais `coAuteurs: [Daniel Kaplan, Jan Krewer]`. C'est la troisième fois que la forme entre
crochets casse la validation : elle se rompt dès qu'un éditeur enroule la ligne sur
plusieurs lignes (repli invalide en YAML dans un contexte de mapping bloc, cf. incidents
sur `blueprint-multinational-ai-2025.md` et `intaic-evidence-gap-2026.md`) ou qu'un
séparateur autre que la virgule s'y glisse silencieusement — sans erreur de schéma, mais
avec un tableau à un seul élément au lieu de plusieurs (incident sur
`cnnum-convergence-transitions-2015.md`, `;` au lieu de `,`). La forme à tirets ne connaît
pas ces deux pannes.

**Champ `copieLocale` :** les PDF rehébergés vivent dans `public/pdf/` (recopié tel quel
dans `dist/` par Astro). Convention de nommage : `groupe` de la fiche suivi de `.pdf`
(ex. `intaic-evidence-gap-2026.pdf`), et le champ prend la forme `/pdf/<groupe>.pdf`.
Rappel §10 : ne jamais déposer de copie sans avoir vérifié la licence du document, et
renseigner `licence` sur la fiche en conséquence. Dans le bloc de métadonnées
(`MetaBloc.astro`), quand `copieLocale` est renseigné, il est mis en évidence
typographique par rapport à `lienCanonique` et `lienArchive` : c'est le lien que la
plupart des lecteurs suivront.

**Vérification obligatoire :** Zod ne peut pas rendre la notice obligatoire puisqu'elle
n'est plus un champ du schéma. `npm run check` doit donc, en plus de `astro check`,
échouer si le corps Markdown d'une fiche est vide ou contient encore `TODO` — c'est le
garde-fou qui remplace la contrainte Zod perdue.

## 7. Contenu à couvrir

À structurer, en appliquant la règle des 12-20 entrées.

- **IA & gouvernance** — Rapport Villani (2018, co-pilote) ; HLEG Commission européenne
  (2018-2020) : *Ethics Guidelines for Trustworthy AI* (2019) et *Policy and Investment
  Recommendations* (2019) ; note *A Blueprint for Multinational Advanced AI Development*
  (Oxford Martin AI Governance Initiative / Forum de Paris sur la Paix, 2025, avec
  Adrien Abécassis, Yoshua Bengio et al.).
- **CNNum (2013-2018)** — *Ambition Numérique* (2015, rapport au Premier ministre) ;
  fiscalité du numérique (2013) ; volet numérique du PTCI (2014) ; neutralité des
  plateformes (2014) ; *Jules Ferry 3.0* / éducation (2014) ; santé (2015) ;
  travail & emploi (2016) ; prédictions, chiffrement et libertés (2017) ; *Pour une
  convergence des transitions écologique et numérique*, appel à engagements avec l'IDDRI
  et Place to B (2015, cinq jours avant l'ouverture de la COP21).
  → Regrouper : une fiche « série CNNum » ne suffit pas, mais huit fiches séparées
  déséquilibrent la bibliothèque. Proposer un arbitrage plutôt que de trancher seul.
  → **Ne pas confondre** cet appel de 2015 avec la feuille de route « environnement et
  numérique » remise par le CNNum en juillet 2020 : cinquante mesures chiffrées, un
  instrument d'une tout autre nature, remise à une ministre de la Transition écologique et
  un secrétaire d'État au Numérique — et à laquelle Yann Bonnet n'a pas participé, ayant
  quitté le Conseil en 2018. Erreur factuelle facile à commettre, la fiche 2015 le
  précise déjà dans sa notice.
- **Cybersécurité & souveraineté** — positions et synthèses des périodes ANSSI
  (2018-2021) et Campus Cyber (2021-2025) : communs numériques, confiance, souveraineté
  technologique européenne.
- **Articles & contributions** — publications académiques et en revue (Dauphine,
  I2D/Cairn), interventions institutionnelles.

## 8. Design

Style éditorial et académique, dans la continuité de genea. Palette sombre/neutre
articulée autour de `#222b33`, fond clair cassé, une seule couleur d'accent utilisée avec
parcimonie.

**Interdits explicites** (sinon le rendu tombe dans le gabarit générique) :
dégradés, glassmorphisme, ombres portées diffuses, cartes à coins très arrondis,
émojis en guise d'icônes, animations d'apparition au scroll, section « hero » pleine
hauteur, badges colorés multiples.

**Typographie** : une serif de lecture pour le corps (Source Serif, Newsreader ou
équivalent), une sans-serif pour la navigation et les métadonnées. Échelle typographique
définie explicitement, mesure de ligne entre 62 et 72 caractères. Ne pas utiliser la
police Marianne (usage réservé à l'État).

**Nombres, dans le corps des notices :** les nombres qui constituent une donnée —
montants, effectifs, surfaces, pourcentages, années — s'écrivent en chiffres, jamais en
lettres : « dix virgule quarante-cinq milliards » est illisible, « 10,45 milliards »
se lit d'un coup d'œil. Séparateur de milliers : une espace insécable fine (` `),
jamais un point ni une virgule (`107 000 emplois`, pas `107.000` ni `107,000`).
Séparateur décimal : la virgule (`21,3 milliards`, jamais `21.3`). Les nombres qui ne sont
*pas* une donnée — une approximation assumée (« une trentaine de ressources », « une
cinquantaine de délégations »), un dénombrement rhétorique de petite quantité (« trois
choses », « cinq campus territoriaux », « deux registres »), ou une durée narrative
(« trois ans après l'ouverture », « cinq jours avant ») — restent en toutes lettres : les
convertir en chiffres ferait paraître précis ce qui ne l'est pas, ou alourdirait une
tournure qui n'a pas vocation à l'être.

**Filtres** : sur ~20 entrées, pas de framework JS. Astro + un peu de JavaScript vanille
sur des attributs `data-`. Les filtres doivent fonctionner sans JS (liens vers des pages
de thème préfiltrées) et refléter leur état dans l'URL.

Tailwind est acceptable, mais il pousse vers le rendu par défaut : si utilisé, définir
d'abord les tokens (échelle typo, couleurs, espacements) dans `tailwind.config` et
n'utiliser que ceux-là.

## 9. Technique et hébergement

- **Stack** : Astro, sortie statique (`output: 'static'`). Pas de SSR, pas de base de
  données, pas d'API.
- **Hébergement** : OVH mutualisé Perso existant (cluster111, IPv4 213.186.33.40),
  entrée multisite dédiée pour `bonnet.bzh` + `www`, SSL Let's Encrypt via l'interface
  OVH. `genea.bonnet.bzh` reste inchangé sur son propre dossier.
- **Déploiement** : GitHub Action sur `main` → `npm ci && npm run build` → dépôt FTP du
  dossier `dist/` (action `SamKirkland/FTP-Deploy-Action`, `local-dir: ./dist/`,
  `server-dir: ./www/`). Identifiants dans les *secrets* du dépôt (`FTP_SERVER`,
  `FTP_USERNAME`, `FTP_PASSWORD`) — **jamais** en clair dans un fichier ni dans une
  conversation.
  **Mécanique à connaître :** l'action tient un fichier d'état
  (`.ftp-deploy-sync-state.json`) à l'intérieur de `server-dir` sur le serveur ; à chaque
  déploiement, elle compare le contenu de `local-dir` à cet état et **supprime sur le
  serveur** tout fichier précédemment déployé qui n'est plus présent localement. Toutes
  ses opérations (dépôt, comparaison, suppression) sont bornées à `server-dir` — elle ne
  peut jamais toucher un dossier frère comme celui de `genea.bonnet.bzh`, tant que
  `server-dir` reste `./www/`.
- **`.htaccess`** à produire : redirection `www` → apex (ou l'inverse, à trancher),
  forçage HTTPS, page 404 personnalisée, en-têtes de sécurité de base
  (`X-Content-Type-Options`, `Referrer-Policy`, CSP restrictive puisqu'aucun script tiers).
- **À générer aussi** : `sitemap.xml`, flux RSS de la bibliothèque, `robots.txt`,
  métadonnées OpenGraph par page, image `og.png`.
- **Poids** : deux budgets distincts, posés après mesure réelle en phase 3 (l'objectif
  initial unique de 150 Ko/page avait été fixé en phase 1, avant tout chargement de
  police, et s'est révélé incompatible avec trois familles typographiques) —
  - HTML, CSS et JS : moins de 50 Ko par page (hors polices).
  - Polices (Newsreader, Bricolage Grotesque, IBM Plex Mono, `woff2` auto-hébergées —
    pas de Google Fonts : requête tierce inutile et incohérente avec le propos) :
    environ 263 Ko pour l'ensemble du site, à tenir dès le premier chargement. Pas
    d'amortissement par le cache à supposer : une bibliothèque d'archives reçoit
    l'essentiel de son trafic depuis un moteur de recherche, sur une seule fiche,
    souvent sans deuxième page vue.
- **Pas d'analytics tiers.** Si une mesure d'audience est souhaitée un jour : Matomo
  auto-hébergé ou rien.

## 10. Droit et obligations

- **Mentions légales obligatoires (LCEN)** : identité de l'éditeur, coordonnées de
  contact, directeur de la publication, et hébergeur — OVH SAS, 2 rue Kellermann,
  59100 Roubaix. Mentionner le SIRET si une activité de conseil ou de conférence est
  présentée sur le site.
  **Contenu actuel de `src/pages/mentions-legales.astro`** (phase 4) : éditeur et
  directeur de la publication Yann Bonnet (contact `yann@bonnet.bzh`) ; hébergeur OVH SAS ;
  propriété intellectuelle (notices et textes originaux en CC BY 4.0, documents référencés
  sous leurs licences respectives, indiquées fiche par fiche) ; données personnelles
  (aucun cookie, aucun traceur, aucune mesure d'audience, aucun formulaire, polices
  auto-hébergées donc aucune requête tierce) ; absence de bandeau de consentement motivée
  explicitement par l'absence de tout traitement de données qui le rendrait nécessaire.
- **Rehébergement des PDF** : ne pas déposer une copie locale sans vérifier la licence.
  Les documents publics français relèvent souvent de la Licence Ouverte 2.0 (Etalab)
  mais pas systématiquement ; les documents de la Commission européenne sont
  généralement réutilisables avec mention de la source. En cas de doute : lien canonique
  seul, pas de copie. La licence applicable est affichée sur chaque fiche.
- **Licence du site** : les notices originales sous CC BY 4.0, mention explicite en pied
  de page. Le code sous licence libre dans le dépôt.
- **RGPD** : aucun cookie, aucun formulaire, aucun traceur → pas de bandeau de consentement.
  C'est un choix de conception, à préserver.

## 11. Accessibilité

Cible RGAA 4 / WCAG 2.1 AA. Contraste vérifié, navigation clavier complète, structure de
titres cohérente, `lang` correct sur les deux versions linguistiques, focus visible,
alternatives textuelles réelles sur les visuels. Non négociable compte tenu du sujet du
site.

## 12. Déroulé

Une phase par session, un commit par phase. Ne pas anticiper sur la phase suivante.

1. **Architecture** — squelette Astro, `content/config.ts`, layouts, routage, i18n,
   configuration Tailwind ou CSS. Aucune donnée réelle, deux fiches d'exemple.
   *À faire en mode plan, validé avant écriture.*
2. **Contenu** — *terminé.* Seize fiches FR dans `src/content/ressources/fr/`,
   front-matter complet et notices critiques rédigées à la main par Yann Bonnet
   (3 à 6 lignes, §3.2). `scripts/check-notices.mjs` échoue si le corps Markdown d'une
   fiche est vide ou contient encore `TODO`, sauf pour les fiches `externe: true`
   (référence externe : une contextualisation de deux ou trois phrases suffit, pas de
   rétrospective critique — §6).
   **Convention `TODO` pour toute fiche future :** front-matter complet dès la
   création, corps Markdown laissé en `TODO: rédiger la notice critique.` jusqu'à
   rédaction manuelle — c'est ce marqueur littéral que `check-notices.mjs` détecte.
   Ne jamais rédiger la notice à la place de Yann Bonnet. Signaler tout lien non
   confirmé avec `aVerifier: true`.
3. **Design** — mise en forme, échelle typographique, composants de fiche, filtres,
   états vides, responsive.
4. **Périphérie** — *faite, hors version anglaise.* RSS (`/rss.xml`, seize fiches FR,
   titre/`resume`/lien vers la fiche, sans le corps de la notice), sitemap
   (`@astrojs/sitemap`, `sitemap-index.xml`), OpenGraph et Twitter Card par page
   (`BaseLayout.astro`, `og.png` 1200×630 généré), 404 (`src/pages/404.astro`),
   mentions légales rédigées (`src/pages/mentions-legales.astro`, contenu au §10),
   `public/.htaccess` (redirections www et domaine technique OVH vers l'apex, forçage
   HTTPS, page 404, en-têtes de sécurité dont une CSP `script-src 'self'` sans
   `unsafe-inline` — script des filtres sorti en fichier externe
   `public/scripts/filtres.js` pour la rendre possible). **Version anglaise non traitée**
   dans cette phase : reste à faire quand le contenu EN existera.
5. **Déploiement** — GitHub Action, test sur un sous-domaine de préproduction avant
   bascule de `bonnet.bzh`.
6. **Audit** — accessibilité, Lighthouse, vérification manuelle de chaque lien externe.

## 13. Règles de travail

- Le français est la langue du site et des commits.
- **Ne jamais inventer une URL, une date, une référence ou un nom de co-auteur.** En
  l'absence de certitude : laisser vide et signaler. Une bibliothèque d'archives qui
  contient une seule référence fabriquée perd toute sa valeur.
- Proposer avant d'exécuter quand un arbitrage éditorial est en jeu (regroupement des
  fiches CNNum, sélection finale, hiérarchie de la home).
- Rester dans le périmètre demandé : pas de dépendance ajoutée sans justification, pas de
  fonctionnalité non prévue au brief.
