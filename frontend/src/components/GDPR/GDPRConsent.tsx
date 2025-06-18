import React from "react";
import { useTranslation } from "react-i18next";

interface GDPRConsentProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenPopup: () => void;
  required?: boolean;
}

const GDPRConsent: React.FC<GDPRConsentProps> = ({
  checked,
  onChange,
  onOpenPopup,
  required = true,
}) => {
  const { t } = useTranslation();

  const handleMoreInfo = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent label click from toggling checkbox
    e.stopPropagation(); // Stop event from bubbling up
    onOpenPopup(); // Call the provided function
  };

  return (
    <>
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          required={required}
          className="mr-2 mt-1 accent-teal-500 hover:accent-teal-600"
        />
        <p>
          {t(
            "gdpr.simpleConsent.text",
            "By checking this box, I consent to Best Groom Studio collecting and processing my personal data and information about my pet for the purpose of scheduling and managing grooming appointments."
          )}{" "}
          <a
            className="text-decoration-line: underline text-teal-500 hover:text-teal-700"
            onClick={handleMoreInfo}
          >
            {t("gdpr.moreInfo", "More information")}
          </a>
        </p>
      </div>
    </>
  );
};

export default GDPRConsent;
