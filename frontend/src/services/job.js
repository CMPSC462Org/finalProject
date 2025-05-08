import api from "./api";


export const createJob = async (jobData) => {
    const response = await api.post('/job/createjob',jobData);
    return response.data;
};


export const getJobs = async () => {
    const repsonse = await api.get('/job/getjobs');
    return repsonse.data;
};


export const getJobById = async (jobId) => {
    const response = await api.get(`/job/getjob/${jobId}`);
    return response.data;
};


export const updateJob = async (jobId, jobData) => {
    const response = await api.put(`/job/updatejob/${jobId}`, jobData);
    return response.data;
};


export const deleteJob = async (jobId) => {
    const response = await api.delete(`/job/deletejob/${jobId}`);
    return response.data;
}