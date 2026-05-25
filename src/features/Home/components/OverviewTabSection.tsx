import React from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import Insight from './Insight'
import { COLORS } from '@/lib/constant'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  Award,
  Target,
  Activity,
  Sparkles,
  BarChart3,
  PieChartIcon
} from 'lucide-react'
import { LuSmile, LuMeh, LuFrown } from 'react-icons/lu'
import { cn } from '@/lib/utils'

// Custom Label for Pie Chart
const renderCustomizedLabel = ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {percentage > 5 ? `${percentage}%` : ''}
    </text>
  );
};

// Enhanced Custom Tooltip
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltipPie = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-slate-200"
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: data.payload.fill }}
          />
          <p className="font-semibold text-sm">{data.name}</p>
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between gap-4">
            <span className="text-slate-600">Jumlah:</span>
            <span className="font-semibold">{data.value.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-600">Persentase:</span>
            <span className="font-semibold">{data.payload.percentage}%</span>
          </div>
        </div>
      </motion.div>
    );
  }
  return null;
};

export const OverviewTabSection = ({
  overallSentimentData,
  brandData,
  totalMentions,
}: {
  overallSentimentData: { name: string; value: number; percentage: number }[];
  brandData: { name: string; positif: number; netral: number; negatif: number; total: number; }[];
  totalMentions: number;
}) => {
  const [selectedView, setSelectedView] = React.useState<'pie' | 'bar'>('pie');
  const [hoveredBrand, setHoveredBrand] = React.useState<number | null>(null);

  // Calculate sentiment statistics
  const sentimentStats = React.useMemo(() => {
    const positive = overallSentimentData.find(d => d.name === 'Positif') || { percentage: 0, value: 0 };
    const neutral = overallSentimentData.find(d => d.name === 'Netral') || { percentage: 0, value: 0 };
    const negative = overallSentimentData.find(d => d.name === 'Negatif') || { percentage: 0, value: 0 };

    return {
      dominantSentiment: neutral.percentage > 50 ? 'Netral' : positive.percentage > negative.percentage ? 'Positif' : 'Negatif',
      positiveRatio: totalMentions > 0 ? ((positive.value || 0) / totalMentions * 100).toFixed(1) : '0',
      engagementScore: Math.round((positive.value || 0) * 3 + (neutral.value || 0) * 1 - (negative.value || 0) * 2)
    };
  }, [overallSentimentData, totalMentions]);

  // Enhanced data for pie chart with colors
  const enhancedPieData = overallSentimentData.map(item => ({
    ...item,
    fill: item.name === 'Positif' ? COLORS.positif :
      item.name === 'Netral' ? COLORS.netral : COLORS.negatif,
    icon: item.name === 'Positif' ? <LuSmile className="w-4 h-4" /> :
      item.name === 'Netral' ? <LuMeh className="w-4 h-4" /> :
        <LuFrown className="w-4 h-4" />
  }));

  return (
    <TabsContent value="overview" className="space-y-6">
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-600 font-medium">Total Mentions</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {totalMentions.toLocaleString()}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600 font-medium">Positive Ratio</p>
                  <p className="text-2xl font-bold text-green-800">
                    {sentimentStats.positiveRatio}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-600 font-medium">Engagement Score</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {sentimentStats.engagementScore.toLocaleString()}
                  </p>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-600 font-medium">Dominant</p>
                  <p className="text-2xl font-bold text-amber-800">
                    {sentimentStats.dominantSentiment}
                  </p>
                </div>
                <Sparkles className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Distribusi Sentimen Keseluruhan</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Analisis dari {totalMentions.toLocaleString()} total mentions
                  </CardDescription>
                </div>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setSelectedView('pie')}
                    className={cn(
                      "p-1.5 rounded transition-all",
                      selectedView === 'pie'
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    <PieChartIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedView('bar')}
                    className={cn(
                      "p-1.5 rounded transition-all",
                      selectedView === 'bar'
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {selectedView === 'pie' ? (
                  <motion.div
                    key="pie"
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={enhancedPieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={1000}
                        >
                          {enhancedPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltipPie />} />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          iconType="circle"
                          formatter={(value) => (
                            <span className="text-sm font-medium">{value}</span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                ) : (
                  <motion.div
                    key="bar"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={enhancedPieData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip content={<CustomTooltipPie />} />
                        <Bar
                          dataKey="value"
                          radius={[8, 8, 0, 0]}
                          animationDuration={1000}
                        >
                          {enhancedPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sentiment Legend Cards */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {enhancedPieData.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                  >
                    <Card className={cn(
                      "border-2 transition-all",
                      item.name === 'Positif' ? 'border-green-200 hover:border-green-400' :
                        item.name === 'Netral' ? 'border-gray-200 hover:border-gray-400' :
                          'border-red-200 hover:border-red-400'
                    )}>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-1">
                          {item.icon}
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              item.name === 'Positif' ? 'text-green-600 border-green-300' :
                                item.name === 'Netral' ? 'text-gray-600 border-gray-300' :
                                  'text-red-600 border-red-300'
                            )}
                          >
                            {item.percentage}%
                          </Badge>
                        </div>
                        <p className="text-xs font-medium text-slate-700">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.value.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Brands Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Top 5 Brand Terpositif
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Brand dengan rasio sentimen positif tertinggi
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {brandData.slice(0, 5).map((brand, index) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  onMouseEnter={() => setHoveredBrand(index)}
                  onMouseLeave={() => setHoveredBrand(null)}
                  className="relative"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          transition={{ duration: 0.5 }}
                        >
                          <Badge
                            className={cn(
                              "min-w-[32px] h-8 flex items-center justify-center",
                              index === 0 ? "bg-gradient-to-r from-yellow-50 to-yellow-100 text-white" :
                                index === 1 ? "bg-gradient-to-r from-gray-50 to-gray-100 text-white" :
                                  index === 2 ? "bg-gradient-to-r from-orange-50 to-orange-100 text-white" :
                                    "bg-slate-100 text-slate-700"
                            )}
                          >
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                          </Badge>
                        </motion.div>
                        <div>
                          <span className="font-semibold text-sm">{brand.name}</span>
                          <p className="text-xs text-slate-500">{brand.total} mentions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-green-600">
                          {brand.positif.toFixed(1)}%
                        </span>
                        <p className="text-xs text-slate-500">Positif</p>
                      </div>
                    </div>

                    <div className="relative">
                      <Progress
                        value={brand.positif}
                        className="h-2 bg-slate-100"
                      />
                      <motion.div
                        className="absolute top-0 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${brand.positif}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      />
                    </div>

                    {/* Hover Details */}
                    <AnimatePresence>
                      {hoveredBrand === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex justify-between pt-2 border-t text-xs">
                            <div className="flex items-center gap-1">
                              <LuMeh className="w-3 h-3 text-gray-500" />
                              <span className="text-gray-600">Netral: {brand.netral.toFixed(1)}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <LuFrown className="w-3 h-3 text-red-500" />
                              <span className="text-red-600">Negatif: {brand.negatif.toFixed(1)}%</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}

            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Insight Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Insight />
      </motion.div>
    </TabsContent>
  )
}