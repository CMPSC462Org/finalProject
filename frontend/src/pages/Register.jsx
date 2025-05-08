import {React, useEffect, useState} from 'react'
import axios from 'axios';
import '../styles/main.scss';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';
import { Link } from 'react-router-dom';
import { MdOutlineUploadFile } from "react-icons/md";


const Register = () => {

  
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('')
  const [username, setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');


  // Convert file to string for backend
  const handleProfilePicture = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleRegister = async (e) => {
      e.preventDefault();

      if (password != confirmPassword) {
        alert("Passwords must be the same");
        return
      }

    
      try {
        const data = await registerUser({
          first_name: firstname,
          last_name: lastname,
          username: username,
          email: email,
          password: password,
          profile_picture: profilePicture || "",
          
        });
        if (!data) {
          console.log("Failed to Register User:", data)
        } else {
          console.log("Registration successful", data)
        }

        localStorage.setItem('user', JSON.stringify(data.user));
      
        // Redirect the user to the dashboard
        navigate('/dashboard');
      } catch(error) {
        console.log("Error registering user: ", error)
      }
  };

  return (
    <div className="Main-container-Register">

      <div className="svg-blob blob-top-left">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#6B80F5" d="M55.9,-51.9C67.7,-44.1,69.2,-22.1,63.9,-5.2C58.7,11.6,46.7,23.2,34.9,35.1C23.2,47,11.6,59.2,-5.4,64.6C-22.4,70,-44.7,68.5,-49.2,56.6C-53.8,44.7,-40.5,22.4,-36.4,4.1C-32.3,-14.1,-37.4,-28.3,-32.8,-36.1C-28.3,-43.8,-14.1,-45.2,4,-49.1C22.1,-53.1,44.1,-59.6,55.9,-51.9Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="svg-blob blob-bottom-right">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#6B80F5" d="M55.9,-51.9C67.7,-44.1,69.2,-22.1,63.9,-5.2C58.7,11.6,46.7,23.2,34.9,35.1C23.2,47,11.6,59.2,-5.4,64.6C-22.4,70,-44.7,68.5,-49.2,56.6C-53.8,44.7,-40.5,22.4,-36.4,4.1C-32.3,-14.1,-37.4,-28.3,-32.8,-36.1C-28.3,-43.8,-14.1,-45.2,4,-49.1C22.1,-53.1,44.1,-59.6,55.9,-51.9Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="Register-Form-Container">

        <h1 className="Register-Form-Title"><span className="Register-Form-Title-Span">JobFlow</span></h1>
        <form className="Register-Form" onSubmit={handleRegister}>

        
        <div className="Form-Sign-Up-Title-Container">
          <h2 className="from-title">Sign up</h2>
          <span className="Register-Form-Text">Let's get you all set up so you can acess your dashboard</span>
        </div>
          

          <div className="First-Last-Name-Container-row">
            <input type="text" placeholder="First Name" className="Register-Form-Input" value ={firstname} onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" placeholder="Last Name" className="Register-Form-Input" value={lastname}onChange={(e) => setLastName(e.target.value)}/>
          </div>
          
          <div className="User-Email-Container-row">
            <input type="text" placeholder="UserName" className="Register-Form-Input" value ={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="email" placeholder="Email" className="Register-Form-Input" value={email}onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="Password-Container">
            <input type="password" placeholder="Password" className="Register-Form-Input" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" placeholder="Confirm Password" className="Register-Form-Input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>

          <div className = "profile-pricture-upload-row">
              <span>Upload Profile Picture:  </span>

             
              <label htmlFor="profilePicture">
                <MdOutlineUploadFile className={`upload-icon ${profilePicture ? 'file-selected' : ''}`}/>

              </label>
              

              <input
              type="file"
              id="profilePicture"
              accept="image/*"
              style={{display: 'none'}}
              onChange={handleProfilePicture}
            />

          </div>

          <button className="Register-Form-Button" type='submit'>Create account</button>

          
          <span className="Register-Form-Text">Already have an account? <Link to="/login" className="Register-Form-Link">Login</Link></span>
          
          <div className="Divider-With-Text">
            <span>Or Sign up with</span>
          </div>

          <div className="Social-Media-Container-row">

            <button className="Social-Media-Wrapper">
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="Social-Media-Icon" />
            </button>

            <button className="Social-Media-Wrapper">
            <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn" className="Social-Media-Icon" />
            </button>
            
            
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register