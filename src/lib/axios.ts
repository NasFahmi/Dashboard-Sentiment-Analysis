import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://dashboard.nasrulfahmi.my.id",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Global cache disable headers
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});