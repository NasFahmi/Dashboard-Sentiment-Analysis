import React from "react";
import { assets } from "@/assets/assets";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT — Marketing Visual */}
      <div className="relative hidden lg:flex flex-col justify-center bg-blue-500 overflow-hidden">

        {/* Background gradient overlay */}
        <div className="flex items-center justify-center inset-0 bg-linear-to-br from-blue-600 via-blue-500 to-blue-400" />

        {/* Content */}
        <div className=" flex flex-col items-center justify-center z-10 space-y-10 px-12">

          {/* Copywriting */}
          <div className="max-w-md text-white space-y-4">
            <h1 className="text-2xl font-bold leading-tight">
              Understand Public Sentiment <br />
              at a Glance
            </h1>
            <p className="text-blue-100 text-normal leading-relaxed">
              Analyze thousands of conversations, track brand perception, and
              uncover actionable insights — all in one dashboard.
            </p>
          </div>

          {/* Dashboard Image */}
          <div className="">
            <img
              src={assets.DashboardImage}
              alt="Dashboard preview"
              className="w-156.25 "
            />

            {/* Soft glass overlay */}

          </div>
        </div>
      </div>

      {/* RIGHT — Login */}
      <div className="flex items-center justify-center px-6 sm:px-10">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center items-center gap-2 mb-8">
            <img src={assets.Logo} className="w-10 h-10" alt="Logo" />
            <span className="text-2xl font-semibold text-slate-900">
              Sentinela
            </span>
          </div>

          <h2 className="text-2xl font-semibold text-slate-900">
            Sign in
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Use your account credentials
          </p>

          <form className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="mt-1 w-full border-b border-slate-300 bg-transparent px-1 py-2 text-sm text-slate-900 placeholder:text-slate-400
                focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="mt-1 w-full border-b border-slate-300 bg-transparent px-1 py-2 text-sm text-slate-900 placeholder:text-slate-400
                focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white rounded-xl py-3 text-sm font-medium
              hover:bg-slate-800 active:scale-[0.98] transition"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-700">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
