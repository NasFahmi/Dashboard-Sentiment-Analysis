import { AlertCircle } from 'lucide-react';

interface ErrorStateDataProps {
  message?: string | null;
}

const ErrorStateData = ({ message }: ErrorStateDataProps) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md flex flex-col items-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-slate-800">
          {message || "Something went wrong"}
        </h2>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          Please try again later or contact support if the problem persists.
        </p>
      </div>
    </div>
  );
};

export default ErrorStateData;
