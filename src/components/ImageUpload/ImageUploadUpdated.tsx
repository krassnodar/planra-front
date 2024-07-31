import React, { useState } from "react";
import { useStores } from "../../store/initStore";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import styles from "./ImageUpload.module.css";
import { formDataUpload } from "../../services/formDataUpload";
import { DEMO_PAGE_ACTIVE_STEP } from "../../store/DefaultStore";
import { sendToServer } from "../../services/sendToServer";

const ImageUploadUpdated: React.FC = () => {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { defaultStore } = useStores();
  const { selectedStyle } = defaultStore;

  const onComplete = (original: string, result: string) => {
    defaultStore.setOriginalImage(original);
    defaultStore.setGeneratedImage(result);
    defaultStore.setDemoPageActiveStep(DEMO_PAGE_ACTIVE_STEP.RESULT);
  };

  const handleUploadPicture = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!selectedStyle) {
      console.log("[ERROR]: не выбран стиль обработки");
      return;
    }

    const file = event.target.files?.[0];

    console.log("file:  ", file);
    if (!file) {
      console.log("[ERROR]: отсутствует файл в event.target.files");
      return;
    }

    setIsUploading(true);

    try {
      const response = await formDataUpload({
        requestBody: file,
        originalFileName: file.name,
      });

      const imageUrl = response.files[0].fileUrl;
      setIsUploading(false);
      setIsProcessing(true);

      console.log("response:  ", response);

      const restoredImage = await sendToServer({
        imageUrl,
        selectedStyle: selectedStyle.toLowerCase(),
      });

      onComplete(imageUrl, restoredImage);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("uploadPhotoTitle")}</h2>
      <p className={styles.subtitle}>{t("uploadPhotoSubtitle")}</p>
      <input type="file" onChange={handleUploadPicture} />
      {isUploading && <p>{t("uploading")}</p>}
      {isProcessing && <p>{t("processing")}</p>}
    </div>
  );
};

export default observer(ImageUploadUpdated);
