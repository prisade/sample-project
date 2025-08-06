import { useEffect } from 'react';
import type { Job } from '../api/job-types';

export const JobView = ({ jobData }: { jobData: Job | null }) => {

    useEffect(() => {
        if (jobData) {
            console.log('Viewing job data:', jobData);
        }
    }, [jobData]);

    return (
        <>
            <h2>Job Data: </h2>
        </>
    );
};
