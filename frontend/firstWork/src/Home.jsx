import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { assets } from '../assets/assets_frontend/assets'
import { specialityData } from '../assets/assets_frontend/assets';
import Homeheader from './homeheader';
import Specialuty from './specialuty';
import TopDoctors from './TopDoctors';
import Banner from './banner';
import AppContext from './context';
import { useContext } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const {loading,  setLoading} = useContext(AppContext)
  if(loading){ return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center gap-4">
        <div
          className="
            h-12 w-12
            animate-spin
            rounded-full
            border-4
            border-slate-300
            border-t-blue-600
          "
        ></div>

        <p className="text-sm font-medium text-slate-600">
          Loading...
        </p>
      </div>
    </div>)}
  
  return (
    <main>
      <Homeheader />
      <Specialuty />
      <TopDoctors />
      <Banner />
    </main>
  )
}

export default Home
