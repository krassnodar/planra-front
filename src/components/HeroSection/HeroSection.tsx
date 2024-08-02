import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "./HeroSection.module.css";

import DesignStyles from "../DesignStyles/DesignStyles";
import ImageComparison from "../ImageComparison/ImageComparison";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleUpload = () => {
    navigate("/demo");
  };

  const handleCameraClick = () => {
    navigate("/camera");
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <h1>{t("heroTitle")}</h1>
          <p>{t("heroSubtitle")}</p>
          <button className={styles.startButton} onClick={handleUpload}>
            {t("startFree")}
          </button>
          <DesignStyles />
        </div>
        <div className={styles.rightContent}>
          <ImageComparison
            originalImage={require("../../assets/original4.jpg")}
            modifiedImage={require("../../assets/modified4.png")}
          />
          <button className={styles.actionButton} onClick={handleUpload}>
            {t("upload")}
          </button>
          <button className={styles.actionButton} onClick={handleCameraClick}>
            {t("camera")}
          </button>
          <button className={styles.actionButton}>{t("lidar")}</button>
          <button className={styles.actionButton}>{t("createPlan")}</button>
          {/* <p>
            Home Design AI, Exterior AI and Landscaping AI. Best quality,
            lightning fast, used by homeowners and professionals.
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
