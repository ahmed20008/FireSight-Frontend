import React, { useState } from 'react';
import authenticatedLayout from '../../layout/AuthenticatedLayout';
import HeadingHeader from "../../modules/shared/components/HeadingHeader";
import styles from "../../assets/css/add-camera.module.css";
import buttonStyles from "../../assets/css/buttons.module.css";
import { addCamera } from '../../api/CameraApi';
import { toastrOnTopCenter } from '../../utils/toastr';

const AddCamera = () => {
  const initialData = {
    name: '',
    location: '',
    link: '',
    view: '',
    description: '',
  }
  const [formData, setFormData] = useState(initialData);
  const [processing, setProcessing] = useState(false);

  const handleCameraInfo = (e) => {
    e.preventDefault();
    setProcessing(true);

    addCamera({ ...formData })
      .then((response) => {
        toastrOnTopCenter(response.message, "success");
        setFormData(initialData);
      })
      .catch((errors) => {
        toastrOnTopCenter(errors.message, "error");
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  return (
    <>
      <HeadingHeader text={"Add Camera"} />
      <div className={styles.addCamera}>
        <p>Please provide the following details for your CCTV camera to display footage on the dashboard. Ensure accuracy in entering information.</p>
        <form onSubmit={handleCameraInfo}>
          <div className="form-group mb-3">
            <label htmlFor="camera-name">Camera Name:</label>
            <input required type="text" className="form-control" id="camera-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter Camera Name" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="camera-location">Camera Location:</label>
            <input required type="text" className="form-control" id="camera-location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Enter Location" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="camera-rtsp">Camera RTSP Link:</label>
            <input required type="text" className="form-control" id="camera-rtsp" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} placeholder="Enter RTSP Link" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="camera-field-of-view">Field of View:</label>
            <input required type="text" className="form-control" id="camera-field-of-view" value={formData.view} onChange={(e) => setFormData({ ...formData, view: e.target.value })} placeholder="Enter Field of View" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="camera-description">Description:</label>
            <textarea required className='form-control' id="camera-description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Enter Description" rows="4"></textarea>
          </div>
          <div className='text-start'>
            <button type="submit" className={`${buttonStyles.buttonBlackRounded} w-25`}>
              {processing && <i className="fa fa-spinner fa-spin"></i>}
              {!processing && "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default authenticatedLayout(AddCamera);