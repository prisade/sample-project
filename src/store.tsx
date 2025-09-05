import { create } from "zustand";

// Move Job type to types file
export type Job = {
    id: number;
    title: string;
    body: string;
    userId: number;
};

// UI-only state
export type JobUIState = {
    // Create form state
    createForm: {
        title: string;
        body: string;
    };
    // Edit form state
    editForm: {
        id: number | null;
        title: string;
        body: string;
    };
    // View state
    isViewMode: boolean;
    // Actions
    setCreateFormField: (field: keyof JobUIState['createForm'], value: string) => void;
    setEditFormField: (field: keyof JobUIState['editForm'], value: string | number | null) => void;
    resetCreateForm: () => void;
    resetEditForm: () => void;
    setViewMode: (isView: boolean) => void;
};

const initialState = {
    createForm: {
        title: '',
        body: '',
    },
    editForm: {
        id: null,
        title: '',
        body: '',
    },
    isViewMode: false,
};

export const useJobUIStore = create<JobUIState>((set) => ({
    ...initialState,
    
    setCreateFormField: (field, value) => 
        set((state) => ({
            createForm: {
                ...state.createForm,
                [field]: value
            }
        })),
    
    setEditFormField: (field, value) =>
        set((state) => ({
            editForm: {
                ...state.editForm,
                [field]: value
            }
        })),
    
    resetCreateForm: () => 
        set((state) => ({
            ...state,
            createForm: initialState.createForm
        })),
    
    resetEditForm: () =>
        set((state) => ({
            ...state,
            editForm: initialState.editForm
        })),
    
    setViewMode: (isView) =>
        set({ isViewMode: isView }),
}));