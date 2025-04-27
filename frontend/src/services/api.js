const BASE_URL = '/api';  // Proxy handles redirecting to Flask backend

export const createJob = async (job, token) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // if you're using auth
    },
    body: JSON.stringify(job)
  });
  return await res.json();
};

export const getJobs = async (token) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await res.json();
};
