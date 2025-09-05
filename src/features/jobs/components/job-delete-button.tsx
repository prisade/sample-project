import { Button } from '../../../components/ui/button/button';
import { useDeleteJob } from '../api/job-hooks';

type JobDeleteButtonProps = {
    jobId: number;
    onDelete?: () => void;
};

export const JobDeleteButton = ({ jobId, onDelete }: JobDeleteButtonProps) => {
    const { mutate: deleteJob, isPending: isLoading } = useDeleteJob();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            deleteJob(jobId, {
                onSuccess: () => {
                    onDelete?.();
                }
            });
        }
    };

    return (
        <Button
            className="bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDelete}
            disabled={isLoading}
        >
            {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
    );
};
