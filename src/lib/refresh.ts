import axios from "axios";
import { env } from "./env";

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;

  try {
    // Anda menggunakan axios global dan menambah header Authorization
    const res = await axios.post(
      `${env.apiBaseUrl}/api/auth/refresh`,
      { refresh_token: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const accessToken = res.data?.data?.access_token;
    if (!accessToken) return null;

    localStorage.setItem("access_token", accessToken);
    return accessToken;
  } catch {
    return null;
  }
};
