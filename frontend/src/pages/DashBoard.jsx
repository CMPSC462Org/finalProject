import React from 'react';
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import JobCard from '../components/JobCard';
import JobList from '../components/JobList';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';


const DashBoard = () => {
  return (
    <div className="Main-Dashboard-Container">
      <Sidebar />
      <div className="Dashboard-Container-Collumn">
          <Navbar />
          <div className="Job-List-Container">
            <JobList />
            <JobList />
          </div>
      </div>      
    </div>
  )
}

export default DashBoard