import { Button } from '../../../components/ui/button/button';

export const JobDeleteButton = ({ jobId, deleteJob }: { jobId: number; deleteJob: (id: number) => void }) => {
    return (
        <Button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => deleteJob(jobId)}
        >
            Delete
        </Button>
    );
};
