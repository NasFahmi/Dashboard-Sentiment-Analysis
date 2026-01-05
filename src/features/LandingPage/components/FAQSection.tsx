import { motion, type Variants } from "framer-motion";
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
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};


const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-[250px] px-6">
      <div className="mx-auto max-w-7xl">
        {/* FAQ HEADER */}
        <motion.h2
          className="mb-16 text-center text-4xl font-bold text-slate-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={headerVariants}
        >
          FAQs
        </motion.h2>

        {/* FAQ GRID */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="rounded-xl border border-slate-200 bg-white"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-medium text-slate-900">
                    {faq.question}
                  </span>
                  <span className="ml-4 text-slate-500">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                {/* ✅ Jawaban TANPA motion */}
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA CARD */}
        <motion.div
          className="mt-32 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-16 text-white md:px-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={ctaVariants}
        >
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
            <form
              onSubmit={(e : React.FormEvent) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const email = formData.get('email');
                // Proses email di sini, misalnya kirim ke API
                console.log('Email submitted:', email);
              }}
              className="flex w-full max-w-md items-center rounded-full bg-white p-2"
            >
              <input
                name="email"
                type="email"
                placeholder="Your work email"
                className="flex-1 rounded-full px-4 py-3 text-sm text-slate-900 outline-none"
              />
              <button
                type="submit"
                className="ml-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition hidden sm:inline-block"
              >
                Get Started
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;