import React from 'react'
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import JobEditModal from './JobEditModal';
import { FaBriefcase, FaCalendarAlt, FaBuilding, FaTrashAlt } from 'react-icons/fa';

const JobCard = ({ job, onDelete, onEdit }) => {
  
  
  return (
    <div 
    className="main-JobCard-Container"
    onClick={ () => onEdit(job) } // Call the onEdit function passed from the parent component when the card is clicked

    >
      <div className="JobCard-Header">


        <button className="JobCard-Delete-Button"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click event from bubbling up to the card
              if (window.confirm("Are you sure you want to delete this job Entry?")) {
                // Call the onDelete function passed from the parent component
              onDelete(job._id)
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

      <p className="jobCard-Company">{job.company_name} <FaBuilding /></p>
      <p className="JobCard-Date">
         Applied on: {new Date(job.application_date).toLocaleDateString()}  <FaCalendarAlt />
      </p>
      
      <div className="JobCard-Divider"/>
      {job.comments && <p className="JobCard-Notes">"{job.comments[0]}"</p>}





      {job.link && (
      <button
        className="JobCard-Link-Button"
        onClick={(e) => {
          e.stopPropagation(); 
          window.open(job.link, '_blank', 'noopener,noreferrer');
        }}
      >
        View Job Posting
      </button>
    )}
      </div>


            

  )
}

export default JobCard