import { Plus, Minus, Check } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What is Sentinela?",
    answer:
      "Sentinela is an AI-powered social media sentiment analytics platform that helps you understand public opinion, brand perception, and engagement trends.",
  },
  {
    question: "Which social media platforms are supported?",
    answer:
      "Sentinela can collect data from multiple social media platforms using automated data scraping techniques, depending on availability and access.",
  },
  {
    question: "How does AI sentiment analysis work?",
    answer:
      "Sentinela uses machine learning models to classify sentiment and extract insights from social media conversations, including aspect-based sentiment analysis (ABSA).",
  },
  {
    question: "What is ABSA and why is it important?",
    answer:
      "Aspect-Based Sentiment Analysis (ABSA) identifies specific aspects that influence sentiment, allowing deeper analysis beyond positive or negative labels.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Sentinela is designed with data security in mind, ensuring that collected data is stored and processed securely.",
  },
  {
    question: "Can Sentinela provide content recommendations?",
    answer:
      "Yes. Sentinela generates AI-driven content recommendations based on sentiment trends and audience engagement.",
  },
  {
    question: "Do I need technical skills to use Sentinela?",
    answer:
      "No. Sentinela is built with a user-friendly dashboard that allows anyone to analyze sentiment data without technical expertise.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes. You can get started with Sentinela using a free trial without requiring a credit card.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-[250px] px-6">
      <div className="mx-auto max-w-7xl">
        {/* FAQ HEADER */}
        <h2 className="mb-16 text-center text-4xl font-bold text-slate-900">
          FAQs
        </h2>

        {/* FAQ GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white transition"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-medium text-slate-900">
                    {faq.question}
                  </span>
                  <span className="ml-4 text-slate-500">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA CARD */}
        <div className="mt-32 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-16 text-white md:px-16">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            {/* Text */}
            <div className="max-w-xl">
              <h3 className="text-3xl font-bold">
                Ready to make something amazing together?
              </h3>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <Check size={16} /> Free 14-day trial
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} /> No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} /> Cancel at any time
                </span>
              </div>
            </div>

            {/* Input */}
            <div className="flex w-full max-w-md items-center rounded-full bg-white p-2">
              <input
                type="email"
                placeholder="Your work email"
                className="flex-1 rounded-full px-4 py-3 text-sm text-slate-900 outline-none"
              />
              <button className="ml-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
