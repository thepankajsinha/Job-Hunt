import axios from "axios";

const api = axios.create({
  baseURL: "https://job-hunt-backend-pa9o.onrender.com",
  withCredentials: true, // Set to true if using cookies
});

export default api;
