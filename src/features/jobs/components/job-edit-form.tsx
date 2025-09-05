import { useJobUIStore } from '../../../store';
import { Button } from '../../../components/ui/button/button';
import { useUpdateJob } from '../api/job-hooks';

export const JobEditForm = () => {
    const {
        editForm: { id: editId, title, body },
        setEditFormField,
        resetEditForm
    } = useJobUIStore();

    const { mutate: updateJob, isLoading } = useUpdateJob();

    const handleUpdateJob = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId !== null) {
            updateJob(
                {
                    id: editId,
                    title,
                    body,
                    userId: 1
                },
                {
                    onSuccess: () => {
                        resetEditForm();
                    }
                }
            );
        }
    };

    return (
        <form onSubmit={handleUpdateJob} className="flex flex-col gap-3">
            <div className="space-y-2">
                <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    id="edit-title"
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={title}
                    onChange={e => setEditFormField('title', e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="edit-description"
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={body}
                    onChange={e => setEditFormField('body', e.target.value)}
                    rows={4}
                    required
                />
            </div>

            <div className="flex gap-3">
                <Button 
                    type="submit" 
                    className="bg-green-500 hover:bg-green-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save'}
                </Button>
                <Button 
                    type="button" 
                    className="bg-gray-400 hover:bg-gray-500 text-white transition-colors"
                    onClick={resetEditForm}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
};
