import { writable, derived } from 'svelte/store';
import en from '$lib/i18n/en';
import fr from '$lib/i18n/fr';

type Lang = 'en' | 'fr';

const translations = { en, fr };

// Persist language choice to localStorage
function createLangStore() {
  const stored = typeof localStorage !== 'undefined'
    ? (localStorage.getItem('sw237_lang') as Lang) || 'en'
    : 'en';

  const { subscribe, set } = writable<Lang>(stored);

  return {
    subscribe,
    set: (lang: Lang) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('sw237_lang', lang);
      }
      set(lang);
    },
    toggle: () => {
      const current = typeof localStorage !== 'undefined'
        ? (localStorage.getItem('sw237_lang') as Lang) || 'en'
        : 'en';
      const next: Lang = current === 'en' ? 'fr' : 'en';
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('sw237_lang', next);
      }
      set(next);
    }
  };
}

export const lang = createLangStore();

// t is the derived translation object — use $t.home.hero_title in components
export const t = derived(lang, ($lang) => translations[$lang]);
