// login.repository.tsx
import { axiosClient } from "@/lib/axios";
import type { LoginResponse, LoginPayload } from "../types/login";
import type { LogoutResponse } from "@/type/logout";

export const loginRepository = () => ({
  login: async (
    payload: LoginPayload
  ): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>(
      "/auth/login",
      payload
    );
    return response.data;
  },

  logout: async (): Promise<LogoutResponse> => {
    try {
      // Make logout request with flag to prevent retry logic
      const response = await axiosClient.post<LogoutResponse>("/auth/logout", {}, {
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Logout API error:", error);
      // Re-throw the error so it can be handled by the mutation
      throw error;
    }
  },
});
