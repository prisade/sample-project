import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { Job } from '../api/job-types';

export function useJobs() {
  return useQuery({
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/posts').then(res => res.data),
    queryKey: ['jobs'],
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newJob: Omit<Job, 'id'>) =>
      axios.post('https://jsonplaceholder.typicode.com/posts', newJob).then(res => res.data),
    onSuccess: (data, variables) => {
      // Use the returned data if available, otherwise fallback to variables
      queryClient.setQueryData<Job[]>(['jobs'], (old) => {
        const newJob = data && data.id ? data : { ...variables, id: Date.now() };
        return old ? [newJob, ...old] : [newJob];
      });
    },
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedJob: Job) =>
      axios.put(`https://jsonplaceholder.typicode.com/posts/${updatedJob.id}`, updatedJob).then(res => res.data),
    onSuccess: (data, variables) => {
      // Use the returned data if available, otherwise fallback to variables
      queryClient.setQueryData<Job[]>(['jobs'], (old) =>
        old ? old.map(job => job.id === variables.id ? (data ? data : { ...job, ...variables }) : job) : []
      );
    },
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.data),
    onSuccess: (_data, id) => {
      // Optimistically update cache
      queryClient.setQueryData<Job[]>(['jobs'], (old) =>
        old ? old.filter(job => job.id !== id) : []
      );
    },
  });
}
