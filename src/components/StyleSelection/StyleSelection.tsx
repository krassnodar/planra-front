import React, { useState } from "react";
import styles from "./StyleSelection.module.css";
import { styleOptions } from "./styleOptions";
import { useStores } from "../../store/initStore";
import { observer } from "mobx-react-lite";
import { DEMO_PAGE_ACTIVE_STEP } from "../../store/DefaultStore";

interface StyleSelectionProps {
  onStyleSelected?: (style: string) => void;
}

const StyleSelection: React.FC<StyleSelectionProps> = ({ onStyleSelected }) => {
  // console.log("===== STYLE SELECTION =======");
  const { defaultStore } = useStores();
  const { selectedStyle } = defaultStore;

  const toggleStyle = (style: string) => {
    defaultStore.setSelectedStyle(style);
  };

  // const handleStyleSelection = (style: string) => {
  //   defaultStore.setSelectedStyle(style);
  //   defaultStore.setDemoPageActiveStep(DEMO_PAGE_ACTIVE_STEP.UPLOAD);

  //   // setStep("upload");
  // };

  const handleStyleSelection = (style: string) => {
    defaultStore.setSelectedStyle(style);
    if (onStyleSelected) {
      onStyleSelected(style);
    } else {
      defaultStore.setDemoPageActiveStep(DEMO_PAGE_ACTIVE_STEP.UPLOAD);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>What's your design style?</h2>
        <p className={styles.subtitle}>Choose your preferred style</p>
        <div className={styles.gridWrapper}>
          <div className={styles.grid}>
            {styleOptions.map((option) => (
              <div
                key={option.id}
                className={`${styles.styleOption} ${
                  selectedStyle === option.id ? styles.selected : ""
                }`}
                onClick={() => toggleStyle(option.id)}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={require(`../../assets/roomStyles/${option.image}`)}
                    alt={option.name}
                  />
                  {selectedStyle === option.id && (
                    <div className={styles.overlay} />
                  )}
                </div>
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.continueButton}
          disabled={!selectedStyle}
          onClick={() => {
            if (selectedStyle) {
              handleStyleSelection(selectedStyle);
            } else {
              console.log("[ERROR]: here");
            }
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default observer(StyleSelection);
