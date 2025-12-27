import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { LoadingSpinner } from '@/components/LoadingSpinner';
const HomePage = lazy(() => import('@/features/home/page/HomePage.tsx'));
const App = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <HomePage />
            </Suspense>
          } 
        />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};
export default App;