import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import "./i18n";

import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SettingsProvider, useSettings } from "./context/SettingsContext";
import { Navbar } from "./components/layout";
import { TeamSlider } from "./components/slider";
import BackgroundMusic from "./components/common/backgroundMusic/BackgroundMusic";
import SystemSettingsSidebar from "./components/systemSettings/SystemSettingsSidebar";

// Inner wrapper that reads background from SettingsContext
function AppContent() {
  const { selectedBackground, settingsOpen, openSettings, closeSettings } = useSettings();
  const { language } = useLanguage();
  const [bgStyle, setBgStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const updateBg = () => {
      const key = selectedBackground.key;
      if (key === "default" || !key) {
        setBgStyle({});
      } else {
        setBgStyle({
          backgroundImage: `url(${key})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        });
      }
    };

    updateBg();
    window.addEventListener("backgroundChanged", updateBg);
    return () => window.removeEventListener("backgroundChanged", updateBg);
  }, [selectedBackground]);

  return (
    <div className="app-wrapper" key={language}>
      <Navbar setShowSettings={() => settingsOpen ? closeSettings() : openSettings()} />
      <div className="team-slider-wrapper" style={bgStyle}>
        <TeamSlider />
      </div>
      <BackgroundMusic />
      <SystemSettingsSidebar />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SettingsProvider>
          <AppContent />
        </SettingsProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
