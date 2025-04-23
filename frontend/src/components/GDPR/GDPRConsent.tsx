import React from 'react';
import { useTranslation } from 'react-i18next';
import './GDPRConsent.css';

interface GDPRConsentProps {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onOpenPopup: () => void
  required?: boolean
}

const GDPRConsent: React.FC<GDPRConsentProps> = ({
  checked,
  onChange,
  onOpenPopup,
  required = true
}) => {
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleMoreInfo = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent label click from toggling checkbox
    e.stopPropagation(); // Stop event from bubbling up
    onOpenPopup(); // Call the provided function
  };

  return (
    <div className="gdpr-consent-container">
      <label className="gdpr-consent-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          required={required}
          className="gdpr-consent-checkbox"
        />
        <span className="gdpr-consent-text">
          {t('gdpr.simpleConsent.text',
            'By checking this box, I consent to Best Groom Studio collecting and processing my personal data and information about my pet for the purpose of scheduling and managing grooming appointments.'
          )}{' '}
          <button
            type="button"
            className="gdpr-more-info"
            onClick={handleMoreInfo}
          >
            {t('gdpr.moreInfo', 'More information')}
          </button>
        </span>
      </label>
    </div>
  );
};

export default GDPRConsent;
