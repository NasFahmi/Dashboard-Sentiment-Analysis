import { motion, type Variants } from "framer-motion";

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
      staggerChildren: 0.18,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};
const steps = [
  {
    step: "1",
    title: "Scrape Social Media Data",
    description:
      "Collect real conversations from social media platforms as the foundation of sentiment analysis.",
  },
  {
    step: "2",
    title: "Analyze with AI Engine",
    description:
      "Process data using AI-powered sentiment analysis, ABSA, and recommendation models.",
  },
  {
    step: "3",
    title: "Get Insights & Recommendations",
    description:
      "Visualize sentiment insights and receive actionable content recommendations in one dashboard.",
  },
];

const StepSection = () => {
  return (
    <section id="how-it-works" className="mt-[250px] px-6">
      <div className="mx-auto max-w-7xl text-center">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headerVariants}
        >
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            How It Works
          </span>
          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            A Simple and Better Way to Work
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="relative mt-20 grid grid-cols-1 gap-16 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Connector line (desktop only) */}
          <motion.div
            className="absolute top-6 left-0 right-0 hidden md:block"
            variants={lineVariants}
          >
            <div className="mx-auto h-px w-3/4 border-t border-dashed border-slate-300" />
          </motion.div>

          {steps.map((item) => (
            <motion.div
              key={item.step}
              variants={stepVariants}
              className="relative z-10"
            >
              {/* Step number */}
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-lg font-semibold">
                {item.step}
              </div>

              {/* Content */}
              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mx-auto max-w-xs text-sm text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StepSection;
