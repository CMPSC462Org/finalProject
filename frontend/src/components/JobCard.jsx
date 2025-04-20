import React from 'react'
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import { FaBriefcase, FaCalendarAlt, FaBuilding, FaTrashAlt } from 'react-icons/fa';

const JobCard = ({ job, onDelete }) => {
  return (
    <div className="main-JobCard-Container">
      <div className="JobCard-Header">


        <button className="JobCard-Delete-Button"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this job Entry?")) {
                // Call the onDelete function passed from the parent component
              onDelete(job.id)
              }

            }
            }>
              <FaTrashAlt className="JobCard-Delete-Icon" />
        </button>


          <h3 className="JobCard-Title">{job.title} <FaBriefcase /></h3>
          <span className={`JobCard-Status ${job.status.toLowerCase()}`}>
            {job.status} 
            
            </span>

          
      </div>

      <p className="jobCard-Company">{job.company} <FaBuilding /></p>
      <p className="JobCard-Date">
         Applied on: {job.date}  <FaCalendarAlt />
      </p>
      
      <div className="JobCard-Divider"/>

      {job.notes && <p className="JobCard-Notes">"{job.notes}"</p>}
      </div>
  )
}

export default JobCard