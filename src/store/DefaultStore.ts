import { makeAutoObservable } from "mobx";

export enum DEMO_PAGE_ACTIVE_STEP {
  STYLE = "STYLE",
  UPLOAD = "UPLOAD",
  RESULT = "RESULT",
}

export class DefaultStore {
  public selectedStyle: string | null = null;
  public generatedImage: string | null = null;
  // public originalImage: string | null = null;
  public originalImage: string | null =
    "https://upcdn.io/W142ihs/raw/uploads/2024/07/31/4kSSw9MfFA-captured_image.jpg";

  public demoPageActiveStep: DEMO_PAGE_ACTIVE_STEP =
    DEMO_PAGE_ACTIVE_STEP.STYLE;

  constructor() {
    makeAutoObservable(this);
  }

  public setDemoPageActiveStep(step: DEMO_PAGE_ACTIVE_STEP): void {
    this.demoPageActiveStep = step;
  }

  public setSelectedStyle(style: string): void {
    this.selectedStyle = style;
  }

  public setGeneratedImage(style: string): void {
    this.generatedImage = style;
  }

  public setOriginalImage(style: string): void {
    this.originalImage = style;
  }
}
