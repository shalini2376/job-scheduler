import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchJobById } from "../services/jobApi";

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJobById(id).then((data) => setJob(data));
  }, [id]);

  if (!job) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-600">
        Loading job details...
      </div>
    );
  }

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    running: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center text-lg text-blue-600 hover:underline mb-6"
      >
        ← Back to Dashboard
      </Link>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Job Details
        </h2>

        <div className="divide-y divide-gray-200 text-sm">
          <div className="flex justify-between py-3">
            <span className="text-gray-500">Job ID</span>
            <span className="font-medium text-gray-800">{job.id}</span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-gray-500">Task Name</span>
            <span className="font-medium text-gray-800">{job.taskName}</span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-gray-500">Priority</span>
            <span className="font-medium text-gray-800">{job.priority}</span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-gray-500">Status</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[job.status]}`}
            >
              {job.status}
            </span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-gray-500">Created At</span>
            <span className="font-medium text-gray-800">{job.createdAt}</span>
          </div>
        </div>


        {/* Payload */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Payload
          </h3>

          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 overflow-auto">
            {JSON.stringify(
              job.payload ? JSON.parse(job.payload) : {},
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
