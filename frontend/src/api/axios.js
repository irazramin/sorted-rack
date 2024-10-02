import axios from "axios";
import { BASE_URL } from "../Utility/URL";

const axiosSecure = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // 'Authorization': `Bearer ${localStorage.userDetails && JSON.parse(localStorage.userDetails).token}`
  },
});

const axiosOpen = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { axiosSecure, axiosOpen };
