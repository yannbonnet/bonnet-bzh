// Repli visuel si une illustration ne charge pas (/genealogie) : ajoute la
// classe .ko à la <figure> englobante, qui masque l'image et affiche un
// cadre avec la légende seule (voir .ph.ko dans le <style> de la page).
// Externalisé depuis un attribut onerror="" en ligne, incompatible avec la
// CSP du site (script-src 'self', sans unsafe-inline) — même raison que
// public/scripts/filtres.js.
document.querySelectorAll('figure.ph img').forEach((img) => {
  img.addEventListener('error', () => {
    img.closest('figure')?.classList.add('ko');
  });
});
