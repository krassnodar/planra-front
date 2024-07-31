// src/utils/sendToServer.ts

export interface SendToServerParams {
  imageUrl: string;
  selectedStyle: string;
}

export const POSITIVE_PROMPT =
  "best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning";

export const NEGATIVE_PROMPT =
  "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality";

export const MODEL_VERSION =
  "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b";

export async function sendToServer(params: SendToServerParams): Promise<any> {
  const startResponse = await fetch("http://localhost:5001/api/replicate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: MODEL_VERSION,
      input: {
        image: params.imageUrl,
        num_outputs: 1,
        prompt: `a ${params.selectedStyle.toLowerCase()} living room`,
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
      `http://localhost:5001/api/replicate/${predictionId}`
    );
    const jsonFinalResponse = await finalResponse.json();

    console.log("jsonFinalResponse:  ", jsonFinalResponse);

    if (jsonFinalResponse.status === "succeeded") {
      restoredImages = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === "failed") {
      throw new Error("Image processing failed");
    }
  }

  return restoredImages[1];
}
