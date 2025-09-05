import './App.css'
import { JobList } from '../features/jobs/components/job-list.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useMemo } from 'react';

function App() {
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity, // Never mark data as stale
        gcTime: Infinity, // Never remove from cache
        retry: false, // Don't retry failed requests
        refetchOnWindowFocus: false, // Prevent refetch on window focus
        refetchOnMount: false, // Prevent refetch on component mount
      },
    },
  }), []);

  return (
    <QueryClientProvider client={queryClient}>
      <JobList />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
