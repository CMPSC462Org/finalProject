import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashBoard from '../pages/DashBoard';
import Register from '../pages/Register';
import Login from '../pages/Login';
import JobForm from '../components/JobForm';
import JobCard from '../components/JobCard';


// Will add more routes later
const AppRoutes = () => {
  return (
    <Routes>

      {/* Default route*/}
      <Route path="/" element={<DashBoard />}>
        <Route index element={
            <JobCard 
          job={{
              title: "Software Engineer Intern",
              company: "Google",
              date: "2025-01-22",
              status: "interviewed",
              notes: "Waiting on recruiter",
            }}
            />} 
          />
      
      </Route>

      <Route path="/dashboard" element={<DashBoard />}>
         <Route index element={
          <JobCard 
         job={{
            title: "Software Engineer Intern",
            company: "Google",
            date: "2025-01-22",
            status: "interviewed",
            notes: "Waiting on recruiter",
          }}
        
         
          />} 
         />

        <Route path="add-job" element={<JobForm />} />
        <Route path="profile" element={<JobForm />} />
        <Route path="settings" element={<JobForm />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default AppRoutes