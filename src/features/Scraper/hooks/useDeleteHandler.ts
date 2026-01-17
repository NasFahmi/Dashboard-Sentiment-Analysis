// hooks/useDeleteHandler.ts
import { useState } from "react";
import { useDeleteScraperMutation } from "./useDeleteScraperMutation";

export const useDeleteHandler = () => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { mutate: deleteScraper } = useDeleteScraperMutation();

  const handleDelete = (id: string, onSuccess?: () => void) => {
    setDeletingId(id);
    deleteScraper(id, {
      onSuccess: () => {
        onSuccess?.();
        setDeletingId(null);
      },
      onError: () => {
        setDeletingId(null);
      },
      onSettled: () => {
        setDeletingId(null);
      },
    });
  };

  return { deletingId, handleDelete, isDeleting: (id: string) => deletingId === id };
};