import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchJobs } from "./services/jobApi";
import JobDetail from "./pages/JobDetail";
import CreateJobForm from "./components/CreateJobForm";
import JobsTable from "./components/JobsTable";

function App() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await fetchJobs({
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
      });
      setJobs(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [statusFilter, priorityFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* App Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Job Scheduler
        </h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Create Job Section */}
                <div className="mb-12">
                  <CreateJobForm onJobCreated={loadJobs} />
                </div>

                {/* Dashboard Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Jobs Dashboard
                    </h2>

                    {/* Filters */}
                    <div className="flex gap-3 mt-4 sm:mt-0">
                      <select
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="running">Running</option>
                        <option value="completed">Completed</option>
                      </select>

                      <select
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                      >
                        <option value="">All Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>

                  {/* Jobs Table / Loader */}
                  {loading ? (
                    <div className="flex justify-center items-center py-12 text-gray-600">
                      Loading jobs...
                    </div>
                  ) : (
                    <JobsTable jobs={jobs} onJobUpdated={loadJobs} />
                  )}
                </div>
              </>
            }
          />

          <Route path="/jobs/:id" element={<JobDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
