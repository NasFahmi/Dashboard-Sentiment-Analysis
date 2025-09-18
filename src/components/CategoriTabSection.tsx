import React, { type JSX } from 'react'
import { TabsContent } from './ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { ResponsiveContainer, BarChart, Bar, Tooltip, CartesianGrid, XAxis, YAxis, Legend } from 'recharts'
import { COLORS } from '@/lib/constant'

export const CategoriTabSection = ({
  categoryData,
  getCategoryIcon,
}: {
  categoryData: { name: string; positif: number; netral: number; negatif: number; total: number; rasio_positif: number }[];
  getCategoryIcon: (category: string) => JSX.Element;
}) => {
  return (
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
  )
}
