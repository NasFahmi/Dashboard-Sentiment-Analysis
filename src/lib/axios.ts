import axios, { AxiosError, type AxiosRequestConfig } from "axios";
// import { env } from "./env";
import { normalizeApiError } from "./normalize-api-error";

export const axiosClient = axios.create({
  baseURL: `https://backend.sentinela.my.id/api`,
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



// ===== REQUEST INTERCEPTOR =====
// Automatically add Authorization header to every request
axiosClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Add Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Optional: Log request for debugging (remove in production)

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);

    return Promise.reject(error);
  },
);

// ===== RESPONSE INTERCEPTOR =====
// Handle responses and errors globally
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Parse error response using Zod schema for type safety
    const normalizedError = normalizeApiError(error);

    // Extract error details with fallback values
    const errorDetails = normalizedError
      ? normalizedError
      : {
        statusCode: error.response?.status,
        error: error.response?.statusText || "Unknown Error",
        message: error.message || "Terjadi kesalahan yang tidak diketahui"
      };

    // Log error for debugging purposes
    console.group("❌ API Error");
    console.log("Status:", errorDetails.statusCode);
    console.log("Error:", errorDetails.error);
    console.log("Message:", errorDetails.message);
    console.log("Full error object:", error);
    console.groupEnd();

    if (normalizedError.statusCode === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.dispatchEvent(new Event("auth:logout"));
    }

    return Promise.reject(error);
  },
);

// ===== UTILITY FUNCTIONS =====

// Function to manually set token (useful for testing or dynamic token updates)
export const setAuthToken = (token: string | null) => {
  if (token) {
    // Set default authorization header for all future requests
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    // Remove authorization header
    delete axiosClient.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

// Function to get current token
export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

// Function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();

  return !!token;
};

// Function to make authenticated request manually (if needed)
export const authenticatedRequest = async (config: AxiosRequestConfig<never>) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token available");
  }

  return axiosClient({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

// ===== EXPORT DEFAULT =====
export default axiosClient;
