import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://chatbotumkm-backend-ocrh5p-46791d-84-247-151-112.traefik.me",
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