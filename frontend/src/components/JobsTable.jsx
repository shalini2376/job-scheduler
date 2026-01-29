import  {useNavigate } from 'react-router-dom';
import { runJob } from '../services/jobApi';

function JobsTable({jobs, onJobUpdated }){
    const navigate = useNavigate();

    if (!jobs.length){
        return <p>No jobs found.</p>
    }

    const handleRun = async (jobId) => {
        await runJob(jobId)
        onJobUpdated();
    }

    const statusColor = {
        pending: "bg-yellow-100 text-yellow-800",
        running: "bg-blue-100 text-blue-800",
        completed: "bg-green-100 text-green-800",
    };

    return (
        <>
            <table className="w-full border rounded overflow-hidden" border="1" cellPadding="8" cellSpacing="0">
                <thead className="bg-pink-100">
                    <tr>
                        <th>ID</th>
                        <th className="p-3 text-left">Task Name</th>
                        <th className="p-3 text-left">Priority</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">created At</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <tr key={job.id} className="border-t cursor-pointer hover:bg-gray-100 transition"
                            onClick={() => navigate(`/jobs/${job.id}`)}
                        >
                            <td className="p-3">
                                {job.id}
                            </td>
                            <td>{job.taskName}</td>
                            <td>{job.priority}</td>
                            <td>
                            <span className={`px-3 py-1 rounded-full text-sm ${statusColor[job.status]}`}>
                                {job.status}
                            </span>
                            </td>
                            <td>{job.createdAt}</td>
                            <td>
                                {job.status === 'pending' && (<button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleRun(job.id)}>Run</button>)}
                                {job.status === 'running' && (<span className="bg-orange-600 text-white px-3 py-1 rounded">Running...</span>)}
                                {job.status === 'completed' && (<span className="bg-green-600 text-white px-3 py-1 rounded">Completed</span>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default JobsTable