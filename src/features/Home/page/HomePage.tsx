import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FiAlertCircle, FiAlertTriangle, FiCoffee } from "react-icons/fi";
import { IoFlame } from "react-icons/io5";
import { TbLoader2 } from "react-icons/tb";
import { LuFrown, LuMeh, LuMessageSquare, LuSmile } from "react-icons/lu";
import { LuUtensils } from "react-icons/lu";
import { FaCrown, FaFire } from "react-icons/fa";
import type { Analysis, ResponseAnalysis, SentimenBrand, SentimenKategori } from "../type/Analysis";
import Chatbot from "../components/Chatbot";
import { OverviewTabSection } from "../components/OverviewTabSection";
import { CategoriTabSection } from "../components/CategoriTabSection";
import { BrandTabSection } from "../components/BrandTabSection";
import { EngagementTabSection } from "../components/EngagementTabSection";
import { KeywordTabSection } from "../components/KeywordTabSection";
import { MessageCircle } from "lucide-react";
import axiosClient from "@/lib/axios";

const HomePage = () => {
  const [data, setData] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axiosClient.get<ResponseAnalysis>("/umkm");

        setData(response.data.data);
        setError(null);

      } catch (err) {
        console.error("Error fetching data:", err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Transform data for charts with null safety
  const overallSentimentData = useMemo(() => {
    if (!data) return [];
    return [
      {
        name: "Positif",
        value: data.ringkasan_keseluruhan.Positif.jumlah,
        percentage: data.ringkasan_keseluruhan.Positif.persentase,
      },
      {
        name: "Netral",
        value: data.ringkasan_keseluruhan.Netral.jumlah,
        percentage: data.ringkasan_keseluruhan.Netral.persentase,
      },
      {
        name: "Negatif",
        value: data.ringkasan_keseluruhan.Negatif.jumlah,
        percentage: data.ringkasan_keseluruhan.Negatif.persentase,
      },
    ];
  }, [data]);

  const categoryData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.sentimen_per_kategori)
      .map(([key, value]: [string, SentimenKategori]) => ({
        name: key.replace("Kuliner - ", ""),
        positif: value.positif,
        negatif: value.negatif,
        netral: value.netral,
        total: value.total,
        rasio_positif: value.rasio_positif,
      }))
      .sort((a, b) => b.rasio_positif - a.rasio_positif);
  }, [data]);

  const brandData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.sentimen_per_brand)
      .map(([key, value]: [string, SentimenBrand]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        positif: value.rasio_positif,
        negatif: value.rasio_negatif,
        netral: value.rasio_netral,
        total: value.total,
      }))
      .sort((a, b) => b.positif - a.positif);
  }, [data]);

  const engagementData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.engagement_per_sentimen).map(([key, value]) => ({
      sentiment: key,
      engagement: value.avg_engagement,
      likes: value.avg_likes,
      shares: value.avg_shares,
    }));
  }, [data]);

  const totalMentions = useMemo(() => {
    if (!data) return 0;
    return (
      data.ringkasan_keseluruhan.Positif.jumlah +
      data.ringkasan_keseluruhan.Netral.jumlah +
      data.ringkasan_keseluruhan.Negatif.jumlah
    );
  }, [data]);

  const getCategoryIcon = (category: string) => {
    if (category.includes("Kopi")) return <FiCoffee className="w-4 h-4" />;
    if (category.includes("Bakar")) return <IoFlame className="w-4 h-4" />;
    if (category.includes("Tradisional"))
      return <TbLoader2 className="w-4 h-4" />;
    if (category.includes("Mie")) return <LuUtensils className="w-4 h-4" />;
    return <LuUtensils className="w-4 h-4" />;
  };

  // Key insights calculations
  // Di bagian keyInsights calculation, perbaiki topKeyword
  const keyInsights = useMemo(() => {
    if (!data) return null;

    // Find best brand
    const bestBrand = brandData.length > 0 ? brandData[0] : null;

    // Find best category
    const bestCategory = categoryData.length > 0 ? categoryData[0] : null;

    // Fix topKeyword - ambil keyword pertama dari array
    const topKeyword = data.faktor_positif_top10 && data.faktor_positif_top10.length > 0
      ? data.faktor_positif_top10[0] // Ambil objek Keyword pertama
      : { kata: "Enak", jumlah: 277 }; // fallback sebagai objek Keyword

    return {
      bestBrand,
      bestCategory,
      topKeyword,
    };
  }, [data, brandData, categoryData]);
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-4">
              <TbLoader2 className="w-12 h-12 text-blue-500 animate-spin" />
              <h2 className="text-xl font-semibold text-slate-700">
                Loading Dashboard...
              </h2>
              <p className="text-sm text-slate-500 text-center">
                Sedang memuat data analisis sentimen
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-red-200">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <FiAlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-xl font-semibold text-slate-700">
                Error Loading Data
              </h2>
              <p className="text-sm text-slate-600 text-center">{error}</p>
              <Alert className="border-amber-200 bg-amber-50">
                <FiAlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  <strong>Pastikan:</strong>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>
                      • File JSON berada di{" "}
                      <code className="bg-amber-100 px-1 rounded">
                        public/json/analysis.json
                      </code>
                    </li>
                    <li>
                      • Format JSON sesuai dengan struktur yang diharapkan
                    </li>
                    <li>• Server development sedang berjalan</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No data state
  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-4">
              <FiAlertCircle className="w-12 h-12 text-amber-500" />
              <h2 className="text-xl font-semibold text-slate-700">
                No Data Available
              </h2>
              <p className="text-sm text-slate-500 text-center">
                Data analisis tidak ditemukan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  console.log("keyInsights", keyInsights);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard Analisis Sentimen Kuliner
            </h1>
          </div>
          <p className="text-slate-600">
            Monitoring sentimen brand kuliner dari media sosial
          </p>
        </div>

        {/* Key Insights Cards */}
        {keyInsights && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Best Brand Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <FaCrown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 text-sm md:text-base">
                        Brand Terbaik
                      </h3>
                      <p className="text-xs text-blue-600">
                        Sentimen positif tertinggi
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500 text-white text-xs md:text-sm">
                    #{1}
                  </Badge>
                </div>
                {keyInsights.bestBrand && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg md:text-xl text-blue-900">
                        {keyInsights.bestBrand.name}
                      </span>
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${keyInsights.bestBrand.positif}%` }}
                        />
                      </div>
                      <span className="font-semibold text-blue-700 text-sm md:text-base">
                        {keyInsights.bestBrand.positif.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Best Category Card */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <FaFire className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900 text-sm md:text-base">
                        Kategori Terpopuler
                      </h3>
                      <p className="text-xs text-green-600">
                        Rasio sentimen terbaik
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white text-xs md:text-sm">
                    TOP
                  </Badge>
                </div>
                {keyInsights.bestCategory && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base md:text-lg text-green-900 truncate">
                        {keyInsights.bestCategory.name}
                      </span>
                      <span className="text-2xl">📈</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-green-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${keyInsights.bestCategory.rasio_positif}%`,
                          }}
                        />
                      </div>
                      <span className="font-semibold text-green-700 text-sm md:text-base">
                        {keyInsights.bestCategory.rasio_positif.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Keyword Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <LuMessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900 text-sm md:text-base">
                        Kata Kunci Utama
                      </h3>
                      <p className="text-xs text-purple-600">
                        Sentimen positif dominan
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-purple-500 text-white text-xs md:text-sm">
                    HOT
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg md:text-xl text-purple-900">
                      {keyInsights.topKeyword.kata}
                    </span>
                    <span className="text-2xl">💬</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-700 text-sm">Disebutkan</span>
                    <span className="font-bold text-purple-900 text-lg">
                      {keyInsights.topKeyword.jumlah}x
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Key Metrics */}
        {/* <KeyMetrics data={data} totalMentions={totalMentions} /> */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Mentions</p>
                  <p className="text-2xl font-bold">
                    {totalMentions.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Sentimen Positif</p>
                  <p className="text-2xl font-bold text-green-600">
                    {data.ringkasan_keseluruhan.Positif.persentase}%
                  </p>
                  <p className="text-xs text-slate-500">
                    {data.ringkasan_keseluruhan.Positif.jumlah} mentions
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <LuSmile className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-gray-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Sentimen Netral</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {data.ringkasan_keseluruhan.Netral.persentase}%
                  </p>
                  <p className="text-xs text-slate-500">
                    {data.ringkasan_keseluruhan.Netral.jumlah} mentions
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <LuMeh className="w-6 h-6 text-gray-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Sentimen Negatif</p>
                  <p className="text-2xl font-bold text-red-600">
                    {data.ringkasan_keseluruhan.Negatif.persentase}%
                  </p>
                  <p className="text-xs text-slate-500">
                    {data.ringkasan_keseluruhan.Negatif.jumlah} mentions
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <LuFrown className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Kategori</TabsTrigger>
            <TabsTrigger value="brands">Brand</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <OverviewTabSection
            overallSentimentData={overallSentimentData}
            brandData={brandData}
            totalMentions={totalMentions}
          />

          {/* Categories Tab */}
          <CategoriTabSection
            categoryData={categoryData}
            getCategoryIcon={getCategoryIcon}
          />

          {/* Brands Tab */}
          <BrandTabSection brandData={brandData} />

          {/* Engagement Tab */}
          <EngagementTabSection engagementData={engagementData} />

          {/* Keywords Tab */}
          <KeywordTabSection data={data} />
        </Tabs>
      </div>
      <Chatbot />
    </div>
  );
};

export default HomePage;
