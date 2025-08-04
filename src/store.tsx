import { create } from "zustand";

export type JobFormState = {
    title: string;
    body: string;
    editId: number | null;
    editTitle: string;
    editBody: string;
    setTitle: (title: string) => void;
    setBody: (body: string) => void;
    setEditId: (id: number | null) => void;
    setEditTitle: (title: string) => void;
    setEditBody: (body: string) => void;
    resetForm: () => void;
    resetEdit: () => void;
};

export const useJobFormStore = create<JobFormState>((set) => ({
    title: '',
    body: '',
    editId: null,
    editTitle: '',
    editBody: '',
    setTitle: (title) => set({ title }),
    setBody: (body) => set({ body }),
    setEditId: (editId) => set({ editId }),
    setEditTitle: (editTitle) => set({ editTitle }),
    setEditBody: (editBody) => set({ editBody }),
    resetForm: () => set({ title: '', body: '' }),
    resetEdit: () => set({ editId: null, editTitle: '', editBody: '' }),
}));