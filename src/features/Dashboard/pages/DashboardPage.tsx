// src/features/Dashboard/pages/DashboardPage.tsx
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Ini adalah konten dashboard yang muncul di dalam layout.
      </p>
      {/* Tambahkan card, chart, dll di sini */}
    </div>

  );
};

export default DashboardPage;