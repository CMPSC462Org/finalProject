import React, { useState, useEffect } from 'react';
import { data, Outlet, useNavigate } from 'react-router-dom';
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import JobCard from '../components/JobCard';
import JobList from '../components/JobList';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getCurrentUser } from '../services/auth';





const DashBoard = () => {

  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    // First check local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    }

    // check with the get me route to verifiy it is the user 
    getCurrentUser()
    .then((data) => {
      setUserData(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
    })
    .catch((error) => {
      console.log("Session expired or user invalid logging out...: ", error);
      localStorage.removeItem('user');
      navigate('login');
    })
  }, [navigate]);

  if (!userData) {
    return <div className="loader"></div>;
  }


  return (
    <div className="Main-Dashboard-Container">
      <Sidebar 
      userData={userData}
      />
      <div className="Dashboard-Container-Collumn">
          <Navbar />
          
          <div className="Job-List-Container">
            {/* To pass the user data to the profile componenet*/}
         
          </div>

          {/* To pass the user data to the profile componenet*/}
          <Outlet 
           context={{userData}}
          />
          
      </div>      
    </div>
  )
}

export default DashBoard