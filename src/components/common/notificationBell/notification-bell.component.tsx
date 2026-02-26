import React from "react";
import SvgNotificationicon from "@/icons/notification-icon";
import "./notification-bell.component.scss";
import { useLanguage } from "@/context/LanguageContext";

const NotificationBell: React.FC = () => {
    const { language } = useLanguage();
    return (
        <a href={`/${language}/notification`} className="notification-bell">
            <span className="notification-bell-icon">
                <SvgNotificationicon />
                {/* <span className="notification-bell-icon-dot">23</span> */}
            </span>
        </a>
    );
};
export default NotificationBell;
