import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Features.module.css";
import ImageComparison from "../ImageComparison/ImageComparison";

interface FeatureSection {
  title: string;
  description: string;
  originalImage: string;
  modifiedImage: string;
}

const Features: React.FC = () => {
  const { t } = useTranslation();

  const featureSections: FeatureSection[] = [
    {
      title: t("feature1Title"),
      description: t("feature1Description"),
      originalImage: require("../../assets/original1.png"),
      modifiedImage: require("../../assets/modified1.png"),
    },
    {
      title: t("feature2Title"),
      description: t("feature2Description"),
      originalImage: require("../../assets/original2.png"),
      modifiedImage: require("../../assets/modified2.png"),
    },
    {
      title: t("feature3Title"),
      description: t("feature3Description"),
      originalImage: require("../../assets/original3.png"),
      modifiedImage: require("../../assets/modified3.png"),
    },
    {
      title: t("feature4Title"),
      description: t("feature4Description"),
      originalImage: require("../../assets/original3.png"),
      modifiedImage: require("../../assets/modified3.png"),
    },
  ];

  return (
    <div id="features" className={styles.features}>
      {featureSections.map((section, index) => (
        <div
          key={index}
          className={`${styles.featureSection} ${
            index % 2 !== 0 ? styles.reverse : ""
          }`}
        >
          <div className={styles.textContent}>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
          <div className={styles.imageContent}>
            <ImageComparison
              originalImage={section.originalImage}
              modifiedImage={section.modifiedImage}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
