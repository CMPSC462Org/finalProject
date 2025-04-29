import React , { useState, useEffect } from 'react'
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import JobEditModal from './JobEditModal';
import JobColumn from './JobColumn';
import { getJobs,deleteJob } from '../services/job';


const JobList = () => {


  const [jobs, setJobs ] = useState([]);
  const [loading, setLoading] = useState(true);

  const statuses = ["applied", "interviewed", "offered", "rejected", "awaiting"];
  const [selectedJob, setSelectedJob] = useState(null);
  // Mimic the data from the backend

  const fetchJobs = async () => {
    try {

      const response = await getJobs();
      setJobs(response.jobs); 

    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchJobs();
  }, []);



  const handleDelete =  async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs(prevJobs =>
        prevJobs.filter(
          job => job._id !== jobId
        )
      );
      console.log("succesfully deleted ");
    } catch (error) {
      console.error("Error deleting job: ", error);
    }
  }
  

  
  return (
    <div className="Main-JobCollumn-List-Container">
      
      { loading ? (
        <div className="Loading-Message">
          <div className="spinner">

          </div>
          
        </div>
      ) :
      
      
      jobs.length === 0 ? (
        <div className="Empty-Jobs-Message">
          <h2 className="No-Jobs-Title">No Job Entries yet! 🚀</h2>
          <p>Click "<strong>Add Job</strong>" to create your first job entry!</p>
        </div>

      ) : (
      
      statuses
      .filter((status) => jobs.some((job) => job.status === status)) 
      .map((status) => (
        <JobColumn 
          key={status} 
          status={status} 
          jobs={jobs.filter(job => job.status === status)} 
          onEdit={setSelectedJob}
          onDelete={handleDelete}
          
          
          />
      ))

       
      )}

    {selectedJob && 
    <JobEditModal 
    JobToEdit={selectedJob} 
    onClose={() => setSelectedJob(null)} 
    onUpdate={fetchJobs}
    
    
    />}




    </div>
  )
}

export default JobList