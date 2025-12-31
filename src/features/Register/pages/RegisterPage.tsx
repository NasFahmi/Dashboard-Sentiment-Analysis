import React from "react";
import { assets } from "@/assets/assets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "@/features/Register/schemas/register.schema";

const RegisterPage: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    console.log("LOGIN DATA:", data);
  }
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT — Marketing Visual */}
      <div className="relative hidden lg:flex flex-col justify-center bg-(--color-logo-1) overflow-hidden">

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-500 to-blue-400" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-10 px-12">

          {/* Copywriting */}
          <div className="max-w-md text-white space-y-4">
            <h1 className="text-2xl font-bold leading-tight">
              Start Understanding <br />
              Your Audience Today
            </h1>
            <p className="text-blue-100 text-base leading-relaxed">
              Create an account to access sentiment insights, brand performance,
              and actionable analytics in one dashboard.
            </p>
          </div>

          {/* Dashboard Image */}
          <img
            src={assets.DashboardImage}
            alt="Dashboard preview"
            className="w-156.25"
          />
        </div>
      </div>

      {/* RIGHT — Register */}
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
            Create account
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sign up to get started with Sentinela
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                type="text"
                {...register("username")}
                required
                placeholder="yourusername"
                className={`mt-1 w-full border-b border-slate-300 bg-transparent px-1 py-2 text-sm text-slate-900 placeholder:text-slate-400
                focus:border-blue-600 focus:outline-none transition ${errors.username
                    ? "border-red-500 focus:border-red-500"
                    : "border-slate-300 focus:border-blue-600"
                  }`}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                type="email"
                {...register("email")}
                required
                placeholder="you@example.com"
                className={`mt-1 w-full border-b border-slate-300 bg-transparent px-1 py-2 text-sm text-slate-900 placeholder:text-slate-400
                focus:border-blue-600 focus:outline-none transition ${errors.email
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
                required
                placeholder="••••••••"
                className={`mt-1 w-full border-b border-slate-300 bg-transparent px-1 py-2 text-sm text-slate-900 placeholder:text-slate-400
                focus:border-blue-600 focus:outline-none transition ${errors.password
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Confirm password
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                required
                placeholder="••••••••"
                className={`mt-1 w-full border-b border-slate-300 bg-transparent px-1 py-2 text-sm text-slate-900 placeholder:text-slate-400
                focus:border-blue-600 focus:outline-none transition ${errors.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-slate-300 focus:border-blue-600"
                  }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-[color:var(--color-logo-1)] text-white rounded-xl py-3 text-sm font-medium
              hover:brightness-90 active:scale-[0.98] transition-all"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-700">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
