
import { usePageHeader } from '@/hooks/usePageHeader';
import { recomendationBreadcrumbs } from '@/lib/breadcumb-config';
import React from 'react';

const RecomendationPage: React.FC = () => {
  usePageHeader(recomendationBreadcrumbs);
  return (

    <div>
      <h1 className="text-2xl font-bold">Recomendation Content</h1>
      <p className="mt-2 text-muted-foreground">
        Recomendation Content page content goes here.
      </p>
      {/* Tambahkan card, chart, dll di sini */}
    </div>

  );
};

export default RecomendationPage;
