import { useState } from "react";
import { useJob } from "../api/job-hooks";
import { useJobUIStore } from "../../../store";

export function useSingleJob() {
    const [singleJobId, setSingleJobId] = useState<number | null>(null);
    const { setViewMode } = useJobUIStore();
    const { data: job, isLoading } = useJob(singleJobId ?? 0);

    const handleView = (id: number) => {
        setSingleJobId(id);
        setViewMode(true);
    };

    return {
        job,
        isLoading,
        handleView
    }
}