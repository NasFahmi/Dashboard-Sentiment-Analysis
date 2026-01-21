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
    const response = await axiosClient.post<LogoutResponse>("/auth/logout");
    return response.data;
  },
});
