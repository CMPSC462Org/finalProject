import {React, useEffect, useState} from 'react'
import axios from 'axios';
import '../styles/main.scss';

const Login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
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
          <form className="Register-Form">
  
          
          <div className="Form-Sign-Up-Title-Container">
            <h2 className="from-title">Log in</h2>
            <span className="Register-Form-Text">Let's get you all set up so you can acess your dashboard</span>
          </div>
            
  
            <div className="Email-Password-Container">

              <div className="Floating-Label-Wrapper">
                <input type="email" 
                id="loginEmail"
                placeholder=" " 
                required
                className="Register-Form-Input" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="loginEmail">Email</label>
              </div>
              
              <div className="Floating-Label-Wrapper">
                <input type="password" 
                  placeholder=" " 
                  className="Register-Form-Input" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <label htmlFor="loginPassword">Password</label>
              </div>
                
            </div>
  
            <button className="Register-Form-Button" type='submit'>Login to your account</button>
            <span className="Register-Form-Text">Don't have an account? <a href="/login" className="Register-Form-Link">Register here</a></span>
            

            <div className="Forgot-Password-and-Remember-Password-Container">
               <label className="Remember-Me-Container">
                <input type="checkbox" className="Remember-Me-Checkbox" /> Remember Me </label>

                <a href="/forgot-password" className="Forgot-Password-Link">
                  Forgot Password?
                </a>
            </div>

            <div className="Divider-With-Text">
              <span>Or Log in with</span>
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

export default Login