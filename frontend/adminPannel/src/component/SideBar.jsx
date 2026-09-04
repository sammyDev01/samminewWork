import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/adminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/doctorContext'
import {FaListOl, FaUserDoctor} from 'react-icons/fa6' 
import { MdQueue } from "react-icons/md"

const SideBar = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)
  return (
   <div className='
  min-h-screen
  bg-white
  border-r
  border-slate-200
  shadow-sm
  transition-all
  duration-300
'> 
     {aToken && <ul className='
       text-slate-600
       mt-5
       space-y-1
       px-2
       md:px-0
     '> 

            <NavLink  
              to={'/admin-dashboard'} 
              className={({isActive})=>`
                flex
                items-center
                justify-center
                md:justify-start
                gap-3
                py-3
                md:py-3.5
                px-3
                md:px-7
                lg:px-9
                md:w-72
                w-full
                cursor-pointer
                rounded-xl
                md:rounded-none
                transition-all
                duration-200
                hover:bg-slate-50
                hover:text-blue-600
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 md:border-r-4 border-blue-500 shadow-sm md:shadow-none' 
                  : ''
                }
              `}> 
                <img 
                  className='
                    w-5
                    h-5
                    object-contain
                    flex-shrink-0
                  '
                  src={assets.home_icon} 
                  alt="" 
                /> 
                <p className='hidden md:block text-sm lg:text-[15px] font-medium'>DashBoard</p> 
            </NavLink> 


            <NavLink 
              to={'/appointment'} 
              className={({isActive})=>`
                flex
                items-center
                justify-center
                md:justify-start
                gap-3
                py-3
                md:py-3.5
                px-3
                md:px-7
                lg:px-9
                md:w-72
                w-full
                cursor-pointer
                rounded-xl
                md:rounded-none
                transition-all
                duration-200
                hover:bg-slate-50
                hover:text-blue-600
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 md:border-r-4 border-blue-500 shadow-sm md:shadow-none' 
                  : ''
                }
              `}> 
                <img 
                  className='
                    w-5
                    h-5
                    object-contain
                    flex-shrink-0
                  '
                  src={assets.appointment_icon} 
                  alt="" 
                /> 
                <p className='hidden md:block text-sm lg:text-[15px] font-medium'>Appointment</p> 
            </NavLink> 


            <NavLink 
              to={'/add-Doctor'} 
              className={({isActive})=>`
                flex
                items-center
                justify-center
                md:justify-start
                gap-3
                py-3
                md:py-3.5
                px-3
                md:px-7
                lg:px-9
                md:w-72
                w-full
                cursor-pointer
                rounded-xl
                md:rounded-none
                transition-all
                duration-200
                hover:bg-slate-50
                hover:text-blue-600
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 md:border-r-4 border-blue-500 shadow-sm md:shadow-none' 
                  : ''
                }
              `}> 
                <img 
                  className='
                    w-5
                    h-5
                    object-contain
                    flex-shrink-0
                  '
                  src={assets.add_icon} 
                  alt="" 
                /> 
                <p className='hidden md:block text-sm lg:text-[15px] font-medium'>Add Doctor</p> 
            </NavLink> 

                 <NavLink 
              to={'/all-users'} 
              className={({isActive})=>`
                flex
                items-center
                justify-center
                md:justify-start
                gap-3
                py-3
                md:py-3.5
                px-3
                md:px-7
                lg:px-9
                md:w-72
                w-full
                cursor-pointer
                rounded-xl
                md:rounded-none
                transition-all
                duration-200
                hover:bg-slate-50
                hover:text-blue-600
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 md:border-r-4 border-blue-500 shadow-sm md:shadow-none' 
                  : ''
                }
              `}> 
                {/* <img 
                  className='
                    w-5
                    h-5
                    object-contain
                    flex-shrink-0
                  '
                  src={assets.appointment_icon} 
                  alt="" 
                />  */}
                <FaUserDoctor className='w-5 h-6 object-contain flex-shrink-0' />
                <p className='hidden md:block text-sm lg:text-[15px] font-medium'>All Users</p> 
            </NavLink> 

            <NavLink 
              to={'/doctor-list'} 
              className={({isActive})=>`
                flex
                items-center
                justify-center
                md:justify-start
                gap-3
                py-3
                md:py-3.5
                px-3
                md:px-7
                lg:px-9
                md:w-72
                w-full
                cursor-pointer
                rounded-xl
                md:rounded-none
                transition-all
                duration-200
                hover:bg-slate-50
                hover:text-blue-600
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 md:border-r-4 border-blue-500 shadow-sm md:shadow-none' 
                  : ''
                }
              `}> 
                <img 
                  className='
                    w-5
                    h-5
                    object-contain
                    flex-shrink-0
                  '
                  src={assets.people_icon} 
                  alt="" 
                /> 
                <p className='hidden md:block text-sm lg:text-[15px] font-medium'>Doctor List</p> 
            </NavLink> 
             
             
            <NavLink 
              to={'/queue-details'} 
              className={({isActive})=>`
                flex
                items-center
                justify-center
                md:justify-start
                gap-3
                py-3
                md:py-3.5
                px-3
                md:px-7
                lg:px-9
                md:w-72
                w-full
                cursor-pointer
                rounded-xl
                md:rounded-none
                transition-all
                duration-200
                hover:bg-slate-50
                hover:text-blue-600
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 md:border-r-4 border-blue-500 shadow-sm md:shadow-none' 
                  : ''
                }
              `}> 
                {/* <img 
                  className='
                    w-5
                    h-5
                    object-contain
                    flex-shrink-0
                  '
                  src={assets.people_icon} 
                  alt="" 
                />  */}
                <FaListOl className='w-5 h-6 object-contain flex-shrink-0' />
                <p className='hidden md:block text-sm lg:text-[15px] font-medium'>Queue Statics</p> 
            </NavLink> 
        </ul>} 
 
 
        {/* doctor DashBoard */} 
 
         {dToken && <ul className='
           text-slate-600
           mt-5
           space-y-1
           px-2
           md:px-0
         '> 


            <NavLink  
              to={'/doctorDashBoard'} 
              className={({isActive})=>`
                flex
                items-center
                justify-center
                md:justify-start
                gap-3
                py-3
                md:py-3.5
                px-3
                md:px-7
                lg:px-9
                md:w-72
                w-full
                cursor-pointer
                rounded-xl
                md:rounded-none
                transition-all
                duration-200
                hover:bg-slate-50
                hover:text-blue-600
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 md:border-r-4 border-blue-500 shadow-sm md:shadow-none' 
                  : ''
                }
              `}> 
                <img 
                  className='
                    w-5
                    h-5
                    object-contain
                    flex-shrink-0
                  '
                  src={assets.home_icon} 
                  alt="" 
                /> 
                <p className='hidden md:block text-sm lg:text-[15px] font-medium'>DashBoard</p> 
            </NavLink> 


            <NavLink 
              to={'/doctorApponitment'} 
              className={({isActive})=>`
                flex
                items-center
                justify-center
                md:justify-start
                gap-3
                py-3
                md:py-3.5
                px-3
                md:px-7
                lg:px-9
                md:w-72
                w-full
                cursor-pointer
                rounded-xl
                md:rounded-none
                transition-all
                duration-200
                hover:bg-slate-50
                hover:text-blue-600
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 md:border-r-4 border-blue-500 shadow-sm md:shadow-none' 
                  : ''
                }
              `}> 
                <img 
                  className='
                    w-5
                    h-5
                    object-contain
                    flex-shrink-0
                  '
                  src={assets.appointment_icon} 
                  alt="" 
                /> 
                <p className='hidden md:block text-sm lg:text-[15px] font-medium'>Appointment</p> 
            </NavLink> 


            <NavLink 
              to={'/doctorProfile'} 
              className={({isActive})=>`
                flex
                items-center
                justify-center
                md:justify-start
                gap-3
                py-3
                md:py-3.5
                px-3
                md:px-7
                lg:px-9
                md:w-72
                w-full
                cursor-pointer
                rounded-xl
                md:rounded-none
                transition-all
                duration-200
                hover:bg-slate-50
                hover:text-blue-600
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 md:border-r-4 border-blue-500 shadow-sm md:shadow-none' 
                  : ''
                }
              `}> 
                <img 
                  className='
                    w-5
                    h-5
                    object-contain
                    flex-shrink-0
                  '
                  src={assets.people_icon} 
                  alt="" 
                /> 
                <p className='hidden md:block text-sm lg:text-[15px] font-medium'>Profile</p> 
            </NavLink> 


            <NavLink 
              to={'/doctorQueue'} 
              className={({isActive})=>`
                flex
                items-center
                justify-center
                md:justify-start
                gap-3
                py-3
                md:py-3.5
                px-3
                md:px-7
                lg:px-9
                md:w-72
                w-full
                cursor-pointer
                rounded-xl
                md:rounded-none
                transition-all
                duration-200
                hover:bg-slate-50
                hover:text-blue-600
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 md:border-r-4 border-blue-500 shadow-sm md:shadow-none' 
                  : ''
                }
              `}> 
                {/* <img 
                  className='
                    w-5
                    h-5
                    object-contain
                    flex-shrink-0
                  '
                  src={assets.people_icon} 
                  alt="" 
                />  */}
                <MdQueue  className='w-5 h-6 object-contain
                    flex-shrink-0' />
                <p className='hidden md:block text-sm lg:text-[15px] font-medium'>Queue For Patient</p> 
            </NavLink> 


            <NavLink 
              to="/docCons/:queueId" 
              className={({ isActive }) => 
                `flex
                items-center
                justify-center
                md:justify-start
                gap-3
                py-3
                md:py-3.5
                px-3
                md:px-7
                lg:px-9
                md:w-72
                w-full
                cursor-pointer
                rounded-xl
                md:rounded-none
                transition-all
                duration-200
                hover:bg-slate-50
                hover:text-blue-600
                ${
                  isActive 
                  ? "bg-blue-50 text-blue-600 md:border-r-4 border-blue-500 shadow-sm md:shadow-none" 
                  : ""
                }` 
              } 
            > 
              {/* <img 
                className='
                  w-5
                  h-5
                  object-contain
                  flex-shrink-0
                '
                src={assets.home_icon} 
                alt="" 
              />  */}
               <FaUserDoctor className='w-5 h-6 object-contain
                    flex-shrink-0' />
              <p className="hidden md:block text-sm lg:text-[15px] font-medium">
                Doctor Consultation
              </p> 
            </NavLink> 

        </ul>} 
    </div>
  )
}

export default SideBar
