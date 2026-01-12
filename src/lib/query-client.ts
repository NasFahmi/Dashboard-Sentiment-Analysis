import { QueryClient, } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data dianggap fresh selama 5 menit
      staleTime: 5 * 60 * 1000,

      // Data tetap disimpan di cache selama 30 menit
      gcTime: 30 * 60 * 1000,

      // Tidak refetch otomatis saat fokus window
      refetchOnWindowFocus: false,

      // Refetch saat koneksi kembali
      refetchOnReconnect: true,

      // Retry hanya untuk error non-client
      retry: (failureCount, error: unknown) => {
        if (error instanceof AxiosError) {
          const axiosError = error as AxiosError;
          const status = axiosError?.response?.status;
          if (status && status >= 400 && status < 500) return false;
        }
        return failureCount < 2;
      },
    },

    mutations: {
      retry: 1,
    },
  },
});
