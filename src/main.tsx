import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/routes/App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      <App />
      <Toaster position='top-center' toastOptions={{
        classNames: {
          success: "bg-green-600 text-white border-none",
          error: "bg-red-600 text-white border-none",
          info: "bg-blue-600 text-white border-none",
          default: "bg-gray-600 text-white border-none",

        }
      }} />
    </QueryClientProvider>
  </StrictMode>,
)
