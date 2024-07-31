import { DEMO_PAGE_ACTIVE_STEP } from "../store/DefaultStore";

const API_BASE_URL = "http://localhost:5001/api";

const POSITIVE_PROMPT =
  "best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning";
const NEGATIVE_PROMPT =
  "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality";
const MODEL_VERSION =
  "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b";

export interface ProcessImageParams {
  image: string;
  style: string;
  defaultStore: any; // Replace 'any' with your actual store type
}

export const processImage = async ({
  image,
  style,
  defaultStore,
}: ProcessImageParams): Promise<void> => {
  try {
    const startResponse = await fetch(`${API_BASE_URL}/replicate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: MODEL_VERSION,
        input: {
          image: image,
          num_outputs: 1,
          prompt: `a ${style.toLowerCase()} living room`,
          a_prompt: POSITIVE_PROMPT,
          n_prompt: NEGATIVE_PROMPT,
        },
      }),
    });

    const jsonStartResponse = await startResponse.json();
    const predictionId = jsonStartResponse.id;

    let restoredImages = null;
    while (!restoredImages) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const finalResponse = await fetch(
        `${API_BASE_URL}/replicate/${predictionId}`
      );
      const jsonFinalResponse = await finalResponse.json();

      if (jsonFinalResponse.status === "succeeded") {
        restoredImages = jsonFinalResponse.output;
      } else if (jsonFinalResponse.status === "failed") {
        throw new Error("Image processing failed");
      }
    }

    defaultStore.setGeneratedImage(restoredImages[1]);
    defaultStore.setDemoPageActiveStep(DEMO_PAGE_ACTIVE_STEP.RESULT);
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};
