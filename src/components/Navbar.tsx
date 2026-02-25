import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { language, switchLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    switchLanguage(language === "ar" ? "en" : "ar");
  };

  return (
    <nav className="sport-navbar">
      <div className="navbar-logo">
        <img src="/icons/logo.icon.svg" alt="Mahd Sports Academy" />
        <span className="logo-text">{t("mahdSport")}</span>
      </div>

      <div className="navbar-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={theme === "light" ? t("darkMode") : t("lightMode")}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <button className="lang-toggle" onClick={toggleLanguage}>
          {language === "ar" ? "EN" : "عربي"}
        </button>
      </div>
    </nav>
  );
}
