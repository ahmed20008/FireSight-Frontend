import React, { useState, useEffect } from 'react';
import authenticatedLayout from '../../layout/AuthenticatedLayout';
import HeadingHeader from '../shared/components/HeadingHeader';
import { cameraImg } from '../../utils/staticImages';
import styles from "../../assets/css/camera-page.module.css";
import { allCameras } from '../../api/CameraApi';
import { toastrOnTopCenter } from '../../utils/toastr';

const Cameras = () => {
  const [cameraInfo, setCameraInfo] = useState([]);

  useEffect(() => {
    fetchAllCameras();
  }, []);

  const fetchAllCameras = () => {
    allCameras()
      .then((response) => {
        setCameraInfo(response.cameras);
      })
      .catch((errors) => {
        toastrOnTopCenter("Error Fetching Cameras. Retry again later!", "error");
      })
  };

  return (
    <>
      <HeadingHeader text={"Cameras"} />
      <div className="d-flex flex-row align-items-center flex-wrap gap-3">
        {cameraInfo.map((camera, index) => (
          <div key={index}>
            <div className={`card ${styles.camerasCard}`}>
              <div className="text-center">
                <img className="img-fluid" width={80} height={80} src={cameraImg.camera} alt="camera-img" />
              </div>
              <h2>{camera.name}</h2>
              <p><b>Location:</b> {camera.location}</p>
              <p><b>Camera RTSP:</b> {camera.link}</p>
              <p><b>Field of View:</b> {camera.view}</p>
              <p><b>Description:</b> {camera.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default authenticatedLayout(Cameras);