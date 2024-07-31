import { FC } from "react";
import styles from "./CameraComponent.module.css";
import { useTranslation } from "react-i18next";

interface IProps {
  startCamera: () => void;
}

const StreamingComponent: FC<IProps> = ({ startCamera }) => {
  const { t } = useTranslation();

  return (
    <button className={styles.button} onClick={startCamera}>
      {t("openCamera")}
    </button>
  );
};

export default StreamingComponent;
