import React from "react";
import type { Employee } from "../../types/employee";
import { useLanguage } from "../../context/LanguageContext";

// ── Sport icon map (non-football sports) ─────────────────────────────────────
const SPORT_ICONS: Record<string, string> = {
  Judo: "🥋",
  Athletics: "👟",
  Taekwondo: "🦵",
  Tennis: "🎾",
  Swimming: "🏊",
};

// ── Football SVG icon ─────────────────────────────────────────────────────────
const FootballIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <circle cx="32" cy="32" r="30" stroke="#fff" strokeWidth="3" fill="rgba(255,255,255,0.12)" />
    <polygon
      points="32,14 38,24 46,24 41,33 44,43 32,37 20,43 23,33 18,24 26,24"
      fill="#fff"
      opacity="0.9"
    />
    <circle cx="32" cy="32" r="30" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
  </svg>
);

// ── Card-layer asset paths (served from public/assets/card-layers via Vite) ──
const CARD_LAYERS = {
  gold: {
    bg: "/assets/card-layers/Background 2-gold.svg",
    outline: "/assets/card-layers/outline-Gold.svg",
    bar: "/assets/card-layers/Bar-Gold.svg",
    theme: "theme-gold",
  },
  purple: {
    bg: "/assets/card-layers/Background 2-purple.svg",
    outline: "/assets/card-layers/outline-Gold.svg",
    bar: "/assets/card-layers/Bar-Gold.svg",
    theme: "theme-purple",
  },
  diamond: {
    bg: "/assets/card-layers/Background 2-diamond.svg",
    outline: "/assets/card-layers/outline-Gold.svg",
    bar: "/assets/card-layers/Bar-Gold.svg",
    theme: "theme-diamond",
  },
  silver: {
    bg: "/assets/card-layers/Background 2.svg",
    outline: "/assets/card-layers/outline-silver.svg",
    bar: "/assets/card-layers/Bar-silver.svg",
    theme: "theme-silver",
  },
} as const;

const STAT_KEYS = ["pac", "sho", "pas", "dri", "def", "phy"] as const;

interface PlayerCardProps {
  employee: Employee;
  isToggled: boolean;
  onToggle: (e: React.MouseEvent) => void;
  qrCode?: React.ReactNode;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ employee, isToggled, onToggle }) => {
  const { language } = useLanguage();
  const fullName = language === "ar" ? employee.fullNameAr : employee.fullNameEn;

  const layer =
    CARD_LAYERS[employee.category.toLowerCase() as keyof typeof CARD_LAYERS] ??
    CARD_LAYERS.silver;

  const { bg, outline, bar, theme } = layer;
  const stats = employee.stats;

  return (
    <div
      className={`pc ${isToggled ? "pc--toggled" : ""} ${theme}`}
      onClick={onToggle}
    >
      {/* ── Layer 1: Background ── */}
      <img src={bg} className="pc__bg" alt="" />

      {/* ── Layer 2: Player photo ── */}
      <img src={employee.photoUrl} className="pc__photo" alt={fullName} />

      {/* ── Layer 3: Shield outline (on top of photo) ── */}
      <img src={outline} className="pc__outline" alt="" />

      {/* ── Layer 3.5: Football side-gradient overlay ── */}
      {employee.department === "Football" && (
        <img
          src="/assets/card-layers/Side-gradient.svg"
          className="pc__side-gradient"
          alt=""
        />
      )}

      {/* ── Layer 4: Sport icon / Football info (top-left) ── */}
      <div className="pc__topleft">
        {employee.department === "Football" ? (
          <>
            <span className="pc__rating">{employee.rating}</span>
            <span className="pc__position">{employee.position}</span>
            <span className="pc__topleft-divider" />
            <FootballIcon className="pc__football-icon" />
          </>
        ) : (
          <span className="pc__sport-icon">
            {SPORT_ICONS[employee.department] ?? "🏅"}
          </span>
        )}
      </div>

      {/* ── Layer 5: Mahd logo (top-right) ── */}
      <img
        src="/assets/card-layers/Logo.png"
        className="pc__logo"
        alt="Mahd"
      />

      {/* ── Layer 6: Name bar ── */}
      <div className="pc__namebar">
        <img src={bar} className="pc__namebar-bg" alt="" />
        <span className="pc__namebar-text">{fullName}</span>
      </div>

      {/* ── FRONT: flag + year ── */}
      <div className="pc__bottom pc__bottom--front">
        <div className="pc__flag-row">
          <img src="/assets/card-layers/Flag.png" className="pc__flag" alt="SA" />
          <span className="pc__country">SAUDI ARABIA</span>
        </div>
        <span className="pc__year">{employee.year}</span>
      </div>

      {/* ── BACK: stats + flip icon ── */}
      <div className="pc__bottom pc__bottom--back">
        <div className="pc__stats">
          <div className="pc__stats-labels">
            {STAT_KEYS.map((key) => (
              <div className="pc__stat-item" key={key}>
                <img
                  src="/assets/card-layers/req-dark.svg"
                  className="pc__stat-pill"
                  alt=""
                />
                <span className="pc__stat-label">
                  {employee.statLabels?.[key] ?? key.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
          <div className="pc__stats-values">
            {STAT_KEYS.map((key) => (
              <span key={key}>{stats?.[key]}</span>
            ))}
          </div>
        </div>
        <img
          src="/assets/card-layers/Back-black.svg"
          className="pc__flip-icon"
          alt="flip"
        />
      </div>
    </div>
  );
};

export default PlayerCard;
