// components/KeyMetrics.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  MessageCircle,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { LuSmile, LuMeh, LuFrown } from 'react-icons/lu';
import { cn } from '@/lib/utils';

interface MetricData {
  title: string;
  value: string | number;
  percentage?: number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'gray' | 'red';
  bgGradient: string;
  borderColor: string;
  iconBg: string;
  sparkle?: boolean;
}

interface KeyMetricsProps {
  data: {
    ringkasan_keseluruhan: {
      Positif: { jumlah: number; persentase: number };
      Netral: { jumlah: number; persentase: number };
      Negatif: { jumlah: number; persentase: number };
    };
  };
  totalMentions: number;
}

const MetricCard: React.FC<{ metric: MetricData; index: number }> = ({ metric, index }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          "hover:shadow-2xl hover:shadow-slate-200/50",
          "border-l-4",
          metric.borderColor
        )}
      >
        {/* Background Gradient */}
        <div 
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100"
          )}
        >
          <div className={cn("absolute inset-0", metric.bgGradient)} />
        </div>

        {/* Sparkle Effect */}
        {metric.sparkle && isHovered && (
          <motion.div
            className="absolute top-2 right-2"
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        )}

        <CardContent className="p-4 relative">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              {/* Title with trend */}
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {metric.title}
                </p>
                {metric.trend && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                    ) : metric.trend === 'down' ? (
                      <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                    ) : null}
                  </motion.div>
                )}
              </div>

              {/* Main Value */}
              <div className="space-y-1">
                <motion.div 
                  className="flex items-baseline gap-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <span className={cn(
                    "text-2xl font-bold tracking-tight",
                    metric.color === 'green' && "text-green-600",
                    metric.color === 'red' && "text-red-600",
                    metric.color === 'gray' && "text-gray-600",
                    metric.color === 'blue' && "text-blue-600"
                  )}>
                    {typeof metric.value === 'number' 
                      ? metric.value.toLocaleString() 
                      : metric.value}
                  </span>
                  {metric.percentage !== undefined && (
                    <Badge 
                      variant={metric.color === 'green' ? 'default' : 'secondary'}
                      className={cn(
                        "text-xs px-1.5 py-0",
                        metric.color === 'green' && "bg-green-100 text-green-700",
                        metric.color === 'red' && "bg-red-100 text-red-700",
                        metric.color === 'gray' && "bg-gray-100 text-gray-700"
                      )}
                    >
                      {metric.percentage}%
                    </Badge>
                  )}
                </motion.div>

                {/* Sub Value */}
                {metric.subValue && (
                  <motion.p 
                    className="text-xs text-slate-500 dark:text-slate-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {metric.subValue}
                  </motion.p>
                )}

                {/* Trend Value */}
                {metric.trendValue && (
                  <motion.p 
                    className={cn(
                      "text-xs font-medium",
                      metric.trend === 'up' && "text-green-600",
                      metric.trend === 'down' && "text-red-600",
                      metric.trend === 'neutral' && "text-gray-600"
                    )}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {metric.trendValue}
                  </motion.p>
                )}
              </div>

              {/* Progress Bar (optional) */}
              {metric.percentage !== undefined && (
                <div className="relative h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className={cn(
                      "absolute top-0 left-0 h-full rounded-full",
                      metric.color === 'green' && "bg-gradient-to-r from-green-400 to-green-600",
                      metric.color === 'red' && "bg-gradient-to-r from-red-400 to-red-600",
                      metric.color === 'gray' && "bg-gradient-to-r from-gray-400 to-gray-600",
                      metric.color === 'blue' && "bg-gradient-to-r from-blue-400 to-blue-600"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              )}
            </div>

            {/* Icon */}
            <motion.div
              className={cn(
                "relative flex-shrink-0",
                "w-12 h-12 rounded-xl flex items-center justify-center",
                "transition-all duration-300",
                metric.iconBg,
                isHovered && "scale-110 rotate-3"
              )}
              whileTap={{ scale: 0.95 }}
            >
              {metric.icon}
              
              {/* Pulse Animation */}
              <motion.div
                className={cn(
                  "absolute inset-0 rounded-xl",
                  metric.iconBg
                )}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const KeyMetrics: React.FC<KeyMetricsProps> = ({ data, totalMentions }) => {
  const metrics: MetricData[] = [
    {
      title: "Total Mentions",
      value: totalMentions,
      subValue: "Across all platforms",
      trend: "up",
      trendValue: "+12.5% from last month",
      icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
      color: "blue",
      bgGradient: "bg-gradient-to-br from-blue-50 to-indigo-50",
      borderColor: "border-l-blue-500",
      iconBg: "bg-blue-100",
      sparkle: true
    },
    {
      title: "Sentimen Positif",
      value: `${data.ringkasan_keseluruhan.Positif.persentase}%`,
      percentage: data.ringkasan_keseluruhan.Positif.persentase,
      subValue: `${data.ringkasan_keseluruhan.Positif.jumlah.toLocaleString()} mentions`,
      trend: "up",
      trendValue: "Above industry average",
      icon: <LuSmile className="w-6 h-6 text-green-600" />,
      color: "green",
      bgGradient: "bg-gradient-to-br from-green-50 to-emerald-50",
      borderColor: "border-l-green-500",
      iconBg: "bg-green-100"
    },
    {
      title: "Sentimen Netral",
      value: `${data.ringkasan_keseluruhan.Netral.persentase}%`,
      percentage: data.ringkasan_keseluruhan.Netral.persentase,
      subValue: `${data.ringkasan_keseluruhan.Netral.jumlah.toLocaleString()} mentions`,
      trend: "neutral",
      icon: <LuMeh className="w-6 h-6 text-gray-600" />,
      color: "gray",
      bgGradient: "bg-gradient-to-br from-gray-50 to-slate-50",
      borderColor: "border-l-gray-500",
      iconBg: "bg-gray-100"
    },
    {
      title: "Sentimen Negatif",
      value: `${data.ringkasan_keseluruhan.Negatif.persentase}%`,
      percentage: data.ringkasan_keseluruhan.Negatif.persentase,
      subValue: `${data.ringkasan_keseluruhan.Negatif.jumlah.toLocaleString()} mentions`,
      trend: "down",
      trendValue: "Decreased by 0.2%",
      icon: <LuFrown className="w-6 h-6 text-red-600" />,
      color: "red",
      bgGradient: "bg-gradient-to-br from-red-50 to-rose-50",
      borderColor: "border-l-red-500",
      iconBg: "bg-red-100"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <motion.div 
        className="flex items-center justify-between mb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Key Metrics Overview
          </h2>
        </div>
        <Badge variant="outline" className="gap-1">
          <AlertCircle className="w-3 h-3" />
          Real-time
        </Badge>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} index={index} />
        ))}
      </div>
    </div>
  );
};

export default KeyMetrics;