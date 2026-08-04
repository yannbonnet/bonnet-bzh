// Amélioration JS des filtres de /communs et /communs/theme/[theme] (§2 phase 3).
// Sorti en fichier externe (plutôt qu'un <script> inline dans ListeRessources.astro) pour
// permettre une CSP script-src 'self' sans 'unsafe-inline' (phase 4, §12).
const nav = document.querySelector('[data-filtres]');
const liste = document.querySelector('[data-liste]');
if (nav instanceof HTMLElement && liste) {
  const items = Array.from(liste.querySelectorAll('[data-type]'));
  const themeLiens = Array.from(nav.querySelectorAll('[data-theme-lien]'));
  const typesConteneur = nav.querySelector('[data-filtres-types]');
  const typeBoutons = Array.from(nav.querySelectorAll('[data-type-lien]'));

  // Le filtre type n'existe qu'en amélioration JS (§2, brief) : masqué par défaut,
  // révélé seulement une fois qu'on sait que ce script s'exécute.
  typesConteneur?.removeAttribute('hidden');

  let themeActif = nav.dataset.themeActif ?? '';
  let typeActif = '';

  function appliquerFiltres() {
    for (const item of items) {
      const themes = (item.dataset.themes ?? '').split(' ');
      const type = item.dataset.type ?? '';
      const okTheme = !themeActif || themes.includes(themeActif);
      const okType = !typeActif || type === typeActif;
      item.hidden = !(okTheme && okType);
    }
  }

  for (const lien of themeLiens) {
    lien.addEventListener('click', (event) => {
      event.preventDefault();
      themeActif = lien.dataset.themeLien ?? '';
      for (const l of themeLiens) {
        l.classList.toggle('actif', l === lien);
        if (l === lien) l.setAttribute('aria-current', 'true');
        else l.removeAttribute('aria-current');
      }
      appliquerFiltres();
      const href = lien.getAttribute('href');
      if (href) history.pushState({}, '', href);
    });
  }

  for (const bouton of typeBoutons) {
    bouton.addEventListener('click', () => {
      typeActif = bouton.dataset.typeLien ?? '';
      for (const b of typeBoutons) b.setAttribute('aria-pressed', String(b === bouton));
      appliquerFiltres();
    });
  }
}
