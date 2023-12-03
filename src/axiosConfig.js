import axios from "axios";
import Cookies from 'js-cookie';

const axiosConfiguration = () => {
  axios.interceptors.request.use(async (config) => {
    config.baseURL = process.env.REACT_APP_BACKEND_URL;
    config.headers["accept"] = "application/json";

    let token = Cookies.get(`${process.env.REACT_APP_NAME}_token`)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    response => response,
    (error) => {
      if (error.response.status === 401) {
        Cookies.remove(`${process.env.REACT_APP_NAME}_token`);
        window.location = '/'
      }

      return Promise.reject(error);
    });
}

export default axiosConfiguration;