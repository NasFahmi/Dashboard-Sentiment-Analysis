import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { FiAlertCircle, FiAlertTriangle, FiCoffee, } from "react-icons/fi";
import { IoFlame } from "react-icons/io5";
import { TbLoader2 } from "react-icons/tb";
import { LuFrown, LuMeh, LuSmile, LuThumbsDown, LuThumbsUp } from "react-icons/lu";
import { LuUtensils } from "react-icons/lu";
import { FaRegHeart, FaRegStar, FaShare } from "react-icons/fa";
import type { Analysis, SentimenBrand, SentimenKategori } from './interface/Analysis';


// // Data dari JSON
// const data = {
//   "ringkasan_keseluruhan": {
//     "Netral": { "jumlah": 13774, "persentase": 91.9 },
//     "Positif": { "jumlah": 1103, "persentase": 7.4 },
//     "Negatif": { "jumlah": 107, "persentase": 0.7 }
//   },
//   "sentimen_per_kategori": {
//     "Kuliner - Cafe & Resto": { "positif": 60, "negatif": 10, "netral": 637, "total": 707, "rasio_positif": 8.5 },
//     "Kuliner - Kopi & Minuman": { "positif": 39, "negatif": 6, "netral": 1103, "total": 1148, "rasio_positif": 3.4 },
//     "Kuliner - Makanan Asia": { "positif": 90, "negatif": 3, "netral": 744, "total": 837, "rasio_positif": 10.8 },
//     "Kuliner - Makanan Bakar": { "positif": 168, "negatif": 9, "netral": 2363, "total": 2540, "rasio_positif": 6.6 },
//     "Kuliner - Makanan Siap Saji": { "positif": 284, "negatif": 21, "netral": 3480, "total": 3785, "rasio_positif": 7.5 },
//     "Kuliner - Makanan Tradisional": { "positif": 143, "negatif": 3, "netral": 771, "total": 917, "rasio_positif": 15.6 },
//     "Kuliner - Mie & Pasta": { "positif": 60, "negatif": 22, "netral": 1468, "total": 1550, "rasio_positif": 3.9 },
//     "Kuliner - Warung Tradisional": { "positif": 259, "negatif": 33, "netral": 3208, "total": 3500, "rasio_positif": 7.4 }
//   },
//   "sentimen_per_brand": {
//     "gacoan": { "positif": 143, "negatif": 3, "netral": 771, "total": 917, "rasio_positif": 15.6, "rasio_negatif": 0.3, "rasio_netral": 84.1 },
//     "mieganbatte": { "positif": 20, "negatif": 5, "netral": 134, "total": 159, "rasio_positif": 12.6, "rasio_negatif": 3.1, "rasio_netral": 84.3 },
//     "hisana": { "positif": 90, "negatif": 3, "netral": 744, "total": 837, "rasio_positif": 10.8, "rasio_negatif": 0.4, "rasio_netral": 88.9 },
//     "pagisore": { "positif": 60, "negatif": 10, "netral": 637, "total": 707, "rasio_positif": 8.5, "rasio_negatif": 1.4, "rasio_netral": 90.1 },
//     "deles": { "positif": 284, "negatif": 21, "netral": 3480, "total": 3785, "rasio_positif": 7.5, "rasio_negatif": 0.6, "rasio_netral": 91.9 },
//     "warmindo": { "positif": 259, "negatif": 33, "netral": 3208, "total": 3500, "rasio_positif": 7.4, "rasio_negatif": 0.9, "rasio_netral": 91.7 },
//     "sambalbakar": { "positif": 168, "negatif": 9, "netral": 2363, "total": 2540, "rasio_positif": 6.6, "rasio_negatif": 0.4, "rasio_netral": 93.0 },
//     "belikopi": { "positif": 39, "negatif": 6, "netral": 1103, "total": 1148, "rasio_positif": 3.4, "rasio_negatif": 0.5, "rasio_netral": 96.1 },
//     "wizzmie": { "positif": 40, "negatif": 17, "netral": 1334, "total": 1391, "rasio_positif": 2.9, "rasio_negatif": 1.2, "rasio_netral": 95.9 }
//   },
//   "engagement_per_sentimen": {
//     "Negatif": { "avg_engagement": 509.4, "avg_likes": 248.7, "avg_shares": 49.0 },
//     "Netral": { "avg_engagement": 500.5, "avg_likes": 249.9, "avg_shares": 49.6 },
//     "Positif": { "avg_engagement": 500.1, "avg_likes": 252.0, "avg_shares": 49.4 }
//   },
//   "faktor_positif_top10": [
//     { "kata": "enak", "jumlah": 277 },
//     { "kata": "pas", "jumlah": 162 },
//     { "kata": "mantap", "jumlah": 143 },
//     { "kata": "ok", "jumlah": 141 },
//     { "kata": "keren", "jumlah": 119 },
//     { "kata": "suka", "jumlah": 103 },
//     { "kata": "baik", "jumlah": 78 },
//     { "kata": "juara", "jumlah": 65 },
//     { "kata": "favorit", "jumlah": 59 },
//     { "kata": "happy", "jumlah": 52 }
//   ],
//   "faktor_negatif_top10": [
//     { "kata": "lama", "jumlah": 54 },
//     { "kata": "mahal", "jumlah": 13 },
//     { "kata": "komplain", "jumlah": 8 },
//     { "kata": "asin", "jumlah": 8 },
//     { "kata": "buruk", "jumlah": 6 },
//     { "kata": "basi", "jumlah": 4 },
//     { "kata": "zonk", "jumlah": 4 },
//     { "kata": "lambat", "jumlah": 4 },
//     { "kata": "kasar", "jumlah": 4 },
//     { "kata": "mengecewakan", "jumlah": 4 }
//   ]
// };

const COLORS = {
  positif: '#10b981',
  netral: '#9ca3af',
  negatif: '#ef4444',
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  accent: '#f59e0b'
};

const Dashboard = () => {
  const [data, setData] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/json/analysis.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData: Analysis = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
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
        name: 'Positif',
        value: data.ringkasan_keseluruhan.Positif.jumlah,
        percentage: data.ringkasan_keseluruhan.Positif.persentase
      },
      {
        name: 'Netral',
        value: data.ringkasan_keseluruhan.Netral.jumlah,
        percentage: data.ringkasan_keseluruhan.Netral.persentase
      },
      {
        name: 'Negatif',
        value: data.ringkasan_keseluruhan.Negatif.jumlah,
        percentage: data.ringkasan_keseluruhan.Negatif.persentase
      }
    ];
  }, [data]);

  const categoryData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.sentimen_per_kategori)
      .map(([key, value]: [string, SentimenKategori]) => ({
        name: key.replace('Kuliner - ', ''),
        positif: value.positif,
        negatif: value.negatif,
        netral: value.netral,
        total: value.total,
        rasio_positif: value.rasio_positif
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
        total: value.total
      }))
      .sort((a, b) => b.positif - a.positif);
  }, [data]);

  const engagementData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.engagement_per_sentimen)
      .map(([key, value]) => ({
        sentiment: key,
        engagement: value.avg_engagement,
        likes: value.avg_likes,
        shares: value.avg_shares
      }));
  }, [data]);

  const totalMentions = useMemo(() => {
    if (!data) return 0;
    return data.ringkasan_keseluruhan.Positif.jumlah +
      data.ringkasan_keseluruhan.Netral.jumlah +
      data.ringkasan_keseluruhan.Negatif.jumlah;
  }, [data]);

  const getCategoryIcon = (category: string) => {
    if (category.includes('Kopi')) return <FiCoffee className="w-4 h-4" />;
    if (category.includes('Bakar')) return <IoFlame className="w-4 h-4" />;
    if (category.includes('Tradisional')) return <TbLoader2 className="w-4 h-4" />;
    if (category.includes('Mie')) return <LuUtensils className="w-4 h-4" />;
    return <LuUtensils className="w-4 h-4" />;
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positif': return <LuSmile className="w-5 h-5 text-green-500" />;
      case 'negatif': return <LuFrown className="w-5 h-5 text-red-500" />;
      default: return <LuMeh className="w-5 h-5 text-gray-500" />;
    }
  };





  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-4">
              <TbLoader2 className="w-12 h-12 text-blue-500 animate-spin" />
              <h2 className="text-xl font-semibold text-slate-700">Loading Dashboard...</h2>
              <p className="text-sm text-slate-500 text-center">Sedang memuat data analisis sentimen</p>
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
              <h2 className="text-xl font-semibold text-slate-700">Error Loading Data</h2>
              <p className="text-sm text-slate-600 text-center">{error}</p>
              <Alert className="border-amber-200 bg-amber-50">
                <FiAlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  <strong>Pastikan:</strong>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• File JSON berada di <code className="bg-amber-100 px-1 rounded">public/json/analysis.json</code></li>
                    <li>• Format JSON sesuai dengan struktur yang diharapkan</li>
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
              <h2 className="text-xl font-semibold text-slate-700">No Data Available</h2>
              <p className="text-sm text-slate-500 text-center">Data analisis tidak ditemukan</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <p className="text-slate-600">Monitoring sentimen brand kuliner dari media sosial</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Mentions</p>
                  <p className="text-2xl font-bold">{totalMentions.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaRegHeart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Sentimen Positif</p>
                  <p className="text-2xl font-bold text-green-600">{data.ringkasan_keseluruhan.Positif.persentase}%</p>
                  <p className="text-xs text-slate-500">{data.ringkasan_keseluruhan.Positif.jumlah} mentions</p>
                </div>
                <LuSmile className="w-12 h-12 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-gray-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Sentimen Netral</p>
                  <p className="text-2xl font-bold text-gray-600">{data.ringkasan_keseluruhan.Netral.persentase}%</p>
                  <p className="text-xs text-slate-500">{data.ringkasan_keseluruhan.Netral.jumlah} mentions</p>
                </div>
                <LuMeh className="w-12 h-12 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Sentimen Negatif</p>
                  <p className="text-2xl font-bold text-red-600">{data.ringkasan_keseluruhan.Negatif.persentase}%</p>
                  <p className="text-xs text-slate-500">{data.ringkasan_keseluruhan.Negatif.jumlah} mentions</p>
                </div>
                <LuFrown className="w-12 h-12 text-red-500" />
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
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Distribusi Sentimen Keseluruhan</CardTitle>
                  <CardDescription>Persentase sentimen dari total {totalMentions.toLocaleString()} mentions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={overallSentimentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} (${percentage}%)`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill={COLORS.positif} />
                        <Cell fill={COLORS.netral} />
                        <Cell fill={COLORS.negatif} />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top 5 Brand Terpositif</CardTitle>
                  <CardDescription>Brand dengan rasio sentimen positif tertinggi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {brandData.slice(0, 5).map((brand, index) => (
                    <div key={brand.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={index === 0 ? "default" : "secondary"}>
                            #{index + 1}
                          </Badge>
                          <span className="font-medium">{brand.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">
                          {brand.positif.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={brand.positif} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <FiAlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Insight:</strong> Brand "Gacoan" memiliki sentimen positif tertinggi (15.6%) diikuti oleh "Mie Ganbatte" (12.6%).
                Mayoritas brand memiliki sentimen netral yang dominan, menunjukkan ruang untuk meningkatkan engagement positif.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analisis Sentimen per Kategori Kuliner</CardTitle>
                <CardDescription>Distribusi sentimen untuk setiap kategori makanan</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="positif" stackId="a" fill={COLORS.positif} name="Positif" />
                    <Bar dataKey="netral" stackId="a" fill={COLORS.netral} name="Netral" />
                    <Bar dataKey="negatif" stackId="a" fill={COLORS.negatif} name="Negatif" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoryData.map((category) => (
                <Card key={category.name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(category.name)}
                        <h3 className="font-semibold text-sm">{category.name}</h3>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {category.total}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-green-600">Positif</span>
                        <span className="font-medium">{category.rasio_positif}%</span>
                      </div>
                      <Progress value={category.rasio_positif} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Brands Tab */}
          <TabsContent value="brands" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performa Brand Analysis</CardTitle>
                <CardDescription>Perbandingan sentimen antar brand kuliner</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={brandData.slice(0, 6)}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={90} domain={[0, 20]} />
                    <Radar name="Positif %" dataKey="positif" stroke={COLORS.positif} fill={COLORS.positif} fillOpacity={0.6} />
                    <Radar name="Negatif %" dataKey="negatif" stroke={COLORS.negatif} fill={COLORS.negatif} fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {brandData.map((brand) => (
                <Card key={brand.name} className="hover:shadow-lg transition-all hover:scale-105">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{brand.name}</CardTitle>
                      <Badge variant="outline">{brand.total} mentions</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="space-y-1">
                        <LuSmile className="w-5 h-5 mx-auto text-green-500" />
                        <p className="text-xs text-slate-600">Positif</p>
                        <p className="font-bold text-green-600">{brand.positif.toFixed(1)}%</p>
                      </div>
                      <div className="space-y-1">
                        <LuMeh className="w-5 h-5 mx-auto text-gray-500" />
                        <p className="text-xs text-slate-600">Netral</p>
                        <p className="font-bold text-gray-600">{brand.netral.toFixed(1)}%</p>
                      </div>
                      <div className="space-y-1">
                        <LuFrown className="w-5 h-5 mx-auto text-red-500" />
                        <p className="text-xs text-slate-600">Negatif</p>
                        <p className="font-bold text-red-600">{brand.negatif.toFixed(1)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics by Sentiment</CardTitle>
                  <CardDescription>Rata-rata engagement untuk setiap jenis sentimen</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="sentiment" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="likes" fill={COLORS.primary} name="Likes" />
                      <Bar dataKey="shares" fill={COLORS.secondary} name="Shares" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Distribution</CardTitle>
                  <CardDescription>Total engagement score per sentimen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {engagementData.map((item) => (
                      <div key={item.sentiment} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getSentimentIcon(item.sentiment)}
                            <span className="font-medium">{item.sentiment}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <LuThumbsUp className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">{item.likes.toFixed(0)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaShare className="w-4 h-4 text-purple-500" />
                              <span className="text-sm">{item.shares.toFixed(0)}</span>
                            </div>
                            <Badge variant="secondary">
                              {item.engagement.toFixed(0)} total
                            </Badge>
                          </div>
                        </div>
                        <Progress value={(item.engagement / 600) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>

                  <Alert className="mt-4 border-amber-200 bg-amber-50">
                    <FiAlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      <strong>Finding:</strong> Konten dengan sentimen negatif memiliki engagement rate yang sedikit lebih tinggi (509.4),
                      kemungkinan karena mendorong diskusi dan respons dari pengguna.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Keywords Tab */}
          <TabsContent value="keywords" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2">
                    <LuThumbsUp className="w-5 h-5 text-green-600" />
                    Top Keywords Positif
                  </CardTitle>
                  <CardDescription>Kata-kata yang paling sering muncul dalam sentimen positif</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {data.faktor_positif_top10.map((item, index) => (
                      <div key={item.kata} className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={index < 3 ? "default" : "secondary"}
                            className={index === 0 ? "bg-gradient-to-r from-yellow-400 to-yellow-600" : ""}
                          >
                            {index + 1}
                          </Badge>
                          <span className="font-medium capitalize">{item.kata}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600">{item.jumlah} mentions</span>
                          <Progress value={(item.jumlah / data.faktor_positif_top10[0].jumlah) * 100} className="w-20 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50">
                  <CardTitle className="flex items-center gap-2">
                    <LuThumbsDown className="w-5 h-5 text-red-600" />
                    Top Keywords Negatif
                  </CardTitle>
                  <CardDescription>Kata-kata yang paling sering muncul dalam sentimen negatif</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {data.faktor_negatif_top10.map((item, index) => (
                      <div key={item.kata} className="flex items-center justify-between p-2 rounded-lg hover:bg-red-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={index < 3 ? "destructive" : "secondary"}
                          >
                            {index + 1}
                          </Badge>
                          <span className="font-medium capitalize">{item.kata}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600">{item.jumlah} mentions</span>
                          <Progress value={(item.jumlah / data.faktor_negatif_top10[0].jumlah) * 100} className="w-20 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Word Cloud Visualization</CardTitle>
                <CardDescription>Visualisasi kata-kata berdasarkan frekuensi kemunculan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center p-4">
                  {[...data.faktor_positif_top10, ...data.faktor_negatif_top10]
                    .sort((a, b) => b.jumlah - a.jumlah)
                    .map((item) => {
                      const isPositive = data.faktor_positif_top10.some(p => p.kata === item.kata);
                      const size = Math.max(12, Math.min(32, item.jumlah / 10));
                      return (
                        <span
                          key={item.kata}
                          className={`inline-block px-3 py-1 rounded-full font-medium transition-all hover:scale-110 cursor-pointer ${isPositive ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          style={{ fontSize: `${size}px` }}
                        >
                          {item.kata}
                        </span>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaRegStar className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">Key Insights</span>
              </div>
              <div className="flex gap-4 text-sm">
                <span>🎯 Brand terbaik: <strong>Gacoan</strong> (15.6% positif)</span>
                <span>📈 Kategori terbaik: <strong>Makanan Tradisional</strong></span>
                <span>💬 Kata positif utama: <strong>"Enak"</strong> (277x)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;