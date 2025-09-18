import { TabsContent } from './ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts'
import { COLORS } from '@/lib/constant'
import { Badge } from './ui/badge'
import { LuFrown, LuMeh, LuSmile } from 'react-icons/lu'

export const BrandTabSection = ({
  brandData,
}: {
  brandData: { name: string; positif: number; netral: number; negatif: number; total: number; }[];
}) => {
  return (
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
  )
}
