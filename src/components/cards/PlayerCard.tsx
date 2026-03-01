import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import type { Employee } from "../../types/employee";
import { useLanguage } from "../../context/LanguageContext";
import CountUp from "../ui/CountUp";

// ── Celebration state machine ─────────────────────────────────────────────────
// "idle"         → normal card, everything visible
// "celebrating"  → GIF playing, card elements hidden
// "reassembling" → GIF done, elements animate back in one-by-one
type CelebState = "idle" | "celebrating" | "reassembling";

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
const PlayerCard: React.FC<PlayerCardProps> = React.memo(({
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

  // ── Animation controls for reassemble stagger ────────────────────────────
  const photoAnim    = useAnimation();
  const topleftAnim  = useAnimation();
  const logoAnim     = useAnimation();
  const namebarAnim  = useAnimation();
  const bottomAnim   = useAnimation();

  // Spring config used for each element snapping back into place
  const SNAP = { type: "spring", stiffness: 260, damping: 20 } as const;

  // ── Celebration state ─────────────────────────────────────────────────────
  const prevActive = useRef(false);
  const [celebState, setCelebState]   = useState<CelebState>("idle");
  const [showParticles, setShowParticles] = useState(false);
  const [gifKey, setGifKey] = useState(0);
  const timerA = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerB = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (timerA.current) clearTimeout(timerA.current);
    if (timerB.current) clearTimeout(timerB.current);
  };

  // ── Choreograph the reassemble animation ─────────────────────────────────
  useEffect(() => {
    if (celebState === "celebrating") {
      // Instantly hide every element behind the GIF
      photoAnim.set({ opacity: 0, scale: 0.7 });
      topleftAnim.set({ opacity: 0, scale: 0.6 });
      logoAnim.set({ opacity: 0, scale: 0.6 });
      namebarAnim.set({ opacity: 0, scale: 0.8 });
      bottomAnim.set({ opacity: 0, scale: 0.8 });

    } else if (celebState === "reassembling") {
      // Staggered reveal: wide gaps between elements create suspense
      const items: Array<{
        ctrl: ReturnType<typeof useAnimation>;
        from: Record<string, number>;
        delay: number;
      }> = [
        // 1st — name bar rises first
        { ctrl: namebarAnim, from: { opacity: 0, y:  45, scale: 0.8 }, delay: 0.00 },
        // 2nd — player photo drops in after the name
        { ctrl: photoAnim,   from: { opacity: 0, y: -60, scale: 0.7 }, delay: 0.45 },
        // 3rd — rating / position slides in from the left
        { ctrl: topleftAnim, from: { opacity: 0, x: -50, scale: 0.6 }, delay: 0.85 },
        // 4th — logo drops from top-right
        { ctrl: logoAnim,    from: { opacity: 0, x:  50, scale: 0.6 }, delay: 1.25 },
        // 5th — flag / year row — last piece, completes the picture
        { ctrl: bottomAnim,  from: { opacity: 0, y:  40, scale: 0.8 }, delay: 1.65 },
      ];

      items.forEach(({ ctrl, from, delay }) => {
        ctrl.set(from);
        ctrl.start({
          opacity: 1, x: 0, y: 0, scale: 1,
          transition: { ...SNAP, delay },
        });
      });

    } else {
      // idle – make sure everything is fully visible (covers app boot)
      [photoAnim, topleftAnim, logoAnim, namebarAnim, bottomAnim].forEach((ctrl) =>
        ctrl.set({ opacity: 1, x: 0, y: 0, scale: 1 })
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celebState]);

  useEffect(() => {
    if (isActive && !prevActive.current) {
      clearTimers();
      setGifKey((k) => k + 1);
      setCelebState("celebrating");

      setTimeout(() => setShowParticles(true), 100);
      setTimeout(() => setShowParticles(false), 1400);

      // GIF duration → 2 s, then kick off reassemble
      timerA.current = setTimeout(() => {
        setCelebState("reassembling");

        // Reassemble animation takes ~2.3 s → back to idle
        timerB.current = setTimeout(() => setCelebState("idle"), 2300);
      }, 2000);
    }
    if (!isActive) {
      clearTimers();
      setCelebState("idle");
      setShowParticles(false);
    }
    prevActive.current = isActive;
  }, [isActive]);

  // cleanup on unmount
  useEffect(() => () => { clearTimers(); }, []);

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
        {celebState === "celebrating" && (
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

      {/* ── Hidden SVG clipPath — shield shape from Background SVG (viewBox 799×1262) ── */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="card-shield-clip" clipPathUnits="objectBoundingBox"
            transform={`scale(${1 / 799} ${1 / 1262})`}>
            <path d="M392.600,1255.900 C392.400,1255.700 371.200,1238.400 327.100,1214.800 C286.400,1193.000 217.300,1161.200 119.300,1133.500 C66.900,1118.700 38.700,1103.800 22.000,1082.300 C3.700,1058.700 0.100,1027.900 0.100,985.900 C0.100,164.400 0.100,164.400 0.100,164.400 C0.100,164.400 10.800,165.600 10.800,165.600 C12.400,165.600 35.900,165.400 82.600,136.900 C104.600,123.500 120.100,110.700 136.600,97.200 C153.800,83.100 171.600,68.600 198.600,51.100 C247.600,19.500 292.600,16.600 294.500,16.500 C302.000,16.100 302.000,16.100 302.000,16.100 C302.000,16.100 304.400,22.900 304.400,22.900 C304.900,24.200 312.600,41.600 337.500,47.800 C353.100,51.700 375.400,31.200 391.200,10.800 C398.900,0.900 398.900,0.900 398.900,0.900 C398.900,0.900 406.900,10.600 406.900,10.600 C421.000,27.700 447.900,51.500 460.800,48.300 C485.700,42.100 493.300,24.700 493.900,23.400 C496.400,16.400 496.400,16.400 496.400,16.400 C496.400,16.400 503.800,17.000 503.800,17.000 C505.700,17.100 550.600,20.000 599.600,51.600 C626.700,69.000 644.400,83.600 661.600,97.700 C678.100,111.200 693.600,123.900 715.600,137.300 C762.300,165.800 785.800,166.000 787.400,166.000 C798.400,164.800 798.400,164.800 798.400,164.800 L798.000,176.000 C798.000,176.000 798.000,986.000 798.000,986.000 C798.000,1028.000 794.300,1058.800 776.100,1082.400 C759.400,1104.000 731.200,1118.800 678.800,1133.600 C678.800,1133.600 678.800,1133.600 678.800,1133.600 C489.400,1187.100 422.000,1240.400 405.900,1255.400 C399.400,1261.500 399.400,1261.500 399.400,1261.500 C399.400,1261.500 392.600,1255.900 392.600,1255.900 z" />
          </clipPath>
        </defs>
      </svg>

      {/* ── The actual card ── */}
      <div
        className={`pc ${isToggled ? "pc--toggled" : ""} ${theme}`}
        onClick={onToggle}
        style={{
          position: "relative",
        }}
      >
        {/* ── Layer 1: Background ── */}
        <img src={bg} className="pc__bg" alt="" />

        {/* ── Layer 2: Player photo — clipped inside card bounds ── */}
        <motion.div className="pc__photo-clip" animate={photoAnim}>
          <img src={employee.photoUrl} className="pc__photo" alt={fullName} />
        </motion.div>

        {/* ── Layer 3: Shield outline ── */}
        <img
          src={outline}
          className="pc__outline"
          alt=""
          style={{
            filter: celebState === "celebrating"
              ? `drop-shadow(0 0 8px ${colors.primary}) drop-shadow(0 0 16px ${colors.primary}) drop-shadow(0 0 30px ${colors.glow})`
              : "none",
            transition: celebState === "celebrating" ? "filter 0.3s ease" : "filter 0.6s ease",
          }}
        />

        {/* ── Layer 3.5: Football side-gradient ── */}
        {employee.department === "Football" && (
          <img src="/assets/card-layers/Side-gradient.svg" className="pc__side-gradient" alt="" />
        )}

        {/* ── Layer 4: Sport icon / Football info ── */}
        <motion.div className="pc__topleft" animate={topleftAnim}>
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
        </motion.div>

        {/* ── Layer 5: Mahd logo ── */}
        <motion.img src="/assets/card-layers/Logo.png" className="pc__logo" alt="Mahd" animate={logoAnim} />

        {/* ── Layer 6: Name bar ── */}
        <motion.div className="pc__namebar" animate={namebarAnim}>
          <img src={bar} className="pc__namebar-bg" alt="" />
          <span className="pc__namebar-text">{fullName}</span>
        </motion.div>

        {/* ── FRONT: flag + year ── */}
        <motion.div className="pc__bottom pc__bottom--front" animate={bottomAnim}>
          <AnimatePresence>
            {!isToggled && (
              <motion.div
                key="flag-row"
                className="pc__flag-row"
                initial={{ opacity: 0, y: -12, scale: 0.75 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.75 }}
                transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
              >
                <img src="/assets/card-layers/Flag.png" className="pc__flag" alt="SA" />
                <span className="pc__country">SAUDI ARABIA</span>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!isToggled && (
              <motion.span
                key="year"
                className="pc__year"
                initial={{ opacity: 0, y: 16, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.7 }}
                transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0], delay: isToggled ? 0 : 0.06 }}
              >
                {employee.year}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

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
                <CountUp key={key} value={stats?.[key]} duration={900} trigger={isToggled} />
              ))}
            </div>
          </div>
          <img src="/assets/card-layers/Back-black.svg" className="pc__flip-icon" alt="flip" />
        </div>

        {/* ── Celebration GIF ── */}
        <AnimatePresence>
          {celebState === "celebrating" && (
            <div className="pc__photo-clip">
              <motion.img
                key={gifKey}
                src="/assets/players/celebreations.gif"
                alt="celebration"
                className="pc__photo"
                style={{ opacity: 1 }}
                initial={{ opacity: 0, filter: "brightness(2) saturate(0)" }}
                animate={{ opacity: 1, filter: "brightness(1) saturate(1)" }}
                exit={{ opacity: 0, filter: "brightness(2) saturate(0)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
});

export default PlayerCard;
