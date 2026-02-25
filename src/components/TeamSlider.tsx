import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import SvgArrowLefticon from "./icons/arrow-left-icon";
import SvgArrowRighticon from "./icons/arrow-right-icon";
import SvgSearchicon from "./icons/search-icon";
import SvgGrouicon from "./icons/grou-icon";
import PlayerCard from "./PlayerCard";
import QRCodeComponent from "./QRCode";
import { generateEmployeeVCard } from "../utils/qrCodeUtils";
import { staticEmployees } from "../data/staticEmployees";
import { useLanguage } from "../context/LanguageContext";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const TeamSlider = () => {
  const [searchText, setSearchText] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [toggledId, setToggledId] = useState<number | null>(null);
  const { t } = useLanguage();

  // Filter employees based on search
  const employees = useMemo(() => {
    if (!searchText.trim()) return staticEmployees;

    const query = searchText.toLowerCase();
    return staticEmployees.filter((emp) => {
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
  }, [searchText, filterBy]);

  const handleToggle = (id: number) => {
    setToggledId((prev) => (prev === id ? null : id));
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
        <SvgGrouicon width={28} height={28} />
        <h2>{t("cardTeam")}</h2>
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
              <SvgSearchicon width={16} height={16} />
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
            key={`swiper-${employees.length}`} // Only re-mount if total count changes
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={false} // Disabled loop to avoid React state-in-slide clone bugs
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
          >
            {employees.map((item) => (
              <SwiperSlide
                key={item.id}
                className="swiper-slide-custom"
              >
                <PlayerCard
                  employee={item}
                  isToggled={toggledId === item.id}
                  onToggle={() => handleToggle(item.id)}
                  qrCode={<QRCodeComponent data={generateEmployeeVCard(item)} />}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <div className="custom-swiper-button-prev">
            <SvgArrowLefticon />
          </div>
          <div className="custom-swiper-button-next">
            <SvgArrowRighticon />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSlider;
