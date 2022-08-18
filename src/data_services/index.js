import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("token");
    config.headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    return config;
  },
  (error) => {
    console.log(error);
  }
);

export default instance;
