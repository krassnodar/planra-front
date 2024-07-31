import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import styles from "./SubscriptionPage.module.css";

const SubscriptionPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { resultImage } = location.state as { resultImage: string };

  const handleStartFreeTrial = () => {
    // TODO: Implement redirection to payment system
    console.log("Redirecting to payment system...");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>{t("beginFreeTrial")}</h1>
        <p>{t("trialDescription")}</p>
        <button onClick={handleStartFreeTrial} className={styles.startButton}>
          {t("startFreeTrial")}
        </button>
      </div>
      <div className={styles.imageContainer}>
        <img
          src={resultImage}
          alt={t("resultImage")}
          className={styles.resultImage}
        />
      </div>
    </div>
  );
};

export default SubscriptionPage;
