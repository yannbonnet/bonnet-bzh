#!/usr/bin/env node
// Vérifie que chaque fiche a une notice critique (corps Markdown) non vide et sans TODO.
// Remplace la contrainte que Zod ne peut plus porter depuis que `notice` a quitté le
// front-matter (cf. CLAUDE.md §6).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../src/content/ressources', import.meta.url));

function listMarkdownFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return listMarkdownFiles(full);
    return entry.endsWith('.md') ? [full] : [];
  });
}

function splitFrontmatter(raw) {
  const lines = raw.split('\n');
  if (lines[0].trim() !== '---') return { frontmatter: '', body: raw.trim() };
  const closingIndex = lines.slice(1).findIndex((line) => line.trim() === '---');
  if (closingIndex === -1) return { frontmatter: '', body: raw.trim() };
  return {
    frontmatter: lines.slice(1, closingIndex + 1).join('\n'),
    body: lines.slice(closingIndex + 2).join('\n').trim(),
  };
}

// Référence externe (cf. CLAUDE.md §6) : pas de notice critique attendue, juste une
// contextualisation. On repère `externe: true` par une ligne de premier niveau plutôt
// que de tirer js-yaml (dépendance transitive seulement) pour un booléen scalaire simple.
function isExterne(frontmatter) {
  return /^externe:\s*true\s*$/m.test(frontmatter);
}

const files = listMarkdownFiles(ROOT);
const errors = [];

for (const file of files) {
  const { frontmatter, body } = splitFrontmatter(readFileSync(file, 'utf-8'));
  if (isExterne(frontmatter)) continue;
  if (body.length === 0) {
    errors.push(`${file} : notice vide (corps Markdown manquant)`);
  } else if (/\bTODO\b/.test(body)) {
    errors.push(`${file} : notice contient encore un TODO`);
  }
}

if (errors.length > 0) {
  console.error('Vérification des notices échouée :\n');
  for (const error of errors) console.error(`  - ${error}`);
  console.error(`\n${errors.length} fiche(s) à corriger.`);
  process.exit(1);
}

console.log(`Notices vérifiées : ${files.length} fiche(s) OK.`);
