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

// Enhanced Markdown to HTML converter with table support
const markdownToHtml = (text: string | null | undefined): string => {
  if (!text || typeof text !== 'string') {
    console.warn('markdownToHtml received invalid input:', text);
    return '';
  }

  try {
    let html = text;

    // Escape HTML first to prevent XSS, but preserve our markdown
    html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Convert markdown horizontal rules
    html = html.replace(/^---$/gm, '<hr>');
    html = html.replace(/^\*\*\*$/gm, '<hr>');
    html = html.replace(/^___$/gm, '<hr>');

    // Re-enable <hr> tags that were in the original content
    html = html.replace(/&lt;hr\s*\/?&gt;/gi, '<hr>');

    // Convert headers (h1-h6)
    html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

    // Convert markdown tables
    html = convertTables(html);

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
    // Bullet points (support various bullet characters)
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

// Table conversion function
const convertTables = (text: string): string => {
  // Match markdown tables
  const tableRegex = /(\|.*\|[\r\n]+\|[-\s\|:]+\|[\r\n]+((?:\|.*\|[\r\n]*)+))/g;

  return text.replace(tableRegex, (match) => {
    const lines = match.trim().split(/[\r\n]+/);

    if (lines.length < 3) return match; // Not a valid table

    const headerLine = lines[0];
    // const separatorLine = lines[1];
    const dataLines = lines.slice(2);

    // Parse header
    const headers = headerLine
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell !== '');

    // Parse data rows
    const rows = dataLines
      .filter(line => line.trim() !== '')
      .map(line => {
        return line
          .split('|')
          .map(cell => cell.trim())
          .filter(cell => cell !== '');
      })
      .filter(row => row.length > 0);

    // Generate HTML table
    let tableHtml = '<table class="insight-table">';

    // Add header
    if (headers.length > 0) {
      tableHtml += '<thead><tr>';
      headers.forEach(header => {
        tableHtml += `<th>${header}</th>`;
      });
      tableHtml += '</tr></thead>';
    }

    // Add body
    if (rows.length > 0) {
      tableHtml += '<tbody>';
      rows.forEach(row => {
        tableHtml += '<tr>';
        row.forEach((cell, index) => {
          // Ensure we don't exceed header count
          if (index < headers.length) {
            tableHtml += `<td>${cell}</td>`;
          }
        });
        // Fill empty cells if row is shorter than headers
        for (let i = row.length; i < headers.length; i++) {
          tableHtml += '<td></td>';
        }
        tableHtml += '</tr>';
      });
      tableHtml += '</tbody>';
    }

    tableHtml += '</table>';

    return tableHtml;
  });
};

// Sanitize HTML to prevent XSS (updated to include table elements)
const sanitizeHtml = (html: string): string => {
  const config = {
    ALLOWED_TAGS: [
      'strong', 'em', 'code', 'a', 'hr', 'br',
      'ul', 'ol', 'li', 'p', 'div', 'span',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'pre',
      'table', 'thead', 'tbody', 'tr', 'th', 'td' // Table elements
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

// Enhanced parser options with table support
const createParserOptions = (isDarkMode: boolean = false): HTMLReactParserOptions => ({
  replace: (domNode) => {
    if (domNode.type === 'tag' && domNode instanceof Element) {
      const { name, attribs, children } = domNode;

      switch (name) {
        case 'h1':
          return (
            <h1 className="text-2xl font-bold mt-6 mb-3 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </h1>
          );

        case 'h2':
          return (
            <h2 className="text-xl font-bold mt-5 mb-3 text-slate-800 dark:text-slate-200">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </h2>
          );

        case 'h3':
          return (
            <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-700 dark:text-slate-300">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </h3>
          );

        case 'strong':
          return (
            <strong className="font-bold text-blue-600 dark:text-blue-400">
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
          return <hr className="my-6 border-slate-300 dark:border-slate-600" />;

        case 'ul':
          return (
            <ul className="list-disc list-inside ml-4 my-3 space-y-1 text-slate-700 dark:text-slate-300">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </ul>
          );

        case 'ol':
          return (
            <ol className="list-decimal list-inside ml-4 my-3 space-y-1 text-slate-700 dark:text-slate-300">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </ol>
          );

        case 'li':
          return (
            <li className="my-1 leading-relaxed">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </li>
          );

        case 'blockquote':
          return (
            <blockquote className="border-l-4 border-blue-400 pl-4 my-4 italic text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 py-3 rounded-r">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </blockquote>
          );

        // Table elements
        case 'table':
          return (
            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse bg-white dark:bg-slate-800 shadow-sm rounded-lg overflow-hidden">
                {domToReact(children as any, createParserOptions(isDarkMode))}
              </table>
            </div>
          );

        case 'thead':
          return (
            <thead className="bg-slate-50 dark:bg-slate-700">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </thead>
          );

        case 'tbody':
          return (
            <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </tbody>
          );

        case 'tr':
          return (
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </tr>
          );

        case 'th':
          return (
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-600">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </th>
          );

        case 'td':
          return (
            <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-600">
              {domToReact(children as any, createParserOptions(isDarkMode))}
            </td>
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
      <Skeleton className="h-32 w-full mt-4" />
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

              {isCached && (
                <Button
                  onClick={() => {
                    clearInsightCache();
                    refetch();
                  }}
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

// Export with default props
export default Insight;