import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { SentimentComment, Meta } from "../types/sentiment";

type SentimentLabel = "positive" | "neutral" | "negative";

type AllCommentsProps = {
  data: SentimentComment[];
  meta: Meta;
  onPageChange: (page: number) => void;
};

const SentimentBadge = ({ value }: { value: SentimentLabel }) => {
  const baseClass =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize";

  const colorClass =
    value === "positive"
      ? "bg-green-100 text-green-700"
      : value === "negative"
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-700";

  return <span className={`${baseClass} ${colorClass}`}>{value}</span>;
};

const AllComments = ({ data, meta, onPageChange }: AllCommentsProps) => {
  const [sortAsc, setSortAsc] = useState(true);

  // Guard: meta wajib ada untuk server-side pagination
  if (!meta) return null;

  // Sorting hanya berlaku untuk data dalam halaman aktif
  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortAsc ? dateA - dateB : dateB - dateA;
  });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Komentar</h2>
        <p className="mt-1 text-sm text-slate-500">
          Data komentar ditampilkan menggunakan server-side pagination untuk
          menjaga performa dan efisiensi pemuatan data.
        </p>
      </div>

      {/* Sort */}
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortAsc((prev) => !prev)}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Tanggal {sortAsc ? "Asc" : "Desc"}
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Komentar</TableHead>
              <TableHead>Food Quality</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Tanggal</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  Tidak ada komentar pada halaman ini
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {(meta.page - 1) * meta.limit + index + 1}
                  </TableCell>

                  <TableCell className="max-w-[480px]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="truncate cursor-help">
                          {item.comment}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[400px] whitespace-pre-line">
                        {item.comment}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>

                  <TableCell>
                    <SentimentBadge
                      value={item.food_quality as SentimentLabel}
                    />
                  </TableCell>
                  <TableCell>
                    <SentimentBadge
                      value={item.service as SentimentLabel}
                    />
                  </TableCell>
                  <TableCell>
                    <SentimentBadge
                      value={item.price as SentimentLabel}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-muted-foreground">
          Page {meta.page} of {meta.totalPages}
        </span>

        <div className="space-x-2">
          <Button
            size="sm"
            variant="outline"
            disabled={meta.page <= 1}
            onClick={() => onPageChange(meta.page - 1)}
          >
            Prev
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={meta.page >= meta.totalPages}
            onClick={() => onPageChange(meta.page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AllComments;
