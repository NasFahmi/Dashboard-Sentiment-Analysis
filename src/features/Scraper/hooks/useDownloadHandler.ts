// src/hooks/useDownloadHandler.ts
import { useState } from "react";
import { useDownloadMutation } from "./useDownlaodMutation"; // pastikan path benar

export const useDownloadHandler = () => {
  const { downloadCSV, downloadExcel } = useDownloadMutation();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadingFormat, setDownloadingFormat] = useState<"csv" | "excel" | null>(null);

  const triggerDownload = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const startDownload = (format: "csv" | "excel", id: string, username: string) => {
    setDownloadingId(id);
    setDownloadingFormat(format);

    const mutation = format === "csv" ? downloadCSV : downloadExcel;
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const filename = `data_${username}_${day}_${month}_${year}.${format === "csv" ? "csv" : "xlsx"}`;

    mutation.mutate(id, {
      onSuccess: (blob) => {
        triggerDownload(blob, filename);
        setDownloadingId(null);
        setDownloadingFormat(null);
      },
      onError: (error) => {
        console.error(`Gagal download ${format}:`, error);
        setDownloadingId(null);
        setDownloadingFormat(null);
      },
    });
  };

  return {
    downloadingId,
    downloadingFormat,
    startDownload,
    isDownloading: (id: string, format?: "csv" | "excel") => {
      if (format) {
        return downloadingId === id && downloadingFormat === format;
      }
      return downloadingId === id;
    },
  };
};