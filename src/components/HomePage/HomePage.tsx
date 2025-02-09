/* eslint-disable */
import React from "react";
import Menu from "../Menu/Menu";
import LocationMap from "../LocationMap/LocationMap";
import GoogleMapsReviews from "../Reviews/GoogleMapsReviews";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const HomePage: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => {
  return (
    <div>
      <Menu />
      <HeaderComponent />
      <div id="reviewsId">
      <GoogleMapsReviews isLoaded={isLoaded} />
      </div>
      <div id="howToFindId">
      <LocationMap isLoaded={isLoaded} />
      </div>
    </div>
  );
};

export default HomePage;