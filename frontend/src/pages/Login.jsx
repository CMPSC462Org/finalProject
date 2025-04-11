import {React, useEffect, useState} from 'react'
import axios from 'axios';
import '../styles/main.scss';

const Login = () => {


  const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('')
    const [username, setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
  return (
    <div className="Main-container-Register">
      <div className="Register-Form-Container">

        <form className="Register-Form">

          <h2 className="from-title">Sign up</h2>
          <span className="Register-Form-Text">Let's get you all set up so you can acess your dashboard</span>

          <div className="First-Last-Name-Container-row">
            <input type="text" placeholder="First Name" className="Register-Form-Input" value ={firstname} onChange={(e) => setFirstName(e.target.value)}/>
            <input type="email" placeholder="Last Name" className="Register-Form-Input" value={lastname}onChange={(e) => setLastName(e.target.value)}/>
          </div>
          
          <div className="User-Email-Container-row">
            <input type="text" placeholder="UserName" className="Register-Form-Input" value ={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="email" placeholder="Email" className="Register-Form-Input" value={email}onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="Password-Container">
            <input type="password" placeholder="Password" className="Register-Form-Input" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" placeholder="Confirm Password" className="Register-Form-Input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>

          <button className="Register-Form-Button" type='submit'>Register</button>
          <span className="Register-Form-Text">Already have an account? <a href="/login" className="Register-Form-Link">Login</a></span>
          
          <div className="Divider">Or Sign up with</div>

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