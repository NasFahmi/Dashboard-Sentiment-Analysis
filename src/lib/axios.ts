import axios from "axios";

export const axiosClient = axios.create({
  // baseURL: "http://localhost:3000",
  // baseURL: "https://dashboard.nasrulfahmi.my.id",
  baseURL: "http://m0gw4wwkoskgokss4gog0o8w.103.109.210.102.sslip.io",
  timeout: undefined,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Global cache disable headers
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});