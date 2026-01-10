import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJobById } from '../services/jobApi';

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJobById(id).then((data) => setJob(data));
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center">Job Detail</h2>

      <p><strong>ID:</strong> {job.id}</p>
      <p><strong>Task Name:</strong> {job.taskName}</p>
      <p><strong>Status:</strong> {job.status}</p>
      <p><strong>Priority:</strong> {job.priority}</p>
      <p><strong>Created At:</strong> {job.createdAt}</p>

      <h3>Payload</h3>
      <pre>
        {JSON.stringify(JSON.parse(job.payload || '{}'), null, 2)}
      </pre>

      <Link to="/">⬅ Back to Dashboard</Link>
    </div>
  );
}

export default JobDetail;
