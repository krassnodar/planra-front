import React from "react";
import styles from "./ProcessingLoader.module.css";

interface ProcessingLoaderProps {
  percentage: number;
}

const ProcessingLoader: React.FC<ProcessingLoaderProps> = ({ percentage }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.loaderContainer}>
      <svg className={styles.progressRing} width="120" height="120">
        <circle
          className={styles.progressRingCircleBackground}
          stroke="#3a3a3a"
          strokeWidth="8"
          fill="transparent"
          r="45"
          cx="60"
          cy="60"
        />
        <circle
          className={styles.progressRingCircle}
          stroke="#0c9488"
          strokeWidth="8"
          fill="transparent"
          r="45"
          cx="60"
          cy="60"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: strokeDashoffset,
          }}
        />
        <text x="60" y="60" className={styles.progressText}>
          {`${percentage}%`}
        </text>
      </svg>
      <p className={styles.loadingText}>Processing your request...</p>
    </div>
  );
};

export default ProcessingLoader;
