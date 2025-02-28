/* FormPage.tsx */
/* eslint-disable */
/* FormPage.tsx */
import React, { useState } from "react";
import Menu from "../components/Menu/Menu";
import classes from "./FormPage.module.css";

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
  discountedGrooming: boolean;
  termsRead: boolean;
  termsAgreed: boolean;
}

const services = [
  {
    id: "Full-Groom",
    label: "Full Groom",
    image: "https://cdn.prod.website-files.com/649972ec5905003f83dfde15/6509c23c0d0afd36f440b19e_dog.svg",
  },
  {
    id: "Bath-and-brush",
    label: "Bath & Brush",
    image: "https://cdn.prod.website-files.com/649972ec5905003f83dfde15/6509c05d0f8df0e1b4eb6549_combe-shampoo.svg",
  },
  {
    id: "Puppy-Groom",
    label: "Puppy Groom",
    image: "https://cdn.prod.website-files.com/649972ec5905003f83dfde15/65a8f1cb712368d0a1f92fce_Puppy_On_Chair_Illustration.svg",
  },
  {
    id: "Teeth-Cleaning",
    label: "Teeth Cleaning",
    image: "https://cdn.prod.website-files.com/649972ec5905003f83dfde15/6509c05d3c76a1ae50cc6117_paw.svg",
  },
];

const FormPage: React.FC = () => {
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
    discountedGrooming: false,
    termsRead: false,
    termsAgreed: false,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.service) {
      alert("Please select a service");
      return;
    }
    
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your server
    alert("Booking request submitted successfully!");
  };

  return (
    <div>
      <Menu />
      <div className={classes.pageWrapper}>
        <div className={classes.formContainer}>
          <div className={classes.headerSection}>
            <h1 className={classes.mainHeading}>Schedule your dog's next grooming appointment</h1>
          </div>
          
          <div className={classes.formContent}>
            <form onSubmit={handleSubmit}>
              <div className={classes.formSection}>
                <h2 className={classes.sectionHeading}>Choose service</h2>
                
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
                <h2 className={classes.sectionHeading}>About your dog...</h2>
                
                <div className={classes.formFields}>
                  <div className={classes.formRow}>
                    <div className={classes.formGroup}>
                      <label htmlFor="breed" className={classes.inputLabel}>Breed</label>
                      <input
                        type="text"
                        id="breed"
                        name="breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                        className={classes.textInput}
                        placeholder="e.g. Cockapoo"
                        required
                      />
                    </div>
                    
                    <div className={classes.formGroup}>
                      <label htmlFor="dogName" className={classes.inputLabel}>Dog's name</label>
                      <input
                        type="text"
                        id="dogName"
                        name="dogName"
                        value={formData.dogName}
                        onChange={handleInputChange}
                        className={classes.textInput}
                        placeholder="e.g. Buster"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className={classes.formRow}>
                    <div className={classes.formGroup}>
                      <label htmlFor="dogAge" className={classes.inputLabel}>Dog's age</label>
                      <input
                        type="text"
                        id="dogAge"
                        name="dogAge"
                        value={formData.dogAge}
                        onChange={handleInputChange}
                        className={classes.textInput}
                        placeholder="e.g. 3 years"
                        required
                      />
                    </div>
                
                    <div className={classes.formGroup}>
                      <label htmlFor="matting" className={classes.inputLabel}>Matting?</label>
                      <select
                        id="matting"
                        name="matting"
                        value={formData.matting}
                        onChange={handleInputChange}
                        className={classes.selectInput}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>

                  <div className={classes.formRow}>
                    <div className={classes.formGroup}>
                      <label htmlFor="comfortable" className={classes.inputLabel}>Comfortable being groomed?</label>
                      <select
                        id="comfortable"
                        name="comfortable"
                        value={formData.comfortable}
                        onChange={handleInputChange}
                        className={classes.selectInput}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div className={classes.formGroup}>
                      <label htmlFor="lastGroom" className={classes.inputLabel}>Last groom?</label>
                      <select
                        id="lastGroom"
                        name="lastGroom"
                        value={formData.lastGroom}
                        onChange={handleInputChange}
                        className={classes.selectInput}
                      >
                        <option value="1 - 4 weeks ago">1 - 4 weeks ago</option>
                        <option value="1 - 2 months ago">1 - 2 months ago</option>
                        <option value="3+ months ago">3+ months ago</option>
                        <option value="First time">First time</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className={classes.formGroup}>
                    <label htmlFor="healthIssues" className={classes.inputLabel}>Any dog health issues?</label>
                    <select
                      id="healthIssues"
                      name="healthIssues"
                      value={formData.healthIssues}
                      onChange={handleInputChange}
                      className={classes.selectInput}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={classes.sectionDivider}></div>
              
              <div className={classes.formSection}>
                <h2 className={classes.sectionHeading}>About you...</h2>
                
                <div className={classes.formFields}>
                  <div className={classes.formGroup}>
                    <p className={classes.inputLabel}>Are you a new customer or an existing customer?</p>
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
                        <span className={classes.radioText}>New customer</span>
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
                        <span className={classes.radioText}>Existing customer</span>
                      </label>
                    </div>
                  </div>
              
                  <div className={classes.formRow}>
                    <div className={classes.formGroup}>
                      <label htmlFor="firstName" className={classes.inputLabel}>First name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={classes.textInput}
                        placeholder="e.g. Maggie"
                        required
                      />
                    </div>
                    
                    <div className={classes.formGroup}>
                      <label htmlFor="lastName" className={classes.inputLabel}>Last name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={classes.textInput}
                        placeholder="e.g. Smith"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className={classes.formRow}>
                    <div className={classes.formGroup}>
                      <label htmlFor="email" className={classes.inputLabel}>Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={classes.textInput}
                        placeholder="you@address.com"
                        required
                      />
                    </div>
                    
                    <div className={classes.formGroup}>
                      <label htmlFor="phoneNumber" className={classes.inputLabel}>Phone number</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={classes.textInput}
                        placeholder="e.g. 01352 543..."
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.sectionDivider}></div>
              
              <div className={classes.formSection}>
                <h2 className={classes.sectionHeading}>Which days generally work best?</h2>
                <div className={classes.daysCheckboxGroup}>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <div key={day} className={classes.dayOption}>
                      <label className={classes.checkboxContainer}>
                        <input
                          type="checkbox"
                          name="preferredDays"
                          value={day}
                          checked={formData.preferredDays.includes(day)}
                          onChange={() => {
                            const updatedDays = formData.preferredDays.includes(day)
                              ? formData.preferredDays.filter(d => d !== day)
                              : [...formData.preferredDays, day];
                            setFormData({ ...formData, preferredDays: updatedDays });
                          }}
                          className={classes.checkboxInput}
                        />
                        <span className={classes.dayLabel}>{day}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={classes.sectionDivider}></div>
              
              <div className={classes.formSection}>
                <h2 className={classes.sectionHeading}>Notes for the groomer</h2>
                <div className={classes.formGroup}>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className={classes.textareaInput}
                    placeholder="Type your message"
                    rows={4}
                  />
                </div>
              </div>
              
              <div className={classes.sectionDivider}></div>
              
              <div className={classes.formSection}>
                <div className={classes.checkboxGroup}>
                  <label className={classes.checkboxContainer}>
                    <input
                      type="checkbox"
                      name="discountedGrooming"
                      checked={formData.discountedGrooming}
                      onChange={handleCheckboxChange}
                      className={classes.checkboxInput}
                    />
                    <span className={classes.checkboxText}>Yes, I'd like my dog to be considered for discounted grooming services at your training centre.</span>
                  </label>
                </div>
                
                <div className={classes.checkboxGroup}>
                  <label className={classes.checkboxContainer}>
                    <input
                      type="checkbox"
                      name="termsRead"
                      checked={formData.termsRead}
                      onChange={handleCheckboxChange}
                      className={classes.checkboxInput}
                      required
                    />
                    <span className={classes.checkboxText}>Please confirm you have read and understood our <a href="#" className={classes.termsLink}>Booking Terms and Conditions</a></span>
                  </label>
                </div>
                
                <div className={classes.checkboxGroup}>
                  <label className={classes.checkboxContainer}>
                    <input
                      type="checkbox"
                      name="termsAgreed"
                      checked={formData.termsAgreed}
                      onChange={handleCheckboxChange}
                      className={classes.checkboxInput}
                      required
                    />
                    <span className={classes.checkboxText}>By sending this request, you are confirming that you agree with the <a href="#" className={classes.termsLink}>Terms and Conditions</a></span>
                  </label>
                </div>
                
                <div className={classes.submitButtonContainer}>
                  <button 
                    type="submit" 
                    className={classes.submitButton}
                    disabled={!formData.termsAgreed || !formData.termsRead}
                  >
                    Send booking request
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