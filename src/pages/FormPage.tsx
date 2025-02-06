/* FormPage.tsx */
/* eslint-disable */
import React, { useState } from "react";
import Menu from "../components/Menu/Menu";
import "./FormPage.module.css"; // Import the updated CSS

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    breed: "",
    dogName: "",
    dogAge: "",
    lastGroom: "",
    healthIssues: "",
  });

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // You can send this data to an API or save it
  };

  return (
    <div>
      <Menu />
      <div className="form-container">
        <h1>Contact Form</h1>
        <p>Fill out the form below to send us a message.</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="breed">Breed:</label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="dogName">Dog's Name:</label>
            <input
              type="text"
              id="dogName"
              name="dogName"
              value={formData.dogName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="dogAge">Dog's Age:</label>
            <input
              type="number"
              id="dogAge"
              name="dogAge"
              value={formData.dogAge}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="lastGroom">Last Groom:</label>
            <input
              type="date"
              id="lastGroom"
              name="lastGroom"
              value={formData.lastGroom}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="healthIssues">Any Dog Health Issues:</label>
            <input
              type="text"
              id="healthIssues"
              name="healthIssues"
              value={formData.healthIssues}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
