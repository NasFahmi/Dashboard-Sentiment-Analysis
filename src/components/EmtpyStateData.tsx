import { Link } from 'react-router'

const EmtpyStateData = () => {
  return (

    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-semibold text-slate-800">
          No Data Available
        </h2>
        <p className="mt-3 text-sm text-slate-500 leading-relaxed">
          You haven’t scraped any social media data yet.
          Please collect data first before viewing the sentiment dashboard.
        </p>

        <Link
          to="/dashboard/scrapes"
          className="inline-flex items-center justify-center mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          Go to Data Scraper
        </Link>
      </div>
    </div>
  )
}

export default EmtpyStateData
