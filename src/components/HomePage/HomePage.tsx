/* eslint-disable */
import React from "react";
import Menu from "../Menu/Menu";
import LocationMap from "../LocationMap/LocationMap";
import GoogleMapsReviews from "../Reviews/GoogleMapsReviews";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const HomePage: React.FC = () => {
  return (
    <div>
      <Menu />
      <HeaderComponent />
      <div id="reviewsId">
        <GoogleMapsReviews />
      </div>
      <div id="howToFindId">
        <LocationMap />
      </div>
    </div>
  );
};

export default HomePage;
