import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import '../styles/profilestyles.scss';
import PlaceholderImage from '../assets/corporate-man-placeholder-image.jpg'

const Profile = () => {
    const { userData } = useOutletContext();
  return (
    <div className ="Main-Profile-Container">
        <div className="Profile-Card-Container">
            <div className="Profile-Card-Image-and-Info-Row">
                 <img className="Profile-Image" 
                 src={PlaceholderImage} 
                 alt="User" />

                <div className="Profile-Info-Container-collumn">
                    <span className="Profile-Name">{userData.first_name} {userData.last_name}</span>
                    <span className="Profile-Email">{userData.email}</span>
                </div>
            </div>
            <span className="Profile-Username">Username: {userData.username}</span>
            <span className="Profile-Date">Joined: 2025-03-12</span>

            <button className="Profile-Log-Out-Button">Logout</button>
        </div>
    </div>
  )
}

export default Profile