import React, { useState } from "react";
import classes from "./LanguageSwitch.module.css";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";

const LanguageSwitch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { i18n, t } = useTranslation();

  const handleLanguageSelect = (language: string): void => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  const languages = [
    { code: "en", label: "EN" },
    { code: "pl", label: "PL" },
    { code: "ua", label: "UA" },
    { code: "ru", label: "RU" },
  ];

  return (
    <div className={classes.languageSwitch}>
      <button
        className={classes.languageSwitchButton}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <LanguageIcon className={classes.languageSwitchIcon} />
        <span className={classes.languageText}>{t("language")}</span>
      </button>
      {isOpen && (
        <div className={classes.languageSwitchDropdown}>
          {languages.map(({ code, label }) => (
            <div
              key={code}
              className={`${classes.languageOption}`}
              onClick={() => {
                handleLanguageSelect(code);
              }}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;
