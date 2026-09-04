import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { assets } from '../assets/assets_frontend/assets'
import { specialityData } from '../assets/assets_frontend/assets';
import Homeheader from './homeheader';
import Specialuty from './specialuty';
import TopDoctors from './TopDoctors';
import Banner from './banner';

const Home = () => {
  const navigate = useNavigate();
  
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
