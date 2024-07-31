import { FC } from "react";
import styles from "./DesignThemeModal.module.css";

import BohemianImg from "../../assets/designStyles/Bohemian.webp";
import CoastalImg from "../../assets/designStyles/Coastal.webp";
import ContemporaryImg from "../../assets/designStyles/Contemporary.webp";
import FarmhouseImg from "../../assets/designStyles/Farmhouse.webp";
import FrenchCountryImg from "../../assets/designStyles/FrenchCountry.webp";
import GlamImg from "../../assets/designStyles/Glam.webp";
import HamptonImg from "../../assets/designStyles/Hampton.webp";
import IndustrialImg from "../../assets/designStyles/Industrial.webp";
import JapandiImg from "../../assets/designStyles/Japandi.webp";
import MidCenturyModernImg from "../../assets/designStyles/Mid-CenturyModern.webp";
import MinimalImg from "../../assets/designStyles/Minimal.webp";
import ModernImg from "../../assets/designStyles/Modern.webp";
import RusticImg from "../../assets/designStyles/Rustic.webp";
import ScandinavianImg from "../../assets/designStyles/Scandinavian.webp";
import TraditionalImg from "../../assets/designStyles/Traditional.webp";
import TransitionalImg from "../../assets/designStyles/Transitional.webp";

import { ReactComponent as CheckIcon } from "../../assets/check.svg";

interface DesignThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (theme: string) => void;
  selectedTheme: string | null;
}

interface DesignTheme {
  name: string;
  image: string;
}

const designThemes: DesignTheme[] = [
  { name: "Bohemian", image: BohemianImg },
  { name: "Coastal", image: CoastalImg },
  { name: "Contemporary", image: ContemporaryImg },
  { name: "Farmhouse", image: FarmhouseImg },
  { name: "French Country", image: FrenchCountryImg },
  { name: "Glam", image: GlamImg },
  { name: "Hampton", image: HamptonImg },
  { name: "Industrial", image: IndustrialImg },
  { name: "Japandi", image: JapandiImg },
  { name: "Mid-Century Modern", image: MidCenturyModernImg },
  { name: "Minimal", image: MinimalImg },
  { name: "Modern", image: ModernImg },
  { name: "Rustic", image: RusticImg },
  { name: "Scandinavian", image: ScandinavianImg },
  { name: "Traditional", image: TraditionalImg },
  { name: "Transitional", image: TransitionalImg },
];

const DesignThemeModal: FC<DesignThemeModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Design theme</h2>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.themeGrid}>
          {designThemes.map((theme) => (
            <div
              key={theme.name}
              className={styles.themeItem}
              onClick={() => onSelect(theme.name)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={theme.image}
                  alt={theme.name}
                  className={styles.themeImage}
                />
                {selectedTheme === theme.name && (
                  <div className={styles.selectedOverlay}>
                    <CheckIcon className={styles.checkIcon} />
                  </div>
                )}
              </div>
              <p className={styles.themeName}>{theme.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignThemeModal;
