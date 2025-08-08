import { useEffect } from "react";
import { useJobFormStore } from "../../../store";
import { useJobs } from "../api/job-hooks";

export function useFetchAllJobs() {
    const {
        jobsData,
        setJobs
    } = useJobFormStore();

    const { data: fetchedJobs, isLoading: isLoadingJobs } = useJobs();

    // On first fetch, store jobs in zustand
    useEffect(() => {
        if (fetchedJobs && fetchedJobs.length && jobsData.length === 0) {
            setJobs(fetchedJobs);
        }
    }, [fetchedJobs, setJobs, jobsData.length]);

    // This hook only returns state. Render loading UI in the component using this hook.
    return {
        isLoadingJobs,
        jobsData
    }
}