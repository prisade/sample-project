import { useEffect, useState } from "react";
import { useViewJob } from "../api/job-hooks";
import { useJobFormStore } from "../../../store";

export function useSingleJob() {
    const [singleJobId, setSingleJobId] = useState<number>(0);

    const {
        jobsData,
        singleJobData,
        isViewSingleJob,
        setIsViewSingleJob,
        setSingleJobData
    } = useJobFormStore();

    const { data: fetchedSingleJobData, isLoading: isLoadingJob } = useViewJob(singleJobId);

    const handleView = (id: number) => {
        setSingleJobId(id);
        setIsViewSingleJob(true);
        const filtered = jobsData.filter(job => job.id === id);
        if (id > 100) {
            setSingleJobData(filtered[0])
        }
    };

    useEffect(() => {
        if (fetchedSingleJobData) {
            setSingleJobData(fetchedSingleJobData);
        }
    }, [fetchedSingleJobData, setSingleJobData]);

    return {
        singleJobData,
        isViewSingleJob,
        isLoadingJob,
        handleView
    }
}