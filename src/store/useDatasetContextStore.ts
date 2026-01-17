// store/useDatasetContextStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type DatasetContextState = {
  activeDatasetId: string | null;
  setActiveDatasetId: (id: string) => void;
  clearActiveDatasetId: () => void;
  reset: () => void;
};

export const useDatasetContextStore = create<DatasetContextState>()(
  persist(
    (set) => ({
      activeDatasetId: null,
      setActiveDatasetId: (id) => set({ activeDatasetId: id }),
      clearActiveDatasetId: () => set({ activeDatasetId: null }),
      reset: () => set({ activeDatasetId: null }),
    }),
    {
      name: "active-dataset-id",
      partialize: (state) => ({
        activeDatasetId: state.activeDatasetId,
      }),
    }
  )
);
