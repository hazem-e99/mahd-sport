import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ar",
    lng: localStorage.getItem("language") || "ar",
    interpolation: {
      escapeValue: false,
    },
    resources: {},
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "language",
      caches: ["localStorage"],
    },
  });

// Load translations dynamically
const loadTranslations = async (lang: string) => {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    const translations = await response.json();
    i18n.addResourceBundle(lang, "translation", translations, true, true);
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error);
  }
};

// Load both languages
Promise.all([loadTranslations("ar"), loadTranslations("en")]).then(() => {
  const savedLang = localStorage.getItem("language") || "ar";
  i18n.changeLanguage(savedLang);
});

export default i18n;
