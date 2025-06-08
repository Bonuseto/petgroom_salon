import React, { useState } from "react";
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
    { code: "pl", label: "PL" },
    { code: "en", label: "EN" },
    { code: "ua", label: "UA" },
    { code: "ru", label: "RU" },
  ];

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="h-8 rounded-full border px-2.5"
      >
        <LanguageIcon className="mr-1 md:mr-1.5" />
        <span className="font-sans font-bold">{t("language")}</span>
      </button>

      {isOpen && (
        <ul
          role="menu"
          className="absolute right-0 top-full z-10 mt-2 overflow-hidden rounded-lg bg-white shadow-lg"
        >
          {languages.map(({ code, label }) => {
            return (
              <li
                key={code}
                role="none"
                className={"first:rounded-t-lg last:rounded-b-lg"}
              >
                <button
                  role="menuitem"
                  onClick={() => handleLanguageSelect(code)}
                  className={`
                  flex w-full px-5 py-2 text-sm font-medium hover:bg-teal-500/10 hover:text-teal-500
                  ${
                    i18n.language === code
                      ? "bg-teal-500/10 !text-teal-500"
                      : "bg-white !text-black"
                  }
                `}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitch;
