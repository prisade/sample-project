import { Spinner } from '../../../components/ui/spinner';
import { useJobFormStore } from '../../../store';
import type { Job } from '../api/job-types';
import { JobCreateForm } from './job-create-form';
import { JobEditForm } from './job-edit-form';
import { JobDeleteButton } from './job-delete-button';
import { Button } from '../../../components/ui/button/button';
import { JobView } from './job-view';
import { useSingleJob } from '../hooks/useSingleJob';
import { useFetchAllJobs } from '../hooks/useFetchAllJobs';
import { useEditJob } from '../hooks/useEditJob';

export const JobList = () => {
    const {
        editId,
        updateJob,
        deleteJob,
    } = useJobFormStore();

    const { jobsData, isLoadingJobs } = useFetchAllJobs();
    const { singleJobData, isViewSingleJob, isLoadingJob, handleView } = useSingleJob();
    const { handleEdit } = useEditJob();

    // Show spinner when loading a single job view
    if (isViewSingleJob && isLoadingJob || isLoadingJobs && !isViewSingleJob) {
        return <div className='flex items-center justify-center h-screen'><Spinner /></div>;
    }

    return (
        <main>
            {isViewSingleJob ? (
                <div>
                    <JobView jobData={singleJobData} />
                </div>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-8">List of jobs available</h1>
                    {/* Use JobCreateForm without addJob prop, it uses Zustand directly */}
                    <JobCreateForm />
                    <div className="mt-4">
                        <ul className="space-y-2">
                            {[...jobsData].reverse().map((jobsData: Job) => (
                                <li key={jobsData.id} className="border p-2 rounded flex flex-col gap-2">
                                    {editId === jobsData.id ? (
                                        <JobEditForm updateJob={updateJob} />
                                    ) : (
                                        <>
                                            <div className="font-semibold cursor-pointer" onClick={() => handleView(jobsData.id)}>{jobsData.title}</div>
                                            <div className="text-sm text-gray-600">{jobsData.body}</div>
                                            <div className="flex gap-2 mt-2">
                                                <Button className="bg-yellow-400 text-white px-2 py-1 rounded" onClick={() => handleEdit(jobsData)}>
                                                    Edit
                                                </Button>
                                                <JobDeleteButton jobId={jobsData.id} deleteJob={deleteJob} />
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

