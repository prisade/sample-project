import { create } from "zustand";

export type Job = {
    id: number;
    title: string;
    body: string;
    userId: number;
};

export type JobFormState = {
    title: string;
    body: string;
    editId: number | null;
    editTitle: string;
    editBody: string;
    jobsData: Job[];
    jobData?: Job | null;
    isViewSingleJob: boolean;
    setTitle: (title: string) => void;
    setBody: (body: string) => void;
    setEditId: (id: number | null) => void;
    setEditTitle: (title: string) => void;
    setEditBody: (body: string) => void;
    resetForm: () => void;
    resetEdit: () => void;
    setJobs: (jobs: Job[]) => void;
    addJob: (job: Job) => void;
    updateJob: (job: Job) => void;
    deleteJob: (id: number) => void;
    setIsViewSingleJob: (isView: boolean) => void;
};

export const useJobFormStore = create<JobFormState>((set) => ({
    title: '',
    body: '',
    editId: null,
    editTitle: '',
    editBody: '',
    jobsData: [],
    jobData: null,
    isViewSingleJob: false,
    setTitle: (title) => set({ title }),
    setBody: (body) => set({ body }),
    setEditId: (editId) => set({ editId }),
    setEditTitle: (editTitle) => set({ editTitle }),
    setEditBody: (editBody) => set({ editBody }),
    resetForm: () => set({ title: '', body: '' }),
    resetEdit: () => set({ editId: null, editTitle: '', editBody: '' }),
    setJobs: (jobs) => set({ jobsData: jobs }),
    setJob: (job: Job | null) => set({ jobData: job }),
    addJob: (job) => set((state) => ({ jobsData: [...state.jobsData, job] })),
    updateJob: (job) => set((state) => ({ jobsData: state.jobsData.map(j => j.id === job.id ? job : j) })),
    deleteJob: (id) => set((state) => ({ jobsData: state.jobsData.filter(j => j.id !== id) })),
    setIsViewSingleJob: (isView) => set({ isViewSingleJob: isView })
}));