import React from "react";
import type { Employee } from "../data/staticEmployees";
import { useLanguage } from "../context/LanguageContext";

interface PlayerCardProps {
  employee: Employee;
  isToggled: boolean;
  onToggle: (e: React.MouseEvent) => void;
  qrCode?: React.ReactNode;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  employee,
  isToggled,
  onToggle,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const fullName = isArabic ? employee.fullNameAr : employee.fullNameEn;

  // Pick assets based on category
  const getAssets = () => {
    switch (employee.category) {
      case "Gold":
        return {
          bg: "/src/assests/components/Assets/Background 2-gold.svg",
          outline: "/src/assests/components/Assets/outline-Gold.svg",
          bar: "/src/assests/components/Assets/Bar-Gold.svg",
          theme: "theme-gold",
        };
      case "Purple":
        return {
          bg: "/src/assests/components/Assets/Background 2-purple.svg",
          outline: "/src/assests/components/Assets/outline-Gold.svg",
          bar: "/src/assests/components/Assets/Bar-Gold.svg",
          theme: "theme-purple",
        };
      case "Diamond":
        return {
          bg: "/src/assests/components/Assets/Background 2-diamond.svg",
          outline: "/src/assests/components/Assets/outline-Gold.svg",
          bar: "/src/assests/components/Assets/Bar-Gold.svg",
          theme: "theme-diamond",
        };
      default: // Silver
        return {
          bg: "/src/assests/components/Assets/Background 2.svg",
          outline: "/src/assests/components/Assets/outline-silver.svg",
          bar: "/src/assests/components/Assets/Bar-silver.svg",
          theme: "theme-silver",
        };
    }
  };

  const { bg, outline, bar, theme } = getAssets();
  const stats = employee.stats;

  return (
    <div
      className={`pc ${isToggled ? "pc--toggled" : ""} ${theme}`}
      onClick={onToggle}
    >
      {/* ── Layer 1: Background ── */}
      <img src={bg} className="pc__bg" alt="" />

      {/* ── Layer 2: Player photo (always visible, clips under outline) ── */}
      <img
        src={employee.photoUrl}
        className="pc__photo"
        alt={fullName}
      />

      {/* ── Layer 4: Shield outline (on top of photo) ── */}
      <img src={outline} className="pc__outline" alt="" />

      {/* ── Layer 5: Sport icon (top-left) ── */}
      <div className="pc__topleft">
        <span className="pc__sport-icon">⚽</span>
      </div>

      {/* ── Layer 6: Mahd logo top-right ── */}
      <img
        src="/src/assests/components/Assets/Logo.png"
        className="pc__logo"
        alt="Mahd"
      />

      {/* ── Layer 7: Name bar (always) ── */}
      <div className="pc__namebar">
        <img src={bar} className="pc__namebar-bg" alt="" />
        <span className="pc__namebar-text">{fullName}</span>
      </div>

      {/* ── Front-only: flag + year ── */}
      <div className="pc__bottom pc__bottom--front">
        <div className="pc__flag-row">
          <img
            src="/src/assests/components/Assets/Flag.png"
            className="pc__flag"
            alt="SA"
          />
          <span className="pc__country">SAUDI ARABIA</span>
        </div>
        <span className="pc__year">{employee.year}</span>
      </div>

      {/* ── Back-only: stats grid + flip icon ── */}
      <div className="pc__bottom pc__bottom--back">
        <div className="pc__stats">
          {/* Labels row — each label on a req-dark pill */}
          <div className="pc__stats-labels">
            {(["pac","sho","pas","dri","def","phy"] as const).map((key) => (
              <div className="pc__stat-item" key={key}>
                <img src="/src/assets/card-layers/req-dark.svg" className="pc__stat-pill" alt="" />
                <span className="pc__stat-label">
                  {employee.statLabels?.[key] ?? key.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
          {/* Values row — plain large numbers, no pill */}
          <div className="pc__stats-values">
            <span>{stats?.pac}</span>
            <span>{stats?.sho}</span>
            <span>{stats?.pas}</span>
            <span>{stats?.dri}</span>
            <span>{stats?.def}</span>
            <span>{stats?.phy}</span>
          </div>
        </div>
        <img
          src="/src/assets/card-layers/Back-black.svg"
          className="pc__flip-icon"
          alt="flip"
        />
      </div>

    </div>
  );
};

export default PlayerCard;
