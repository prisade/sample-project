import { Button } from '../../../components/ui/button/button';
import { useDeleteJob } from '../api/job-hooks';

export const JobDeleteButton = ({ jobId }: { jobId: number }) => {
    const deleteJobMutation = useDeleteJob();
    return (
        <Button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => deleteJobMutation.mutate(jobId)}
            isLoading={deleteJobMutation.isPending}
        >
            Delete
        </Button>
    );
};
