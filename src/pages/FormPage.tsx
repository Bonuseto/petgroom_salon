/* FormPage.tsx */
/* eslint-disable */
import React, { useState } from "react";
import Menu from "../components/Menu/Menu";
import "./FormPage.module.css";
import classes from './FormPage.module.css';

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
    image: "https://cdn.prod.website-files.com/649972ec5905003f83dfde15/6509c05e0646ad7e7f6985cb_teeth.svg",
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
    lastGroom: "",
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
    termsAgreed: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = e.target instanceof HTMLInputElement && type === "checkbox";

    setFormData((prevData) => ({
      ...prevData,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      preferredDays: checked
        ? [...prevData.preferredDays, value]
        : prevData.preferredDays.filter(day => day !== value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div>
      <Menu />
      <div className={classes.formContainer}>
        <h1>Choose Service</h1>
        <div className={classes.serviceOptions}>
          {services.map((service) => (
            <label key={service.id} className={classes.serviceOption}>
              <input
                type="radio"
                name="service"
                value={service.id}
                checked={formData.service === service.id}
                onChange={handleChange}
                className={classes.customTreatmentRadio}
              />
              <img src={service.image} alt={service.label} />
              <span>{service.label}</span>
            </label>
          ))}
        </div>

        <h2>About your dog...</h2>
        <p>Please note: We're currently unable to groom larger breeds.</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Breed:</label>
            <input type="text" name="breed" value={formData.breed} onChange={handleChange} required />
          </div>
          <div>
            <label>Dog's Name:</label>
            <input type="text" name="dogName" value={formData.dogName} onChange={handleChange} required />
          </div>
          <div>
            <label>Dog's Age:</label>
            <input type="text" name="dogAge" value={formData.dogAge} onChange={handleChange} required />
          </div>
          <div>
            <label>Matting?</label>
            <select name="matting" value={formData.matting} onChange={handleChange}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div>
            <label>Comfortable being groomed?</label>
            <select name="comfortable" value={formData.comfortable} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label>Last Groom:</label>
            <select name="lastGroom" value={formData.lastGroom} onChange={handleChange}>
              <option value="1 - 4 weeks ago">1 - 4 weeks ago</option>
              <option value="1 - 3 months ago">1 - 3 months ago</option>
              <option value="3+ months ago">3+ months ago</option>
            </select>
          </div>
          <div>
            <label>Any dog health issues?</label>
            <select name="healthIssues" value={formData.healthIssues} onChange={handleChange}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <h2>About You...</h2>
          <label>Are you a new customer or an existing customer?</label>
          <div>
            <label>
              <input type="radio" name="customerType" value="New" onChange={handleChange} /> New customer
            </label>
            <label>
              <input type="radio" name="customerType" value="Existing" onChange={handleChange} /> Existing customer
            </label>
          </div>
          <div>
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>

          <button type="submit">Send Booking Request</button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
