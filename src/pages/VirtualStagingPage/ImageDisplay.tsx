// ImageDisplay.tsx
import { FC } from "react";
import styles from "./VirtualStagingPage.module.css";

interface ImageDisplayProps {
  imageUrl: string;
}

const ImageDisplay: FC<ImageDisplayProps> = ({ imageUrl }) => {
  return (
    <div className={styles.imageContainer}>
      <img src={imageUrl} alt="Room" className={styles.image} />
    </div>
  );
};

export default ImageDisplay;
