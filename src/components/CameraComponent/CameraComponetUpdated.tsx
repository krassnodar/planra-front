import React, { useRef, useState, useCallback, useEffect } from "react";
import { useStores } from "../../store/initStore";
import { observer } from "mobx-react-lite";
import StyleSelection from "../StyleSelection/StyleSelection";
import { formDataUpload } from "../../services/formDataUpload";
import { sendToServer } from "../../services/sendToServer";
import { useTranslation } from "react-i18next";
import styles from "./CameraComponent.module.css";
import PhotoGuideModal from "../PhotoGuideModal/PhotoGuideModal";

const CameraComponetUpdated: React.FC = () => {
  const [streaming, setStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [showStyleSelection, setShowStyleSelection] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPhotoGuide, setShowPhotoGuide] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { defaultStore } = useStores();
  const { t } = useTranslation();

  const startCamera = useCallback(async () => {
    console.log("Starting camera...");
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera stream obtained");
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current!.play();
          setStreaming(true);
          console.log("Video is now playing");
        };
      } else {
        throw new Error("Video element not found");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setStreaming(false);
      console.log("Camera stopped");
    }
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const capturePhoto = useCallback(async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImage(imageDataUrl);
        stopCamera();

        setIsUploading(true);
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
          setShowStyleSelection(true);
        } catch (error) {
          console.error("Error uploading image:", error);
          setIsUploading(false);
          setError("Failed to upload image. Please try again.");
        }
      }
    }
  }, [defaultStore, stopCamera]);

  const handleStyleSelected = async (style: string) => {
    setShowStyleSelection(false);
    setIsProcessing(true);

    if (!capturedImage) {
      console.error("Original image is missing");
      setIsProcessing(false);
      setError("No image captured. Please take a photo first.");
      return;
    }

    try {
      const restoredImageUrl = await sendToServer({
        imageUrl: capturedImage,
        selectedStyle: style,
      });

      setRestoredImage(restoredImageUrl);
    } catch (error) {
      console.error("Error processing image:", error);
      setError("Failed to process image. Please try again.");
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
      {error && <div className={styles.error}>{error}</div>}
      {!capturedImage ? (
        <>
          <div className={styles.cameraContainer}>
            {streaming ? (
              <video
                ref={videoRef}
                className={styles.video}
                playsInline
                autoPlay
              />
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

export default observer(CameraComponetUpdated);
