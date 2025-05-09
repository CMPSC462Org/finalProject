import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashBoard from '../pages/DashBoard';
import Register from '../pages/Register';
import Login from '../pages/Login';
import JobForm from '../components/JobForm';
import JobCard from '../components/JobCard';
import JobColumn from '../components/JobColumn';
import JobList from '../components/JobList';
import Profile from '../components/Profile';


// Will add more routes later
const AppRoutes = () => {
  return (
    <Routes>

      {/* Default route*/}
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<DashBoard />}>
        <Route index element={<JobList />} />
        <Route path="add-job" element={<JobForm />} />
        <Route path="profile" element={<Profile />} />
      </Route>

     
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<div>Page Not Found</div>} />
      
    </Routes>
  )
}

export default AppRoutes