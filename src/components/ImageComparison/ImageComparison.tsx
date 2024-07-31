// src/components/ImageComparison.tsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./ImageComparison.module.css";

interface ImageComparisonProps {
  originalImage: string;
  modifiedImage: string;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({
  originalImage,
  modifiedImage,
}) => {
  const [dividerPosition, setDividerPosition] = useState(window.innerWidth / 2);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newPosition = Math.max(0, Math.min(offsetX, rect.width));
      setDividerPosition(newPosition);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div className={styles["comparison-container"]} ref={containerRef}>
      <div className={styles["image-wrapper"]}>
        <img
          src={originalImage}
          alt="Original"
          className={`${styles.image} ${styles.original}`}
        />
        <img
          src={modifiedImage}
          alt="Modified"
          className={`${styles.image} ${styles.modified}`}
          style={{ clip: `rect(0px, auto, auto, ${dividerPosition}px)` }}
        />
      </div>
      <div className={styles.divider} style={{ left: `${dividerPosition}px` }}>
        <div className={styles.handle} />
      </div>
    </div>
  );
};

export default ImageComparison;
