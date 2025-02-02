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
      <header className="App-header">
        <img id="aboutUsId" className="n9wygc" alt="About us" src="https://lh3.googleusercontent.com/p/AF1QipNaOBh6YWi2Q4bOV3HF31lkZbuHEhnNBvPUlJYu=w1080-h608-p-no" data-iml="695420.2999999998"></img>
      </header>
      <header className="App-header">
        <img id="servicesId" className="n9wygc" alt="Services" src="https://www.caraphil.org/mainsite/wp-content/uploads/2019/09/BASIC-GROOMING-RATES-300x242.png"></img>
      </header>
      <header className="App-header">
        <img id="pricesId" className="n9wygc" alt="Prices" src="https://edit.org/img/blog/7pr-price-list-templates-edit-editable-personalize-free-easy-fast-print-bandamp-w-black-white-pricing.webp" ></img>
      </header>
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
