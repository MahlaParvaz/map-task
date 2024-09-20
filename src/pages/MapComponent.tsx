import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '../components/Loading';

const LocationSelector = ({
  setLatLng,
}: {
  setLatLng: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      setLatLng(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapComponent = ({
  setLatLng,
}: {
  setLatLng: (lat: number, lng: number) => void;
}) => {
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    35.6892, 51.389,
  ]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state || {};

  const handleClick = (lat: number, lng: number) => {
    setMarkerPosition([lat, lng]);
    setLatLng(lat, lng);
  };

  const handleSaveLocation = async () => {
    if (!userData) {
      toast.error('User data is missing.');
      return;
    }

    const [lat, lng] = markerPosition;

    const finalData = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      coordinate_mobile: userData.coordinate_mobile,
      coordinate_phone_number: userData.coordinate_phone_number || '',
      address: userData.address,
      region: 1,
      lat: lat,
      lng: lng,
      gender: userData.gender,
    };

    setLoading(true);

    try {
      const response = await axios.post(
        'https://stage.achareh.ir/api/karfarmas/address',
        finalData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4', // Ensure this token is valid
          },
        }
      );
      console.log('Address saved:', response.data);
      navigate('/confirmation');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response?.data);
        console.error('Axios error status:', error.response?.status);
        toast.error(
          error.response?.data?.message ||
            'خطایی در ثبت آدرس رخ داد. لطفا دوباره تلاش کنید.'
        );
      } else {
        console.error('Unexpected error:', error);
        toast.error('خطایی در ثبت آدرس رخ داد. لطفا دوباره تلاش کنید.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="map-container">
        <div className="map-back-button" onClick={() => navigate(-1)}>
          <img src="/public/backbtn.svg" alt="Back" />
          <span>انتخاب آدرس</span>
        </div>
        <div className="map">
          <div className="map-title">
            <img src="/public/backbtn.svg" alt="Back Icon" />
            <span>موقعیت مورد نظر خود را روی نقشه مشخص کنید</span>
          </div>

          <MapContainer
            center={markerPosition}
            zoom={13}
            style={{ height: '400px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            <Marker
              position={markerPosition}
              eventHandlers={{
                click: () => handleClick(markerPosition[0], markerPosition[1]),
              }}
            />
            <LocationSelector setLatLng={handleClick} />
          </MapContainer>
        </div>
      </div>

      <footer className="footer-button">
        <button type="submit" form="addressForm" onClick={handleSaveLocation}>
          {loading ? <Loading /> : ' ثبت و ادامه'}
        </button>
      </footer>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </>
  );
};

export default MapComponent;
