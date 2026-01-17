// components/DataComponents.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Scraper } from "../types/scraper";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDownloadHandler } from "../hooks/useDownloadHandler";
import { useDeleteHandler } from "../hooks/useDeleteHandler";
import { useHandleAnalysis } from "../hooks/useHandleAnalysis";
import { AlertDialogLoading } from "@/components/AlertDialogLoading";
import { useDatasetContextStore } from "@/store/useDatasetContextStore";

interface DataComponentsProps {
  data: Scraper[];
}

export const DataComponents = ({ data }: DataComponentsProps) => {
  const [search, setSearch] = useState("");

  // =========================
  // GLOBAL DATASET CONTEXT
  // =========================
  const activeDatasetId = useDatasetContextStore(
    (s) => s.activeDatasetId
  );
  const setActiveDatasetId = useDatasetContextStore(
    (s) => s.setActiveDatasetId
  );

  // =========================
  // DERIVED STATE (CLIENT SEARCH)
  // =========================
  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // MUTATIONS & HANDLERS
  // =========================
  const { mutate: analyze, isPending: isAnalyzing } = useHandleAnalysis();

  const {
    downloadingId,
    downloadingFormat,
    startDownload,
    isDownloading,
  } = useDownloadHandler();

  const { deletingId, handleDelete, isDeleting } = useDeleteHandler();

  // =========================
  // ACTION HANDLERS
  // =========================
  const handleMulaiAnalisis = (id: string) => {
    analyze(id);
  };

  const handleLihatAnalisa = (id: string) => {
    setActiveDatasetId(id);
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div className="space-y-6">
      {/* SEARCH */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari akun Instagram"
          className="w-full sm:max-w-md rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <p className="text-xs text-slate-600">
        {filteredData.length} dari {data.length} data hasil scraping
      </p>

      {/* EMPTY STATE */}
      {filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center border rounded-xl border-dashed border-slate-300">
          <p className="text-sm font-medium text-slate-900">
            Data username "{search}" tidak ditemukan
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Silakan coba kata kunci lain atau pastikan ejaan sudah benar.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredData.map((session) => {
            const isActive = activeDatasetId === session.id;

            return (
              <div
                key={session.id}
                className={cn(
                  "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border p-4 shadow-sm",
                  isActive
                    ? "border-blue-400 bg-blue-50/40"
                    : "border-slate-200 bg-white"
                )}
              >
                {/* INFO */}
                <div className="space-y-1">
                  <p className="font-medium text-slate-900 flex items-center">
                    @{session.username}
                    {isActive && <ActiveBadge />}
                  </p>
                  <p className="text-sm text-slate-600">
                    {session.post_count} post
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* CTA */}
                  <Button
                    variant={session.is_analyzed ? "outline" : "default"}
                    className={
                      session.is_analyzed
                        ? "rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:text-white hover:bg-green-700"
                        : "rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:text-white hover:bg-blue-700"
                    }
                    disabled={isAnalyzing}
                    onClick={() => {
                      if (!session.is_analyzed) {
                        handleMulaiAnalisis(session.id);
                      } else {
                        handleLihatAnalisa(session.id);
                      }
                    }}
                  >
                    {session.is_analyzed ? "Lihat Analisa" : "Mulai Analisis"}
                  </Button>

                  {/* DOWNLOAD */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="rounded-lg px-4 py-2 text-sm"
                        disabled={isDownloading(session.id)}
                      >
                        {isDownloading(session.id)
                          ? "Mendownload..."
                          : "Download"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem
                        onClick={() =>
                          startDownload("csv", session.id, session.username)
                        }
                        disabled={
                          downloadingId === session.id &&
                          downloadingFormat === "csv"
                        }
                      >
                        CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          startDownload("excel", session.id, session.username)
                        }
                        disabled={
                          downloadingId === session.id &&
                          downloadingFormat === "excel"
                        }
                      >
                        Excel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* DELETE */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        disabled={
                          isDownloading(session.id) ||
                          deletingId === session.id
                        }
                      >
                        {deletingId === session.id ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Menghapus...
                          </>
                        ) : (
                          <>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </>
                        )}
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Apakah anda yakin ingin menghapus data ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini tidak dapat dibatalkan. Data yang dihapus
                          akan hilang secara permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(session.id)}
                          disabled={isDeleting(session.id)}
                        >
                          {isDeleting(session.id)
                            ? "Menghapus..."
                            : "Ya, Hapus"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* GLOBAL ANALYSIS LOADING */}
      <AlertDialogLoading isOpen={isAnalyzing} />
    </div>
  );
};

const ActiveBadge = () => (
  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
    <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
    Aktif
  </span>
);
