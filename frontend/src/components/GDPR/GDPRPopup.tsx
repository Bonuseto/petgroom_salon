import React, { useState } from "react";
import { Check, Shield, Clock, User, Mail, X } from "lucide-react";

interface GDPRPopupProps {
  onAccept: () => void;
  onCancel: () => void;
}

const GDPRPopup: React.FC<GDPRPopupProps> = ({ onAccept, onCancel }) => {
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAccept = async () => {
    setIsAccepting(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In your actual implementation, you would use localStorage here:
    // localStorage.setItem('gdprAccepted', 'true');

    onAccept();
    setIsAccepting(false);
  };

  const bulletPoints = [
    {
      icon: <Shield />,
      text: "Your data will be stored securely and only used for appointment-related communication",
    },
    {
      icon: <Clock />,
      text: "Your information will be retained for 6 months from your last appointment",
    },
    {
      icon: <User />,
      text: "You have the right to access, correct, or request deletion of your data at any time",
    },
    {
      icon: <Mail />,
      text: "You can withdraw your consent at any time by contacting team@bestgroomstudio.pl",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-start justify-center p-2 sm:p-4 z-50">
      <div className="mt-20 sm:mt-20 bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[95vh] overflow-y-auto transform transition-all duration-300 ease-out flex flex-col">
        {/* Header */}
        <div className="relative bg-teal-500 text-white p-4 sm:p-6 rounded-t-2xl">
          <button
            onClick={onCancel}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-full">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                Data Privacy Consent
              </h2>
              <p className="text-emerald-100 text-xs sm:text-sm">
                Best Groom Studio
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 text-sm sm:text-base">
          {/* Main consent text */}
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-3 sm:mb-4">
              By proceeding, you consent to Best Groom Studio collecting and
              processing your personal data for scheduling and managing your pet
              grooming appointments.
            </p>
          </div>

          {/* Understanding section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-teal-500" />I understand that:
            </h3>

            <div className="space-y-3 sm:space-y-4">
              {bulletPoints.map((point, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 text-teal-500">
                    {point.icon}
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border-l-4 border-teal-500">
            <p className="text-xs sm:text-sm text-gray-600">
              This consent is required to provide our services. You can modify
              your preferences at any time by contacting us directly.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="p-4 sm:p-6 bg-gray-50 rounded-b-2xl flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleAccept}
            disabled={isAccepting}
            className="w-full sm:w-auto px-4 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAccepting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Accept & Continue
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GDPRPopup;
