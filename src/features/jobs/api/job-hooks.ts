import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { Job } from '../types/job.types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Mock data storage
let mockJobs: Job[] = [];

// API functions
const jobsApi = {
  getAll: async (): Promise<Job[]> => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/posts`);
      // Combine mock data with API data, prioritizing mock data
      const allJobs = [...mockJobs, ...data];
      // Remove duplicates (if a mock job has same id as API job)
      return allJobs.filter((job, index, self) => 
        index === self.findIndex(j => j.id === job.id)
      );
    } catch (error) {
      // If API fails, return mock data
      return mockJobs;
    }
  },
  
  getById: async (id: number): Promise<Job> => {
    // Check mock data first
    const mockJob = mockJobs.find(job => job.id === id);
    if (mockJob) return mockJob;
    
    try {
      const { data } = await axios.get(`${API_BASE_URL}/posts/${id}`);
      return data;
    } catch (error) {
      throw new Error(`Job with id ${id} not found`);
    }
  },
  
  create: async (newJob: Omit<Job, 'id'>): Promise<Job> => {
    // Create a mock job with unique ID
    const mockJob = { 
      ...newJob, 
      id: Date.now() + Math.floor(Math.random() * 1000)
    };
    mockJobs = [mockJob, ...mockJobs];
    return mockJob;
  },
  
  update: async (updatedJob: Job): Promise<Job> => {
    const index = mockJobs.findIndex(job => job.id === updatedJob.id);
    if (index !== -1) {
      mockJobs[index] = updatedJob;
      return updatedJob;
    }
    
    try {
      const { data } = await axios.put(`${API_BASE_URL}/posts/${updatedJob.id}`, updatedJob);
      return data;
    } catch (error) {
      // If API fails, add to mock data
      mockJobs = [...mockJobs, updatedJob];
      return updatedJob;
    }
  },
  
  delete: async (id: number): Promise<void> => {
    mockJobs = mockJobs.filter(job => job.id !== id);
    try {
      await axios.delete(`${API_BASE_URL}/posts/${id}`);
    } catch (error) {
      // Ignore API errors for delete
    }
  }
};

// Query keys
export const jobKeys = {
  all: ['jobs'] as const,
  lists: () => [...jobKeys.all, 'list'] as const,
  list: (filters: string) => [...jobKeys.lists(), { filters }] as const,
  details: () => [...jobKeys.all, 'detail'] as const,
  detail: (id: number) => [...jobKeys.details(), id] as const,
};

// Hooks
export function useJobs() {
  return useQuery({
    queryKey: jobKeys.lists(),
    queryFn: jobsApi.getAll,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
}

export function useJob(id: number) {
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () => jobsApi.getById(id),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: jobsApi.create,
    onMutate: async (newJob) => {
      await queryClient.cancelQueries({ queryKey: jobKeys.lists() });
      const previousJobs = queryClient.getQueryData<Job[]>(jobKeys.lists());
      
      // Optimistically update with the same ID that will be used in mock data
      const optimisticId = Date.now() + Math.floor(Math.random() * 1000);
      const optimisticJob = { ...newJob, id: optimisticId };
      
      queryClient.setQueryData<Job[]>(jobKeys.lists(), old => 
        old ? [optimisticJob, ...old] : [optimisticJob]
      );
      
      return { previousJobs };
    },
    onError: (_err, _newJob, context) => {
      if (context?.previousJobs) {
        queryClient.setQueryData(jobKeys.lists(), context.previousJobs);
      }
    }
    // Removed onSettled to prevent refetching
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: jobsApi.update,
    onMutate: async (updatedJob) => {
      await queryClient.cancelQueries({ queryKey: jobKeys.detail(updatedJob.id) });
      await queryClient.cancelQueries({ queryKey: jobKeys.lists() });
      
      const previousJob = queryClient.getQueryData<Job>(jobKeys.detail(updatedJob.id));
      const previousJobs = queryClient.getQueryData<Job[]>(jobKeys.lists());
      
      queryClient.setQueryData<Job>(jobKeys.detail(updatedJob.id), updatedJob);
      queryClient.setQueryData<Job[]>(jobKeys.lists(), old =>
        old?.map(job => job.id === updatedJob.id ? updatedJob : job) ?? []
      );
      
      return { previousJob, previousJobs };
    },
    onError: (_err, updatedJob, context) => {
      if (context?.previousJob) {
        queryClient.setQueryData(jobKeys.detail(updatedJob.id), context.previousJob);
      }
      if (context?.previousJobs) {
        queryClient.setQueryData(jobKeys.lists(), context.previousJobs);
      }
    }
    // Removed onSettled to prevent refetching
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: jobsApi.delete,
    onMutate: async (jobId) => {
      await queryClient.cancelQueries({ queryKey: jobKeys.lists() });
      const previousJobs = queryClient.getQueryData<Job[]>(jobKeys.lists());
      
      queryClient.setQueryData<Job[]>(jobKeys.lists(), old =>
        old?.filter(job => job.id !== jobId) ?? []
      );
      
      return { previousJobs };
    },
    onError: (_err, _jobId, context) => {
      if (context?.previousJobs) {
        queryClient.setQueryData(jobKeys.lists(), context.previousJobs);
      }
    }
    // Removed onSettled to prevent refetching
  });
}
