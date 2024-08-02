import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Navbar.module.css";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  const scrollToPricing = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Plan RA</div>

      <div className={styles.wrapper}>
        <ul className={styles.navItems}>
          <li>
            <Link to="/">{t("Home")}</Link>
          </li>
          <li>
            <Link to="/about">{t("About")}</Link>
          </li>
          <li>
            <Link to="/contact">{t("Contact")}</Link>
          </li>
          <li>
            <a href="#pricing" onClick={scrollToPricing}>
              {t("Pricing")}
            </a>
          </li>
        </ul>
        <LanguageSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
