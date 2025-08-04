import { useJobFormStore } from '../../../store';
import { Button } from '../../../components/ui/button/button';
import { useCreateJob } from '../api/job-hooks';

export const JobCreateForm = () => {
    const { title, body, setTitle, setBody, resetForm } = useJobFormStore();
    const createJobMutation = useCreateJob();

    const handleAddJob = (e: React.FormEvent) => {
        e.preventDefault();
        createJobMutation.mutate({
            title,
            body,
            userId: 1
        });
        resetForm();
    };

    return (
        <form onSubmit={handleAddJob} className="my-4 flex flex-col gap-2 max-w-md">
            <input
                className="border p-2 rounded"
                placeholder="Job Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <textarea
                className="border p-2 rounded"
                placeholder="Job Description"
                value={body}
                onChange={e => setBody(e.target.value)}
                required
            />
            <Button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                isLoading={createJobMutation.isPending}
            >
                Add Job
            </Button>
        </form>
    );
};
