import { QueryClient, } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
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
