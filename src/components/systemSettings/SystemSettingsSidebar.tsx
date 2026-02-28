import { useSettings, COLORS, BACKGROUNDS } from "@/context/SettingsContext";
import type { Background } from "@/context/SettingsContext";
import { useTranslation } from "react-i18next";

import "./SystemSettingsSidebar.scss";

export default function SystemSettingsSidebar() {
  const {
    settingsOpen,
    closeSettings,
    theme,
    setTheme,
    selectedColor,
    setSelectedColor,
    selectedBackground,
    setSelectedBackground,
    resetSettings,
  } = useSettings();

  const { t } = useTranslation();



  if (!settingsOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="settings-overlay" onClick={closeSettings} />

      {/* Sidebar */}
      <aside className="settings-sidebar">
        {/* ── Header ── */}
        <div className="settings-sidebar__header">
          <div className="settings-sidebar__header-title">
            <SettingsIcon />
            <span>{t("settings_title")}</span>
          </div>
          <button className="settings-sidebar__close" onClick={closeSettings} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="settings-sidebar__body">



          {/* Theme */}
          <section className="settings-section">
            <h4 className="settings-section__title">{t("settings_theme")}</h4>
            <div className="theme-options">
              <button
                className={`theme-btn ${theme === "light" ? "active" : ""}`}
                onClick={() => setTheme("light")}
              >
                <SunIcon />
                <span>{t("settings_light")}</span>
              </button>
              <button
                className={`theme-btn ${theme === "dark" ? "active" : ""}`}
                onClick={() => setTheme("dark")}
              >
                <MoonIcon />
                <span>{t("settings_dark")}</span>
              </button>
            </div>
          </section>

          {/* Primary Color */}
          <section className="settings-section">
            <h4 className="settings-section__title">{t("settings_primary_color")}</h4>
            <div className="color-options">
              {COLORS.map((c) => (
                <button
                  key={c.key}
                  className={`color-dot ${selectedColor === c.key ? "active" : ""}`}
                  style={{ backgroundColor: c.key }}
                  title={t(c.label)}
                  onClick={() => setSelectedColor(c.key)}
                />
              ))}
            </div>
          </section>

          {/* Background */}
          <section className="settings-section">
            <h4 className="settings-section__title">{t("settings_background")}</h4>
            <div className="bg-options">
              {BACKGROUNDS.map((bg: Background) => (
                <button
                  key={bg.key}
                  className={`bg-thumb ${selectedBackground.key === bg.key ? "active" : ""}`}
                  onClick={() => setSelectedBackground(bg)}
                  title={t(bg.label)}
                  style={
                    bg.key !== "default"
                      ? {
                        backgroundImage: `url(${bg.key})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                      : undefined
                  }
                >
                  {bg.key === "default" && <span className="bg-thumb__label">{t("settings_default")}</span>}
                  {selectedBackground.key === bg.key && (
                    <span className="bg-thumb__check">✔</span>
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* ── Footer ── */}
        <div className="settings-sidebar__footer">
          <button className="settings-reset-btn" onClick={resetSettings}>
            {t("settings_reset")}
          </button>
        </div>
      </aside>

    </>
  );
}

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}


