import React from 'react'
import Login from './pages/login'
// import {Routes, Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AppContext } from './context/appContext';
import { AdminContext } from './context/adminContext';
import NavBar from './component/NavBar';
import SideBar from './component/SideBar';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './pages/Admin/DashBoard';
import Appointment from './pages/Admin/Appointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import { DoctorContext } from './context/doctorContext';
import DoctorProfile from './pages/Doctors/DoctorProfile';
import DoctorDashBoard from './pages/Doctors/DoctorDashBoard';
import DoctorApponitment from './pages/Doctors/DoctorApponitment';
import DoctorQueue from './pages/Doctors/DoctorQueue';
import ConsultationDoctor from './pages/Doctors/ConsDoctor'
import Queue from './pages/Admin/Queue';
import VideoConsDoc from './pages/Doctors/VideoConsDoc'
import { Navigate } from 'react-router-dom';
import AllUser from './pages/Admin/allUser';

const App = () => {
  const { aToken } = useContext(AdminContext)
  const {dToken} =useContext(DoctorContext)
  return aToken || dToken ? (
    <div>
       <ToastContainer />
       <NavBar />
       <div className='flex items-start'>
        <SideBar />
        <Routes>
          {/* Home page */}
          <Route path='/' element={aToken ? 
          <Navigate to="/admin-dashboard" replace />
          :<Navigate to="doctorDashBoard" replace />} />

          <Route path='/login' element={<Login />} />

            {/* adimin routes */}
            <Route path='/admin-dashboard' element={<DashBoard />} />
            <Route path='/appointment' element={<Appointment />} />
            <Route path='/add-Doctor' element={<AddDoctor />} />
            <Route path='/doctor-list' element={<DoctorList />} />
            <Route path='/queue-details' element={<Queue />} />
            <Route path='/all-users' element={<AllUser />} />


            {/* Doctor route */}
            <Route path='/doctorApponitment' element={<DoctorApponitment />} />
            <Route path='/doctorProfile' element={<DoctorProfile />} />
            <Route path='/doctorDashBoard' element={<DoctorDashBoard />} />
            <Route path='/doctorQueue' element={<DoctorQueue />} />
            <Route path='/docCons/:queueId' element={<ConsultationDoctor />} />
            <Route path='/vidCons/:appointmentId' element={<VideoConsDoc />} />

        </Routes>
       </div>
    </div>
  ):(
    <>
        <Login />
       <ToastContainer />
    </>
  )
}

export default App
