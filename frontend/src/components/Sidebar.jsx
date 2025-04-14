import React from 'react'
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import { NavLink } from 'react-router-dom';
import PlaceholderImage from '../assets/corporate-man-placeholder-image.jpg'
//Icons
import { FaThLarge, FaLayerGroup, FaRegIdCard, FaSlidersH } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="Main-Sidebar-Contianer">


        <div className="Sidebar-Top-Content-Container">
            <h1 className="Main-Sidebar-Title">JobFlow</h1>

            <div className="Sidebar-Button-Container">
                <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => `Main-Sidebar-Button ${isActive ? 'active' : ''}`}
                    >
                    <FaThLarge className="Sidebar-Icon" />
                    Dashboard
                </NavLink>
            </div>

            <div className="Sidebar-Button-Container">
                <button className="Main-Sidebar-Button">
                <FaLayerGroup className="Sidebar-Icon" />
                    Add Job
                </button>
            </div>

            <div className="Sidebar-Button-Container">
                <button className="Main-Sidebar-Button">
                <FaRegIdCard className="Sidebar-Icon" />
                    Profile
                </button>
            </div>

            <div className="Sidebar-Button-Container">
                <button className="Main-Sidebar-Button">
                <FaSlidersH className="Sidebar-Icon" />
                    Settings
                </button>
            </div>

        </div>
        

        <div className="Sidebar-Bottom-Content-Container">
            <div className="Divider"/>

            <div className="User-Info-Row">
                <img className="User-Image" src={PlaceholderImage} alt="User" />
                
                <div className="User-Info-Text-Collumn">
                    <span className="User-Name">John Doe</span>
                    <span className="User-Email">JohnDoe@gmail.com</span>

                </div>
            </div> 
        </div>
        
    </div>
  )
}

export default Sidebar