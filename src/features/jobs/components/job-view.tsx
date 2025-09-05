import { Button } from '../../../components/ui/button/button';
import { useJobUIStore } from '../../../store';
import type { Job } from '../types/job.types';
import { Spinner } from '../../../components/ui/spinner';

export const JobView = ({ jobData }: { jobData: Job | null }) => {
    const { setViewMode } = useJobUIStore();

    if (!jobData) {
        return (
            <div className="flex items-center justify-center h-64">
                <Spinner />
            </div>
        );
    }

    const { title, body } = jobData;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
                <Button 
                    className="bg-gray-500 hover:bg-gray-600 text-white transition-colors" 
                    onClick={() => setViewMode(false)}
                >
                    ← Back to List
                </Button>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Job Details
                    </h1>
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                {title}
                            </h2>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                {body}
                            </p>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-sm font-medium text-gray-500">
                                Job ID: {jobData.id}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
