import axios from "axios";

const ADD_CAMERA_PAYLOAD = {
  name: null,
  location: null,
  rtsp: null,
  view: null,
  description: null,
};

export async function allCameras() {
  return await axios.get('/all-camera')
    .then(response => {
      return response.data

    }).catch(error => {
      throw error.response.data
    })
};

export async function myCameras(id) {
  return await axios.get(`/all-camera/${id}`)
    .then(response => {
      return response.data

    }).catch(error => {
      throw error.response.data
    })
};

export async function addCamera(payload = ADD_CAMERA_PAYLOAD) {
  return await axios.post('/add-camera', payload)
    .then(response => {
      return response.data

    }).catch(error => {
      throw error.response.data
    })
};

export async function deleteCamera(cameraId) {
  return await axios.delete(`/delete-camera/${cameraId}`)
    .then(response => {
      return response.data

    }).catch(error => {
      throw error.response.data
    })
};