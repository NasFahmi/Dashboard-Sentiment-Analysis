import React from "react";
import { assets } from "@/assets/assets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/features/Login/schemas/login.schema";
const LoginPage: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    console.log("LOGIN DATA:", data);

    // TODO: call auth repository
  };
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT — Marketing Visual */}
      <div className="relative hidden lg:flex flex-col justify-center bg-(--color-logo-1) overflow-hidden">

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

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className={`mt-1 w-full border-b bg-transparent px-1 py-2 text-sm outline-none transition
                  ${errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-slate-300 focus:border-blue-600"
                  }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>


            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className={`mt-1 w-full border-b bg-transparent px-1 py-2 text-sm outline-none transition
                  ${errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-slate-300 focus:border-blue-600"
                  }`}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center text-sm">
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-(--color-logo-1) text-white rounded-xl py-3 text-sm font-medium
              hover:brightness-90 disabled:opacity-60 disabled:cursor-not-allowed
              active:scale-[0.98] transition-all"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
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
