// src/features/Dashboard/pages/DashboardPage.tsx
import React from "react";
import {
  Crown,
  Flame,
  MessageSquare,
  MessageCircle,
  Smile,
  Meh,
  Frown,
} from "lucide-react";
import DashboardInsightSection from "../components/DashboardInsightSection";
import DashboardInsight from "../components/DashboardInsight";


const DashboardPage: React.FC = () => {


  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Sentiment Dashboard
        </h1>
        <p className="mt-2 text-slate-500 text-sm">
          Overview of social media sentiment analytics.
        </p>
      </div>




      {/* Insight Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 — Brand Terbaik */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Best Brands
                </p>
                <p className="text-xs text-slate-500">
                  Positive sentiment highest
                </p>
              </div>
            </div>

            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
              #1
            </span>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900">
              Gacoan
            </h3>

          </div>

          <div className="mt-4">
            <div className="h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 w-[15.6%] rounded-full bg-blue-600" />
            </div>
            <p className="mt-2 text-sm font-medium text-slate-700">
              15.6%
            </p>
          </div>
        </div>

        {/* Card 2 — Kategori Terpopuler */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Popular Categories
                </p>
                <p className="text-xs text-slate-500">
                  Best sentiment ratio
                </p>
              </div>
            </div>

            <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
              TOP
            </span>
          </div>

          <h3 className="text-xl font-semibold text-slate-900">
            Makanan Tradisional
          </h3>

          <div className="mt-4">
            <div className="h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 w-[15.6%] rounded-full bg-green-600" />
            </div>
            <p className="mt-2 text-sm font-medium text-slate-700">
              15.6%
            </p>
          </div>
        </div>

        {/* Card 3 — Kata Kunci Utama */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Top Keywords
                </p>
                <p className="text-xs text-slate-500">
                  Positive sentiment dominant
                </p>
              </div>
            </div>

            <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white">
              HOT
            </span>
          </div>

          <h3 className="text-xl font-semibold text-slate-900">
            enak
          </h3>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            277<span className="text-base font-medium text-slate-500">x Disebutkan</span>
          </p>
        </div>
      </div>


      <div className="mt-10  bg-white border shadow-sm border-slate-100 p-5 rounded-2xl ">
        <h1 className="text-lg font-normal  mb-5">Data Scrapper</h1>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Mentions */}

          <div className="rounded-2xl bg-blue-50 p-6 border border-blue-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
              <MessageCircle className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm text-slate-600">Total Mentions</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              14,984
            </p>
          </div>

          {/* Sentiment Positive */}
          <div className="rounded-2xl bg-green-50 p-6 border border-green-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
              <Smile className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm text-slate-600">Positive</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              7.4%
            </p>
            <p className="text-xs text-slate-500">
              1,103 mentions
            </p>
          </div>

          {/* Sentiment Neutral */}
          <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
              <Meh className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm text-slate-600">Neutral</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              91.9%
            </p>
            <p className="text-xs text-slate-500">
              13,774 mentions
            </p>
          </div>

          {/* Sentiment Negative */}
          <div className="rounded-2xl bg-red-50 p-6 border border-red-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm">
              <Frown className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm text-slate-600">Negative</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              0.7%
            </p>
            <p className="text-xs text-slate-500">
              107 mentions
            </p>
          </div>
        </div>

      </div>


      <DashboardInsightSection />
      <DashboardInsight />

    </div>
  );
};

export default DashboardPage;
