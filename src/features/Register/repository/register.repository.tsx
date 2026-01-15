// Register.repository.tsx

import axiosClient from "@/lib/axios";
import type { RegisterPayload, RegisterResponse } from "../types/register";

export const registerRepository = () => ({
  register: async (
    payload: RegisterPayload
  ): Promise<RegisterResponse> => {
    const response = await axiosClient.post<RegisterResponse>(
      "/users/register",
      payload
    );
    return response.data;
  },
});
