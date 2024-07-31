import React from "react";
import styles from "./CameraPage.module.css";
import CameraComponent from "../../components/CameraComponent/CameraComponent";
// import CameraComponetUpdated from "../../components/CameraComponent/CameraComponetUpdated";

const CameraPage: React.FC = () => {
  return (
    <div className={styles.cameraPage}>
      <h1 className={styles.title}>Take a Photo</h1>
      <CameraComponent />
    </div>
  );
};

export default CameraPage;
