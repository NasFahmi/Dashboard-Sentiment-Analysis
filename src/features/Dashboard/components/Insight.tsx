import React, { useState, useMemo } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  FiAlertCircle,
  FiRefreshCw,
  FiAlertTriangle,
} from 'react-icons/fi';
import parse from 'html-react-parser';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegLightbulb } from 'react-icons/fa';
import { createParserOptions, markdownToHtml, sanitizeHtml } from '@/helper/markdownHelper';
import { useInsightQuery } from '../hooks/useInsightQuery';

// Loading skeleton component
const InsightSkeleton = () => (
  <Card className="w-full">
    <CardHeader>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-20" />
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <Skeleton className="h-32 w-full mt-4" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
    </CardContent>
  </Card>
);

interface InsightProps {
  datasetId: string;
}

// Main Insight Component
export const Insight: React.FC<InsightProps> = ({ datasetId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Use custom hook
  const {
    data,
    isLoading,
    isError,
    error,
    refresh,
    isFetching,
    clearCache,
    hasLocalCache
  } = useInsightQuery(datasetId);

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refresh();
    } catch (err) {
      console.error('Error refreshing insights:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Process content
  const processedContent = useMemo(() => {
    if (!data?.data) return null;

    try {
      const html = markdownToHtml(data.data);
      const sanitized: string = sanitizeHtml(html);
      return parse(sanitized, createParserOptions());
    } catch (error) {
      console.error('Error processing content:', error);
      return <span className="text-red-500">Error processing content</span>;
    }
  }, [data]);

  // Loading state
  if (isLoading) {
    return <InsightSkeleton />;
  }

  // Error state
  if (isError) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <FiAlertTriangle className="h-5 w-5 text-red-600" />
        <AlertTitle className="text-red-800">Error Loading Insights</AlertTitle>
        <AlertDescription className="text-red-700">
          {error instanceof Error ? error.message : 'Failed to load insights. Please try again.'}
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="mt-2"
            disabled={isFetching || isRefreshing}
          >
            <FiRefreshCw className={`mr-2 h-4 w-4 ${isFetching || isRefreshing ? 'animate-spin' : ''}`} />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // No data state
  if (!data?.data) {
    return (
      <Alert>
        <FiAlertCircle className="h-5 w-5" />
        <AlertDescription>
          No insights available at the moment.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Card className="w-full border border-slate-200 bg-white">
          {/* ================= HEADER ================= */}
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              {/* Title */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center  justify-center rounded-lg bg-blue-100">
                  <FaRegLightbulb className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold text-slate-900">
                    Insight Summary
                  </CardTitle>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Ringkasan temuan utama dari data sentimen
                  </p>
                </div>
              </div>

              {/* Action */}
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={isRefreshing || isFetching}
                className="h-8 gap-2 text-xs"
              >
                <FiRefreshCw
                  className={`h-3.5 w-3.5 ${isRefreshing || isFetching ? "animate-spin" : ""
                    }`}
                />
                Refresh
              </Button>
            </div>
          </CardHeader>

          {/* ================= CONTENT ================= */}
          <CardContent className="pt-0">
            {/* Insight Text */}
            <div
              className={`prose prose-slate max-w-none text-sm ${!isExpanded ? "line-clamp-5" : ""
                }`}
            >
              {processedContent}
            </div>

            {/* Read More */}
            <div className="mt-4">
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                variant="ghost"
                size="sm"
                className="px-0 text-xs text-blue-600 hover:text-blue-700"
              >
                {isExpanded ? "Show less" : "Read more"}
              </Button>
            </div>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-3 text-xs text-slate-500">
              <span>
                Insight diperbarui berdasarkan data terakhir
              </span>

              {hasLocalCache && (
                <Button
                  onClick={clearCache}
                  variant="ghost"
                  size="sm"
                  className="h-auto px-0 text-xs text-slate-500 hover:text-slate-700"
                >
                  Clear cache
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default Insight;