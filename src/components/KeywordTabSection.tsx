import React from 'react'
import { TabsContent } from './ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { LuThumbsDown, LuThumbsUp } from 'react-icons/lu'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import type { Analysis } from '@/interface/Analysis'

export const KeywordTabSection = ({
  data,
}: {
  data: Analysis;
}) => {
  return (
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
                return (
                  <span
                    key={item.kata}
                    className={`inline-block px-3 py-1 rounded-full font-medium transition-all hover:scale-110 cursor-pointer ${isPositive ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                  >
                    {item.kata}
                  </span>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
