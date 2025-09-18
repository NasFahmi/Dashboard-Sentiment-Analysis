import { TabsContent } from './ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts'
import { COLORS } from '@/lib/constant'
import { Badge } from './ui/badge'
import { LuFrown, LuMeh, LuSmile } from 'react-icons/lu'
import { motion } from 'framer-motion'
import { TrendingUp, Award, AlertCircle } from 'lucide-react'

// Custom Tooltip Component
const CustomRadarTooltip = ({ active, payload, label }: any) => {
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
            <span className="font-semibold">{entry.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const BrandTabSection = ({
  brandData,
}: {
  brandData: { name: string; positif: number; netral: number; negatif: number; total: number; }[];
}) => {
  // Sort brands by total mentions
  const sortedBrands = [...brandData].sort((a, b) => b.total - a.total);
  const topBrand = sortedBrands[0];
  const bottomBrand = sortedBrands[sortedBrands.length - 1];

  return (
    <TabsContent value="brands" className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Top Brand</p>
                  <p className="text-lg font-bold text-green-800">{topBrand?.name}</p>
                  <p className="text-xs text-green-600 mt-1">{topBrand?.total} mentions</p>
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
                  <p className="text-sm text-blue-600 font-medium">Total Brands</p>
                  <p className="text-lg font-bold text-blue-800">{brandData.length}</p>
                  <p className="text-xs text-blue-600 mt-1">Active brands</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{brandData.length}</span>
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
                  <p className="text-sm text-amber-600 font-medium">Lowest Mentions</p>
                  <p className="text-lg font-bold text-amber-800">{bottomBrand?.name}</p>
                  <p className="text-xs text-amber-600 mt-1">{bottomBrand?.total} mentions</p>
                </div>
                <AlertCircle className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Brand Sentiment Comparison
            </CardTitle>
            <CardDescription>Perbandingan sentimen antar brand kuliner (Top 6)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={sortedBrands.slice(0, 6)}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10 }}
                />
                <Radar 
                  name="Positif %" 
                  dataKey="positif" 
                  stroke={COLORS.positif} 
                  fill={COLORS.positif} 
                  fillOpacity={0.6}
                  strokeWidth={2}
                  animationDuration={800}
                />
                <Radar 
                  name="Negatif %" 
                  dataKey="negatif" 
                  stroke={COLORS.negatif} 
                  fill={COLORS.negatif} 
                  fillOpacity={0.6}
                  strokeWidth={2}
                  animationDuration={1000}
                />
                <Radar 
                  name="Netral %" 
                  dataKey="netral" 
                  stroke={COLORS.netral} 
                  fill={COLORS.netral} 
                  fillOpacity={0.6}
                  strokeWidth={2}
                  animationDuration={1200}
                />
                <Tooltip content={<CustomRadarTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Brand Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedBrands.map((brand, index) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden group relative">
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg line-clamp-1">{brand.name}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {brand.total} mentions
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="space-y-2 p-3 rounded-lg bg-green-50/50">
                    <LuSmile className="w-6 h-6 mx-auto text-green-500" />
                    <p className="text-xs text-slate-600">Positif</p>
                    <p className="font-bold text-green-600 text-sm">{brand.positif.toFixed(1)}%</p>
                  </div>
                  
                  <div className="space-y-2 p-3 rounded-lg bg-gray-50/50">
                    <LuMeh className="w-6 h-6 mx-auto text-gray-500" />
                    <p className="text-xs text-slate-600">Netral</p>
                    <p className="font-bold text-gray-600 text-sm">{brand.netral.toFixed(1)}%</p>
                  </div>
                  
                  <div className="space-y-2 p-3 rounded-lg bg-red-50/50">
                    <LuFrown className="w-6 h-6 mx-auto text-red-500" />
                    <p className="text-xs text-slate-600">Negatif</p>
                    <p className="font-bold text-red-600 text-sm">{brand.negatif.toFixed(1)}%</p>
                  </div>
                </div>
                
                {/* Sentiment Distribution Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-green-600">Positif</span>
                    <span className="font-medium">{brand.positif.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${brand.positif}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Netral</span>
                    <span className="font-medium">{brand.netral.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-500 h-2 rounded-full" 
                      style={{ width: `${brand.netral}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-red-600">Negatif</span>
                    <span className="font-medium">{brand.negatif.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${brand.negatif}%` }}
                    ></div>
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