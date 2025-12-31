import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import DashboardLayout from "@/layout/DashboardLayout";
import NotFoundPage from "@/components/NotFound";
// import ProtectedRoute from './ProtectedRoute';
const HomePage = lazy(() => import("@/features/Home/page/HomePage"));
const LoginPage = lazy(() => import("@/features/Login/pages/LoginPage.tsx"));
const DashboardPage = lazy(
  () => import("@/features/Dashboard/pages/DashboardPage.tsx")
);
const RegisterPage = lazy(
  () => import("@/features/Register/pages/RegisterPage.tsx")
);
const LandingPage = lazy(
  () => import("@/features/LandingPage/pages/LandingPage.tsx")
);
const SentimentPage = lazy(
  () => import("@/features/Sentiment/pages/SentimentPage.tsx")
);
const Scrapping = lazy(
  () => import("@/features/Scrapping/pages/ScrappingPage.tsx")
);
const RecomendationContent = lazy(
  () => import("@/features/Recomendation/pages/RecomendationPage.tsx")
);
const Settings = lazy(
  () => import("@/features/Settings/pages/SettingsPage.tsx")
);
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path="/home"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <HomePage />
            </Suspense>
          }
        />

        <Route
          path="/register"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <RegisterPage />
            </Suspense>
          }
        />

        <Route
          path="/login"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <LoginPage />
            </Suspense>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              {/* <ProtectedRoute> */}
              <DashboardLayout />
              {/* </ProtectedRoute> */}
            </Suspense>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="sentiments" element={<SentimentPage />} />
          <Route path="scrapes" element={<Scrapping />} />
          <Route
            path="recommendation-content"
            element={<RecomendationContent />}
          />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
export default App;
