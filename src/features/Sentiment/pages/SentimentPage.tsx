
import { usePageHeader } from '@/hooks/usePageHeader';
import { sentimentBreadcrumbs } from '@/lib/breadcumb-config';
import React from 'react';

const SentimentPage: React.FC = () => {
  usePageHeader(sentimentBreadcrumbs);
  return (

    <div>
      <h1 className="text-2xl font-bold">Sentiment Analysis</h1>
      <p className="mt-2 text-muted-foreground">
        Sentiments Analysis page content goes here.
      </p>
      {/* Tambahkan card, chart, dll di sini */}
    </div>
  );
};

export default SentimentPage;
