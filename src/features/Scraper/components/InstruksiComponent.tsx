import {
  Download,
  Chrome,
  Instagram,
  Search,
  Play,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    title: "Download Extension Zrap",
    description:
      "Unduh ekstensi browser Zrap melalui halaman resmi Sentinela.",
    icon: Download,
  },
  {
    title: "Install Extension",
    description:
      "Pasang ekstensi Zrap pada browser Google Chrome Anda.",
    icon: Chrome,
  },
  {
    title: "Open Instagram",
    description:
      "Buka Instagram di tab Chrome yang sama.",
    icon: Instagram,
  },
  {
    title: "Open Zrap Extension",
    description:
      "Klik ikon ekstensi Zrap yang telah terpasang di browser.",
    icon: Search,
  },
  {
    title: "Start Scraping",
    description:
      "Masukkan username Instagram lalu aktifkan ekstensi untuk memulai proses scraping.",
    icon: Play,
  },
  {
    title: "View Scraping Result",
    description:
      "Setelah proses selesai, data hasil scraping akan otomatis tampil di Dashboard Data Scraper.",
    icon: CheckCircle,
  },
];

const InstruksiComponent = () => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6 ">
      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <h2 className="text-normal sm:text-2xl font-semibold text-slate-900">
          Cara Menggunakan Data Scraper
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600">
          Ikuti langkah-langkah berikut secara berurutan untuk menjalankan proses scraping data Instagram.
        </p>
      </div>

      {/* Step Flow */}
      <div className="relative space-y-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex gap-5">
              {/* Step Indicator */}
              <div className="flex flex-col justify-between items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-logo-1) text-sm font-semibold text-white">
                  {index+1}
                </div>

                {/* Vertical Line */}
                {index !== steps.length - 1 && (
                  <div className="mt-2 h-[calc(100%-48px)] w-px bg-slate-200" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 gap-4 rounded-xl border border-slate-200 p-5">
                <div className="flex h-6 w-6 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-blue-50 text-(--color-logo-1)">
                  <Icon className="w-3 h-3 sm:h-5 sm:w-5" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Note */}
      <div className="mt-10 rounded-xl bg-blue-50 px-6 py-4 text-sm text-blue-700">
        Pastikan ekstensi Zrap telah aktif sebelum memulai proses scraping agar data dapat ditampilkan dengan benar di dashboard.
      </div>
    </section>
  );
};

export default InstruksiComponent;
