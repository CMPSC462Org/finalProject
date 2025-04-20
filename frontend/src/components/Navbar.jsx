import React from 'react'
import '../styles/main.scss';
import '../styles/dashBoard.scss';
import { FaSearch } from "react-icons/fa";
import { FaTh, FaListUl } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="Main-Navbar-Container">
      <div className="Navbar-Left-Content">
        <ul className= "Navbar-tabs">
          <li className="Navbar-tab active">
          <FaTh className="tab-icon"/>
            <span>Board</span>
            </li>

          <li className="Navbar-tab">
            <FaListUl  className="tab-icon"/>
            <span>List</span>
            </li>
        </ul>
      </div>

      <div className="Navbar-Right-Content">

        <div className="Nav-Search-Bar">
            <input type="text" 
            className="Navbar-Search-Input"
            placeholder="Search for jobs"
            />
            <FaSearch className="Sidebar-Icon" />
            
        </div>
      </div>
    </div>
  )
}




export default Navbar