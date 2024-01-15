import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AuthenticatedLayout from "../../layout/AuthenticatedLayout";
import HeadingHeader from "../../modules/shared/components/HeadingHeader";
import styles from "../../assets/css/dashboard.module.css?v1.0";
import "leaflet/dist/leaflet.css";
import { getCurrentUser } from "../../redux/selectors";
import { useSelector } from "react-redux";
import { ADMIN, USER } from "../../utils/rolesConstants";
import { allUsers } from "../../api/AllUsersApi";
import { toastrOnTopCenter } from "../../utils/toastr";
import { allCameras, myCameras } from "../../api/CameraApi";
import { allEvents, getEvent } from "../../api/NotificaionApi";

const Dashboard = () => {
  const currentUser = useSelector((state) => getCurrentUser(state));
  let capitalizedName = currentUser?.name?.charAt(0)?.toUpperCase() + currentUser?.name?.slice(1) ?? "";

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState();
  const [cameraInfo, setCameraInfo] = useState([]);
  const [totalEvents, setTotalEvents] = useState();
  const [myTotalEvents, setMyTotalEvents] = useState();
  const [myId, setMyId] = useState(null);
  const [myCameraInfo, setMyCameraInfo] = useState([]);

  useEffect(() => {
    if (currentUser?._id) {
      setMyId(currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (myId) {
      fetchMyCameras(myId);
      fetchMyEvents(myId)
    }
  }, [myId]);

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
    fetchAllUsers();
    fetchAllCameras();
    fetchAllEvents();
  }, []);

  const defaultCenter = [latitude || 0, longitude || 0];

  const fetchAllUsers = () => {
    allUsers()
      .then((response) => {
        setTotalUsers(response.users.length)
      })
      .catch((errors) => {
        toastrOnTopCenter("Error Fetching Users. Retry again later!", "error");
      })
      .finally(() => setLoading(false));
  };

  const fetchAllCameras = () => {
    allCameras()
      .then((response) => {
        setCameraInfo(response.cameras?.length);
        console.log(cameraInfo)
      })
      .catch((errors) => {
        toastrOnTopCenter("Error Fetching Cameras. Retry again later!", "error");
      })
      .finally(() => setLoading(false));
  };

  const fetchMyCameras = (userId) => {
    myCameras(userId)
      .then((response) => {
        setMyCameraInfo(response.cameras.length);
      })
      .catch((errors) => {
        toastrOnTopCenter("Error Fetching Cameras. Retry again later!", "error");
      })
      .finally(() => setLoading(false));
  };

  const fetchAllEvents = () => {
    allEvents()
      .then((response) => {
        setTotalEvents(response.events.length);
      })
      .catch((errors) => {
        toastrOnTopCenter("Error Fetching Events. Retry again later!", "error");
      })
      .finally(() => setLoading(false));
  };

  const fetchMyEvents = (_id) => {
    getEvent(_id)
      .then((response) => {
        setMyTotalEvents(response.events.length);
      })
      .catch((errors) => {
        toastrOnTopCenter("Error Fetching Events. Retry again later!", "error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <HeadingHeader text={`Hello, ${capitalizedName}`} />
      <div className={styles.statsContainer}>
        <div className="row">
          {currentUser?.permissions === USER && (
            <div className="col-md-4 mb-2">
              <div className={`card ${styles.statsCard}`}>
                <h2>{myCameraInfo}</h2>
                <p>My total Cameras</p>
              </div>
            </div>
          )}
          {currentUser?.permissions === ADMIN && (
            <div className="col-md-4 mb-2">
              <div className={`card ${styles.statsCard}`}>
                <h2>{cameraInfo}</h2>
                <p># of Cameras</p>
              </div>
            </div>
          )}
          {currentUser?.permissions === ADMIN && (
            <div className="col-md-4 mb-2">
              <div className={`card ${styles.statsCard}`}>
                <h2>{totalUsers}</h2>
                <p># of Users</p>
              </div>
            </div>
          )}
          {currentUser?.permissions === ADMIN && (
            <div className="col-md-4 mb-2">
              <div className={`card ${styles.statsCard}`}>
                <h2>{totalEvents}</h2>
                <p># of Events</p>
              </div>
            </div>
          )}
          {currentUser?.permissions === USER && (
            <div className="col-md-4 mb-2">
              <div className={`card ${styles.statsCard}`}>
                <h2>{myTotalEvents}</h2>
                <p># of Events</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <MapContainer center={defaultCenter} zoom={13} style={{ height: "400px", width: "100%" }}>
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
