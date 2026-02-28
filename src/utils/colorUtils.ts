const hexToRgb = (hex: string): number[] => {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);
  return [r, g, b];
};

const parseRgb = (rgb: string): number[] => {
  const matches = rgb.match(/\d+/g);
  if (!matches || matches.length !== 3) throw new Error("Invalid RGB");
  return matches.map(Number);
};

const calculateLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

export const isWhiteOrWhiteDegree = (color: string, threshold = 245): boolean => {
  try {
    let rgb: number[];
    if (color.startsWith("#")) rgb = hexToRgb(color);
    else if (color.startsWith("rgb")) rgb = parseRgb(color);
    else rgb = hexToRgb(color);
    return rgb[0] >= threshold && rgb[1] >= threshold && rgb[2] >= threshold;
  } catch {
    return false;
  }
};

export const applyPrimaryColor = (color: string): void => {
  const root = document.documentElement;
  root.style.setProperty("--bs-primary-color", color);
  // hex to rgb
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    root.style.setProperty("--bs-primary-rgb-color", `${r}, ${g}, ${b}`);
  }
  localStorage.setItem("selectedColor", color);
};

export const applyBackground = (key: string): void => {
  localStorage.setItem("selectedBackground", key);
  window.dispatchEvent(new Event("backgroundChanged"));
};

export const loadSavedSettings = (): void => {
  const savedColor = localStorage.getItem("selectedColor");
  if (savedColor) applyPrimaryColor(savedColor);

  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
  if (savedTheme) {
    document.documentElement.setAttribute("data-bs-theme", savedTheme);
  }
};

export const getContrastColors = (backgroundColor: string) => {
  const isLight = isWhiteOrWhiteDegree(backgroundColor);
  const isDarkMode = localStorage.getItem("theme") === "dark";
  if (isLight) {
    if (isDarkMode) return { textColor: "#000000", borderColor: "", backgroundColor: "" };
    return { textColor: "#000000", borderColor: "#000000", backgroundColor: "#000000" };
  }
  return { textColor: "#FFFFFF", borderColor: "", backgroundColor: "" };
};
