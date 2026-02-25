import { createContext, useState, useContext, useCallback, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

interface LanguageContextType {
  language: string;
  switchLanguage: (lng: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "ar",
  switchLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem("language");
    return stored && ["ar", "en"].includes(stored) ? stored : "ar";
  });

  const switchLanguage = useCallback(
    (lng: string) => {
      if (lng === language) return;
      i18n.changeLanguage(lng);
      setLanguage(lng);
      localStorage.setItem("language", lng);
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lng;
    },
    [language]
  );

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    i18n.changeLanguage(language);
  }, [language]);

  const contextValue = useMemo(
    () => ({ language, switchLanguage, t }),
    [language, switchLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
