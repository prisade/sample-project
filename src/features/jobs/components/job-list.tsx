import { Spinner } from '../../../components/ui/spinner';
import { useJobUIStore } from '../../../store';
import type { Job } from '../types/job.types';
import { JobCreateForm } from './job-create-form';
import { JobEditForm } from './job-edit-form';
import { JobDeleteButton } from './job-delete-button';
import { Button } from '../../../components/ui/button/button';
import { JobView } from './job-view';
import { useJobs, useJob, useDeleteJob } from '../api/job-hooks';
import { useMemo } from 'react';

export const JobList = () => {
    const {
        editForm: { id: editId },
        isViewMode,
        setEditFormField,
        setViewMode
    } = useJobUIStore();

    // Queries
    const { data: jobs, isLoading: isLoadingJobs, error: jobsError } = useJobs();
    const { data: selectedJob, isLoading: isLoadingJob } = useJob(editId ?? 0);
    
    // Mutations
    const { mutate: deleteJob } = useDeleteJob();

    // Memoize sorted jobs to prevent unnecessary array operations
    const sortedJobs = useMemo(() => 
        jobs ? [...jobs].sort((a, b) => b.id - a.id) : [],
        [jobs]
    );

    // Handle loading states
    if (isViewMode && isLoadingJob || isLoadingJobs && !isViewMode) {
        return <div className='flex items-center justify-center h-screen'><Spinner /></div>;
    }

    // Handle error states
    if (jobsError) {
        return (
            <div className="text-red-500 p-4">
                Error loading jobs: {jobsError instanceof Error ? jobsError.message : 'Unknown error'}
            </div>
        );
    }

    const handleView = (id: number) => {
        setEditFormField('id', id);
        setViewMode(true);
    };

    const handleEdit = (job: Job) => {
        setEditFormField('id', job.id);
        setEditFormField('title', job.title);
        setEditFormField('body', job.body);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            {isViewMode ? (
                <div>
                    <JobView jobData={selectedJob ?? null} />
                </div>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-8">List of jobs available</h1>
                    <JobCreateForm />
                    <div className="mt-4">
                        <ul className="space-y-4">
                            {sortedJobs.map((job: Job) => (
                                <li key={job.id} className="bg-white shadow-sm border p-4 rounded-lg flex flex-col gap-3">
                                    {editId === job.id ? (
                                        <JobEditForm />
                                    ) : (
                                        <>
                                            <div 
                                                className="font-semibold cursor-pointer hover:text-blue-600 transition-colors" 
                                                onClick={() => handleView(job.id)}
                                            >
                                                {job.title}
                                            </div>
                                            <div className="text-sm text-gray-600">{job.body}</div>
                                            <div className="flex gap-3 mt-2">
                                                <Button 
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white transition-colors" 
                                                    onClick={() => handleEdit(job)}
                                                >
                                                    Edit
                                                </Button>
                                                <JobDeleteButton jobId={job.id} onDelete={() => deleteJob(job.id)} />
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </main>
    );
};

