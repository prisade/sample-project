import { useJobFormStore, type Job } from "../../../store";

export function useEditJob() {
    const {
        setEditId,
        setEditTitle,
        setEditBody,
    } = useJobFormStore();

    const handleEdit = (job: Job) => {
        setEditId(job.id);
        setEditTitle(job.title);
        setEditBody(job.body);
    };

    return {
        handleEdit
    }
}