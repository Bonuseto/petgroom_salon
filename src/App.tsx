import React from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import LocationMap from './components/LocationMap/LocationMap';
import GoogleMapsReviews from './components/Reviews/GoogleMapsReviews';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';

function App (): JSX.Element {
  return (
    <div className="App">
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
}

export default App;
