import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import '../styles/profilestyles.scss';
import api from '../services/api';
import { logoutUser } from '../services/auth';
import PlaceholderImage from '../assets/corporate-man-placeholder-image.jpg';
import { FaUserCircle } from 'react-icons/fa';
import defaultUserIMG from '../assets/user_pro.png';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const { userData } = useOutletContext();
  const navigate = useNavigate();

    const handleLogout = async () => {

          try {
              await logoutUser();
              localStorage.removeItem('user');
              navigate('/login');

          } catch(error) {
            console.log("Error logging out user: ", error)
          }
        
    };

    

    const formattedJoinDate = userData.created_at 
    ? new Date(userData.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'

    })
    
    : 'Uknown';



  return (
    <div className ="Main-Profile-Container">
        <div className="Profile-Card-Container">
            <div className="Profile-Card-Image-and-Info-Row">
                 <img className="Profile-Image" 
                 src={userData.profile_picture || defaultUserIMG}
                 alt="" />

                <div className="Profile-Info-Container-collumn">
                    <span className="Profile-Name">{userData.first_name} {userData.last_name}</span>
                    <span className="Profile-Email">{userData.email}</span>
                </div>


            </div>
            <span className="Profile-Username">Username: {userData.username}</span>
            <span className="Profile-Date">Joined: {formattedJoinDate}</span>

            <button 
            
            className="Profile-Log-Out-Button"
            onClick={handleLogout}
            
            >Logout</button>
        </div>
    </div>
  )
}

export default Profile