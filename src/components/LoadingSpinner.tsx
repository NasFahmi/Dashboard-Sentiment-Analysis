export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen p-4">
      <div 
        className="relative"
        aria-live="polite"
        aria-busy="true"
      >
        {/* Outer ring */}
        <div className="animate-spin rounded-full h-16 w-16 md:h-20 md:w-20 border-4 border-transparent border-t-(--color-logo-2) border-r-(--color-logo-2)"></div>
        
        {/* Inner dot (optional visual enhancement) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-2 w-2 md:h-3 md:w-3  bg-(--color-logo-1) rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};