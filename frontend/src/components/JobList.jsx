import React , { useState } from 'react'
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import JobEditModal from './JobEditModal';
import JobColumn from './JobColumn';

const JobList = () => {


  const statuses = ["applied", "interviewed", "offered", "rejected"];
  const [selectedJob, setSelectedJob] = useState(null);
  // Mimick the data from the backend
  const jobs = [
    {
      id: 1,
      title: "Software Engineer Intern",
      company: "Google",
      date: "2025-01-22",
      status: "interviewed",
      notes: "Waiting on recruiter",
    },
    {
      id: 2,
      title: "Frontend Intern",
      company: "Apple",
      date: "2025-01-20",
      status: "applied",
      notes: "Resume submitted",
    },
    {
      id: 3,
      title: "Backend Dev",
      company: "Meta",
      date: "2025-01-19",
      status: "offered",
      notes: "Waiting on response",
    },
  ];


  
  return (
    <div className="Main-JobCollumn-List-Container">
      
      {statuses.map((status) =>{
        return (
          <JobColumn 
          key={status} 
          status={status} 
          jobs={jobs.filter(job => job.status === status)} 
          onEdit={setSelectedJob}
          
          
          
          />

          
          
        )

       

      })}

    {selectedJob && 
    <JobEditModal 
    JobToEdit={selectedJob} 
    onClose={() => setSelectedJob(null)} />}




    </div>
  )
}

export default JobList