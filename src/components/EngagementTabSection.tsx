import { TabsContent } from './ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { BarChart, CartesianGrid, ResponsiveContainer } from 'recharts'
import { COLORS } from '@/lib/constant'
import { Badge } from './ui/badge'
import { LuFrown, LuMeh, LuSmile, LuThumbsUp } from 'react-icons/lu'
import { FaShare } from 'react-icons/fa'
import { Progress } from './ui/progress'
import { Alert, AlertDescription } from './ui/alert'
import { FiAlertCircle } from 'react-icons/fi'
import { Tooltip } from 'recharts'
import { Legend } from 'recharts'
import { Bar } from 'recharts'
import { XAxis } from 'recharts'
import { YAxis } from 'recharts'
import { motion } from 'framer-motion'

// Custom Tooltip Component
const CustomBarTooltip = ({ active, payload, label }: any) => {
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

export const EngagementTabSection = ({
  engagementData,
}: {
  engagementData: { sentiment: string; engagement: number; likes: number; shares: number; }[];
}) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positif': return COLORS.positif;
      case 'negatif': return COLORS.negatif;
      default: return COLORS.netral;
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positif': return <LuSmile className="w-5 h-5 text-green-500" />;
      case 'negatif': return <LuFrown className="w-5 h-5 text-red-500" />;
      default: return <LuMeh className="w-5 h-5 text-gray-500" />;
    }
  };

  const maxEngagement = Math.max(...engagementData.map(item => item.engagement));

  return (
    <TabsContent value="engagement" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Metrics Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="hover:shadow-lg h-full transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                Engagement Metrics by Sentiment
              </CardTitle>
              <CardDescription>Rata-rata engagement untuk setiap jenis sentimen</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="sentiment"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    label={{
                      value: 'Engagement Count',
                      angle: -90,
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' }
                    }}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: '10px' }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey="likes"
                    fill={COLORS.primary}
                    name="Likes"
                    radius={[4, 4, 0, 0]}
                    animationDuration={800}
                  />
                  <Bar
                    dataKey="shares"
                    fill={COLORS.secondary}
                    name="Shares"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Engagement Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                Engagement Distribution
              </CardTitle>
              <CardDescription>Total engagement score per sentimen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {engagementData.map((item, index) => (
                  <motion.div
                    key={item.sentiment}
                    className="space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100">
                          {getSentimentIcon(item.sentiment)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.sentiment}</h3>
                          <p className="text-sm text-slate-500">
                            {item.engagement.toFixed(0)} total engagement
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-sm py-1"
                        style={{
                          backgroundColor: `${getSentimentColor(item.sentiment)}20`,
                          color: getSentimentColor(item.sentiment)
                        }}
                      >
                        {((item.engagement / maxEngagement) * 100).toFixed(0)}%
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 pl-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-blue-50">
                          <LuThumbsUp className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Likes</p>
                          <p className="font-medium text-sm">{item.likes.toFixed(0)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-purple-50">
                          <FaShare className="w-4 h-4 text-purple-500" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Shares</p>
                          <p className="font-medium text-sm">{item.shares.toFixed(0)}</p>
                        </div>
                      </div>
                    </div>

                    <Progress
                      value={(item.engagement / maxEngagement) * 100}
                      className="h-2.5"
                      style={{
                        backgroundColor: `${getSentimentColor(item.sentiment)}20`
                      }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          backgroundColor: getSentimentColor(item.sentiment),
                          width: `${(item.engagement / maxEngagement) * 100}%`
                        }}
                      />
                    </Progress>
                  </motion.div>
                ))}
              </div>

            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Card className="hover:shadow-lg transition-all duration-300">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
          <CardContent>
            <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-lg">
              <FiAlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <AlertDescription className="text-amber-800">
                  <span className="font-semibold">Key Insight:</span>
                  <p>Konten dengan sentimen negatif memiliki engagement rate yang sedikit lebih tinggi ({engagementData.find(item => item.sentiment.toLowerCase() === 'negatif')?.engagement.toFixed(1)}),
                    kemungkinan karena mendorong diskusi dan respons dari pengguna.</p>
                </AlertDescription>
              </div>
            </div>
          </CardContent>

        </motion.div>
      </Card>
    </TabsContent>
  )
}