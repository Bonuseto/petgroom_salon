/* eslint-disable */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu/Menu";
import LocationMap from "./components/LocationMap/LocationMap";
import GoogleMapsReviews from "./components/Reviews/GoogleMapsReviews";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import FormPage from "./pages/FormPage"; // Import the new form page

function App(): JSX.Element {
  return (
    <Router basename="/petgroom_salon">
      <div className="App">
        <Menu />
        <HeaderComponent />
        <Routes>
          <Route path="/appointments" element={<FormPage />} />
        </Routes>
        <div id="reviewsId">
          <GoogleMapsReviews />
        </div>
        <div id="howToFindId">
          <LocationMap />
        </div>
      </div>
    </Router>
  );
}

export default App;
