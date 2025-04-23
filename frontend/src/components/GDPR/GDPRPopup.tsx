import React from 'react';
import { useTranslation } from 'react-i18next';
import './GDPRPopup.css';

interface GDPRPopupProps {
  onAccept: () => void
}

const GDPRPopup: React.FC<GDPRPopupProps> = ({ onAccept }) => {
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleAccept = () => {
    localStorage.setItem('gdprAccepted', 'true');
    onAccept();
  };

  return (
    <div className="gdpr-overlay">
      <div className="gdpr-popup">
        <h2 className="gdpr-title">
          {t('gdpr.simpleConsent.title', 'GDPR Consent')}
        </h2>

        <p className="gdpr-main-text">
          {t('gdpr.simpleConsent.text',
            'By checking this box, I consent to Best Groom Studio collecting and processing my personal data and information about my pet for the purpose of scheduling and managing grooming appointments.'
          )}
        </p>

        <div className="gdpr-understand-section">
          <p className="gdpr-understand-heading">
            <strong>{t('gdpr.understand', 'I understand that:')}</strong>
          </p>

          <ul className="gdpr-bullet-list">
            <li>
              <span className="gdpr-bullet-icon">•</span>
              <span className="gdpr-bullet-text">
                {t('gdpr.simpleConsent.bulletPoints.storage',
                  'My data will be stored securely and only used for appointment-related communication'
                )}
              </span>
            </li>
            <li>
              <span className="gdpr-bullet-icon">•</span>
              <span className="gdpr-bullet-text">
                {t('gdpr.simpleConsent.bulletPoints.retention',
                  'My information will be retained for 6 months from my last appointment'
                )}
              </span>
            </li>
            <li>
              <span className="gdpr-bullet-icon">•</span>
              <span className="gdpr-bullet-text">
                {t('gdpr.simpleConsent.bulletPoints.rights',
                  'I have the right to access, correct, or request deletion of my data at any time'
                )}
              </span>
            </li>
            <li>
              <span className="gdpr-bullet-icon">•</span>
              <span className="gdpr-bullet-text">
                {t('gdpr.simpleConsent.bulletPoints.withdrawal',
                  'I can withdraw my consent at any time by contacting team@bestgroomstudio.pl'
                )}
              </span>
            </li>
          </ul>
        </div>

        <div className="gdpr-button-container">
          <button className="gdpr-accept-button" onClick={handleAccept}>
            {t('gdpr.accept', 'ACCEPT')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GDPRPopup;
