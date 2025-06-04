import React, { useState } from 'react';
import classes from './LanguageSwitch.module.css';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSwitch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { i18n, t } = useTranslation();

  const handleLanguageSelect = (language: string): void => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className={classes.languageSwitch}>
      <button className={classes.languageSwitchButton} onClick={() => { setIsOpen(!isOpen); }}>
        <LanguageIcon className={classes.languageSwitchIcon} />
        <span className={classes.languageText}>{t('language')}</span>
      </button>
      {isOpen && (
        <div className={classes.languageSwitchDropdown}>
          <div
            className={`${classes.languageOption}`}
            onClick={() => { handleLanguageSelect('en'); }}
          >
            EN
          </div>
          <div
            className={`${classes.languageOption}`}
            onClick={() => { handleLanguageSelect('pl'); }}
          >
            PL
          </div>
          <div
            className={`${classes.languageOption}`}
            onClick={() => { handleLanguageSelect('ua'); }}
          >
            UA
          </div>
          <div
            className={`${classes.languageOption}`}
            onClick={() => { handleLanguageSelect('ru'); }}
          >
            RU
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;
