/* eslint-disable */
/* FormPage.tsx */
import React, { useState } from "react";
import Menu from "../components/Menu/Menu";
import classes from "./FormPage.module.css";
import { useTranslation } from "react-i18next";

interface FormData {
  service: string;
  breed: string;
  dogName: string;
  dogAge: string;
  matting: string;
  comfortable: string;
  lastGroom: string;
  healthIssues: string;
  customerType: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  preferredDays: string[];
  notes: string;
}

const FormPage: React.FC = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      id: "Full-Groom",
      label: t("form.services.fullGroom"),
      image: "https://cdn.prod.website-files.com/649972ec5905003f83dfde15/6509c23c0d0afd36f440b19e_dog.svg",
    },
    {
      id: "Bath-and-brush",
      label: t("form.services.bathAndBrush"),
      image: "https://cdn.prod.website-files.com/649972ec5905003f83dfde15/6509c05d0f8df0e1b4eb6549_combe-shampoo.svg",
    },
    {
      id: "Puppy-Groom",
      label: t("form.services.puppyGroom"),
      image: "https://cdn.prod.website-files.com/649972ec5905003f83dfde15/65a8f1cb712368d0a1f92fce_Puppy_On_Chair_Illustration.svg",
    },
    {
      id: "Hand-Stripping",
      label: t("form.services.handStripping"),
      image: "https://cdn.prod.website-files.com/649972ec5905003f83dfde15/6509c05d3c76a1ae50cc6117_paw.svg",
    }
  ];
  
  const [formData, setFormData] = useState<FormData>({
    service: "",
    breed: "",
    dogName: "",
    dogAge: "",
    matting: "No",
    comfortable: "Yes",
    lastGroom: "1 - 4 weeks ago",
    healthIssues: "No",
    customerType: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    preferredDays: [],
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, service: e.target.value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newPreferredDays = checked
      ? [...formData.preferredDays, value]
      : formData.preferredDays.filter(day => day !== value);
    
    setFormData({ ...formData, preferredDays: newPreferredDays });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.service) {
      alert("Please select a service");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Prepare the data in the format the backend expects
      const appointmentData = {
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        petName: formData.dogName,
        service: formData.service,
        appointmentDate: new Date().toISOString(), // You might want to add a date picker in your form
        additionalNotes: `
          Breed: ${formData.breed}
          Age: ${formData.dogAge}
          Matting: ${formData.matting}
          Comfortable being groomed: ${formData.comfortable}
          Last groom: ${formData.lastGroom}
          Health issues: ${formData.healthIssues}
          Customer type: ${formData.customerType}
          Phone: ${formData.phoneNumber}
          Preferred days: ${formData.preferredDays.join(', ')}
          Notes: ${formData.notes}
        `
      };
      
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          service: "",
          breed: "",
          dogName: "",
          dogAge: "",
          matting: "No",
          comfortable: "Yes",
          lastGroom: "1 - 4 weeks ago",
          healthIssues: "No",
          customerType: "",
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          preferredDays: [],
          notes: "",
        });
        window.scrollTo(0, 0);
      } else {
        setSubmitError('Failed to send booking request. Please try again later.');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError('An error occurred while sending your booking request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const days = [
    { id: "monday", label: t("form.preferredDays.monday") },
    { id: "tuesday", label: t("form.preferredDays.tuesday") },
    { id: "wednesday", label: t("form.preferredDays.wednesday") },
    { id: "thursday", label: t("form.preferredDays.thursday") },
    { id: "friday", label: t("form.preferredDays.friday") },
    { id: "saturday", label: t("form.preferredDays.saturday") },
  ];

  return (
    <div>
      <Menu />
      <div className={classes.pageWrapper}>
        <div className={classes.formContainer}>
          <div className={classes.headerSection}>
            <h1 className={classes.mainHeading}>{t("form.mainHeading")}</h1>
            
            {submitSuccess && (
              <div className={classes.successMessage}>
                <p>Thank you for your booking request! We'll be in touch with you shortly.</p>
              </div>
            )}
            
            {submitError && (
              <div className={classes.errorMessage}>
                <p>{submitError}</p>
              </div>
            )}
          </div>
          
          <div className={classes.formContent}>
            <form onSubmit={handleSubmit}>
              <div className={classes.formSection}>
                <h2 className={classes.sectionHeading}>{t("form.serviceSection")}</h2>
                
                <div className={classes.serviceOptions}>
                  {services.map((service) => (
                    <label key={service.id} className={classes.serviceOption}>
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        checked={formData.service === service.id}
                        onChange={handleServiceChange}
                        className={classes.hiddenRadio}
                        required
                      />
                      <div className={classes.customRadio}></div>
                      <img src={service.image} alt={service.label} className={classes.serviceIcon} />
                      <span className={classes.serviceLabel}>{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={classes.sectionDivider}></div>
              
              <div className={classes.formSection}>
                <h2 className={classes.sectionHeading}>{t("form.dogInfo.heading")}</h2>
                
                <div className={classes.formFields}>
                  <div className={classes.formRow}>
                    <div className={classes.formGroup}>
                      <label htmlFor="breed" className={classes.inputLabel}>{t("form.dogInfo.breedLabel")}</label>
                      <input
                        type="text"
                        id="breed"
                        name="breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                        className={classes.textInput}
                        placeholder={t("form.dogInfo.breedPlaceholder")}
                        required
                      />
                    </div>
                    
                    <div className={classes.formGroup}>
                      <label htmlFor="dogName" className={classes.inputLabel}>{t("form.dogInfo.nameLabel")}</label>
                      <input
                        type="text"
                        id="dogName"
                        name="dogName"
                        value={formData.dogName}
                        onChange={handleInputChange}
                        className={classes.textInput}
                        placeholder={t("form.dogInfo.namePlaceholder")}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className={classes.formRow}>
                    <div className={classes.formGroup}>
                      <label htmlFor="dogAge" className={classes.inputLabel}>{t("form.dogInfo.ageLabel")}</label>
                      <input
                        type="text"
                        id="dogAge"
                        name="dogAge"
                        value={formData.dogAge}
                        onChange={handleInputChange}
                        className={classes.textInput}
                        placeholder={t("form.dogInfo.agePlaceholder")}
                        required
                      />
                    </div>
                
                    <div className={classes.formGroup}>
                      <label htmlFor="matting" className={classes.inputLabel}>{t("form.groomingHistory.mattingLabel")}</label>
                      <select
                        id="matting"
                        name="matting"
                        value={formData.matting}
                        onChange={handleInputChange}
                        className={classes.selectInput}
                      >
                        <option value="No">{t("form.groomingHistory.mattingOptions.no")}</option>
                        <option value="Yes">{t("form.groomingHistory.mattingOptions.yes")}</option>
                        <option value="Unsure">{t("form.groomingHistory.mattingOptions.unsure")}</option>
                      </select>
                    </div>
                  </div>

                  <div className={classes.formRow}>
                    <div className={classes.formGroup}>
                      <label htmlFor="comfortable" className={classes.inputLabel}>{t("form.groomingHistory.comfortableLabel")}</label>
                      <select
                        id="comfortable"
                        name="comfortable"
                        value={formData.comfortable}
                        onChange={handleInputChange}
                        className={classes.selectInput}
                      >
                        <option value="Yes">{t("form.groomingHistory.comfortableOptions.yes")}</option>
                        <option value="No">{t("form.groomingHistory.comfortableOptions.no")}</option>
                        <option value="First time">{t("form.groomingHistory.comfortableOptions.unsure")}</option>
                      </select>
                    </div>

                    <div className={classes.formGroup}>
                      <label htmlFor="lastGroom" className={classes.inputLabel}>{t("form.groomingHistory.lastGroomLabel")}</label>
                      <select
                        id="lastGroom"
                        name="lastGroom"
                        value={formData.lastGroom}
                        onChange={handleInputChange}
                        className={classes.selectInput}
                      >
                        <option value="1 - 4 weeks ago">{t("form.groomingHistory.lastGroomOptions.recent")}</option>
                        <option value="1 - 2 months ago">{t("form.groomingHistory.lastGroomOptions.moderate")}</option>
                        <option value="3+ months ago">{t("form.groomingHistory.lastGroomOptions.long")}</option>
                        <option value="First time">{t("form.groomingHistory.lastGroomOptions.firstTime")}</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className={classes.formGroup}>
                    <label htmlFor="healthIssues" className={classes.inputLabel}>{t("form.groomingHistory.healthIssuesLabel")}</label>
                    <select
                      id="healthIssues"
                      name="healthIssues"
                      value={formData.healthIssues}
                      onChange={handleInputChange}
                      className={classes.selectInput}
                    >
                      <option value="No">{t("form.groomingHistory.mattingOptions.no")}</option>
                      <option value="Yes">{t("form.groomingHistory.mattingOptions.yes")}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={classes.sectionDivider}></div>
              
              <div className={classes.formSection}>
                <h2 className={classes.sectionHeading}>{t("form.customerInfo.heading")}</h2>
                
                <div className={classes.formFields}>
                  <div className={classes.formRow}>
                    <div className={classes.formGroup}>
                      <label className={classes.inputLabel}>{t("form.customerInfo.customerTypeLabel")}</label>
                      <div className={classes.radioGroup}>
                        <label className={classes.radioLabel}>
                          <input
                            type="radio"
                            name="customerType"
                            value="New"
                            checked={formData.customerType === "New"}
                            onChange={handleInputChange}
                            className={classes.radioInput}
                            required
                          />
                          <span className={classes.radioText}>{t("form.customerInfo.customerTypeOptions.new")}</span>
                        </label>
                        <label className={classes.radioLabel}>
                          <input
                            type="radio"
                            name="customerType"
                            value="Existing"
                            checked={formData.customerType === "Existing"}
                            onChange={handleInputChange}
                            className={classes.radioInput}
                          />
                          <span className={classes.radioText}>{t("form.customerInfo.customerTypeOptions.returning")}</span>
                        </label>
                      </div>
                    </div>
                  </div>
              
                  <div className={classes.formRow}>
                    <div className={classes.formGroup}>
                      <label htmlFor="firstName" className={classes.inputLabel}>{t("form.customerInfo.firstNameLabel")}</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={classes.textInput}
                        placeholder={t("form.customerInfo.firstNamePlaceholder")}
                        required
                      />
                    </div>
                    
                    <div className={classes.formGroup}>
                      <label htmlFor="lastName" className={classes.inputLabel}>{t("form.customerInfo.lastNameLabel")}</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={classes.textInput}
                        placeholder={t("form.customerInfo.lastNamePlaceholder")}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className={classes.formRow}>
                    <div className={classes.formGroup}>
                      <label htmlFor="email" className={classes.inputLabel}>{t("form.customerInfo.emailLabel")}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={classes.textInput}
                        placeholder={t("form.customerInfo.emailPlaceholder")}
                        required
                      />
                    </div>
                    
                    <div className={classes.formGroup}>
                      <label htmlFor="phoneNumber" className={classes.inputLabel}>{t("form.customerInfo.phoneLabel")}</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={classes.textInput}
                        placeholder={t("form.customerInfo.phonePlaceholder")}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.sectionDivider}></div>
              
              <div className={classes.formSection}>
                <h2 className={classes.sectionHeading}>{t("form.preferredDays.heading")}</h2>
                <p className={classes.subHeading}>{t("form.preferredDays.description")}</p>
                <div className={classes.daysCheckboxGroup}>
                  {days.map(day => (
                    <div key={day.id} className={classes.dayOption}>
                      <label className={classes.dayLabel}>
                        <input
                          type="checkbox"
                          name="preferredDays"
                          value={day.id}
                          checked={formData.preferredDays.includes(day.id)}
                          onChange={handleDaysChange}
                          className={classes.checkboxInput}
                        />
                        <span className={classes.checkboxText}>{day.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={classes.sectionDivider}></div>
              
              <div className={classes.formSection}>
                <h2 className={classes.sectionHeading}>{t("form.additionalInfo.heading")}</h2>
                
                <div className={classes.formFields}>
                  <div className={classes.formGroup}>
                    <label htmlFor="notes" className={classes.inputLabel}>{t("form.additionalInfo.notesLabel")}</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className={classes.textareaInput}
                      placeholder={t("form.additionalInfo.notesPlaceholder")}
                      rows={4}
                    />
                  </div>
                </div>
                
                <div className={classes.submitButtonContainer}>
                  <button 
                    type="submit" 
                    className={classes.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("form.submit.sending") : t("form.submit.send")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;