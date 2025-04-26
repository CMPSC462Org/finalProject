import React from 'react'
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import '../styles/jobcollumstyles.scss';
import JobCard from './JobCard';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";


const JobColumn = ({ status, jobs, onEdit }) => {

  

  return (
    <div className="Main-Job-Column-Container">

      <div className="Job-Column-Title-and-Buttons-Row">
          <span className="Job-Column-Title">{status}</span>


        <div className="Job-Column-Buttons-Container">
        <button className="Job-Column-Button">
            <FaPlus className="Job-Column-Button-Icon" />
          </button>
          <button className="Job-Column-Button">
            <FaMinus className="Job-Column-Button-Icon" />
          </button>
        </div>
         

      </div>
      
      {/* Dummy Cards*/}

      <div className="Job-Card-Scraollable-Container">

       {jobs.map((job) => (
          <JobCard key={job.id}
           job={job} 
           onDelete={() => {}} 
           onEdit={onEdit}
           
           />
        ))}

     
      </div>
    </div>
  )
}

export default JobColumn