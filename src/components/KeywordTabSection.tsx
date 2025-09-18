import { TabsContent } from './ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { LuThumbsDown, LuThumbsUp } from 'react-icons/lu'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { motion } from 'framer-motion'
import type { Analysis } from '@/interface/Analysis'
import { TrendingUp } from 'lucide-react'
// import { WordCloudComponent } from './WordCloudComponent'
import ReactWordcloud from 'react-wordcloud';
import { useState, useEffect } from 'react'

export const KeywordTabSection = ({
  data,
}: {
  data: Analysis;
}) => {
  // Gabungkan dan urutkan semua kata berdasarkan frekuensi
  const allWords = [...data.faktor_positif_top10, ...data.faktor_negatif_top10]
    .sort((a, b) => b.jumlah - a.jumlah);
  
  // Format data untuk word cloud component dengan tipe yang benar
  const wordCloudData = allWords.map(item => {
    const isPositive = data.faktor_positif_top10.some(p => p.kata === item.kata);
    return {
      text: item.kata,
      value: item.jumlah,
      sentiment: isPositive ? 'positive' as const : 'negative' as const
    };
  });

  // State untuk debugging
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handler untuk klik pada kata di word cloud
  const handleWordClick = (word: { text: string; value: number; sentiment?: 'positive' | 'negative' }) => {
    console.log('Kata diklik:', word);
    // Anda bisa menambahkan logika untuk menangani klik kata di sini
  };

  if (!isClient) {
    return (
      <TabsContent value="keywords" className="space-y-6">
        <div className="flex justify-center items-center h-96">
          <p>Loading...</p>
        </div>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="keywords" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Keywords Positif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-green-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <LuThumbsUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    Top Keywords Positif
                    <Badge className="bg-green-500 text-white">Positif</Badge>
                  </div>
                  <CardDescription className="text-green-700/80 mt-1">
                    Kata-kata yang paling sering muncul dalam sentimen positif
                  </CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {data.faktor_positif_top10.map((item, index) => (
                  <motion.div 
                    key={item.kata} 
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-green-50 transition-all duration-200 group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-4">
                      <Badge
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                          ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' : 
                            index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' : 
                            index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white' : 
                            'bg-green-100 text-green-800'}
                        `}
                      >
                        {index + 1}
                      </Badge>
                      <span className="font-medium capitalize text-slate-800 group-hover:text-green-700">
                        {item.kata}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-600 min-w-[70px] text-right">
                        {item.jumlah} mentions
                      </span>
                      <div className="w-24">
                        <Progress 
                          value={(item.jumlah / (data.faktor_positif_top10[0]?.jumlah || 1)) * 100} 
                          className="h-2 bg-green-100" 
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Keywords Negatif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-red-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 border-b border-red-100">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100">
                  <LuThumbsDown className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    Top Keywords Negatif
                    <Badge className="bg-red-500 text-white">Negatif</Badge>
                  </div>
                  <CardDescription className="text-red-700/80 mt-1">
                    Kata-kata yang paling sering muncul dalam sentimen negatif
                  </CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {data.faktor_negatif_top10.map((item, index) => (
                  <motion.div 
                    key={item.kata} 
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-red-50 transition-all duration-200 group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-4">
                      <Badge
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                          ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' : 
                            index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' : 
                            index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white' : 
                            'bg-red-100 text-red-800'}
                        `}
                      >
                        {index + 1}
                      </Badge>
                      <span className="font-medium capitalize text-slate-800 group-hover:text-red-700">
                        {item.kata}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-600 min-w-[70px] text-right">
                        {item.jumlah} mentions
                      </span>
                      <div className="w-24">
                        <Progress 
                          value={(item.jumlah / (data.faktor_negatif_top10[0]?.jumlah || 1)) * 100} 
                          className="h-2 bg-red-100" 
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Word Cloud Visualization dengan Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  Word Cloud Visualization
                  <Badge variant="outline" className="border-blue-200 text-blue-600">
                    {allWords.length} Keywords
                  </Badge>
                </div>
                <CardDescription>
                  Visualisasi kata-kata berdasarkan frekuensi kemunculan
                </CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center min-h-[400px] bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4">
              {wordCloudData.length > 0 ? (
                <h1>ada data</h1>
              ) : (
                <div className="text-center text-slate-500">
                  <p>No data available for word cloud visualization</p>
                </div>
              )}
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm text-slate-600">Kata Positif</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm text-slate-600">Kata Negatif</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs">A → Z</div>
                <span className="text-sm text-slate-600">Ukuran berdasarkan frekuensi</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TabsContent>
  )
}