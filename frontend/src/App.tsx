import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import FormPage from './pages/FormPage';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const apiKey = process.env.REACT_APP_API_KEY!;
const libraries: Array<'places' | 'marker'> = ['places', 'marker'];

function App (): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries
  });

  return (
    <Router basename="/">
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
