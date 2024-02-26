// LanguageSwitch.tsx
import React, { useState } from 'react';
import classes from './LanguageSwitch.module.css'; // Import CSS module

interface LanguageSwitchProps {
  icon: string; // Path to the icon image
  onSelectLanguage: (language: string) => void; // Function to handle language selection
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ icon, onSelectLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (language: string) => {
    onSelectLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className={classes.languageSwitch}> {/* Use CSS module class */}
      <button className={classes.languageSwitchButton} onClick={() => setIsOpen(!isOpen)}>
        <img src={icon} alt="Language icon" className={classes.languageSwitchIcon} /> {/* Use CSS module class */}
      </button>
      {isOpen && (
        <div className={classes.languageSwitchDropdown}> {/* Use CSS module class */}
          <div className={classes.languageOption} onClick={() => handleLanguageSelect('en')}>EN</div> {/* Use CSS module class */}
          <div className={classes.languageOption} onClick={() => handleLanguageSelect('pl')}>PL</div> {/* Use CSS module class */}
          <div className={classes.languageOption} onClick={() => handleLanguageSelect('ua')}>UA</div> {/* Use CSS module class */}
          <div className={classes.languageOption} onClick={() => handleLanguageSelect('ru')}>RU</div> {/* Use CSS module class */}
          {/* Add more language options as needed */}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;
