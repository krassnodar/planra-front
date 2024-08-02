import React from "react";
import styles from "./HomeDesignSteps.module.css";
import UploadIcon from "../../assets/icons/UploadIcon";
import CustomizeIcon from "../../assets/icons/CustomizeIcon";
import GenerateIcon from "../../assets/icons/GenerateIcon";

interface Step {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: UploadIcon,
    title: "Step 1",
    description: "Upload your image of any room type, house or garden",
  },
  {
    icon: CustomizeIcon,
    title: "Step 2",
    description:
      "Customize room type, AI strength, custom instructions, mode and design style",
  },
  {
    icon: GenerateIcon,
    title: "Step 3",
    description:
      "Generate new decoration and design ideas in less than 30 seconds",
  },
];

const HomeDesignSteps: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>AI HOME DESIGN MADE EASY</h2>
      <h1 className={styles.subtitle}>
        How to Use HomeDesignsAI in 3 Easy Steps
      </h1>
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={styles.iconWrapper}>
              <step.icon className={styles.icon} />
            </div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeDesignSteps;
