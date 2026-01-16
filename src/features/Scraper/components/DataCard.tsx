import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Scraper } from "../types/scraper";
import { useScraperMutation } from "../hooks/useScraperMutation";

interface DataComponentsProps {
  data: Scraper[];
}

export const DataComponents = ({ data }: DataComponentsProps) => {
  const [search, setSearch] = useState("");
  const [rangePreset, setRangePreset] = useState("7d");
  const [activeAnalysisId, setActiveAnalysisId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const { mutate: analyze } = useScraperMutation();


  const handleDownload = (format: "csv" | "excel" | "json") => {
    console.log(`Download data dalam format: ${format}`);
  };


  const handleMulaiAnalisis = (id: string) => {
    analyze(id);
  };

  const handleLihatAnalisis = (id: string) => {
    analyze(id); // behaviour sama sesuai requirement Anda
  };

  return (
    <div className="space-y-6">
      {/* Search + Date Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari akun Instagram atau tanggal scraping…"
          className="w-full sm:max-w-md rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2 flex-col sm:flex-row">
          <Select value={rangePreset} onValueChange={setRangePreset}>
            <SelectTrigger className="w-full sm:w-fit">
              <SelectValue placeholder="Rentang waktu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hari ini</SelectItem>
              <SelectItem value="7d">7 hari terakhir</SelectItem>
              <SelectItem value="30d">30 hari terakhir</SelectItem>
              <SelectItem value="custom">Rentang khusus</SelectItem>
            </SelectContent>
          </Select>

          {rangePreset === "custom" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start w-full sm:w-fit text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from && dateRange?.to ? (
                    <>
                      {dateRange.from.toLocaleDateString()} -{" "}
                      {dateRange.to.toLocaleDateString()}
                    </>
                  ) : (
                    <span>Pilih tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-600">
        {data.length} data hasil scraping tersedia
      </p>

      {/* List */}
      <div className="space-y-4">
        {data.map((session) => (
          <div
            key={session.id}
            className={cn(
              "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border p-4 shadow-sm",
              activeAnalysisId === session.id
                ? "border-blue-400 bg-blue-50/40"
                : "border-slate-200 bg-white"
            )}
          >
            <div className="space-y-1">
              <p className="font-medium text-slate-900 flex items-center flex-wrap">
                @{session.username}
                {activeAnalysisId === session.id &&
                  !session.is_analyzed && <ActiveBadge />}
              </p>

              <p className="text-sm text-slate-500">
                {new Date(session.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <p className="text-sm text-slate-600">
                {session.postCount} post
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              {/* CTA UTAMA */}
              <Button
                variant={session.is_analyzed ? "outline" : "default"}
                className={
                  session.is_analyzed
                    ? "rounded-lg px-4 py-2 text-sm bg-green-600 text-white font-medium hover:bg-green-700 hover:text-white"
                    : "rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                }
                disabled={activeAnalysisId === session.id}
                onClick={() => {
                  setActiveAnalysisId(session.id);

                  if (!session.is_analyzed) {
                    handleMulaiAnalisis(session.id);
                  } else {
                    handleLihatAnalisis(session.id);
                  }
                }}
              >
                {activeAnalysisId === session.id
                  ? "Menganalisis..."
                  : session.is_analyzed
                    ? "Lihat Analisis"
                    : "Mulai Analisis"}
              </Button>


              {/* DOWNLOAD */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-lg px-4 py-2 text-sm">
                    Download
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={() => handleDownload("csv")}>CSV</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload("excel")}>Excel</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload("json")}>JSON</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
          Muat lebih banyak
        </button>
      </div>
    </div>
  );
};

const ActiveBadge = () => (
  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
    <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
    Aktif
  </span>
);
