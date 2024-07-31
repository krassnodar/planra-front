import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitch.module.css";

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <button className={styles.languageSwitch} onClick={toggleLanguage}>
      {i18n.language === "en" ? "RU" : "EN"}
    </button>
  );
};

export default LanguageSwitch;
