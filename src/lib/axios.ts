import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { env } from "./env";
import { normalizeApiError } from "./normalize-api-error";
import { isTokenExpired } from "./jwt";
import { refreshAccessToken } from "./refresh";

/**
 * =====================================================
 * Extend Axios request config with _retry flag
 * =====================================================
 */
interface AxiosRequestConfigWithRetry
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * =====================================================
 * Axios Instance
 * =====================================================
 */
export const axiosClient = axios.create({
  baseURL: `${env.apiBaseUrl}/api`,
  timeout: undefined,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});

/**
 * =====================================================
 * Helper: Logout (centralized)
 * =====================================================
 */
const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.dispatchEvent(new Event("auth:logout"));
};

/**
 * =====================================================
 * REQUEST INTERCEPTOR
 * =====================================================
 */
axiosClient.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem("access_token");

    // ===============================
    // AUTO REFRESH BEFORE REQUEST
    // ===============================
    if (accessToken && isTokenExpired(accessToken)) {
      const newToken = await refreshAccessToken();

      if (!newToken) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.dispatchEvent(new Event("auth:logout"));
        return Promise.reject(
          new Error("Session expired, please login again")
        );
      }

      accessToken = newToken;
    }

    if (accessToken) {
      if (!(config.headers instanceof AxiosHeaders)) {
        config.headers = new AxiosHeaders(config.headers);
      }
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);


/**
 * =====================================================
 * RESPONSE INTERCEPTOR (REFRESH TOKEN HANDLING)
 * =====================================================
 */
axiosClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const normalizedError = normalizeApiError(error);

    const errorDetails =
      normalizedError ?? {
        statusCode: error.response?.status,
        error: error.response?.statusText || "Unknown Error",
        message:
          error.message || "Terjadi kesalahan yang tidak diketahui",
      };

    console.group("❌ API Error");
    console.log("Status:", errorDetails.statusCode);
    console.log("Error:", errorDetails.error);
    console.log("Message:", errorDetails.message);
    console.log("Full error object:", error);
    console.groupEnd();

    /**
     * Guard: error.config can be undefined
     */
    const originalRequest =
      error.config as AxiosRequestConfigWithRetry | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    /**
     * Handle 401 Unauthorized with refresh token
     */
    if (
      errorDetails.statusCode === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken =
        localStorage.getItem("refresh_token");

      if (!refreshToken) {
        logout();
        return Promise.reject(error);
      }

      try {
        const refreshAxios = axios.create({
          baseURL: `${env.apiBaseUrl}/api`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const refreshResponse = await refreshAxios.post(
          "/auth/refresh",
          { refresh_token: refreshToken },
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const accessToken =
          refreshResponse.data?.data?.access_token;

        if (!accessToken) {
          logout();
          return Promise.reject(error);
        }

        // Save new access token
        localStorage.setItem("access_token", accessToken);

        // ===============================
        // FIX AXIOS v1 HEADERS HANDLING
        // ===============================
        if (!(originalRequest.headers instanceof AxiosHeaders)) {
          originalRequest.headers = new AxiosHeaders(originalRequest.headers);
        }
        originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);

        // Retry original request
        return axiosClient(originalRequest);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * =====================================================
 * Utility Functions
 * =====================================================
 */

// Set token manually
export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosClient.defaults.headers.common.Authorization =
      `Bearer ${token}`;
    localStorage.setItem("access_token", token);
  } else {
    delete axiosClient.defaults.headers.common.Authorization;
    localStorage.removeItem("access_token");
  }
};

// Get current token
export const getAuthToken = (): string | null => {
  return localStorage.getItem("access_token");
};

// Check authentication state
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// Manual authenticated request
export const authenticatedRequest = async (
  config: AxiosRequestConfig
) => {
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

// Manual refresh access token (optional usage

/**
 * =====================================================
 * EXPORT DEFAULT
 * =====================================================
 */
export default axiosClient;
