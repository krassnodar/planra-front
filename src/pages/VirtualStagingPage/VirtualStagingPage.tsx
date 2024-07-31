// VirtualStagingPage.tsx
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { useStores } from "../../store/initStore";
import styles from "./VirtualStagingPage.module.css";
import { DesignAIRequest } from "../../services/DesignAIRequest";
import { extractPercentage } from "../../components/ImageUpload/ImageUpload";

import ImageComparison from "../../components/ImageComparison/ImageComparison";
import Sidebar from "./Sidebar";
import ImageDisplay from "./ImageDisplay";
import ProcessingLoader from "../../components/Loader/ProcessingLoader";

const VirtualStagingPage: FC = () => {
  const { defaultStore } = useStores();
  const { originalImage, selectedStyle, generatedImage } = defaultStore;

  const [spaceType, setSpaceType] = useState<string>("");
  // const [designTheme, setDesignTheme] = useState<string>("");
  const [otherSpecifics, setOtherSpecifics] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingPercentage, setProcessingPercentage] = useState(0);

  if (!originalImage) {
    console.log("[ERROR]: missing original image");
    return null;
  }

  const handleResponse = (generatedImageURL: string) => {
    setIsProcessing(false);
    setProcessingPercentage(0);
    defaultStore.setGeneratedImage(generatedImageURL);
  };

  const handleGenerate = async () => {
    if (!selectedStyle) {
      console.log("[ERROR]: missing selected style");
      return;
    }

    setIsProcessing(true);

    try {
      const startResponse = await fetch("http://localhost:5001/api/replicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          new DesignAIRequest(originalImage, selectedStyle.toLowerCase())
        ),
      });

      const jsonStartResponse = await startResponse.json();

      console.log("[INFO]: первый ответ от сервера  ", jsonStartResponse);

      const predictionId = jsonStartResponse.id;

      let restoredImages = null;
      while (!restoredImages) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const finalResponse = await fetch(
          `http://localhost:5001/api/replicate/${predictionId}`
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

      handleResponse(restoredImages![1]);
    } catch (err) {
      console.log("[ERROR]:  ", err);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar
        spaceType={spaceType}
        setSpaceType={setSpaceType}
        // designTheme={designTheme}
        // setDesignTheme={setDesignTheme}
        otherSpecifics={otherSpecifics}
        setOtherSpecifics={setOtherSpecifics}
        onGenerate={handleGenerate}
      />
      {generatedImage && (
        <ImageComparison
          originalImage={originalImage}
          modifiedImage={generatedImage}
        />
      )}

      {!generatedImage && <ImageDisplay imageUrl={originalImage} />}
      {isProcessing && <ProcessingLoader percentage={processingPercentage} />}
    </div>
  );
};

export default observer(VirtualStagingPage);
