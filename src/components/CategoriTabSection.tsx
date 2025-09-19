import { TabsContent } from './ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { ResponsiveContainer, BarChart, Bar, Tooltip, CartesianGrid, XAxis, YAxis, Legend } from 'recharts'
import { COLORS } from '@/lib/constant'
import { motion } from 'framer-motion'
import { Award, AlertCircle } from 'lucide-react'
import type { JSX } from 'react'

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-slate-200">
        <p className="font-semibold text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="font-semibold">{entry.value.toFixed(0)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const CategoriTabSection = ({
  categoryData,
  getCategoryIcon,
}: {
  categoryData: { name: string; positif: number; netral: number; negatif: number; total: number; rasio_positif: number }[];
  getCategoryIcon: (category: string) => JSX.Element;
}) => {
  // Find best and worst performing categories
  const bestCategory = categoryData[0];
  const worstCategory = categoryData[categoryData.length - 1];

  return (
    <TabsContent value="categories" className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Best Performing</p>
                  <p className="text-lg font-bold text-green-800">{bestCategory?.name}</p>
                  <p className="text-xs text-green-600 mt-1">{bestCategory?.rasio_positif}% positive</p>
                </div>
                <Award className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Categories</p>
                  <p className="text-lg font-bold text-blue-800">{categoryData.length}</p>
                  <p className="text-xs text-blue-600 mt-1">Active categories</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{categoryData.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-600 font-medium">Needs Attention</p>
                  <p className="text-lg font-bold text-amber-800">{worstCategory?.name}</p>
                  <p className="text-xs text-amber-600 mt-1">{worstCategory?.rasio_positif}% positive</p>
                </div>
                <AlertCircle className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Stacked Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Analisis Sentimen per Kategori Kuliner</span>
            </CardTitle>
            <CardDescription>
              Distribusi sentimen positif, netral, dan negatif untuk setiap kategori makanan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={600}>
              <BarChart
                data={categoryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12 }}
                  interval={0}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Jumlah Mentions', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
                <Bar
                  dataKey="positif"
                  fill={COLORS.positif}
                  name="Positif"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
                <Bar
                  dataKey="netral"
                  fill={COLORS.netral}
                  name="Netral"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1200}
                />
                <Bar
                  dataKey="negatif"
                  fill={COLORS.negatif}
                  name="Negatif"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1400}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryData.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="relative hover:shadow-lg transition-all duration-300 overflow-hidden group">
              {index < 3 && (
                <div className="absolute top-2 right-2">
                  <Badge
                    className={`text-xs px-2 py-1 ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                        index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                          'bg-gradient-to-r from-orange-400 to-orange-600'
                      } text-white`}
                  >
                    #{index + 1}
                  </Badge>
                </div>
              )}
              {/* <div className={`h-1 bg-gradient-to-r ${
                category.rasio_positif > 10 
                  ? 'from-green-400 to-emerald-500' 
                  : category.rasio_positif > 5 
                  ? 'from-blue-400 to-indigo-500'
                  : 'from-amber-400 to-orange-500'
              }`} /> */}

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                      {getCategoryIcon(category.name)}
                    </div>
                    <h3 className="font-semibold text-sm line-clamp-1">{category.name}</h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {category.total}
                  </Badge>
                </div>

                {/* Sentiment Bars */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-green-600 font-medium">Positif</span>
                      <span className="font-semibold">{category.positif} ({category.rasio_positif}%)</span>
                    </div>
                    <Progress
                      value={category.rasio_positif}
                      className="h-2 bg-green-100"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600 font-medium">Netral</span>
                      <span className="font-semibold">{category.netral} ({((category.netral / category.total) * 100).toFixed(1)}%)</span>
                    </div>
                    <Progress
                      value={(category.netral / category.total) * 100}
                      className="h-2 bg-gray-100"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-red-600 font-medium">Negatif</span>
                      <span className="font-semibold">{category.negatif} ({((category.negatif / category.total) * 100).toFixed(1)}%)</span>
                    </div>
                    <Progress
                      value={(category.negatif / category.total) * 100}
                      className="h-2 bg-red-100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </TabsContent>
  )
}