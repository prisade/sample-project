import { Spinner } from '../../../components/ui/spinner';
import { useJobFormStore } from '../../../store';
import { useJobs } from '../api/job-hooks';
import type { Job } from '../api/job-types';
import { JobCreateForm } from './job-create-form';
import { JobEditForm } from './job-edit-form';
import { JobDeleteButton } from './job-delete-button';
import { Button } from '../../../components/ui/button/button';

export const JobList = () => {
    const {
        editId,
        setEditId,
        setEditTitle,
        setEditBody    } = useJobFormStore();

    const { data: jobs, isLoading, error } = useJobs();

    if (error) {
        alert('Error fetching jobs: ' + (error as any).message);
    }

    if (isLoading) {
        return <div className='flex items-center justify-center h-screen'><Spinner /></div>;
    }

    const handleEdit = (job: Job) => {
        setEditId(job.id);
        setEditTitle(job.title);
        setEditBody(job.body);
    };

    return (
        <main>
            <h1 className="text-2xl font-bold">List of job listing</h1>
            <JobCreateForm />
            <div className="mt-4">
                <ul className="space-y-2">
                    {jobs?.map((job: Job) => (
                        <li key={job.id} className="border p-2 rounded flex flex-col gap-2">
                            {editId === job.id ? (
                                <JobEditForm />
                            ) : (
                                <>
                                    <div className="font-semibold">{job.title}</div>
                                    <div className="text-sm text-gray-600">{job.body}</div>
                                    <div className="flex gap-2 mt-2">
                                        <Button className="bg-yellow-400 text-white px-2 py-1 rounded" onClick={() => handleEdit(job)}>
                                            Edit
                                        </Button>
                                        <JobDeleteButton jobId={job.id} />
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};
