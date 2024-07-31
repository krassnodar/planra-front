import React from "react";
import styles from "./PhotoGuideModal.module.css";

interface PhotoGuideModalProps {
  onClose: () => void;
}

const PhotoGuideModal: React.FC<PhotoGuideModalProps> = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          {/* <X size={24} /> */} X
        </button>
        <h2 className={styles.modalTitle}>
          How to capture photos for the best design outputs?
        </h2>
        <div className={styles.photoExamples}>
          <div className={styles.photoColumn}>
            <h3 className={styles.columnTitle}>Bad photos:</h3>
            <div className={styles.photoGrid}>
              <div className={styles.photoItem}>
                <img
                  src={require("../../assets/photoSuggestions/badPhoto1.png")}
                  alt="People in the photo"
                />
                <span className={styles.photoLabel}>
                  {/* <X size={16} className={styles.icon} /> */}
                  People in the photo
                </span>
              </div>
              <div className={styles.photoItem}>
                <img
                  src={require("../../assets/photoSuggestions/badPhoto2.png")}
                  alt="Close-up shots"
                />
                <span className={styles.photoLabel}>
                  {/* <X size={16} className={styles.icon} /> */}
                  Close-up shots
                </span>
              </div>
              <div className={styles.photoItem}>
                <img
                  src={require("../../assets/photoSuggestions/badPhoto3.png")}
                  alt="Tilted angles"
                />
                <span className={styles.photoLabel}>
                  {/* <X size={16} className={styles.icon} /> */}
                  Tilted angles
                </span>
              </div>
              <div className={styles.photoItem}>
                <img
                  src={require("../../assets/photoSuggestions/badPhoto4.png")}
                  alt="Floor plans"
                />
                <span className={styles.photoLabel}>
                  {/* <X size={16} className={styles.icon} /> */}
                  Floor plans
                </span>
              </div>
            </div>
          </div>
          <div className={styles.photoColumn}>
            <h3 className={styles.columnTitle}>Good photos:</h3>
            <div className={styles.photoGrid}>
              <div className={styles.photoItem}>
                <img
                  src={require("../../assets/photoSuggestions/goodPhoto1.png")}
                  alt="Wide angle photos"
                />
                <span className={styles.photoLabel}>
                  {/* <CheckIcon size={16} className={styles.icon} /> */}
                  Wide angle photos
                </span>
              </div>
              <div className={styles.photoItem}>
                <img
                  src={require("../../assets/photoSuggestions/goodPhoto2.png")}
                  alt="Straightened photos"
                />
                <span className={styles.photoLabel}>
                  {/* <CheckIcon size={16} className={styles.icon} /> */}
                  Straightened photos
                </span>
              </div>
              <div className={styles.photoItem}>
                <img
                  src={require("../../assets/photoSuggestions/goodPhoto3.png")}
                  alt="Good resolution"
                />
                <span className={styles.photoLabel}>
                  {/* <CheckIcon size={16} className={styles.icon} /> */}
                  Good resolution
                </span>
              </div>
              <div className={styles.photoItem}>
                <img
                  src={require("../../assets/photoSuggestions/goodPhoto4.png")}
                  alt="Better depth"
                />
                <span className={styles.photoLabel}>
                  {/* <CheckIcon size={16} className={styles.icon} /> */}
                  Better depth
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGuideModal;
