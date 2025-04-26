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
    // Applied
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Netflix",
      date: "2025-01-10",
      status: "applied",
      notes: "Waiting for recruiter reply",
    },
    // {
    //   id: 2,
    //   title: "Data Analyst Intern",
    //   company: "Spotify",
    //   date: "2025-01-12",
    //   status: "applied",
    //   notes: "Completed application online",
    // },
    // {
    //   id: 3,
    //   title: "Software Engineer Intern",
    //   company: "Tesla",
    //   date: "2025-01-15",
    //   status: "applied",
    //   notes: "Referral by employee",
    // },
    // {
    //   id: 4,
    //   title: "Backend Developer Intern",
    //   company: "Amazon",
    //   date: "2025-01-17",
    //   status: "applied",
    //   notes: "Submitted via LinkedIn",
    // },
  
    // // Interviewed
    // {
    //   id: 5,
    //   title: "DevOps Engineer Intern",
    //   company: "Facebook",
    //   date: "2025-01-05",
    //   status: "interviewed",
    //   notes: "First round completed",
    // },
    // {
    //   id: 6,
    //   title: "UI/UX Designer Intern",
    //   company: "Adobe",
    //   date: "2025-01-07",
    //   status: "interviewed",
    //   notes: "Portfolio review scheduled",
    // },
    // {
    //   id: 7,
    //   title: "Mobile Developer Intern",
    //   company: "Twitter",
    //   date: "2025-01-09",
    //   status: "interviewed",
    //   notes: "Waiting on technical interview",
    // },
    // {
    //   id: 8,
    //   title: "Cloud Engineer Intern",
    //   company: "IBM",
    //   date: "2025-01-11",
    //   status: "interviewed",
    //   notes: "Scheduled for final round",
    // },
  
    // // Offered
    // {
    //   id: 9,
    //   title: "Cybersecurity Intern",
    //   company: "Cisco",
    //   date: "2025-01-03",
    //   status: "offered",
    //   notes: "Offer received, reviewing",
    // },
    // {
    //   id: 10,
    //   title: "Machine Learning Intern",
    //   company: "OpenAI",
    //   date: "2025-01-06",
    //   status: "offered",
    //   notes: "Offer pending background check",
    // },
    // {
    //   id: 11,
    //   title: "Site Reliability Engineer Intern",
    //   company: "Red Hat",
    //   date: "2025-01-08",
    //   status: "offered",
    //   notes: "Offer accepted",
    // },
    // {
    //   id: 12,
    //   title: "Security Analyst Intern",
    //   company: "CrowdStrike",
    //   date: "2025-01-13",
    //   status: "offered",
    //   notes: "Negotiating salary",
    // },
  
    // // Rejected
    // {
    //   id: 13,
    //   title: "Systems Engineer Intern",
    //   company: "Oracle",
    //   date: "2025-01-01",
    //   status: "rejected",
    //   notes: "Application rejected",
    // },
    // {
    //   id: 14,
    //   title: "Game Developer Intern",
    //   company: "Epic Games",
    //   date: "2025-01-04",
    //   status: "rejected",
    //   notes: "Post-interview rejection",
    // },
    // {
    //   id: 15,
    //   title: "Full Stack Developer Intern",
    //   company: "Salesforce",
    //   date: "2025-01-14",
    //   status: "rejected",
    //   notes: "No response after final interview",
    // },
    // {
    //   id: 16,
    //   title: "AI Research Intern",
    //   company: "DeepMind",
    //   date: "2025-01-16",
    //   status: "rejected",
    //   notes: "Position closed",
    // },
  ];

  
  return (
    <div className="Main-JobCollumn-List-Container">
      
      { jobs.length === 0 ? (
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
          
          />
      ))

       

      )}

    {selectedJob && 
    <JobEditModal 
    JobToEdit={selectedJob} 
    onClose={() => setSelectedJob(null)} />}




    </div>
  )
}

export default JobList