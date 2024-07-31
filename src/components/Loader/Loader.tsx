import React from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  percentage: number;
}

const Loader: React.FC<LoaderProps> = ({ percentage }) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>{percentage}%</p>
      </div>
    </div>
  );
};

export default Loader;
