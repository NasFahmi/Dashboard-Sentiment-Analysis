import {
  Brain,
  Sparkles,
  MessageCircle,
  Layers,
  Lightbulb,
  Database,
} from "lucide-react";
import { motion, type Variants,easeOut  } from "framer-motion";

const features = [
  {
    title: "Sentiment Analysis",
    description:
      "Analyze public sentiment from social media conversations to understand audience perception.",
    icon: Brain,
  },
  {
    title: "Insight by AI",
    description:
      "Generate actionable insights automatically using AI-powered sentiment processing.",
    icon: Sparkles,
  },
  {
    title: "Chatbot",
    description:
      "Interact with sentiment data through an intelligent chatbot interface.",
    icon: MessageCircle,
  },
  {
    title: "ABSA",
    description:
      "Aspect-Based Sentiment Analysis to identify key aspects influencing sentiment.",
    icon: Layers,
  },
  {
    title: "Content Recommendation",
    description:
      "Get AI-driven content recommendations based on sentiment trends.",
    icon: Lightbulb,
  },
  {
    title: "Data Scraper",
    description:
      "Collect social media data automatically from multiple platforms.",
    icon: Database,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut, // ✅ FIX
    },
  },
};


const FeatureSection = () => {
  return (
    <section className="mt-[250px] px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={itemVariants}
          className="max-w-2xl mb-16"
        >
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Our Features
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 leading-tight">
            The tools you need to win and understand your audience
          </h2>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300
                hover:border-blue-500 hover:shadow-md"
              >
                {/* Icon */}
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl
                  bg-slate-100 text-slate-500 transition-all duration-300
                  group-hover:bg-blue-100 group-hover:text-blue-600"
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3
                  className="mb-2 text-lg font-semibold text-slate-900 transition-colors duration-300
                  group-hover:text-blue-600"
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
