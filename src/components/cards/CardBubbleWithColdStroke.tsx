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

// ── Fixed card-layer assets for Diamond / "bubble + gold stroke" style ──
const ASSETS = {
  bg: "/assets/card-layers/Background 2-diamond.svg",
  outline: "/assets/card-layers/outline-Gold.svg",
  bar: "/assets/card-layers/Bar-Gold.svg",
  logo: "/assets/card-layers/Logo.png",
  flag: "/assets/card-layers/Flag.png",
  reqDark: "/assets/card-layers/req-dark.svg",
  backBtn: "/assets/card-layers/Back-black.svg",
} as const;

const STAT_KEYS = ["pac", "sho", "pas", "dri", "def", "phy"] as const;

interface CardBubbleWithColdStrokeProps {
  employee: Employee;
  isToggled: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

const CardBubbleWithColdStroke: React.FC<CardBubbleWithColdStrokeProps> = ({
  employee,
  isToggled,
  onToggle,
}) => {
  const { language } = useLanguage();
  const fullName = language === "ar" ? employee.fullNameAr : employee.fullNameEn;
  const stats = employee.stats;

  return (
    <div
      className={`cbwcs${isToggled ? " cbwcs--toggled" : ""}`}
      onClick={onToggle}
    >
      {/* ── Background ── */}
      <img src={ASSETS.bg} className="cbwcs__bg" alt="" />

      {/* ── Player photo ── */}
      <img src={employee.photoUrl} className="cbwcs__photo" alt={fullName} />

      {/* ── Gold outline (on top of photo) ── */}
      <img src={ASSETS.outline} className="cbwcs__outline" alt="" />

      {/* ── Football side-gradient overlay ── */}
      {employee.department === "Football" && (
        <img
          src="/assets/card-layers/Side-gradient.svg"
          className="cbwcs__side-gradient"
          alt=""
        />
      )}

      {/* ── Sport icon / Football info (top-left) ── */}
      <div className="cbwcs__topleft">
        {employee.department === "Football" ? (
          <>
            <span className="cbwcs__rating">{employee.rating}</span>
            <span className="cbwcs__position">{employee.position}</span>
            <span className="cbwcs__topleft-divider" />
            <FootballIcon className="cbwcs__football-icon" />
          </>
        ) : (
          <span className="cbwcs__sport-icon">
            {SPORT_ICONS[employee.department] ?? "🏅"}
          </span>
        )}
      </div>

      {/* ── Mahd logo (top-right) ── */}
      <img src={ASSETS.logo} className="cbwcs__logo" alt="Mahd" />

      {/* ── Name bar (always visible) ── */}
      <div className="cbwcs__namebar">
        <img src={ASSETS.bar} className="cbwcs__namebar-bg" alt="" />
        <span className="cbwcs__namebar-text">{fullName}</span>
      </div>

      {/* ── FRONT: flag + year ── */}
      <div className="cbwcs__bottom cbwcs__bottom--front">
        <div className="cbwcs__flag-row">
          <img src={ASSETS.flag} className="cbwcs__flag" alt="SA" />
          <span className="cbwcs__country">SAUDI ARABIA</span>
        </div>
        <span className="cbwcs__year">{employee.year}</span>
      </div>

      {/* ── BACK: stats + flip icon ── */}
      <div className="cbwcs__bottom cbwcs__bottom--back">
        <div className="cbwcs__stats">
          <div className="cbwcs__stats-labels">
            {STAT_KEYS.map((key) => (
              <div className="cbwcs__stat-item" key={key}>
                <img src={ASSETS.reqDark} className="cbwcs__stat-pill" alt="" />
                <span className="cbwcs__stat-label">
                  {employee.statLabels?.[key] ?? key.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
          <div className="cbwcs__stats-values">
            {STAT_KEYS.map((key) => (
              <span key={key}>{stats?.[key]}</span>
            ))}
          </div>
        </div>
        <img src={ASSETS.backBtn} className="cbwcs__flip-icon" alt="flip" />
      </div>
    </div>
  );
};

export default CardBubbleWithColdStroke;
