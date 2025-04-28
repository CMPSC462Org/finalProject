import { React, useState, useEffect } from 'react'
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import { FiChevronDown } from 'react-icons/fi';
import api from '../services/api';
import { createJob } from '../services/job';
import { useNavigate } from 'react-router-dom';


const JobForm = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [companyname, setCompanyName] = useState('');
  const [status, setStatus] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [link, setLink] = useState('');
  const [comments, setComments] = useState('');





  const handleJobCreate = async (e) => {
    e.preventDefault();

    try {
        const data = await createJob({
          title,
          company_name: companyname,
          status,
          application_date: dateApplied,
          comments: [comments],
          link
          
        });
        if (!data) {
          console.log("Failed to Create Job:", data);
        } else {
          console.log("Job Created Successfully", data);
          navigate('/dashboard');
        }

        
    } catch (error) {
      console.log("Error creating new job: ", error)
    }

  }

  return (
    <div className="Job-Form-Container">
      <form className="Main-Job-Form" onSubmit={handleJobCreate}>
        <h2 className="Job-Form-Title">Add New Job</h2>

        
        <input type="text" 
        className="Job-Form-Input" 
        placeholder="Job Title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        
        />



        <input type="text" 
        className="Job-Form-Input" 
        placeholder="Company Name" 
        value={companyname}
        onChange={(e) => setCompanyName(e.target.value)}
        />

         
       <div className="Select-Wrapper">
          <div className="Custom-Select-Container">
            <select 
            
            className="Job-Form-Select"
            value={status}

            onChange={(e) => setStatus(e.target.value)}
            
            >
            <option value="" disabled selected hidden>Select status</option>
              <option value="applied">Applied</option>
              <option value="interviewed">Interviwed</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
          </select>
            <FiChevronDown className="Select-Arrow-Icon" />
          </div>
       </div>

      

        
        <input type="date" 
        className="Job-Form-Input" 
        placeholder="Date Applied" 
        value={dateApplied}
        onChange={(e) => setDateApplied(e.target.value)}

        />

        
        <textarea 
        className="Job-Form-Input" 
        placeholder="Comments..." 
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        />


        <div className="Job-Form-Button-Row">
          <button className="Job-Form-Button" type="button" 
            onClick={() => navigate('/dashboard')}
          >Close</button>
          <button className="Job-Form-Button" type="submit">Submit</button>
        </div>
        

      </form>
      

    </div>
  )
}

export default JobForm