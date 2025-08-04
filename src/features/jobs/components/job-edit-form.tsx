import { useJobFormStore } from '../../../store';
import { Button } from '../../../components/ui/button/button';
import { useUpdateJob } from '../api/job-hooks';

export const JobEditForm = () => {
    const {
        editId,
        editTitle,
        editBody,
        setEditTitle,
        setEditBody,
        resetEdit
    } = useJobFormStore();
    const updateJobMutation = useUpdateJob();

    const handleUpdateJob = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId !== null) {
            updateJobMutation.mutate({
                id: editId,
                title: editTitle,
                body: editBody,
                userId: 1
            });
            resetEdit();
        }
    };

    return (
        <form onSubmit={handleUpdateJob} className="flex flex-col gap-2">
            <input
                className="border p-2 rounded"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                required
            />
            <textarea
                className="border p-2 rounded"
                value={editBody}
                onChange={e => setEditBody(e.target.value)}
                required
            />
            <div className="flex gap-2">
                <Button type="submit" className="bg-green-500 text-white px-2 py-1 rounded" isLoading={updateJobMutation.isPending}>
                    Save
                </Button>
                <Button type="button" className="bg-gray-400 text-white px-2 py-1 rounded" onClick={resetEdit}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};
