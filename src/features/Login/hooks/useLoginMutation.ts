// features/auth/hooks/useLoginMutation.ts
import { useMutation } from "@tanstack/react-query";
import { loginRepository } from "../repository/login.repository";
import type { LoginResponse } from "../types/login";
import type { LoginPayload } from "../types/login";
import type { AxiosError } from "axios";

export const useLoginMutation = (options?: {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: AxiosError) => void;
}) => {
  const repo = loginRepository();

  return useMutation<LoginResponse, AxiosError, LoginPayload>({
    mutationFn: repo.login,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
};
