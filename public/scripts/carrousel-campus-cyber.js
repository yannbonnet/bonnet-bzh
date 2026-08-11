// Amélioration JS du carrousel de /communs/campus-cyber-retrospective-2026/ :
// boutons précédent/suivant, navigation clavier (flèches), indicateur de
// position. Sans ce script, la piste reste défilable nativement (scroll-snap
// CSS posé dans CarrouselCampusCyber.astro) : repli sans JS, pas de carrousel
// cassé.
const reduitMouvement = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-carrousel]').forEach((carrousel) => {
  const piste = carrousel.querySelector('[data-carrousel-piste]');
  const diapos = Array.from(carrousel.querySelectorAll('[data-carrousel-diapo]'));
  const boutonPrecedent = carrousel.querySelector('[data-carrousel-precedent]');
  const boutonSuivant = carrousel.querySelector('[data-carrousel-suivant]');
  const indicateur = carrousel.querySelector('[data-carrousel-indicateur]');
  if (!(piste instanceof HTMLElement) || diapos.length === 0) return;

  piste.setAttribute('tabindex', '0');

  function indexActuel() {
    const largeur = piste.clientWidth;
    if (largeur === 0) return 0;
    return Math.round(piste.scrollLeft / largeur);
  }

  function allerA(index) {
    const cible = Math.max(0, Math.min(diapos.length - 1, index));
    piste.scrollTo({
      left: cible * piste.clientWidth,
      behavior: reduitMouvement ? 'auto' : 'smooth',
    });
  }

  function majIndicateur() {
    if (!indicateur) return;
    indicateur.textContent = `${indexActuel() + 1} / ${diapos.length}`;
  }

  boutonPrecedent?.addEventListener('click', () => allerA(indexActuel() - 1));
  boutonSuivant?.addEventListener('click', () => allerA(indexActuel() + 1));

  piste.addEventListener('keydown', (evenement) => {
    if (evenement.key === 'ArrowLeft') {
      evenement.preventDefault();
      allerA(indexActuel() - 1);
    } else if (evenement.key === 'ArrowRight') {
      evenement.preventDefault();
      allerA(indexActuel() + 1);
    }
  });

  let enAttente = false;
  piste.addEventListener('scroll', () => {
    if (enAttente) return;
    enAttente = true;
    window.requestAnimationFrame(() => {
      majIndicateur();
      enAttente = false;
    });
  });
});
