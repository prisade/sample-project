import { useJobUIStore } from '../../../store';
import { Button } from '../../../components/ui/button/button';
import { useCreateJob } from '../api/job-hooks';

export const JobCreateForm = () => {
    const { 
        createForm: { title, body },
        setCreateFormField,
        resetCreateForm
    } = useJobUIStore();

    const { mutate: createJob, isPending: isLoading } = useCreateJob();

    const handleAddJob = async (e: React.FormEvent) => {
        e.preventDefault();
        
        createJob(
            { title, body, userId: 1 },
            {
                onSuccess: () => {
                    resetCreateForm();
                }
            }
        );
    };

    return (
        <form onSubmit={handleAddJob} className="my-4 flex flex-col gap-3 max-w-md bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Job Title
                </label>
                <input
                    id="title"
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter job title"
                    value={title}
                    onChange={e => setCreateFormField('title', e.target.value)}
                    required
                />
            </div>
            
            <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Job Description
                </label>
                <textarea
                    id="description"
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter job description"
                    value={body}
                    onChange={e => setCreateFormField('body', e.target.value)}
                    rows={4}
                    required
                />
            </div>

            <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
            >
                {isLoading ? 'Adding...' : 'Add Job'}
            </Button>
        </form>
    );
};
