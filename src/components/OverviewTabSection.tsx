import React from 'react'
import { TabsContent } from './ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import Insight from './Insight'
import { COLORS } from '@/lib/constant'

export const OverviewTabSection = ({
  overallSentimentData,
  brandData,
  totalMentions,
}: {
  overallSentimentData: { name: string; value: number; percentage: number }[];
  brandData: { name: string; positif: number; netral: number; negatif: number; total: number; }[];
  totalMentions: number;
}) => {
  return (
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

      <Insight />
    </TabsContent>
  )
}
