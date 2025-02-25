/* FormPage.tsx */
/* eslint-disable */
import React, { useState } from "react";
import Menu from "../components/Menu/Menu";
import "./FormPage.module.css";
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
    termsAgreed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, service: e.target.value });
  };

  return (
    <div>
      <Menu />
        <div className={classes.paddingSectionHeader}>
          <div className={classes.containerMedium}>
            <form className={classes.contactForm}>
            <div className={classes.formContainer}>
              <h1>Choose Service</h1>

              <div className={classes.primaryTreatments}>

              {services.map((service, index) => {
  console.log(`Rendering service ${index + 1}: ${service.label}`);
  return (
    <label key={service.id} className={classes.serviceOption}>
      <input
        type="radio"
        name="service"
        value={service.id}
        checked={formData.service === service.id}
        onChange={handleChange}
        className={classes.hiddenRadio}
      />
      <div className={classes.customRadio}></div>
      <img src={service.image} alt={service.label} />
      <span>{service.label}</span>
    </label>
  );
})}

            </div>
            </div>
            </form>
          </div>
        </div>
    </div>
  );
};

export default FormPage;
