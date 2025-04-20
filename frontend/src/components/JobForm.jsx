import React from 'react'
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import { FiChevronDown } from 'react-icons/fi';

const JobForm = () => {
  return (
    <div className="Job-Form-Container">
      <form className="Main-Job-Form">
        <h2 className="Job-Form-Title">Add New Job</h2>

        
        <input type="text" className="Job-Form-Input" placeholder="Job Title" />



        <input type="text" className="Job-Form-Input" placeholder="Company Name" />

         
       <div className="Select-Wrapper">
          <div className="Custom-Select-Container">
            <select className="Job-Form-Select">
            <option value="" disabled selected hidden>Select status</option>
              <option value="applied">Applied</option>
              <option value="interviewed">Interviwed</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
          </select>
            <FiChevronDown className="Select-Arrow-Icon" />
          </div>
       </div>

      

        
        <input type="date" className="Job-Form-Input" placeholder="Date Applied" />

        
        <textarea className="Job-Form-Input" placeholder="Comments..." />


        <div className="Job-Form-Button-Row">
          <button className="Job-Form-Button" type="submit">Close</button>
          <button className="Job-Form-Button" type="submit">Submit</button>
        </div>
        

      </form>
      

    </div>
  )
}

export default JobForm