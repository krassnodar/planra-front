import React, { useState } from "react";
import { useStores } from "../../store/initStore";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import { DEMO_PAGE_ACTIVE_STEP } from "../../store/DefaultStore";

import { UploadDropzone } from "@bytescale/upload-widget-react";

import styles from "./ImageUpload.module.css";
import { UploadWidgetResult } from "../../types/bytescale/bytescale";
import { DesignAIRequest } from "../../services/DesignAIRequest";
import ProcessingLoader from "../Loader/ProcessingLoader";

export const extractPercentage = (logs: string | undefined): number => {
  if (!logs) {
    console.log("[ERROR]: неверное значение поля logs", logs);
    return 0;
  }
  const lines = logs.split("\n");
  const lastLine = lines[lines.length - 2];
  const match = lastLine.match(/(\d+)%/);
  return match ? parseInt(match[1]) : 0;
};

export const POSITIVE_PROMPT =
  "best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning";

export const NEGATIVE_PROMPT =
  "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality";

export const MODEL_VERSION =
  "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b";

const ImageUpload: React.FC = () => {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingPercentage, setProcessingPercentage] = useState(0);

  const { defaultStore } = useStores();
  const { selectedStyle } = defaultStore;

  const onComplete = (original: string, result: string) => {
    console.log(" ===== HANDLE IMAGE UPLOAD ====   ");
    defaultStore.setOriginalImage(original);
    defaultStore.setGeneratedImage(result);
    defaultStore.setDemoPageActiveStep(DEMO_PAGE_ACTIVE_STEP.RESULT);
  };

  const uploadOptions = {
    apiKey: process.env.REACT_APP_BYTESCALE_API_KEY!,
    maxFileCount: 1,
    mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    editor: { images: { crop: false } },
  };

  const handleUploadComplete = async (files: UploadWidgetResult[]) => {
    if (!files.length) {
      console.log(
        "[INFO]: пустой массив files, скорее всего первый ответ от bytescale, он пустой"
      );
      return;
    }

    if (!selectedStyle) {
      console.log(
        "[ERROR]: не выбран selectedStyle при попытке отправить картинку на бэкенд"
      );
      return;
    }

    setIsUploading(false);
    setIsProcessing(true);

    const file = files[0];

    try {
      const startResponse = await fetch(
        "http://194.58.126.253:5001/api/replicate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            new DesignAIRequest(file.fileUrl, selectedStyle.toLowerCase())
          ),
        }
      );

      const jsonStartResponse = await startResponse.json();

      console.log("[INFO]: первый ответ от сервера  ", jsonStartResponse);

      const predictionId = jsonStartResponse.id;

      let restoredImages = null;
      while (!restoredImages) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const finalResponse = await fetch(
          `http://194.58.126.253:5001/api/replicate/${predictionId}`
        );
        const jsonFinalResponse = await finalResponse.json();
        console.log("[INFO]: ответ обработки от сервера  ", jsonFinalResponse);

        if (jsonFinalResponse.status === "succeeded") {
          restoredImages = jsonFinalResponse.output;
        } else if (jsonFinalResponse.status === "failed") {
          console.log("[ERROR]: ошибка от сервера  ", jsonFinalResponse);
          throw new Error("Image processing failed");
        } else {
          const percentage = extractPercentage(jsonFinalResponse.logs);
          setProcessingPercentage(percentage);
        }
      }

      onComplete(file.fileUrl, restoredImages![1]);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
      setProcessingPercentage(0);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("uploadPhotoTitle")}</h2>
      <p className={styles.subtitle}>{t("uploadPhotoSubtitle")}</p>
      <UploadDropzone
        options={uploadOptions}
        onUpdate={({ uploadedFiles }) => {
          setIsUploading(true);
          handleUploadComplete(uploadedFiles);
        }}
        width="100%"
        height="375px"
      />
      {isUploading && <p className={styles.statusText}>{t("uploading")}</p>}
      {isProcessing && <ProcessingLoader percentage={processingPercentage} />}
    </div>
  );
};

export default observer(ImageUpload);
