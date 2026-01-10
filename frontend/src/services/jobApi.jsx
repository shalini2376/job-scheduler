const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchJobs(filters = {}) {
  const params = new URLSearchParams();

  if (filters.status) {
    params.append('status', filters.status);
  }

  if (filters.priority) {
    params.append('priority', filters.priority);
  }

  const query = params.toString();
  const url = query
    ? `${BASE_URL}/jobs?${query}`
    : `${BASE_URL}/jobs`;

  const res = await fetch(url);
  return res.json();
}

export async function createJob(jobData) {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jobData)
    });
    return res.json();
}

export async function runJob(jobId) {
    const res = await fetch(`${BASE_URL}/jobs/run/${jobId}`, {
        method: 'POST',
    });
    return res.json();
}

export async function fetchJobById(id) {
    const res = await fetch(`${BASE_URL}/jobs/${id}`);
    return res.json();
}
