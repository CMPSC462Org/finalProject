import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashBoard from '../pages/DashBoard';
import Register from '../pages/Register';
import Login from '../pages/Login';


// Will add more routes later
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default AppRoutes