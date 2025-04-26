import React, { useState, useEffect } from 'react'
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import '../styles/jobcollumstyles.scss';

import { FiChevronDown } from 'react-icons/fi';

const JobEditModal = ({ JobToEdit, onClose }) => {

    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');


    

        useEffect(() => {
            if (JobToEdit) {
                setTitle(JobToEdit.title);
                setCompany(JobToEdit.company);
                setStatus(JobToEdit.status);
                setDate(JobToEdit.date);
                setNotes(JobToEdit.notes);
              }
            
        }, [JobToEdit]);

        
    

  return (
       
    <div className="modal-background">
        <div className="modal-content">

                
                
                    <form className="Main-Job-Form">
                        <h2 className="Job-Form-Title">Edit Job</h2>
                
                        
                        <input type="text" 
                        className="Job-Form-Input" 
                        placeholder="Job Title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                
                
                
                        <input type="text" 
                        className="Job-Form-Input" 
                        placeholder="Company Name" 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
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
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        
                        />
                
                        
                        <textarea 
                        className="Job-Form-Input" 
                        placeholder="Comments..." 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        
                        />
                
                
                        <div className="Job-Form-Button-Row">
                        <button className="Job-Form-Button" type="button" onClick={onClose} >Close</button>
                        <button className="Job-Form-Button" type="submit">Submit</button>
                        </div>
                        
                
                    </form>
                
                
            
        </div>
    </div>
    // Modal for editing an existing job entry, will use the same styles as the job form
   
  )
}

export default JobEditModal