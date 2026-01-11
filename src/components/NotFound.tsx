import { assets } from "@/assets/assets";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">

        {/* Icon */}
        <div className="flex justify-center">
          <img src={assets.NotFound} className="w-70" alt="" />
        </div>

        {/* Text */}
        <div className="space-y-2 flex justify-center items-center flex-col">
          <h1 className="font-semibold text-3xl ">Page Not Found</h1>
          <p className="text-normal text-muted-foreground leading-relaxed">
            This page is missing or no longer here.
            Just go back to the dashboard to pick up where you left off.
          </p>
        </div>

        {/* Action */}
        <div className="flex justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-(--color-logo-1) px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            <span className="text-white">Head back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
