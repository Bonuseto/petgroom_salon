/* eslint-disable */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage"; // Import the new HomePage
import FormPage from "./pages/FormPage";

function App(): JSX.Element {
  return (
    <Router basename="/petgroom_salon">
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointments" element={<FormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
