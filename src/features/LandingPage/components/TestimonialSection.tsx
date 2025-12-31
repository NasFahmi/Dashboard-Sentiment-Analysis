import { ArrowLeft, ArrowRight } from "lucide-react";
import { Icon } from "@iconify/react";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "Sentinela helps us understand public opinion faster and make better content decisions based on real sentiment data.",
    name: "Shawn Steele",
    role: "Product Manager",
    avatar: "SS",
  },
  {
    quote:
      "The AI-powered insights and sentiment dashboard give us a clear picture of how audiences perceive our brand.",
    name: "Elnora Alvarez",
    role: "Marketing Lead",
    avatar: "EA",
  },
  {
    quote:
      "Sentinela simplifies sentiment analysis and turns complex data into clear insights.",
    name: "Michael Brown",
    role: "Growth Strategist",
    avatar: "MB",
  },
  {
    quote:
      "With Sentinela, we can track sentiment trends and adjust our content strategy quickly.",
    name: "Laura Chen",
    role: "Content Lead",
    avatar: "LC",
  },
];

const brandIcons = [
  { icon: "logos:amazon", label: "Amazon" },
  { icon: "logos:shopify", label: "Shopify" },
  { icon: "logos:airbnb", label: "Airbnb" },
  { icon: "logos:dropbox", label: "Dropbox" },
  { icon: "logos:creative-market", label: "Creative Market" },
];

const TestimonialSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-[250px] px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Testimonials
            </span>
            <h2 className="mt-4 text-4xl font-bold text-slate-900 leading-tight">
              What experts think <br /> about Sentinela
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-500 hover:border-blue-600 hover:text-blue-600 transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-500 hover:border-blue-600 hover:text-blue-600 transition"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={sliderRef}
          className="mt-16 flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4
          [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="min-w-[320px] md:min-w-[420px] snap-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <p className="text-slate-600 leading-relaxed mb-6">
                “{item.quote}”
              </p>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                  {item.avatar}
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Logos */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-12 opacity-70">
          {brandIcons.map((brand) => (
            <Icon
              key={brand.label}
              icon={brand.icon}
              className="h-8 w-auto grayscale hover:grayscale-0 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
