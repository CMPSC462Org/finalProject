import React from 'react'
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import { NavLink, useLocation } from 'react-router-dom';
import PlaceholderImage from '../assets/corporate-man-placeholder-image.jpg'
//Icons
import { FaThLarge, FaLayerGroup, FaRegIdCard, FaSlidersH } from 'react-icons/fa';

const Sidebar = ({ userData }) => {

   
  return (
    <div className="Main-Sidebar-Contianer">


        <div className="Sidebar-Top-Content-Container">
            <h1 className="Main-Sidebar-Title">JobFlow</h1>

            <div className="Sidebar-Button-Container">
                <NavLink 
                    to="/dashboard" 
                    end
                    className={({ isActive }) => `Main-Sidebar-Button ${isActive ? 'active' : ''}`}
                    >
                    <FaThLarge className="Sidebar-Icon" />
                    Dashboard
                </NavLink>
            </div>


            {/* 
            
                <NavLink 
                    to="/profile" 
                    className={({ isActive }) => `Main-Sidebar-Button ${isActive ? 'active' : ''}`}
                    >
                    <FaRegIdCar className="Sidebar-Icon" />
                    Profile
                </NavLink>
            
            */}
        

            <div className="Sidebar-Button-Container">
                <NavLink 
                    to="/dashboard/add-job" 
                    className={({ isActive }) => `Main-Sidebar-Button ${isActive ? 'active' : ''}`}
                >
                    <FaLayerGroup className="Sidebar-Icon" />
                    Add Job
                </NavLink>
            </div>   

            <div className="Sidebar-Button-Container">
                <NavLink 
                    to="/dashboard/profile" 
                    className={({ isActive }) => `Main-Sidebar-Button ${isActive ? 'active' : ''}`}
                    >
                    <FaRegIdCard className="Sidebar-Icon" />
                    Profile
                </NavLink>
            </div>


        </div>
        

        <div className="Sidebar-Bottom-Content-Container">
            <div className="Divider"/>

            <div className="User-Info-Row">
                {/*Keep place holder image for now*/}
                <img className="User-Image" src={PlaceholderImage} alt="User" />
                
                <div className="User-Info-Text-Collumn">
                    <span className="User-Name">{userData.username}</span>
                    <span className="User-Email">{userData.email}</span>

                </div>
            </div> 
        </div>
    </div>
  )
}

export default Sidebar