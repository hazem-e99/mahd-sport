import DateTimeDisplay from "@/components/common/dateTimeDisplay/date-time-display.component";

import UserProfileMenu from "@/components/common/user-profilemenu/user-profilemenu.component";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import SvgMahadlogo from "@/icons/mahadlogo";

import "./Navbar.scss";

export default function Navbar() {
  const { language, switchLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    switchLanguage(language === "ar" ? "en" : "ar");
  };

  return (
    <nav className="nav-bar">
      <a href={`/${language}/home`} className="nav-bar-logo">
        <SvgMahadlogo width={100} height={52} />
      </a>

      <div className="navbar-right">
        <DateTimeDisplay />

        <button className="theme-toggle" onClick={toggleTheme} title={theme === "light" ? "Dark Mode" : "Light Mode"}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <button className="button-primary lang-toggle" onClick={toggleLanguage}>
          {language === "ar" ? "en" : "ar"}
        </button>
        <UserProfileMenu userData={null} />
      </div>
    </nav>
  );
}
