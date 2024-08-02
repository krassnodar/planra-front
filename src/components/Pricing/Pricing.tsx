import React from "react";
import styles from "./Pricing.module.css";

interface PlanFeature {
  text: string;
  highlighted?: boolean;
}

interface PricingPlan {
  icon: string;
  title: string;
  price: string;
  period: string;
  subtitle: string;
  features: PlanFeature[];
  buttonText: string;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    icon: "🔵",
    title: "INDIVIDUAL",
    price: "$27",
    period: "/month",
    subtitle: "Cancel anytime",
    features: [
      { text: "100 Designs / month" },
      { text: "Standard AI Model" },
      { text: "Standard Quality Renders" },
      { text: "10+ Room Types Available" },
      { text: "15+ Styles Available" },
      { text: "Download Renders (480p)" },
      { text: "Public Gallery" },
      { text: "Personal License" },
      { text: "48 Hours Support" },
      { text: "Small Watermark" },
      { text: "Cancel anytime" },
    ],
    buttonText: "Get Instant Access",
  },
  {
    icon: "🟣",
    title: "PRO",
    price: "$29",
    period: "/month",
    subtitle: "Cancel anytime",
    features: [
      { text: "Unlimited Designs", highlighted: true },
      { text: "Newest AI Model", highlighted: true },
      { text: "Higher Quality Renders", highlighted: true },
      { text: "AI Furniture Removal", highlighted: true },
      { text: "Decor Staging", highlighted: true },
      { text: "Colors & Textures" },
      { text: "Sketch to Render" },
      { text: "AI Object Detection" },
      { text: "AI Furniture Finder" },
      { text: "40+ Room Types Available" },
      { text: "75+ Styles Available" },
      { text: "Download High Quality" },
      { text: "Public & Private Gallery" },
      { text: "Commercial License" },
      { text: "24 Hours Support" },
      { text: "No Watermark" },
      { text: "Cancel anytime" },
    ],
    buttonText: "Get Instant Access",
    popular: true,
  },
  {
    icon: "🟠",
    title: "PRO YEARLY",
    price: "$197",
    period: "/yearly",
    subtitle: "Save $110 with yearly",
    features: [
      { text: "Unlimited Designs" },
      { text: "Newest AI Model" },
      { text: "Higher Quality Renders" },
      { text: "All Modes Unlocked", highlighted: true },
      { text: "AI Furniture Removal" },
      { text: "Decor Staging" },
      { text: "Colors & Textures" },
      { text: "Sketch to Render" },
      { text: "AI Object Detection" },
      { text: "AI Furniture Finder" },
      { text: "40+ Room Types Available" },
      { text: "75+ Styles Available" },
      { text: "Download Renders Full HD", highlighted: true },
      { text: "Public & Private Gallery" },
      { text: "Commercial License" },
      { text: "24 Hours Support" },
      { text: "No Watermark" },
      { text: "Cancel anytime" },
    ],
    buttonText: "Get Instant Access",
  },
];

const Pricing: React.FC = () => {
  return (
    <div className={styles.pricingContainer} id="pricing">
      <h1 className={styles.title}>Choose the plan that fits your needs!</h1>
      <div className={styles.plansContainer}>
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`${styles.planCard} ${
              plan.popular ? styles.popularPlan : ""
            }`}
          >
            {plan.popular && (
              <div className={styles.popularTag}>MOST POPULAR</div>
            )}
            <div className={styles.planIcon}>{plan.icon}</div>
            <h2 className={styles.planTitle}>{plan.title}</h2>
            <div className={styles.planPrice}>
              <span className={styles.price}>{plan.price}</span>
              <span className={styles.period}>{plan.period}</span>
            </div>
            <p className={styles.planSubtitle}>{plan.subtitle}</p>
            <ul className={styles.featuresList}>
              {plan.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className={
                    feature.highlighted ? styles.highlightedFeature : ""
                  }
                >
                  <span className={styles.checkmark}>✓</span> {feature.text}
                </li>
              ))}
            </ul>
            <button className={styles.accessButton}>{plan.buttonText}</button>
            <div className={styles.secureCheckout}>
              <img
                src={require("../../assets/payments.png")}
                alt="FastSpring"
              />
              <span>Secure Checkout</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
