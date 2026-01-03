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

 const [dateRange, setDateRange] = useState<DateRange | undefined>();

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
        <div className="flex gap-2">
          <Select value={rangePreset} onValueChange={setRangePreset}>
            <SelectTrigger className="w-[200px]">
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
                  className="justify-start text-left font-normal"
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

      {/* List */}
      <div className="space-y-4">
        {mockScrapeSessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="space-y-1">
              <p className="font-medium text-slate-900">
                @{session.targetAccount}
              </p>
              <p className="text-sm text-slate-500">
                {new Date(session.scrapedAt).toLocaleString()}
              </p>
              <p className="text-sm text-slate-600">
                {session.totalPosts} post · {session.totalComments} komentar
              </p>
            </div>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Lihat Analisis
            </button>
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
