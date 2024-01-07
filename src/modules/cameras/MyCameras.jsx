import React, { useState, useEffect } from "react";
import authenticatedLayout from "../../layout/AuthenticatedLayout";
import HeadingHeader from "../shared/components/HeadingHeader";
import { cameraImg } from "../../utils/staticImages";
import styles from "../../assets/css/camera-page.module.css";
import { myCameras, deleteCamera } from "../../api/CameraApi";
import { toastrOnTopCenter } from "../../utils/toastr";
import buttonStyles from "../../assets/css/buttons.module.css";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/selectors";
import Loader from "../../layout/partials/Loader";
import Swal from 'sweetalert2';

const MyCameras = () => {
  const currentUser = useSelector((state) => getCurrentUser(state));

  const [cameraInfo, setCameraInfo] = useState([]);
  const [cameraToDelete, setCameraToDelete] = useState(null);
  const [myId, setMyId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?._id) {
      setMyId(currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (myId) {
      fetchMyCameras(myId);
    }
  }, [myId]);

  const fetchMyCameras = (userId) => {
    myCameras(userId)
      .then((response) => {
        setCameraInfo(response.cameras);
      })
      .catch((errors) => {
        toastrOnTopCenter("Error Fetching Cameras. Retry again later!", "error");
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteClick = (cameraId) => {
    setCameraToDelete(cameraId);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      deleteCamera(cameraToDelete)
        .then((response) => {
          toastrOnTopCenter(response.message, "success");
          fetchMyCameras(myId);
        })
        .catch((errors) => {
          toastrOnTopCenter(errors.message, "error");
        });
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  return (
    <>
      <HeadingHeader text={"My Cameras"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="d-flex flex-row align-items-center flex-wrap gap-3">
          {cameraInfo?.length === 0 ? (
            <div className="alert alert-warning w-100" role="alert">
              No cameras found. You can add cameras using the provided options.
            </div>
          ) : (
            <div className="d-flex flex-row align-items-center flex-wrap gap-3">
              {cameraInfo.map((camera, index) => (
                <div key={index}>
                  <div className={`card ${styles.camerasCard}`}>
                    <div className="text-center">
                      <img className="img-fluid" width={80} height={80} src={cameraImg.camera} alt="camera-img" />
                    </div>
                    <h2>{camera.name}</h2>
                    <p>
                      <b>Location:</b> {camera.location}
                    </p>
                    <p>
                      <b>Camera RTSP:</b> {camera.link}
                    </p>
                    <p>
                      <b>Field of View:</b> {camera.view}
                    </p>
                    <p>
                      <b>Description:</b> {camera.description}
                    </p>
                    <div className="my-3">
                      <button className={buttonStyles.buttonBlackRounded} onClick={() => handleDeleteClick(camera._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default authenticatedLayout(MyCameras);
