import './App.css'
import { JobList } from '../features/jobs/components/job-list.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <JobList />
    </QueryClientProvider>
  )
}

export default App
