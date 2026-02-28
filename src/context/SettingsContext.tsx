import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { applyPrimaryColor, applyBackground, loadSavedSettings } from "../utils/colorUtils";

// ─── Background options ───────────────────────────────────────────────────────
export interface Background {
  key: string;
  label: string;
}

export const BACKGROUNDS: Background[] = [
  { key: "default", label: "bg_default" },
  { key: "/images/bg.png", label: "bg_pattern" },
  { key: "/images/back-img-v2.png", label: "bg_abstract" },
];

// ─── Primary color palette ────────────────────────────────────────────────────
export interface ColorOption {
  key: string;
  label: string;
}

export const COLORS: ColorOption[] = [
  { key: "#773DBD", label: "color_purple" },
  { key: "#FF5000", label: "color_orange" },
  { key: "#229CBE", label: "color_blue" },
  { key: "#07C37B", label: "color_green" },
  { key: "#C30734", label: "color_red" },
  { key: "#F4C724", label: "color_yellow" },
  { key: "#1D1F1F", label: "color_dark" },
];

// ─── Context type ─────────────────────────────────────────────────────────────
interface SettingsContextType {
  // sidebar open state
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;

  // theme
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;

  // primary color
  selectedColor: string;
  setSelectedColor: (c: string) => void;

  // background
  selectedBackground: Background;
  setSelectedBackground: (bg: Background) => void;

  // apply & save
  applySettings: () => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType>({} as SettingsContextType);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  // --- theme ---
  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    return stored === "dark" ? "dark" : "light";
  });

  // --- color ---
  const [selectedColor, setSelectedColorState] = useState<string>(() => {
    return localStorage.getItem("selectedColor") || "#773DBD";
  });

  // --- background ---
  const [selectedBackground, setSelectedBackgroundState] = useState<Background>(() => {
    const stored = localStorage.getItem("selectedBackground");
    return BACKGROUNDS.find((b) => b.key === stored) ?? BACKGROUNDS[0];
  });

  // Apply saved settings on mount
  useEffect(() => {
    loadSavedSettings();
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, []);

  const setTheme = useCallback((t: "light" | "dark") => {
    setThemeState(t);
    document.documentElement.setAttribute("data-bs-theme", t);
    localStorage.setItem("theme", t);
  }, []);

  const setSelectedColor = useCallback((c: string) => {
    setSelectedColorState(c);
    // live preview
    applyPrimaryColor(c);
  }, []);

  const setSelectedBackground = useCallback((bg: Background) => {
    setSelectedBackgroundState(bg);
    // live preview
    applyBackground(bg.key);
  }, []);

  const applySettings = useCallback(() => {
    applyPrimaryColor(selectedColor);
    applyBackground(selectedBackground.key);
    setTheme(theme);
    setSettingsOpen(false);
  }, [selectedColor, selectedBackground, theme, setTheme]);

  const resetSettings = useCallback(() => {
    setTheme("light");
    setSelectedColorState("#773DBD");
    setSelectedBackgroundState(BACKGROUNDS[0]);
    applyPrimaryColor("#773DBD");
    applyBackground("default");
    localStorage.removeItem("selectedColor");
    localStorage.removeItem("selectedBackground");
  }, [setTheme]);

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  const value = useMemo(
    () => ({
      settingsOpen,
      openSettings,
      closeSettings,
      theme,
      setTheme,
      selectedColor,
      setSelectedColor,
      selectedBackground,
      setSelectedBackground,
      applySettings,
      resetSettings,
    }),
    [
      settingsOpen,
      openSettings,
      closeSettings,
      theme,
      setTheme,
      selectedColor,
      setSelectedColor,
      selectedBackground,
      setSelectedBackground,
      applySettings,
      resetSettings,
    ]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => useContext(SettingsContext);
