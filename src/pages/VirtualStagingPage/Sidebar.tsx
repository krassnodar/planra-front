// Sidebar.tsx
import { FC, useState } from "react";
import Button from "./Button";
import DesignThemeModal from "./DesignThemeModal";
import styles from "./VirtualStagingPage.module.css";
import { useStores } from "../../store/initStore";
import { observer } from "mobx-react-lite";

interface SidebarProps {
  spaceType: string;
  setSpaceType: (value: string) => void;
  // designTheme: string;
  // setDesignTheme: (value: string) => void;
  otherSpecifics: string;
  setOtherSpecifics: (value: string) => void;
  onGenerate: () => void;
}

const Sidebar: FC<SidebarProps> = ({
  spaceType,
  setSpaceType,
  // designTheme,
  // setDesignTheme,
  otherSpecifics,
  setOtherSpecifics,
  onGenerate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { defaultStore } = useStores();
  const { selectedStyle } = defaultStore;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSelectTheme = (theme: string) => {
    defaultStore.setSelectedStyle(theme);
    // setDesignTheme(theme);
    handleCloseModal();
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Virtual Staging</h2>
      <p className={styles.description}>
        Furnish empty rooms with realistic furniture
      </p>

      <div className={styles.inputGroup}>
        <label htmlFor="spaceType">Space type</label>
        <select
          id="spaceType"
          value={spaceType}
          onChange={(e) => setSpaceType(e.target.value)}
          className={styles.select}
        >
          <option value="">Select space type</option>
          <option value="living">Living room/family room/lounge</option>
          <option value="bedroom">Bedroom</option>
          <option value="dining">Dining</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="designTheme">Design theme</label>
        <div className={styles.select} onClick={handleOpenModal}>
          {selectedStyle || "Select design theme"}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="otherSpecifics">Any other specifics to include?</label>
        <input
          type="text"
          id="otherSpecifics"
          value={otherSpecifics}
          onChange={(e) => setOtherSpecifics(e.target.value)}
          className={styles.input}
          placeholder="Add Armchair, Ottoman and Lamp."
        />
      </div>

      <Button onClick={onGenerate} className={styles.generateButton}>
        Generate design
      </Button>

      <DesignThemeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelect={handleSelectTheme}
        selectedTheme={selectedStyle}
      />
    </div>
  );
};

export default observer(Sidebar);
