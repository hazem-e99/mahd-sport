import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
    <circle cx="32" cy="32" r="30" stroke="#fff" strokeWidth="3" fill="rgba(255,255,255,0.12)" />
    <polygon points="32,14 38,24 46,24 41,33 44,43 32,37 20,43 23,33 18,24 26,24" fill="#fff" opacity="0.9" />
    <circle cx="32" cy="32" r="30" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
  </svg>
);

// ── Card-layer asset paths ────────────────────────────────────────────────────
const CARD_LAYERS = {
  gold: { bg: "/assets/card-layers/Background 2-gold.svg", outline: "/assets/card-layers/outline-Gold.svg", bar: "/assets/card-layers/Bar-Gold.svg", theme: "theme-gold" },
  purple: { bg: "/assets/card-layers/Background 2-purple.svg", outline: "/assets/card-layers/outline-Gold.svg", bar: "/assets/card-layers/Bar-Gold.svg", theme: "theme-purple" },
  diamond: { bg: "/assets/card-layers/Background 2-diamond.svg", outline: "/assets/card-layers/outline-Gold.svg", bar: "/assets/card-layers/Bar-Gold.svg", theme: "theme-diamond" },
  silver: { bg: "/assets/card-layers/Background 2.svg", outline: "/assets/card-layers/outline-silver.svg", bar: "/assets/card-layers/Bar-silver.svg", theme: "theme-silver" },
} as const;

// ── Theme colours per category ────────────────────────────────────────────────
const THEME_COLORS = {
  gold: { primary: "#FFD700", secondary: "#FFF176", glow: "rgba(255,215,0,0.8)", particle: "#FFE066", glowSoft: "rgba(255,215,0,0.25)" },
  purple: { primary: "#B464FF", secondary: "#E0AAFF", glow: "rgba(180,100,255,0.8)", particle: "#CE93FF", glowSoft: "rgba(180,100,255,0.25)" },
  diamond: { primary: "#64DCFF", secondary: "#B2EBF2", glow: "rgba(100,220,255,0.8)", particle: "#80DEEA", glowSoft: "rgba(100,220,255,0.25)" },
  silver: { primary: "#C0C0C0", secondary: "#F5F5F5", glow: "rgba(192,192,192,0.8)", particle: "#E0E0E0", glowSoft: "rgba(192,192,192,0.25)" },
} as const;

const STAT_KEYS = ["pac", "sho", "pas", "dri", "def", "phy"] as const;

// ── Floating particle ─────────────────────────────────────────────────────────
const Particle: React.FC<{ color: string; index: number; total: number }> = ({ color, index, total }) => {
  const angle = (index / total) * 360;
  const rad = (angle * Math.PI) / 180;
  const dist = 100 + Math.random() * 80;
  const size = 4 + Math.random() * 6;
  const delay = Math.random() * 0.3;

  return (
    <motion.div
      style={{
        position: "absolute",
        width: size, height: size,
        borderRadius: "50%",
        background: color,
        top: "50%", left: "50%",
        marginTop: -size / 2, marginLeft: -size / 2,
        pointerEvents: "none",
        zIndex: 100,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        opacity: 0,
        scale: 0,
      }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.3, 1] }}
    />
  );
};

// ── Props ─────────────────────────────────────────────────────────────────────
interface PlayerCardProps {
  employee: Employee;
  isToggled: boolean;
  onToggle: (e: React.MouseEvent) => void;
  qrCode?: React.ReactNode;
  isActive?: boolean;
}

// ── Main component ────────────────────────────────────────────────────────────
const PlayerCard: React.FC<PlayerCardProps> = ({
  employee,
  isToggled,
  onToggle,
  isActive = false,
}) => {
  const { language } = useLanguage();
  const fullName = language === "ar" ? employee.fullNameAr : employee.fullNameEn;

  const categoryKey = employee.category.toLowerCase() as keyof typeof CARD_LAYERS;
  const layer = CARD_LAYERS[categoryKey] ?? CARD_LAYERS.silver;
  const colors = THEME_COLORS[categoryKey] ?? THEME_COLORS.silver;
  const { bg, outline, bar, theme } = layer;
  const stats = employee.stats;

  // ── Celebration state ─────────────────────────────────────────────────────
  const prevActive = useRef(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  // key trick: force GIF restart on each activation by changing key
  const [gifKey, setGifKey] = useState(0);

  useEffect(() => {
    if (isActive && !prevActive.current) {
      // restart GIF from frame 0
      setGifKey((k) => k + 1);
      setShowCelebration(true);
      setTimeout(() => setShowParticles(true), 100);
      setTimeout(() => setShowParticles(false), 1400);
      setTimeout(() => setShowCelebration(false), 2800);
    }
    if (!isActive) {
      setShowCelebration(false);
      setShowParticles(false);
    }
    prevActive.current = isActive;
  }, [isActive]);

  return (
    // wrapper: overflow visible so particles can fly outside card bounds
    <div style={{ position: "relative", display: "inline-block", overflow: "visible" }}>

      {/* ── Particles ── */}
      <AnimatePresence>
        {showParticles && (
          <>
            {Array.from({ length: 20 }).map((_, i) => (
              <Particle key={i} color={colors.particle} index={i} total={20} />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ── Outer glow halo ── */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            key="halo"
            style={{
              position: "absolute",
              inset: -24,
              borderRadius: 20,
              pointerEvents: "none",
              zIndex: 0,
              background: `radial-gradient(ellipse at 50% 60%, ${colors.glowSoft} 0%, transparent 70%)`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* ── The actual card (UNCHANGED) ── */}
      <div
        className={`pc ${isToggled ? "pc--toggled" : ""} ${theme}`}
        onClick={onToggle}
        style={{
          position: "relative",
        }}
      >
        {/* ── Layer 1: Background ── */}
        <img src={bg} className="pc__bg" alt="" />

        {/* ── Layer 2: Player photo — hidden during celebration ── */}
        <img
          src={employee.photoUrl}
          className="pc__photo"
          alt={fullName}
          style={{
            opacity: showCelebration ? 0 : 1,
            transition: showCelebration ? "opacity 0.2s ease" : "opacity 0.5s ease 0.3s",
          }}
        />

        {/* ── Layer 3: Shield outline ── */}
        <img
          src={outline}
          className="pc__outline"
          alt=""
          style={{
            filter: showCelebration
              ? `drop-shadow(0 0 8px ${colors.primary}) drop-shadow(0 0 16px ${colors.primary}) drop-shadow(0 0 30px ${colors.glow})`
              : "none",
            transition: showCelebration ? "filter 0.3s ease" : "filter 0.6s ease",
          }}
        />

        {/* ── Layer 3.5: Football side-gradient ── */}
        {employee.department === "Football" && (
          <img src="/assets/card-layers/Side-gradient.svg" className="pc__side-gradient" alt="" />
        )}

        {/* ── Layer 4: Sport icon / Football info ── */}
        <div className="pc__topleft">
          {employee.department === "Football" ? (
            <>
              <span className="pc__rating">{employee.rating}</span>
              <span className="pc__position">{employee.position}</span>
              <span className="pc__topleft-divider" />
              <FootballIcon className="pc__football-icon" />
            </>
          ) : (
            <span className="pc__sport-icon">{SPORT_ICONS[employee.department] ?? "🏅"}</span>
          )}
        </div>

        {/* ── Layer 5: Mahd logo ── */}
        <img src="/assets/card-layers/Logo.png" className="pc__logo" alt="Mahd" />

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
                  <img src="/assets/card-layers/req-dark.svg" className="pc__stat-pill" alt="" />
                  <span className="pc__stat-label">{employee.statLabels?.[key] ?? key.toUpperCase()}</span>
                </div>
              ))}
            </div>
            <div className="pc__stats-values">
              {STAT_KEYS.map((key) => (
                <span key={key}>{stats?.[key]}</span>
              ))}
            </div>
          </div>
          <img src="/assets/card-layers/Back-black.svg" className="pc__flip-icon" alt="flip" />
        </div>

      </div>

      {/* ── Celebration GIF overlay (Moved outside .pc for absolute priority) ── */}
      <AnimatePresence>
        {showCelebration && (
          <motion.img
            key={gifKey}
            src="/assets/players/celebreations.gif"
            alt="celebration"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 10000,
              pointerEvents: "none",

            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlayerCard;
