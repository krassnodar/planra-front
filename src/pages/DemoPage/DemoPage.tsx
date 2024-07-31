import React from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/initStore";
import { DEMO_PAGE_ACTIVE_STEP } from "../../store/DefaultStore";

import styles from "./DemoPage.module.css";
// import ImageUpload from "../../components/ImageUpload/ImageUpload";
import StyleSelection from "../../components/StyleSelection/StyleSelection";
// import ImageUploadUpdated from "../../components/ImageUpload/ImageUploadUpdated";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

const DemoPage: React.FC = () => {
  // console.log("===== DEMO PAGE =======");

  const { defaultStore } = useStores();
  const { demoPageActiveStep, originalImage, generatedImage } = defaultStore;

  // console.log("DEMO PAGE ACTIVE STEP:  ", demoPageActiveStep);

  return (
    <div className={styles.demoPage}>
      <div className={styles.contentWrapper}>
        {demoPageActiveStep === DEMO_PAGE_ACTIVE_STEP.STYLE && (
          <StyleSelection />
        )}
        {demoPageActiveStep === DEMO_PAGE_ACTIVE_STEP.UPLOAD && <ImageUpload />}
        {demoPageActiveStep === DEMO_PAGE_ACTIVE_STEP.RESULT &&
          originalImage &&
          generatedImage && (
            <div className={styles.result}>
              <h2>Your Room Transformation</h2>
              <div className={styles.imageComparison}>
                <div>
                  <h3>Original Room</h3>
                  <img
                    src={originalImage}
                    alt="Original Room"
                    className={styles.comparisonImage}
                  />
                </div>
                <div>
                  <h3>Redesigned Room</h3>
                  <img
                    src={generatedImage}
                    alt="Redesigned Room"
                    className={styles.comparisonImage}
                  />
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default observer(DemoPage);
