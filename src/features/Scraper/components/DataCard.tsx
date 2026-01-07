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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const mockScrapeSessions = [
  {
    id: "1",
    targetAccount: "poliwangi_jinggo",
    scrapedAt: "2026-01-02T22:59:00",
    totalPosts: 10,
    totalComments: 1234,
  },
  {
    id: "2",
    targetAccount: "bem_poliwangi",
    scrapedAt: "2026-01-01T20:15:00",
    totalPosts: 5,
    totalComments: 342,
  },
];

export const DataComponents = () => {
  const [search, setSearch] = useState("");
  const [rangePreset, setRangePreset] = useState("7d");

  const [activeAnalysisId, setActiveAnalysisId] = useState<string | null>(null);


  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleDownload = (format: "csv" | "excel" | "json") => {
    console.log(`Download data dalam format: ${format}`);
    // nanti:
    // - panggil API
    // - atau generate file client-side
  };


  return (
    <div className="space-y-6">
      {/* Search + Date Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari akun Instagram atau tanggal scraping…"
          className="w-full sm:max-w-md rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Date Range Preset */}
        <div className="flex gap-2 flex-col sm:flex-row ">
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

          {/* Custom Range Picker */}
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
                  autoFocus={true}
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <p className="text-xs text-slate-600">
        {mockScrapeSessions.length} data hasil scraping tersedia
      </p>

      {/* List */}
      <div className="space-y-4">
        {mockScrapeSessions.map((session) => (
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
                @{session.targetAccount}
                {activeAnalysisId === session.id && <ActiveBadge />}
              </p>
              <p className="text-sm text-slate-500">
                {new Date(session.scrapedAt).toLocaleString()}
              </p>
              <p className="text-sm text-slate-600">
                {session.totalPosts} post · {session.totalComments} komentar
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              {/* LEFT SIDE: CTA / STATUS */}
              {activeAnalysisId === session.id ? (
                <></>
              ) : (
                <Button
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  onClick={() => setActiveAnalysisId(session.id)}
                >
                  Mulai Analisis
                </Button>
              )}

              {/* RIGHT SIDE: DOWNLOAD (SELALU ADA) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-lg px-4 py-2 text-sm"
                  >
                    Download
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={() => handleDownload("csv")}>
                    CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload("excel")}>
                    Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload("json")}>
                    JSON
                  </DropdownMenuItem>
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
