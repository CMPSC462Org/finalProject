import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashBoard from '../pages/DashBoard';
import Register from '../pages/Register';
import Login from '../pages/Login';
import JobForm from '../components/JobForm';
import JobCard from '../components/JobCard';
import JobColumn from '../components/JobColumn';
import JobList from '../components/JobList';


// Will add more routes later
const AppRoutes = () => {
  return (
    <Routes>

      {/* Default route*/}
      <Route path="/" element={<DashBoard />}>
        <Route index element={<JobList />} />
      
      </Route>

      <Route path="/dashboard" element={<DashBoard />}>
      
        <Route index element={<JobList />} />

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