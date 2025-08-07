import { Spinner } from '../../../components/ui/spinner';
import { useJobFormStore } from '../../../store';
import { useEffect } from 'react';
import { useJobs, useViewJob } from '../api/job-hooks';
import type { Job } from '../api/job-types';
import { JobCreateForm } from './job-create-form';
import { JobEditForm } from './job-edit-form';
import { JobDeleteButton } from './job-delete-button';
import { Button } from '../../../components/ui/button/button';
import { JobView } from './job-view';

export const JobList = () => {
    const {
        editId,
        setEditId,
        setEditTitle,
        setEditBody,
        jobsData,
        setJobs,
        updateJob,
        deleteJob,
        isViewSingleJob,
        setIsViewSingleJob,
    } = useJobFormStore();

    const { data: fetchedJobs, isLoading, error } = useJobs();
    const { mutate: fetchSingleJob, data: jobData } = useViewJob();

    // On first fetch, store jobs in zustand
    useEffect(() => {
        if (fetchedJobs && fetchedJobs.length && jobsData.length === 0) {
            setJobs(fetchedJobs);
        }
    }, [fetchedJobs, setJobs, jobsData.length]);

    if (error) {
        alert('Error fetching jobs: ' + (error as any).message);
    }

    if (isLoading && jobsData.length === 0) {
        return <div className='flex items-center justify-center h-screen'><Spinner /></div>;
    }

    const handleEdit = (job: Job) => {
        setEditId(job.id);
        setEditTitle(job.title);
        setEditBody(job.body);
    };

    const handleView = (id: number) => {
        setIsViewSingleJob(true);
        fetchSingleJob(id);
        console.log('Vieweing job data: ', jobData);

        console.log('Jobss data: ', jobsData);
    }

    return (
        <main>
            {isViewSingleJob ? (
                <div>
                    <JobView jobData={jobData} />
                </div>
            ) : (
                <>
                    <h1 className="text-2xl font-bold">List of job listing</h1>
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
                                            <div className="font-semibold cursor-pointer" onClick={() => handleView(jobsData.id)}>{jobsData.title} test</div>
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
