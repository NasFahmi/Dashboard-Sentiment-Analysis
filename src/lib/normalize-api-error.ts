import type { AxiosError } from "axios";
import { errorResponseSchema } from "./error.schema";

export interface NormalizedError {
  statusCode: number;
  error: string;
  message: string;
}

export const normalizeApiError = (
  error: AxiosError
): NormalizedError => {
  const fallback: NormalizedError = {
    statusCode: error.response?.status ?? 0,
    error: error.response?.statusText ?? "Unknown Error",
    message: error.message || "Terjadi kesalahan yang tidak diketahui",
  };

  const parsed = errorResponseSchema.safeParse(error.response?.data);

  if (!parsed.success) {
    return fallback;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = parsed.data as any;

  return {
    statusCode:
      "statusCode" in data
        ? data.statusCode
        : "status" in data
          ? data.status
          : fallback.statusCode,

    error:
      "error" in data && data.error
        ? data.error
        : fallback.error,

    message:
      "message" in data && data.message
        ? data.message
        : fallback.message,
  };
};
