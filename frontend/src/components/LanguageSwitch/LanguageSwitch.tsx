// LanguageSwitch.tsx
import React, { useState, useEffect } from 'react';
import classes from './LanguageSwitch.module.css';
import i18n from '../../i18n';
import LanguageIcon from '@mui/icons-material/Language';
import useMediaQuery from '@mui/material/useMediaQuery';

interface LanguageSwitchProps {
  onSelectLanguage: (language: string) => void
}

const DEFAULT_LANGUAGE = 'en';

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ onSelectLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  const getInitialLanguage = (): string => {
    return typeof i18n.language === 'string' && i18n.language.length > 0
      ? i18n.language
      : DEFAULT_LANGUAGE;
  };

  const [currentLanguage, setCurrentLanguage] = useState<string>(getInitialLanguage());

  useEffect(() => {
    setCurrentLanguage(getInitialLanguage());
  }, [i18n.language]);

  const handleLanguageSelect = (language: string): void => {
    onSelectLanguage(language);
    setCurrentLanguage(language);
    setIsOpen(false);
  };

  const languageNames: Record<string, string> = {
    en: 'EN',
    pl: 'PL',
    ua: 'UA',
    ru: 'RU'
  };

  return (
    <div className={classes.languageSwitch}>
      <button className={classes.languageSwitchButton} onClick={() => { setIsOpen(!isOpen); }}>
        <LanguageIcon className={classes.languageSwitchIcon} />
        {!isMobile && <span>{languageNames[currentLanguage]}</span>}
      </button>
      {isOpen && (
        <div className={classes.languageSwitchDropdown}>
          <div
            className={`${classes.languageOption} ${currentLanguage === 'en' ? classes.languageOptionActive : ''}`}
            onClick={() => { handleLanguageSelect('en'); }}
          >
            EN
          </div>
          <div
            className={`${classes.languageOption} ${currentLanguage === 'pl' ? classes.languageOptionActive : ''}`}
            onClick={() => { handleLanguageSelect('pl'); }}
          >
            PL
          </div>
          <div
            className={`${classes.languageOption} ${currentLanguage === 'ua' ? classes.languageOptionActive : ''}`}
            onClick={() => { handleLanguageSelect('ua'); }}
          >
            UA
          </div>
          <div
            className={`${classes.languageOption} ${currentLanguage === 'ru' ? classes.languageOptionActive : ''}`}
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
