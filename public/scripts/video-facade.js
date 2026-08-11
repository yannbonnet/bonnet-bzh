// Façade cliquable pour les vidéos YouTube (§ /communs/campus-cyber-retrospective-2026/) :
// l'iframe youtube-nocookie.com ne se charge qu'au clic ou à l'activation clavier
// (Entrée/Espace, comportement natif d'un <button>), jamais au chargement de la page.
const facades = document.querySelectorAll('[data-video-facade]');

facades.forEach((facade) => {
  if (!(facade instanceof HTMLElement)) return;

  facade.addEventListener('click', () => {
    const id = facade.dataset.videoId;
    const titre = facade.dataset.videoTitre ?? '';
    if (!id) return;

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
    iframe.title = titre;
    iframe.loading = 'lazy';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.style.position = 'absolute';
    iframe.style.inset = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';

    facade.replaceWith(iframe);
  });
});
