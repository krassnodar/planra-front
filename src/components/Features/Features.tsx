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
      originalImage: require("../../assets/original4.png"),
      modifiedImage: require("../../assets/modified4.png"),
    },
    {
      title: t("feature5Title"),
      description: t("feature5Description"),
      originalImage: require("../../assets/original5.png"),
      modifiedImage: require("../../assets/modified5.png"),
    },
    {
      title: t("feature6Title"),
      description: t("feature6Description"),
      originalImage: require("../../assets/original6.png"),
      modifiedImage: require("../../assets/modified6.png"),
    },
    {
      title: t("feature7Title"),
      description: t("feature7Description"),
      originalImage: require("../../assets/original7.png"),
      modifiedImage: require("../../assets/modified7.png"),
    },
    {
      title: t("feature8Title"),
      description: t("feature8Description"),
      originalImage: require("../../assets/original8.png"),
      modifiedImage: require("../../assets/modified8.png"),
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
