// components/Insight.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  FiAlertCircle,
  FiRefreshCw,
  FiAlertTriangle,
} from 'react-icons/fi';
import parse, { type HTMLReactParserOptions, domToReact, Element } from 'html-react-parser';
import DOMPurify from 'dompurify';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegLightbulb } from 'react-icons/fa';
import { axiosClient } from '@/lib/axios';
import axios from 'axios';

// Types - Updated to match actual API response
interface InsightResponse {
  message: string;
  data: string;
}

interface CachedInsight {
  data: InsightResponse;
  timestamp: number;
  expiresAt: number;
}

// LocalStorage helper functions
const CACHE_KEY = 'sentiment_insights_cache';

const getLocalStorageCache = (): CachedInsight | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const parsedCache: CachedInsight = JSON.parse(cached);
    return parsedCache;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
};

const setLocalStorageCache = (data: InsightResponse): void => {
  try {
    const now = Date.now();
    const cacheData: CachedInsight = {
      data,
      timestamp: now,
      expiresAt: 0 // Remove expiration, cache persists until manual refresh
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const clearInsightCache = (): void => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.error('Error clearing insights cache:', error);
  }
};

// API function to fetch insights
const fetchInsightsFromAPI = async (): Promise<InsightResponse> => {
  try {
    const response = await axiosClient.get<InsightResponse>('/rag/insights');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch insights');
    }
    throw new Error('Failed to fetch insights');
  }
};

// Fetch insights function with caching
const fetchInsights = async (forceRefresh: boolean = false): Promise<InsightResponse> => {
  // Check localStorage cache first if not forcing refresh
  if (!forceRefresh) {
    const cached = getLocalStorageCache();
    if (cached) {
      console.log('Returning cached insights from localStorage');
      return cached.data;
    }
  }

  // If forcing refresh, clear cache first
  if (forceRefresh) {
    clearInsightCache();
  }

  // Fetch from API
  console.log('Fetching insights from API');
  const freshData = await fetchInsightsFromAPI();
  
  // Save to cache
  setLocalStorageCache(freshData);

  return freshData;
};

// Markdown to HTML converter - Enhanced with safety checks
const markdownToHtml = (text: string | null | undefined): string => {
  if (!text || typeof text !== 'string') {
    console.warn('markdownToHtml received invalid input:', text);
    return '';
  }

  try {
    let html = text;

    // Escape HTML first to prevent XSS, but preserve our markdown
    html = html.replace(/</g, '<').replace(/>/g, '>');

    // Convert markdown horizontal rules
    html = html.replace(/^---$/gm, '<hr>');
    html = html.replace(/^\*\*\*$/gm, '<hr>');
    html = html.replace(/^___$/gm, '<hr>');

    // Re-enable <hr> tags that were in the original content
    html = html.replace(/<hr\s*\/?>/gi, '<hr>');

    // Convert headers (h1-h6)
    html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

    // Convert markdown bold (must come before italic to handle ***)
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert markdown italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert markdown code (inline)
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Convert markdown links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Convert lists
    // Bullet points
    html = html.replace(/^[\s]*[•·▪▫◦‣⁃]\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/^[\s]*[-*+]\s+(.+)$/gm, '<li>$1</li>');

    // Numbered lists
    html = html.replace(/^[\s]*\d+\.\s+(.+)$/gm, '<li class="numbered">$1</li>');

    // Wrap consecutive <li> elements in <ul> or <ol>
    html = html.replace(/(<li>.*?<\/li>\s*)+/g, (match) => {
      return `<ul>${match}</ul>`;
    });
    html = html.replace(/(<li class="numbered">.*?<\/li>\s*)+/g, (match) => {
      const items = match.replace(/class="numbered"/g, '');
      return `<ol>${items}</ol>`;
    });

    // Convert line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
  } catch (error) {
    console.error('Error in markdownToHtml:', error);
    return text || '';
  }
};

// Sanitize HTML to prevent XSS
const sanitizeHtml = (html: string): string => {
  const config = {
    ALLOWED_TAGS: [
      'strong', 'em', 'code', 'a', 'hr', 'br',
      'ul', 'ol', 'li', 'p', 'div', 'span',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'pre'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
    ADD_ATTR: ['target', 'rel'],
  };

  let clean = DOMPurify.sanitize(html, config);
  clean = clean.replace(/<a\s+href=/g, '<a target="_blank" rel="noopener noreferrer" href=');

  return clean;
};

// Parser options for html-react-parser
const createParserOptions = (isDarkMode: boolean = false): HTMLReactParserOptions => ({
  replace: (domNode) => {
    if (domNode.type === 'tag' && domNode instanceof Element) {
      const { name, attribs, children } = domNode;

      switch (name) {
        case 'h1':
          return (
            <h1 className="text-2xl font-bold mt-4 mb-2 text-slate-900 dark:text-slate-100">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </h1>
          );

        case 'h2':
          return (
            <h2 className="text-xl font-bold mt-3 mb-2 text-slate-800 dark:text-slate-200">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </h2>
          );

        case 'h3':
          return (
            <h3 className="text-lg font-semibold mt-2 mb-1 text-slate-700 dark:text-slate-300">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </h3>
          );

        case 'strong':
          return (
            <strong className="font-bold text-blue-400 dark:text-blue-400">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </strong>
          );

        case 'em':
          return (
            <em className="italic text-slate-600 dark:text-slate-400">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </em>
          );

        case 'code':
          return (
            <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 rounded text-sm font-mono">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </code>
          );

        case 'a':
          return (
            <a
              href={attribs.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-1 underline-offset-2"
            >
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </a>
          );

        case 'hr':
          return <hr className="my-4 border-slate-300 dark:border-slate-600" />;

        case 'ul':
          return (
            <ul className="list-disc list-inside ml-4 my-2 space-y-1 text-slate-700 dark:text-slate-300">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </ul>
          );

        case 'ol':
          return (
            <ol className="list-decimal list-inside ml-4 my-2 space-y-1 text-slate-700 dark:text-slate-300">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </ol>
          );

        case 'li':
          return (
            <li className="my-0.5 leading-relaxed">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </li>
          );

        case 'blockquote':
          return (
            <blockquote className="border-l-4 border-blue-400 pl-4 my-3 italic text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 py-2 rounded-r">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </blockquote>
          );

        case 'br':
          return <br />;

        default:
          return undefined;
      }
    }
    return undefined;
  }
});

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
      <Skeleton className="h-20 w-full mt-4" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
    </CardContent>
  </Card>
);

// Main Insight Component
export const Insight: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // TanStack Query with manual refresh only
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery<InsightResponse>({
    queryKey: ['insights'],
    queryFn: () => fetchInsights(false),
    staleTime: Infinity, // Never stale - only refresh manually
    gcTime: Infinity, // Keep in cache forever
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Force refresh by bypassing cache
      await fetchInsights(true);
      
      // Update query data
      await refetch();
    } catch (err) {
      console.error('Error refreshing insights:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Process content - Updated to use data.data instead of data.insights.answer
  const processedContent = React.useMemo(() => {
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
            onClick={() => refetch()}
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

  // Get cache info for display
  const cacheInfo = getLocalStorageCache();
  const isCached = !!cacheInfo;
  const cacheAge = cacheInfo ? Math.floor((Date.now() - cacheInfo.timestamp) / (1000 * 60)) : 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full p-5 border-blue-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaRegLightbulb className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Insights - Powered by AI</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">
                    Deep analysis of sentiment data
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  size="sm"
                  disabled={isRefreshing || isFetching}
                  className="flex items-center gap-2"
                >
                  <FiRefreshCw className={`h-4 w-4 ${isRefreshing || isFetching ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                {(isFetching || isRefreshing) && (
                  <Badge variant="secondary" className="animate-pulse">
                    <FiRefreshCw className="mr-1 h-3 w-3 animate-spin" />
                    Updating
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-2">

            {/* Main Content */}
            <div className={`prose prose-slate dark:prose-invert max-w-none ${!isExpanded ? 'line-clamp-6' : ''}`}>
              {processedContent}
            </div>

            {/* Expand/Collapse Button */}
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="ghost"
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </Button>

            {/* Cache Management - Updated */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>
                Click refresh button to get latest insights
              </span>
              {isCached && (
                <Button
                  onClick={() => {
                    clearInsightCache();
                    refetch();
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  Clear Cache
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

// Export with default props
export default Insight;