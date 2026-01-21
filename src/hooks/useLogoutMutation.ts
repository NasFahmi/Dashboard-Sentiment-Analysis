import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { LogoutResponse } from "../type/logout";
import { loginRepository } from "@/features/Login/repository/login.repository";
import { toast } from "sonner";

export const useLogoutMutation = () => {
  const repo = loginRepository();

  return useMutation<LogoutResponse, AxiosError>({
    mutationFn: repo.logout,
    onSuccess: () => {
      toast.success("Logout berhasil");
    },
    onError: () => {
      toast.error("Logout gagal");
    },
  });
};
