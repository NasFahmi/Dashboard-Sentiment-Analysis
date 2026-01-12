// login.repository.tsx
import { axiosClient } from "@/lib/axios";
import type { LoginResponse, LoginPayload } from "../types/login";

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
});
