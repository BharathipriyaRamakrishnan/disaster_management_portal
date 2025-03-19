import React from 'react'
import {Routes, Route } from 'react-router-dom';


import './App.css'
import Login from './pages/Auth/Login'
import Admin from './pages/Admin/Admin';
import Rescuer from './pages/Rescuer/Rescuer';
import Volunteer from './pages/Volunteer/Volunteer';
import DonationForm from './components/DonationComponent';
import AdminBlogs from './components/AdminBlogs';
import AdminReports from './components/AdminReports';
import AdminrescuerManagement from './components/AdminrescuerManagement';
import AdminDashboard from './components/AdminDashboard';

function App() {

  return (
    <>
      <Routes>
       <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/rescuer" element={<Rescuer/>} />
      <Route path="/" element={<Volunteer/>} />
      <Route path="/payment" element={<DonationForm/>} />
      <Route path ="/AdminBlogs" element={<AdminBlogs/>} />
      <Route path ="/AdminReports" element={<AdminReports/>} />
      <Route path ="/AdminrescuerManagement" element={<AdminrescuerManagement/>} />
      <Route path="/Rescuer" element={<Rescuer/>} />
      <Route path="/AdminDashboard" element={<AdminDashboard/>} />
    </Routes>
    </>
  )
}

export default App
