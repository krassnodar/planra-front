import React from "react";
import styles from "./DesignStyles.module.css";
import guests from "../../assets/guests.png";

const DesignStyles: React.FC = () => {
  return (
    <div className={styles.designStylesContainer}>
      <div className={styles.imageContainer}>
        <img src={guests} alt="Design style 1" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.textBlock}>
          <span className={styles.boldText}>75+</span>
          <span className={styles.labelText}>design styles</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.textBlock}>
          <span className={styles.boldText}>Fast & Easy</span>
          <span className={styles.labelText}>save time and money</span>
        </div>
      </div>
    </div>
  );
};

export default DesignStyles;
