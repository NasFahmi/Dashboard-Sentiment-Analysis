import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type SentimentLabel = "positive" | "neutral" | "negative";

type CommentItem = {
  id: string;
  comment: string;
  foodQuality: SentimentLabel;
  service: SentimentLabel;
  price: SentimentLabel;
  date: string;
};

const PAGE_SIZE = 10;

// dummy data contoh
const dummyComments: CommentItem[] = Array.from({ length: 100 }).map(
  (_, i) => ({
    id: `${i + 1}`,
    comment: `Komentar  mengenai pelayanan dan kualitas makanan. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate delectus asperiores voluptatibus et suscipit fugiat perferendis optio, maxime similique soluta, dolor vero. ke-${i + 1}`,
    foodQuality: i % 3 === 0 ? "positive" : i % 3 === 1 ? "neutral" : "negative",
    service: i % 2 === 0 ? "positive" : "neutral",
    price: i % 4 === 0 ? "negative" : "neutral",
    date: new Date(2026, 0, i + 1).toISOString(),
  })
);

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


const AllComments = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);

  const filteredData = useMemo(() => {
    const filtered = dummyComments.filter((item) =>
      item.comment.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) =>
      sortAsc
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return filtered;
  }, [search, sortAsc]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Komentar
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Menampilkan kumpulan komentar dari media sosial yang telah dianalisis
          dan diklasifikasikan berdasarkan aspek kualitas makanan, pelayanan,
          dan harga untuk membantu memahami opini pengguna secara lebih rinci.
        </p>
      </div>
      <div className="space-y-4">
        {/* Search & Sort */}
        <div className="flex items-center justify-between gap-4">
          <Input
            placeholder="Cari komentar..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="max-w-sm"
          />

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
        {/* ================= TABLE ================= */}
        {/* Table */}
        <div className="w-[calc(100vw-60px)] md:w-full rounded-md border">
          <Table className="overflow-x-auto min-w-full md:min-w-[900px]">
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
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-sm text-muted-foreground"
                  >
                    Tidak ada komentar yang sesuai dengan pencarian
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {(page - 1) * PAGE_SIZE + index + 1}
                    </TableCell>

                    {/* Komentar */}
                    <TableCell className="max-w-[200px] sm:max-w-[240px] md:max-w-[360px] lg:max-w-[480px]">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                            {item.comment}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-[400px] whitespace-pre-line">
                            {item.comment}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      <SentimentBadge value={item.foodQuality} />
                    </TableCell>
                    <TableCell>
                      <SentimentBadge value={item.service} />
                    </TableCell>
                    <TableCell>
                      <SentimentBadge value={item.price} />
                    </TableCell>
                    <TableCell>
                      {new Date(item.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <div className="space-x-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllComments;
