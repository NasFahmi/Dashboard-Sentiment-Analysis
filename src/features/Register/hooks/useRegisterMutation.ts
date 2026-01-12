// features/auth/hooks/useLoginMutation.ts
import { useMutation } from "@tanstack/react-query";

import type { AxiosError } from "axios";
import type { RegisterPayload, RegisterResponse } from "../types/register";
import { registerRepository } from "../repository/register.repository";

export const useRegisterMutation = (options?: {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: AxiosError) => void;
}) => {
  const repo = registerRepository();

  return useMutation<RegisterResponse, AxiosError, RegisterPayload>({
    mutationFn: repo.register,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
};
