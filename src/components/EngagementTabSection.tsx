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

export const EngagementTabSection = ({
  engagementData,
}: {
  engagementData: { sentiment: string; engagement: number; likes: number; shares: number; }[];
}) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positif': return <LuSmile className="w-5 h-5 text-green-500" />;
      case 'negatif': return <LuFrown className="w-5 h-5 text-red-500" />;
      default: return <LuMeh className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
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
  )
}
