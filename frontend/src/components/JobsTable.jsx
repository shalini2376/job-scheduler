import { useNavigate } from "react-router-dom";
import { runJob } from "../services/jobApi";

function JobsTable({ jobs, onJobUpdated }) {
  const navigate = useNavigate();

  if (!jobs.length) {
    return (
      <p className="text-center text-gray-500 py-10">
        No jobs found. Create a job to get started
      </p>
    );
  }

  const handleRun = async (jobId) => {
    await runJob(jobId);
    onJobUpdated();
  };

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    running: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
        {/* TABLE HEAD */}
        <thead className="text-gray-800 text-sm uppercase tracking-wide bg-pink-300">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Task Name</th>
            <th className="px-4 py-3 text-left">Priority</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Created At</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody className="divide-y divide-gray-200">
          {jobs.map((job) => (
            <tr
              key={job.id}
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="cursor-pointer hover:bg-blue-50 transition-colors"
            >
              <td className="px-4 py-3 text-md text-gray-700">
                {job.id}
              </td>

              <td className="px-4 py-3 font-medium text-blue-600">
                {job.taskName}
              </td>

              <td className="px-4 py-3 text-md text-gray-700">
                {job.priority}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-s font-medium ${statusColor[job.status]}`}
                >
                  {job.status}
                </span>
              </td>

              <td className="px-4 py-3 text-sm text-gray-500">
                {job.createdAt}
              </td>

              <td className="px-4 py-3">
                {job.status === "pending" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRun(job.id);
                    }}
                    className="bg-red-500 hover:bg-red-600
                               text-white text-sm font-medium
                               px-4 py-1.5 rounded-md
                               transition"
                  >
                    Run
                  </button>
                )}

                {job.status === "running" && (
                  <span className="text-sm font-medium text-orange-600">
                    Running…
                  </span>
                )}

                {job.status === "completed" && (
                  <span className="text-sm font-medium text-green-600">
                    Completed
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobsTable;
