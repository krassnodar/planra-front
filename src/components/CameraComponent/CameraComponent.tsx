import React, { useRef, useState, useCallback } from "react";
import { useStores } from "../../store/initStore";
import { observer } from "mobx-react-lite";
import StyleSelection from "../StyleSelection/StyleSelection";
import { sendToServer } from "../../services/sendToServer";
import { useTranslation } from "react-i18next";
import styles from "./CameraComponent.module.css";
import PhotoGuideModal from "../PhotoGuideModal/PhotoGuideModal";
import { useNavigate } from "react-router-dom";
import { formDataUpload } from "../../services/formDataUpload";

const CameraComponent: React.FC = () => {
  const [streaming, setStreaming] = useState(false);

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [showStyleSelection, setShowStyleSelection] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPhotoGuide, setShowPhotoGuide] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const navigate = useNavigate();

  const { defaultStore } = useStores();
  const { t } = useTranslation();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
      } else {
        console.log("[ERROR]: videoRef.current is undfined");
      }
    } catch (err) {
      console.error("[ERROR]; accessing camera: ", err);
    }
  }, []);

  const capturePhoto = useCallback(async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImage(imageDataUrl);
        setStreaming(false);
        (videoRef.current.srcObject as MediaStream)
          ?.getTracks()
          .forEach((track) => track.stop());

        setIsUploading(true);

        // setTimeout(() => {
        //   defaultStore.setOriginalImage()
        //   navigate("/virtualStaging");
        //   setIsUploading(false);
        // }, 1000);

        try {
          const response = await fetch(imageDataUrl);
          const blob = await response.blob();
          const file = new File([blob], "captured_image.jpg", {
            type: "image/jpeg",
          });

          const uploadResponse = await formDataUpload({
            requestBody: file,
            originalFileName: file.name,
          });

          const imageUrl = uploadResponse.files[0].fileUrl;
          defaultStore.setOriginalImage(imageUrl);
          setCapturedImage(imageUrl);
          setIsUploading(false);
          navigate("/virtualStaging");

          // setShowStyleSelection(true);
        } catch (error) {
          console.error("Error uploading image:", error);
          setIsUploading(false);
        }
      }
    }
  }, []);

  const handleStyleSelected = async (style: string) => {
    setShowStyleSelection(false);
    setIsProcessing(true);

    if (!capturedImage) {
      console.log("[ERROR]: Original image is missing");
      setIsProcessing(false);
      return;
    }

    try {
      const restoredImageUrl = await sendToServer({
        imageUrl: capturedImage,
        selectedStyle: style,
      });

      setRestoredImage(restoredImageUrl);
    } catch (error) {
      console.log("[ERROR]: processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (showStyleSelection) {
    return <StyleSelection onStyleSelected={handleStyleSelected} />;
  }

  return (
    <div className={styles.cameraComponent}>
      <h2 className={styles.title}>{t("takeAPhoto")}</h2>
      {!capturedImage ? (
        <>
          <div className={styles.cameraContainer}>
            <>
              <video ref={videoRef} className={styles.video} />
              <canvas ref={canvasRef} style={{ display: "none" }} />/{" "}
            </>

            {streaming ? (
              <button className={styles.button} onClick={startCamera}>
                {t("openCamera")}
              </button>
            ) : (
              <div className={styles.placeholderVideo}>
                <span>{t("cameraPlaceholder")}</span>
              </div>
            )}
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
          <div className={styles.buttonContainer}>
            {!streaming ? (
              <button className={styles.button} onClick={startCamera}>
                {t("openCamera")}
              </button>
            ) : (
              <button className={styles.button} onClick={capturePhoto}>
                {t("takePhoto")}
              </button>
            )}
          </div>
          <button
            className={styles.photoGuideButton}
            onClick={() => setShowPhotoGuide(true)}
          >
            {/* <InfoIcon size={20} /> */}
            <span>{t("photoGuide")}</span>
          </button>
        </>
      ) : (
        <div className={styles.imageComparisonContainer}>
          <div className={styles.imageWrapper}>
            <img src={capturedImage} alt="Original" className={styles.image} />
            <p className={styles.imageLabel}>{t("originalImage")}</p>
          </div>
          <div className={styles.imageWrapper}>
            {restoredImage ? (
              <>
                <img
                  src={restoredImage}
                  alt="Restored"
                  className={styles.image}
                />
                <p className={styles.imageLabel}>{t("restoredImage")}</p>
              </>
            ) : isProcessing ? (
              <div className={styles.loader}>{t("processing")}</div>
            ) : (
              <button
                className={styles.button}
                onClick={() => setShowStyleSelection(true)}
              >
                {t("selectStyle")}
              </button>
            )}
          </div>
        </div>
      )}
      {isUploading && <div className={styles.loader}>{t("uploading")}</div>}
      {showPhotoGuide && (
        <PhotoGuideModal onClose={() => setShowPhotoGuide(false)} />
      )}
    </div>
  );
};

export default observer(CameraComponent);
