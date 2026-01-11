import { assets } from "@/assets/assets";
import { motion, type Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const heroImage: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white">
      {/* NAVBAR */}
      <nav className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={assets.Logo} alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-semibold text-slate-900">
            Sentinela
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#home" className="hover:text-blue-600 cursor-pointer">Home</a>
          <a href="#features" className="hover:text-blue-600 cursor-pointer">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600 cursor-pointer">How it works</a>
          <a href="#contact-us" className="hover:text-blue-600 cursor-pointer">Contact Us</a>
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-slate-700 hover:text-blue-600">
            Login
          </Link>
          <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
            Sign in
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* ===== MOBILE OVERLAY ===== */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setOpen(false)}
      />

      {/* ===== MOBILE DRAWER ===== */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Menu */}
        <div className="px-5 flex flex-col items-start gap-5 justify-center py-6 space-y-4 text-sm font-medium text-slate-700">
          <a onClick={() => setOpen(false)} href="#home" className="hover:text-blue-600 cursor-pointer">Home</a>
          <a onClick={() => setOpen(false)} href="#features" className="hover:text-blue-600 cursor-pointer">Features</a>
          <a onClick={() => setOpen(false)} href="#how-it-works" className="hover:text-blue-600 cursor-pointer">How it works</a>
          <a onClick={() => setOpen(false)} href="#contact-us" className="hover:text-blue-600 cursor-pointer">Contact Us</a>

          <div className="pt-6 flex flex-col w-full items-start gap-3">
            <Link to="/login" className="w-full justify-center flex items-center rounded-lg border border-slate-300 py-2">
              Login
            </Link>
            <Link to="/register" className="w-full justify-center flex items-center rounded-lg bg-blue-600 py-2 text-white">
              Sign in
            </Link>
          </div>
        </div>
      </aside>

      {/* HERO */}
      {/* HERO */}
      <motion.section
        className="mx-auto max-w-7xl px-6 pt-16 pb-24 text-center"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        id="home"
      >
        {/* Headline */}
        <motion.h1
          variants={heroItem}
          className="mx-auto max-w-3xl text-5xl font-bold leading-tight flex flex-col items-center justify-center text-slate-900 
      md:text-4xl lg:text-5xl"
        >
          <span className="mb-4 md:whitespace-nowrap">
            Everything You Need for AI-Powered
          </span>
          <span className="text-blue-600 md:whitespace-nowrap">
            Social Media Sentiment Analysis
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={heroItem}
          className="mx-auto mt-6 max-w-xl text-base text-slate-600"
        >
          Analyze conversations, track perception, and understand public opinion in real time.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={heroItem}
          className="mt-10 flex justify-center"
        >
          <Link to="/register" className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-medium text-white hover:bg-blue-700 transition">
            Get Started for free
            <span className="ml-1">→</span>
          </Link>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          variants={heroImage}
          className="relative mt-20"
        >
          <img
            src={assets.DashboardLandingPage}
            alt="Dashboard preview"
            className="mx-auto rounded-2xl shadow-2xl border border-slate-200"
          />
        </motion.div>
      </motion.section>

    </header>
  );
};

export default Header;
