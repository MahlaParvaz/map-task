import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddressForm from './pages/AddressForm';
import MapComponent from './pages/MapComponent';
import ConfirmationPage from './components/ConfirmationPage';
import Navbar from './components/Navbar';
import AddressList from './pages/AddressList';

const App = () => {
  const [latLng, setLatLng] = useState<[number, number] | null>(null);

  const handleSetLatLng = (lat: number, lng: number) => {
    setLatLng([lat, lng]);
  };

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<AddressForm />} />
          <Route path="/addresses" element={<AddressList />} />
          <Route
            path="/map"
            element={<MapComponent setLatLng={handleSetLatLng} />}
          />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
