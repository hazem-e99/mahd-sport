import React from "react";
import type { Employee } from "../data/staticEmployees";
import { useLanguage } from "../context/LanguageContext";
import "../styles/card-burbble-with-cold-stroke.scss";

interface CardBurbbleWithColdStrokeProps {
  employee: Employee;
  isToggled: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

// Fixed assets for the "bubble + gold stroke" (Diamond) style
const ASSETS = {
  bg:      "/src/assests/components/Assets/Background 2-diamond.svg",
  outline: "/src/assests/components/Assets/outline-Gold.svg",
  bar:     "/src/assests/components/Assets/Bar-Gold.svg",
  logo:    "/src/assests/components/Assets/Logo.png",
  flag:    "/src/assests/components/Assets/Flag.png",
  reqDark: "/src/assets/card-layers/req-dark.svg",
  backBtn: "/src/assets/card-layers/Back-black.svg",
} as const;

const STAT_KEYS = ["pac", "sho", "pas", "dri", "def", "phy"] as const;

const CardBurbbleWithColdStroke: React.FC<CardBurbbleWithColdStrokeProps> = ({
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

      {/* ── Sport icon (top-left) ── */}
      <div className="cbwcs__topleft">
        <span className="cbwcs__sport-icon">⚽</span>
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
          {/* Labels row — each on a req-dark pill */}
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
          {/* Values row — plain large numbers */}
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

export default CardBurbbleWithColdStroke;
