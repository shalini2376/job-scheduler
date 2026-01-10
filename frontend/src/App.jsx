import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchJobs } from './services/jobApi';
import JobDetail from './pages/JobDetail';
import CreateJobForm from './components/CreateJobForm';
import JobsTable from './components/JobsTable';

import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const loadJobs = () => {
    fetchJobs({
      status: statusFilter || undefined,
      priority: priorityFilter || undefined
    }).then((data) => setJobs(data));
  };

  useEffect(() => {
    loadJobs();
  }, [statusFilter, priorityFilter]);

  console.log(import.meta.env.VITE_API_BASE_URL);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold text-center">Job Scheduler</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <CreateJobForm onJobCreated={loadJobs} />
              <h2 className="text-3xl font-semibold mt-10">Jobs Dashboard</h2>
              <h2 className="text-2xl font-semibold mt-6 mb-4">Filters</h2>

              <div className="flex gap-4 mb-6">
                <select
                  className="border p-2 rounded"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="running">Running</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  className="border p-2 rounded"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="">All Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <JobsTable jobs={jobs} onJobUpdated={loadJobs} />
            </>
          }
        />

        <Route path="/jobs/:id" element={<JobDetail />} />
      </Routes>
    </div>
  );
}

export default App;
