import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import SvgArrowLeftIcon from "../../icons/arrow-left-icon";
import SvgArrowRightIcon from "../../icons/arrow-right-icon";
import SvgSearchIcon from "../../icons/search-icon";
import SvgGroupIcon from "../../icons/group-icon";
import { PlayerCard } from "../cards";
import { QRCodeComponent } from "../ui";
import { generateEmployeeVCard } from "../../utils/qrCodeUtils";
import { staticEmployees } from "../../data/staticEmployees";
import { useLanguage } from "../../context/LanguageContext";

// ── Sport definitions ──────────────────────────────────────────────────────────
interface SportTab {
  key: string;         // matches employee.department (exact) or "all"
  labelKey: string;   // i18n key
  icon: string;       // emoji
}

const SPORT_TABS: SportTab[] = [
  { key: "all", labelKey: "allSports", icon: "🏅" },
  { key: "Football", labelKey: "sport_football", icon: "⚽" },
  { key: "Judo", labelKey: "sport_judo", icon: "🥋" },
  { key: "Athletics", labelKey: "sport_athletics", icon: "👟" },
  { key: "Taekwondo", labelKey: "sport_taekwondo", icon: "🦵" },
  { key: "Tennis", labelKey: "sport_tennis", icon: "🎾" },
  { key: "Swimming", labelKey: "sport_swimming", icon: "🏊" },
];

// ── Component ─────────────────────────────────────────────────────────────────
const TeamSlider = () => {
  const [searchText, setSearchText] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [activeSport, setActiveSport] = useState("all");
  const [toggledId, setToggledId] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(() => Math.floor(staticEmployees.length / 2));
  const { t, language } = useLanguage();

  // Count employees per sport tab (for badge)
  const sportCounts = useMemo(() => {
    const counts: Record<string, number> = { all: staticEmployees.length };
    SPORT_TABS.forEach(({ key }) => {
      if (key !== "all")
        counts[key] = staticEmployees.filter((e) => e.department === key).length;
    });
    return counts;
  }, []);

  // Combined filter: sport tab + text search
  const employees = useMemo(() => {
    let list = staticEmployees;

    // 1. Sport tab filter
    if (activeSport !== "all") {
      list = list.filter((emp) => emp.department === activeSport);
    }

    // 2. Text search filter
    if (!searchText.trim()) return list;

    const query = searchText.toLowerCase();
    return list.filter((emp) => {
      switch (filterBy) {
        case "name":
          return (
            emp.fullNameEn.toLowerCase().includes(query) ||
            emp.fullNameAr.includes(searchText)
          );
        case "department":
          return (
            emp.department.toLowerCase().includes(query) ||
            emp.departmentAr.includes(searchText)
          );
        case "jobTitle":
          return (
            emp.jobTitle.toLowerCase().includes(query) ||
            emp.jobTitleAr.includes(searchText)
          );
        case "email":
          return emp.email.toLowerCase().includes(query);
        default:
          return true;
      }
    });
  }, [searchText, filterBy, activeSport]);

  const handleToggle = (id: number) => {
    setToggledId((prev) => (prev === id ? null : id));
  };

  const handleSportChange = (key: string) => {
    setActiveSport(key);
    setToggledId(null);
  };

  const handleSwiper = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  const clearSearch = () => {
    setSearchText("");
    setFilterBy("name");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="team-slider-page">
      {/* Header */}
      <div className="team-header">
        <SvgGroupIcon width={28} height={28} />
        <h2>{t("cardTeam")}</h2>
      </div>

      {/* ── Sport Filter Tabs ── */}
      <div className="sport-filter" role="tablist" aria-label="Filter by sport">
        {SPORT_TABS.map(({ key, labelKey, icon }) => {
          const count = sportCounts[key] ?? 0;
          // Hide tabs that have 0 employees (except "all")
          if (key !== "all" && count === 0) return null;

          return (
            <button
              key={key}
              role="tab"
              aria-selected={activeSport === key}
              className={`sport-filter__btn${activeSport === key ? " sport-filter__btn--active" : ""}`}
              onClick={() => handleSportChange(key)}
            >
              <span className="sport-filter__btn-inner">
                <span className="sport-filter__circle">{icon}</span>
                {key !== "all" && count > 0 && (
                  <span className="sport-filter__count">{count}</span>
                )}
              </span>
              <span className="sport-filter__label">{t(labelKey)}</span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <div className="search-bar-container">
          <span className="search-label">{t("searchBy")}</span>

          <div className="filter-select-wrapper">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="form-select"
            >
              <option value="name">{t("name")}</option>
              <option value="department">{t("department")}</option>
              <option value="jobTitle">{t("jobTitle")}</option>
              <option value="email">{t("email")}</option>
            </select>
            <span className="select-arrow">▼</span>
          </div>

          <div className="search-input-wrapper">
            <button className="search-icon-btn" type="button">
              <SvgSearchIcon width={16} height={16} />
            </button>
            <input
              type="text"
              placeholder={`${t("searchBy")}...`}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText.trim() && (
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm clear-btn"
                onClick={clearSearch}
              >
                {t("clear")}
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Slider */}
      {employees.length === 0 ? (
        <div className="no-results">
          <p>{t("no_Result_Found")}</p>
        </div>
      ) : (
        <div className="slider-container">
          <Swiper
            key={`swiper-${activeSport}-${employees.length}-${language}`}
            dir={language === "ar" ? "rtl" : "ltr"}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={false}
            initialSlide={Math.floor(employees.length / 2)}
            spaceBetween={50}
            speed={400}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 300,
              modifier: 1,
              slideShadows: false,
            }}
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            modules={[EffectCoverflow, Navigation]}
            className="swiper-container"
            onSwiper={handleSwiper}
            onSlideChange={handleSlideChange}
          >
            {employees.map((item, index) => (
              <SwiperSlide key={item.id} className="swiper-slide-custom">
                <PlayerCard
                  employee={item}
                  isToggled={toggledId === item.id}
                  onToggle={() => handleToggle(item.id)}
                  qrCode={<QRCodeComponent data={generateEmployeeVCard(item)} />}
                  isActive={index === activeIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <div className="custom-swiper-button-prev">
            <SvgArrowLeftIcon />
          </div>
          <div className="custom-swiper-button-next">
            <SvgArrowRightIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSlider;
