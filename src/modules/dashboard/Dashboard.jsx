import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AuthenticatedLayout from "../../layout/AuthenticatedLayout";
import HeadingHeader from "../../modules/shared/components/HeadingHeader";
import styles from "../../assets/css/dashboard.module.css?v1.0";
import "leaflet/dist/leaflet.css";

const Dashboard = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  }, []);

  const defaultCenter = [latitude || 0, longitude || 0];

  return (
    <>
      <HeadingHeader text={"Dashboard"} />
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {latitude && longitude && (
          <Marker position={[latitude, longitude]}>
            <Popup>Your location</Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};

export default AuthenticatedLayout(Dashboard);