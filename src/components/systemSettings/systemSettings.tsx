import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";


import SvgSystemSettings from "@/icons/system-settings";
import SvgCloseicon from "@/icons/close-icon";

import "./systemSettings.scss";

interface SystemSettingsProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SystemSettings: React.FC<SystemSettingsProps> = ({ show, setShow }) => {
  const handleModalClose = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const { t } = useTranslation();


  const renderSystemSettingsMenu = () => {
    if (!show) return null;
    return (
      <div className="system-settings-modal">
        <div className="flex items-center modal-header">
          <div className="flex align-items-center">
            <SvgSystemSettings width="20" height="20" />
            <span className="sm_title">{t("settings_title")}</span>
          </div>
          <div>
            <SvgCloseicon
              width="15"
              height="15"
              className="system-settings-close"
              onClick={handleModalClose}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="system-settings">
          {/* Menu items removed */}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderSystemSettingsMenu()}
    </>
  );
};

export default SystemSettings;
