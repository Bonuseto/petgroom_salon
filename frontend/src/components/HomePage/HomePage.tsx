import React from 'react';
import Menu from '../Menu/Menu';
import LocationMap from '../LocationMap/LocationMap';
import GoogleMapsReviews from '../Reviews/GoogleMapsReviews';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import WaveDivider from '../WaveDivider/WaveDivider';

const HomePage: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => {
  return (
    <div>
      <Menu />
      <section className="cream">
        <HeaderComponent />
      </section>
      <WaveDivider fillColor="#f9f7f2" backgroundColor="#ffffff"/>
      <section className="light" id="reviewsId">
        <GoogleMapsReviews/>
      </section>
      <WaveDivider fillColor="#ffffff" backgroundColor="#f9f7f2"/>
      <section className="cream" id="howToFindId">
        <LocationMap isLoaded={isLoaded} />
      </section>
    </div>
  );
};

export default HomePage;
