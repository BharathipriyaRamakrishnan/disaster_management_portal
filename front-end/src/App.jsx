import React from 'react'
import {Routes, Route } from 'react-router-dom';


import './App.css'
import Login from './pages/Auth/Login'
import Admin from './pages/Admin/Admin';
import Rescuer from './pages/Rescuer/Rescuer';
import Volunteer from './pages/Volunteer/Volunteer';
import DonationForm from './components/DonationComponent';

function App() {

  return (
    <>
      <Routes>
       <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/rescuer" element={<Rescuer/>} />
      <Route path="/" element={<Volunteer/>} />
      <Route path="/payment" element={<DonationForm/>} />
    </Routes>
    </>
  )
}

export default App
