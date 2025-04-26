import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import JobCard from '../components/JobCard';
import JobList from '../components/JobList';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';




const DashBoard = () => {

  const mockUserData = {
    _id: "661edaba6c9ea05d94cb52d5",
    first_name: "John",
    last_name: "Doe",
    username: "johndoe123",
    email: "JohnDoe@gmail.com",
    profile_picture: "https://yourbucket.com/default-profile.png"
  };

  return (
    <div className="Main-Dashboard-Container">
      <Sidebar 
      userData={mockUserData}
      />
      <div className="Dashboard-Container-Collumn">
          <Navbar />
          
          <div className="Job-List-Container">
            {/* To pass the user data to the profile componenet*/}
         
          </div>

          {/* To pass the user data to the profile componenet*/}
          <Outlet 
           context={{userData: mockUserData}}
          />
          
      </div>      
    </div>
  )
}

export default DashBoard