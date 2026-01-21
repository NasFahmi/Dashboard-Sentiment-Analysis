import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { LogoutResponse } from "../type/logout";
import { loginRepository } from "@/features/Login/repository/login.repository";
import { toast } from "sonner";

export const useLogoutMutation = () => {
  const repo = loginRepository();

  return useMutation<LogoutResponse, AxiosError>({
    mutationFn: repo.logout,
    onSuccess: (data) => {
      toast.success(data.message || "Logout berhasil");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      toast.error("Logout gagal");
    },
  });
};
