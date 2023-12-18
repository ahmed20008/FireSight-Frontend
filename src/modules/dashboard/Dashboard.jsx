import React, {useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import AuthenticatedLayout from "../../layout/AuthenticatedLayout";
import HeadingHeader from "../../modules/shared/components/HeadingHeader";
import styles from "../../assets/css/dashboard.module.css?v1.0";
import "leaflet/dist/leaflet.css";
import {getCurrentUser} from "../../redux/selectors";
import {useSelector} from "react-redux";
import {ADMIN} from "../../utils/rolesConstants";

const Dashboard = () => {
  const currentUser = useSelector((state) => getCurrentUser(state));
  let capitalizedName = currentUser?.name?.charAt(0)?.toUpperCase() + currentUser?.name?.slice(1) ?? "";

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error.message);
        setLoading(false);
      }
    );
  }, []);

  const defaultCenter = [latitude || 0, longitude || 0];

  return (
    <>
      <HeadingHeader text={`Hello, ${capitalizedName}`} />
      <div className={styles.statsContainer}>
        <div className="row">
          <div className="col-md-4 mb-2">
            <div className={`card ${styles.statsCard}`}>
              <h2>8</h2>
              <p># of Cameras</p>
            </div>
          </div>
          {currentUser?.permissions === ADMIN && (
            <div className="col-md-4 mb-2">
              <div className={`card ${styles.statsCard}`}>
                <h2>19</h2>
                <p># of Users</p>
              </div>
            </div>
          )}
          <div className="col-md-4 mb-2">
            <div className={`card ${styles.statsCard}`}>
              <h2>20</h2>
              <p># of Events</p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <MapContainer center={defaultCenter} zoom={13} style={{height: "400px", width: "100%"}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
          {latitude !== null && longitude !== null && (
            <Marker position={[latitude, longitude]}>
              <Popup>Your location</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </>
  );
};

export default AuthenticatedLayout(Dashboard);
