# bonnet.bzh — document de reprise

À déposer à la racine du projet et à donner en contexte lors de la première conversation sur
le nouveau compte. Il complète `CLAUDE.md`, qui porte les règles du projet ; celui-ci porte
**ce que le dépôt ne dit pas** : les raisons, les faits vérifiés, les questions ouvertes.

---

## 1. Où en est le projet

Site personnel en ligne sur `bonnet.bzh`, construit en Astro 5, hébergé sur OVH mutualisé,
déployé par GitHub Actions en FTP depuis `github.com/yannbonnet/bonnet-bzh`.

**Contenu :** dix-sept fiches ressources en français, chacune composée d'un front-matter de
métadonnées et d'une notice critique rédigée à la main. Quinze PDF hébergés localement avec
leur licence déclarée. Une enquête généalogique de dix-neuf mille mots intégrée à
`/genealogie`, avec vingt-sept images auto-hébergées. Version anglaise : infrastructure et
front-matter faits, notices traduites pour quatre fiches sur dix-sept.

**Ce qui distingue ce site** d'une liste de publications : chaque document est accompagné
d'une relecture critique disant ce qu'il visait, ce qu'il a produit, et ce qui a mal vieilli.
C'est le seul apport propre du site, et la règle éditoriale la plus importante du projet.

---

## 2. Ce qui reste à faire, par ordre d'importance

**Déclarer le site à Google Search Console.** Non fait. C'est le geste le plus rentable :
sans lui, l'indexation prendra des semaines. Propriété de type « Domaine », validation par
enregistrement TXT dans la zone DNS OVH — attention à ne pas écraser le SPF existant, il faut
**ajouter** un second TXT. Puis soumettre `sitemap-index.xml`. Même chose sur Bing Webmaster
Tools, en important depuis Search Console.

**Terminer la traduction anglaise.** Les groupes 2 et 3 de l'étape 3 restent à faire : les
trois notices longues (Villani, les deux Campus Cyber) puis les dix autres. Les notices
traduites doivent porter un marqueur `TODO` jusqu'à relecture — le mécanisme de `noindex` sur
les brouillons est déjà en place.

**Le CV en PDF.** Le lien de la page « Yann Bonnet » pointe vers `/cv-yann-bonnet.pdf`, qui
n'existe pas. Déposer le fichier dans `public/`.

**La licence du Blueprint.** Le PDF est dans `pdf-en-attente/`, hors de `public/`, faute
d'autorisation établie. Demander à Oxford Martin, ou à Adrien Abécassis qui est co-auteur.
Formulation efficace : héberger une copie sur une bibliothèque personnelle non commerciale,
avec attribution et lien vers la publication d'origine.

**La redirection de `genea.bonnet.bzh`.** Ne peut pas venir du dépôt : ce sous-domaine vit
dans un dossier `genea` distinct sur l'hébergement. Deux voies — repointer l'entrée multisite
OVH vers le dossier `www` puis rediriger par `.htaccess` (propre, versionné), ou déposer un
`.htaccess` dans le dossier `genea` (rapide, hors git).

**Phase 6, l'audit.** Accessibilité RGAA/WCAG AA, Lighthouse, vérification manuelle de chaque
lien externe des dix-sept fiches. Trois points identifiés et non traités :
- `ambition-numerique-2015.pdf` pèse 37,8 Mo, soit 42 % du dossier PDF. À compresser.
- Trois couleurs héritées de genea sont sous le seuil de contraste : `#66707a` sur fond papier
  (4,3:1), `#78838b` et `#8d959c` sur ardoise (3,6:1). Le minimum est 4,5:1 pour du texte
  courant. Elles servent aux légendes et crédits d'image, donc au petit texte.
- Sous-ensemblage des polices avec `pyftsubset` : le contenu étant figé, une réduction de
  soixante à soixante-dix pour cent du poids est courante.

**Le fichier GEDCOM.** Version expurgée des personnes vivantes, déposée dans `public/`. Si tu
la republies un jour non expurgée, sache que les mentions légales du site affirment qu'aucune
donnée personnelle n'est collectée — cette affirmation ne tiendrait plus.

---

## 3. Deux passages que toi seul peux écrire

Ils étaient signalés par des blocs `TODO` que tu as retirés en collant les fiches. Ils restent
les deux endroits où le site pourrait gagner le plus.

**Villani — ce que tu ne maintiens plus de juin 2022.** Ton bilan filmé à Paris 1, le 22 juin
2022, est antérieur de cinq mois à la sortie de ChatGPT. Il ne contient pas un mot sur les
modèles de fondation. Nommer une affirmation de cette intervention que tu n'écrirais plus est
le paragraphe qui donnerait son autorité au reste du site — la vidéo est en ligne sous licence
Creative Commons, n'importe qui peut vérifier. Trois candidats : la théorie du changement en
trois temps (recherche publique, transfert, capacité industrielle), le découpage en quatre
secteurs stratégiques, ou l'idée que l'approche par les risques trouvait le bon compromis.

**Campus Cyber — les dix points clés du modèle opérationnel.** Le rapport de préfiguration de
2020 en proposait dix. Tu l'as écrit et tu l'as exécuté. Lequel s'est révélé faux ? Les écarts
de surface et de calendrier sont anecdotiques à côté de cette question.

---

## 4. Faits vérifiés au cours du travail

À conserver : ils ont demandé du temps et ne figurent pas dans le dépôt.

**Licences.** Contenus du CNNum : CC BY-SA 3.0 FR, d'après ses mentions légales, accessibles
sous `conseil-ia-numerique.fr/files/archive/`. Rapport Villani : CC BY-SA, mention portée sur
sa page de garde. Documents du groupe d'experts européen : réutilisation autorisée avec mention
de la source, décision 2011/833/UE. Rapport de préfiguration du Campus Cyber et livre blanc
INTAiC : CC BY-SA, autorisation obtenue. Blueprint : non établi.

**Le CNNum devient le Conseil de l'intelligence artificielle et du numérique**, et son fonds
antérieur migre vers `conseil-ia-numerique.fr` sous un chemin `/files/archive/` instable. C'est
ce qui justifie l'hébergement local des PDF. Directeur de la publication actuel : Jean Cattan.

**Ambition numérique.** Consultation lancée le 4 octobre 2014, rapport remis à Manuel Valls le
18 juin 2015 à la Gaîté lyrique, 396 pages, 70 recommandations, 4 volets. Le nombre de
contributions est contesté : l'exposé des motifs du projet de loi, vie-publique et le Sénat
retiennent « plus de 4 000 » ; les comptes rendus de l'écosystème parlent de 17 000 à 18 000.
Le jour de la remise, Axelle Lemaire a indiqué que le projet de loi était déjà rédigé et
transmis à Matignon.

**Loi pour une République numérique du 7 octobre 2016.** Neutralité de l'internet aux articles
40 à 47, portabilité des données à l'article 48, loyauté des plateformes aux articles 49 à 53.
Ouverture par défaut des données publiques, communicabilité des codes sources de
l'administration, droit d'accès aux règles des traitements algorithmiques fondant des décisions
individuelles — cette dernière disposition précède de deux ans la demande d'audit du rapport
Villani et de huit ans le règlement européen sur l'IA. L'exposé des motifs cite l'étude annuelle
du Conseil d'État de 2014, non *Ambition numérique*.

**Stratégie nationale IA.** Phase 1 « AI for Humanity » 2018-2022 : 1,5 Md€, quatre instituts
3IA (PRAIRIE, MIAI Grenoble, ANITI Toulouse, 3IA Côte d'Azur) sélectionnés en avril 2019, 180
chaires, 300 programmes doctoraux, supercalculateur Jean Zay. Phase 2 depuis 2022 : environ
2,5 Md€ au total via France 2030. Février 2025 : 109 Md€ d'investissements annoncés. **La Cour
des comptes a publié en novembre 2025 un rapport public thématique critique** : fragmentation
par appels à projets successifs, horizon de financement trop court, coordination déplacée de la
DINUM vers la DGE en mars 2020, coordonnateur national doté d'une équipe très restreinte.

**Objectifs cyber 2025.** Stratégie nationale d'accélération : 1 Md€ dont 720 M€ publics ;
cibles de 37 000 à 75 000 emplois et de 7,3 à 25 Md€ de chiffre d'affaires. Réalisé : la DGE
mesure 50 000 emplois et 10,45 Md€ en 2023 sur périmètre cyber strict ; l'observatoire de l'ACN
mesure 107 000 emplois et 21,3 Md€ en 2024 sur périmètre « confiance numérique » élargi.
L'objectif est donc raté ou dépassé selon le périmètre.

**Rapport de préfiguration du Campus Cyber.** Mission confiée le 16 juillet 2019, environ
soixante auditions, remis le 7 janvier 2020, rendu public au FIC de Lille par Cédric O.
Projetait 10 000 à 15 000 m² — réalisé 26 000. Ouverture prévue au premier semestre 2021 —
réalisée en février 2022. Antennes envisagées en Hauts-de-France, Pays de la Loire et Bretagne
— cinq labellisées : Hauts-de-France, Nouvelle-Aquitaine, Normandie, Bretagne, Région Sud.
Comparait Beer Sheva, Cyber NYC, LORCA et Chengdu.

**Livre blanc INTAiC.** Titre réel : *Bridging the Evidence Gap on AI Misuse in Cyberspace*,
10 juillet 2026, **premier** livre blanc de la coalition. Un second existe, non traité :
*Unlocking Public-Interest Research on Cyber Capable AI*, 23 juillet 2026 — candidat à une
dix-huitième fiche.

**Appel à engagements de 2015.** *Pour une convergence des transitions écologique et
numérique*, 25 novembre 2015, avec l'IDDRI et Place to B, dix-neuf pages, cinq jours avant
l'ouverture de la COP21. **À ne pas confondre** avec la *Feuille de route sur l'environnement
et le numérique — 50 mesures* du CNNum de juillet 2020, à laquelle tu n'as pas participé.

**Une contradiction non résolue.** Ton CV indique « 2013-2018 secrétaire général du CNNum » ;
ta révision Wikipédia indique rapporteur général en 2013 puis secrétaire général à partir de
2015. Les fiches disent `coordinateur`. À trancher, notamment pour *Ambition numérique* dont la
concertation a été lancée en octobre 2014.

---

## 5. Décisions dont la raison n'est pas dans le dépôt

**Tailwind écarté** au profit de CSS écrit à la main : Tailwind pousse vers le rendu par
défaut, et l'objectif était la parenté visuelle avec genea.

**Titres non traduits, puis traduits.** Décision initiale : titre original en vedette, glose
anglaise en sous-titre, comme le pratiquent la BnF et le Library of Congress. Décision finale :
titres traduits, titre original relégué en sous-titre entre crochets. Le second choix a été
fait en connaissance de l'usage bibliographique contraire — ne pas le « corriger » en croyant
rétablir la convention.

**`aVerifier` n'est pas affiché.** Treize fiches sur dix-sept le portent : un signalement
présent sur 87 % des entrées n'informe plus, et il n'indique pas quel fait est en cause. C'est
un marqueur de travail interne.

**`role: coordinateur` se traduit par « Coordinator », pas « Coordinating author »** — plus
flatteur mais inexact : la valeur signifie « a fait produire sans signer ».

**Le budget de poids a été révisé après mesure.** L'objectif initial de 150 Ko par page avait
été posé avant tout chargement de police et s'est révélé incompatible avec trois familles
typographiques. Nouveaux budgets : HTML, CSS et JS sous 50 Ko par page ; polices sous 250 Ko
pour l'ensemble du site. L'argument d'amortissement par le cache a été écarté : une
bibliothèque d'archives reçoit l'essentiel de son trafic depuis un moteur de recherche, sur une
seule fiche, souvent sans seconde page vue.

**La généalogie est une page, pas un commun.** Hors de la collection `ressources`, hors du flux
RSS, hors des filtres par thème. Le brief prévoyait initialement un projet entièrement séparé.

---

## 6. Erreurs que j'ai commises — à ne pas répéter

Elles sont ici pour éviter qu'une session future ne reproduise le même raisonnement.

**J'ai fabriqué le titre d'un document** — le livre blanc INTAiC — à partir de ce que je
croyais savoir. Titre, numéro, langue, sujet : tout était faux. C'est exactement ce que le §13
interdit. **Sur ce projet, ne jamais écrire une référence de mémoire.**

**J'ai pris `#222b33` pour une couleur d'accent** alors que c'est le fond du bandeau de genea,
puis j'ai surcorrigé en affirmant que tout le site était sombre. Genea a **deux registres** :
bandeau sombre, corps sur fond clair.

**J'ai affirmé que le scope `workflow` n'était pas nécessaire** pour un jeton GitHub. Il l'est
pour toute modification d'un fichier sous `.github/workflows/`.

**J'ai écrit les nombres en lettres**, produisant « dix virgule quarante-cinq milliards ». Les
données chiffrées s'écrivent en chiffres.

**J'ai suggéré que « Illena Armstrong » était une coquille.** C'est un nom réel.

**J'ai écrit un script de téléchargement sans en-tête d'identification**, ce qui a valu une
limitation de débit de Wikimedia et quatorze fichiers corrompus.

**J'ai affirmé qu'un `noindex` existait** alors que ma consigne précédente n'avait jamais été
exécutée.

---

## 7. Méthode de travail qui a fonctionné

**Une session Claude Code, un objet.** Mélanger deux chantiers rend les diffs illisibles.

**Mode plan pour toute décision d'architecture**, deux fois Maj+Tab avant d'envoyer. Le plan
est relu, discuté, corrigé avant qu'une ligne soit écrite.

**Interdiction explicite de toucher à `src/content/ressources/`** dans chaque prompt qui ne
concerne pas le contenu. Un agent à qui l'on montre un contrôle qui échoue a tendance à vouloir
le faire passer, et la façon la plus directe serait de rédiger les notices.

**Le garde-fou `check-notices.mjs`** fait échouer le build si une notice est vide ou contient
`TODO`. C'est ce qui empêche de publier un brouillon. Les blocs inachevés s'écrivent en
citations commençant par `TODO` : le script les détecte, et un oubli s'affiche comme un encadré
visible plutôt que de disparaître dans un commentaire.

**Listes YAML toujours en tirets, jamais entre crochets.** Huit fiches ont contrevenu à cette
règle et affichaient un seul co-auteur au lieu de plusieurs. Le point-virgule, séparateur
naturel en français, ne sépare rien en YAML.

---

## 8. Le fil conducteur, et son contre-exemple

Un motif traverse la bibliothèque : diagnostic juste, destinataire national, non-réalisation,
puis matérialisation de la fonction à l'échelle européenne sous une autre forme. L'agence de
notation d'*Ambition numérique*, l'audit des algorithmes du rapport Villani, l'extension de la
neutralité aux plateformes, le statut du travail de plateforme.

Mais la loi de 2016 le contredit : sur la loyauté des plateformes, la France a légiféré six ans
avant le DSA. L'échelon national n'a pas agi trop tard mais trop tôt, avec un instrument trop
faible.

Il y a là un texte à écrire, qui ne serait ni une notice ni une ligne de parcours : *pourquoi
une génération de travaux consultatifs français a-t-elle systématiquement visé le mauvais
échelon — et pourquoi pas toujours ?* Ce serait probablement la page la plus citable du site,
et la seule qui ne parlerait pas de toi.

---

## 9. À faire côté comptes

**Rien de technique ne dépend du compte Claude.** Vérifie tout de même que `github.com/yannbonnet`
et l'espace client OVH sont bien des comptes personnels et non des comptes du Forum.

Le jeton GitHub est dans le trousseau macOS, avec les scopes `repo` et `workflow`.

Les secrets FTP du déploiement vivent dans les *secrets* du dépôt GitHub : `FTP_SERVER`,
`FTP_USERNAME`, `FTP_PASSWORD`. Ils ne dépendent d'aucun compte Claude.

**La mémoire du compte ne se transfère pas.** C'est la raison d'être de ce document : donne-le
en contexte lors de ta première conversation sur le nouveau compte, avec `CLAUDE.md`.
