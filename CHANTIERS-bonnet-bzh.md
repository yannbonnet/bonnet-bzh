# bonnet.bzh — chantiers ouverts

Les prompts sont prêts à coller dans Claude Code, un par session. À utiliser avec
`REPRISE-bonnet-bzh.md` et `CLAUDE.md`.

---

## 1. Search Console — à faire à la main, sans Claude Code

Le plus rentable de tous, et non fait.

**Google.** [search.google.com/search-console](https://search.google.com/search-console) →
Ajouter une propriété → type **« Domaine »** → `bonnet.bzh` sans préfixe. Google fournit une
valeur `google-site-verification=`.

Dans OVH : Noms de domaine → bonnet.bzh → Zone DNS → Ajouter une entrée → type **TXT**,
sous-domaine vide, valeur fournie.

**Attention :** la zone contient déjà un TXT sur l'apex, le SPF `"v=spf1 include:mx.ovh.com ~all"`.
Il faut **ajouter** un second enregistrement, pas modifier celui-là — sinon le courrier cesse
d'être authentifié.

Vérifier après une heure : `dig +short TXT bonnet.bzh` doit renvoyer **deux** lignes. Puis
valider dans Search Console, soumettre `sitemap-index.xml` dans le menu « Sitemaps », et forcer
l'exploration de l'accueil, de `/communs/` et de deux ou trois fiches via « Inspection de l'URL ».

**Bing.** [bing.com/webmasters](https://www.bing.com/webmasters) → « Importer depuis Google
Search Console ». Rien à reconfigurer. Alimente aussi DuckDuckGo et Ecosia.

**Suivi :** chercher `site:bonnet.bzh` dans Google. Le nombre de résultats donne les pages
indexées.

---

## 2. Terminer la traduction anglaise

````
Reprends l'étape 3 de la traduction anglaise, groupe 2 : les trois notices longues —
`rapport-villani-2018`, `campus-cyber-retrospective-2026`, `campus-cyber-prefiguration-2020`.

Les quatre notices du groupe 1 sont faites (les deux du groupe d'experts, Blueprint, INTAiC).
Les dix du groupe 3 suivront.

**Chaque notice traduite commence par cette ligne**, que je retirerai après relecture :

> TODO — translation pending review.

Le mécanisme de `noindex` sur les brouillons est déjà en place et s'y appliquera.

**Deux consignes propres à ce groupe.** Ce sont les notices où je m'accuse moi-même : chiffres
avancés sans vérification, recommandations non suivies, écarts entre un projet et sa réalisation.
Ne lisse rien — un aveu traduit en langue diplomatique cesse d'être un aveu.

Et signale-moi séparément la traduction des passages qui portent un jugement sur des personnes
ou institutions nommées — Michel Van Den Berghe, Guillaume Poupard, la Cour des comptes. Ce sont
les phrases où une nuance qui glisse ne se lira pas comme une maladresse de traduction mais comme
ce que j'affirme.

Applique le glossaire des termes institutionnels documenté au §6 de CLAUDE.md : terme français
suivi d'une glose au premier usage, jamais de dénomination anglaise forgée.

Puis `npm run check`, `npm run build`, commit et push. Le check échouera sur les brouillons,
c'est voulu.
````

Puis le groupe 3, dix notices, avec cette consigne supplémentaire :

````
Groupe 3 de l'étape 3 : les dix notices restantes. Ces notices commentent des documents qui
n'existent qu'en français, pour un lecteur qui ne connaît pas le contexte institutionnel — une
traduction littérale sera exacte et inutilisable.

Ajoute donc, là et seulement là où c'est nécessaire, une glose brève au premier usage, sans
alourdir, sans ajouter de paragraphe, et **sans jamais introduire un fait qui ne soit pas dans le
texte français**. Notamment : le CNNum, la loi pour une République numérique, la loi El Khomri,
la taxe sur les services numériques, le rapport de la Cour des comptes, la COP21.

Signale-moi chaque glose ajoutée, fiche par fiche. C'est le seul endroit où la version anglaise
s'écarte du français, et je veux le relire.
````

---

## 3. Phase 6 — l'audit

````
Phase 6 — Audit, §12 du brief. Ne touche à aucun fichier de `src/content/ressources/` ni à
`src/pages/genealogie.astro` sans me le signaler d'abord.

**1. Accessibilité.** Audit RGAA 4 / WCAG 2.1 AA sur cinq pages représentatives : l'accueil,
`/communs/`, une notice courte, la fiche Villani et `/genealogie/`. Contrastes, navigation
clavier complète, focus visible, structure de titres, alternatives textuelles réelles sur les
vingt-sept images de la page généalogique.

Trois contrastes sont déjà identifiés comme insuffisants et non corrigés : `#66707a` sur fond
papier, `#78838b` et `#8d959c` sur ardoise — tous sous le seuil de 4,5:1 pour du texte courant.
Ils servent aux légendes et crédits d'image. Propose des valeurs conformes prises dans la
palette existante, et rapporte-moi l'effet sur les autres pages avant de changer quoi que ce
soit.

**2. Lighthouse** sur les mêmes cinq pages. Rapporte les scores et la liste des points
signalés, sans corriger.

**3. Liens externes.** Vérifie chaque lien canonique, chaque lien d'archive et chaque lien
complémentaire des dix-sept fiches. Rapporte les liens morts ou redirigés — les contenus du
CNNum migrent, ces liens sont les plus exposés. Ne corrige rien : une URL de remplacement se
vérifie à la main.

**4. Poids.** `public/pdf/ambition-numerique-2015.pdf` pèse 37,8 Mo, soit 42 % du dossier. Un
rapport de 396 pages à ce poids contient des images non compressées. Propose une compression
sans perte de lisibilité et rapporte-moi le gain, sans remplacer le fichier.

**5. Sous-ensemblage des polices.** Le contenu du site étant figé, les polices peuvent être
réduites aux seuls caractères employés. Évalue le gain avec `pyftsubset` sur Newsreader,
Bricolage Grotesque et IBM Plex Mono. Attention : conserver l'axe de taille optique de Bricolage
Grotesque, dont l'utilisation est un choix documenté au §8.

Rapporte l'ensemble avant toute correction.
````

---

## 4. Deux petits chantiers

**Le CV.** Déposer le fichier dans `public/cv-yann-bonnet.pdf`. Le lien de la page « Yann
Bonnet » l'attend.

**Le Blueprint.** Demander l'autorisation d'hébergement à Oxford Martin ou à Adrien Abécassis.
Le PDF est dans `pdf-en-attente/`. Une fois obtenue :

````
Autorisation obtenue pour le Blueprint. Déplace
`pdf-en-attente/blueprint-multinational-ai-2025.pdf` dans `public/pdf/`, et ajoute aux fiches
française et anglaise :

copieLocale: "/pdf/blueprint-multinational-ai-2025.pdf"
licence: "[valeur exacte à me demander]"

Ajoute l'en-tête canonique correspondant dans `public/pdf/.htaccess`, pointant vers
`/communs/blueprint-multinational-ai-2025/`.

Puis `npm run check`, `npm run build`, commit et push.
````

**La redirection de genea.** Côté OVH, deux voies décrites au §2 du document de reprise. La
propre : repointer l'entrée multisite `genea.bonnet.bzh` vers le dossier `www`, puis demander à
Claude Code d'ajouter la règle dans `public/.htaccess`.

---

## 5. Une dix-huitième fiche possible

*Unlocking Public-Interest Research on Cyber Capable AI*, publié par INTAiC le 23 juillet 2026,
treize jours après le premier livre blanc. Sujet probable : le financement de la recherche
d'intérêt public. Non traité, et candidat naturel.

À vérifier avant : ton rôle exact, la liste des co-auteurs nommément, et la licence.

---

## 6. Ce qui n'est pas du code

**Les deux passages que toi seul peux écrire** — Villani en juin 2022, les dix points clés du
Campus Cyber. Détaillés au §3 du document de reprise.

**Le texte transversal** sur l'échelon d'action et son contre-exemple. Détaillé au §8.

**Les notices anglaises à relire** au fur et à mesure de leur traduction. Elles portent ton nom
et seront lues par les personnes qu'elles nomment.
