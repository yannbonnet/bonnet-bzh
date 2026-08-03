export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export const defaultLang = 'fr';

export const ui = {
  fr: {
    'nav.accueil': 'Accueil',
    'nav.ressources': 'Ressources',
    'nav.apropos': 'À propos',
    'nav.genea': 'genea.bonnet.bzh',
    'footer.licence': 'Notices sous licence CC BY 4.0.',
    'footer.mentions': 'Mentions légales',
    'ressources.titre': 'Bibliothèque',
  },
  en: {
    'nav.accueil': 'Home',
    'nav.ressources': 'Resources',
    'nav.apropos': 'About',
    'nav.genea': 'genea.bonnet.bzh',
    'footer.licence': 'Entries licensed under CC BY 4.0.',
    'footer.mentions': 'Legal notice',
    'ressources.titre': 'Library',
  },
} as const;
