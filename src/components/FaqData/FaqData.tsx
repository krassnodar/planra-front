import React, { useState } from "react";
import styles from "./FaqData.module.css";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does HomeDesigns AI work?",
    answer:
      "HomeDesignsAI is a web-based application that allows you to transform and redesign all the parts of your home, including interiors, exteriors, gardens, patios, and everything else. Utilizing the power of Artificial Intelligence, the app generates new concepts every few seconds, offering a wide range of styles, modes, room types, and more to help you achieve the desired outcome.",
  },
  {
    question: "Can HomeDesignsAI really save you time and money?",
    answer:
      "Yes, HomeDesignsAI can save you both time and money. It eliminates the need for extensive research and multiple design iterations by providing instant, AI-generated design concepts. This efficiency is particularly beneficial for both homeowners and professionals in the design industry.",
  },
  {
    question: "Does it work on any device? (PC, Laptop, iOS, MacOS, Android)",
    answer:
      "HomeDesignsAI is a web-based application, which means it works on any device with a modern web browser. This includes PCs, laptops, tablets, and smartphones, regardless of whether they run on Windows, MacOS, iOS, or Android operating systems.",
  },
  {
    question: "How easy is the process?",
    answer:
      "The process is designed to be very user-friendly. Simply upload an image of the space you want to redesign, customize your preferences, and let the AI generate design concepts. You can then browse through the generated designs and make further adjustments as needed.",
  },
];

const FaqData: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.faqTitle}>FAQ</h2>
      <h1 className={styles.faqSubtitle}>Common questions</h1>
      {faqData.map((item, index) => (
        <div key={index} className={styles.faqItem}>
          <button
            className={styles.faqQuestion}
            onClick={() => toggleQuestion(index)}
          >
            <span className={styles.faqQuestionText}>{item.question}</span>
            <span className={styles.faqIcon}>
              {openIndex === index ? "−" : "+"}
            </span>
          </button>
          <div
            className={`${styles.faqAnswer} ${
              openIndex === index ? styles.faqAnswerOpen : ""
            }`}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqData;
