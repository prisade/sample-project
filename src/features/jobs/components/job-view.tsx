import { Button } from '../../../components/ui/button/button';
import { useJobFormStore } from '../../../store';
import type { Job } from '../api/job-types';

export const JobView = ({ jobData }: { jobData: Job | null }) => {
    if (!jobData) return null;

    const { title, body } = jobData;

    const {
        setIsViewSingleJob
    } = useJobFormStore();

    const handleBackToJobList = () => {
        setIsViewSingleJob(false)
    }

    return (
        <>
            <div className="flex mt-4">
                <Button className="bg-red-400 text-white px-4 py-1 rounded cursor-pointer" onClick={() => handleBackToJobList()}>
                    Back
                </Button>
            </div >
            <div className='p-4 bg-white shadow roundered-lg mt-14'>
                <h1 className='text-2xl font-bold'>Job Details:</h1>
                <div className='mt-2'>
                    <h2 className='text-xl font-semibold'>{title}</h2>
                    <p className='text-gray-600 mt-1'>{body}</p>
                </div>
            </div>
        </>
    );
};
