import {
  MODEL_VERSION,
  NEGATIVE_PROMPT,
  POSITIVE_PROMPT,
} from "./sendToServer";

interface DesignAIRequestInput {
  image: string;
  num_outputs: number;
  prompt: string;
  a_prompt: string;
  n_prompt: string;
}

export interface DesignAIResponse {
  id: string;
  model: string;
  version: string;
  input: {
    a_prompt: string;
    image: string;
    n_prompt: string;
    num_outputs: number;
    prompt: string;
  };
  logs: string;
  status: string;
  output: string[] | null;
  created_at: string;
  started_at: string;
  completed_at: string;
  error: string | null;
  urls: {
    cancel: string;
    get: string;
  };
}

export class DesignAIRequest {
  version: string;
  input: DesignAIRequestInput;

  constructor(imageURL: string, selectedStyle: string) {
    console.log("CONSTRUCTOR SELECTED STYLE:  ", selectedStyle);
    console.log("CONSTRUCTOR IMAGE URL:  ", imageURL);
    this.version = MODEL_VERSION;
    this.input = {
      image: imageURL,
      num_outputs: 1,
      prompt: `a ${selectedStyle.toLowerCase()} living room`,
      a_prompt: POSITIVE_PROMPT,
      n_prompt: NEGATIVE_PROMPT,
    };
  }
}
