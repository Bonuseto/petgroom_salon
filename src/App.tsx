/* eslint-disable */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";
import "./App.css";
import HomePage from "./components/HomePage/HomePage"; // Import the new HomePage
import FormPage from "./pages/FormPage";

// Google Maps API Key (Make sure it's set in .env)
const apiKey = process.env.REACT_APP_API_KEY!;
const libraries: ('places' | 'maps')[] = ['places', 'maps']; // Load both libraries at once

function App(): JSX.Element {
  // Load Google Maps API once for the whole app
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  return (
    <Router basename="/petgroom_salon">
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage isLoaded={isLoaded} />} />
          <Route path="/appointments" element={<FormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
