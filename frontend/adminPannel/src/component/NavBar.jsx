import React from 'react'
import { assets } from '../assets/assets_admin/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/adminContext'
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from '../context/doctorContext'

const NavBar = () => {
    const {aToken, setAToken} = useContext(AdminContext)
    const {dToken, setDToken} = useContext(DoctorContext)
    const navigate = useNavigate();

    const logout = () =>{
            navigate('/')
            aToken && setAToken('')
            aToken && localStorage.removeItem("aToken")
            dToken && setDToken('')
            dToken && localStorage.removeItem("dToken")
    }
  return (
    <div className='
  flex
  justify-between
  items-center
  w-full
  px-4
  sm:px-6
  lg:px-10
  py-3
  sm:py-4
  bg-white
  border-b
  border-slate-200
  shadow-sm
  sticky
  top-0
  z-40
'>

  <div className='
    flex
    items-center
    gap-2
    sm:gap-3
    text-xs
    min-w-0
  '>

    <img
      className='
        w-28
        sm:w-36
        lg:w-40
        h-auto
        mx-2
        cursor-pointer
        object-contain
        transition-transform
        duration-300
        hover:scale-[1.02]
      '
      src={assets.MyLogo}
      alt=""
    />

    <p className='
      border
      border-blue-200
      bg-blue-50
      text-blue-600
      px-2.5
      sm:px-3
      py-1
      rounded-full
      text-[10px]
      sm:text-xs
      font-semibold
      tracking-wide
      whitespace-nowrap
    '>
      {aToken ? "Admin" : "Doctor"}
    </p>

  </div>

  <button
    onClick={logout}
    className='
      bg-gradient-to-r
      from-blue-600
      to-cyan-500
      hover:from-blue-700
      hover:to-cyan-600
      text-white
      text-xs
      sm:text-sm
      font-semibold
      px-5
      sm:px-8
      lg:px-10
      py-2
      sm:py-2.5
      rounded-xl
      shadow-md
      shadow-blue-100
      hover:shadow-lg
      hover:shadow-blue-200
      active:scale-95
      transition-all
      duration-300
      whitespace-nowrap
    '
  >
    Logout
  </button>

</div>
  )
}

export default NavBar
