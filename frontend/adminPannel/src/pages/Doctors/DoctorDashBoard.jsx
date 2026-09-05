import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/doctorContext'
import {assets} from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/adminContext'
import { AppContext } from '../../context/appContext'
import { MdQueue } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";
import {FaCalendarCheck} from "react-icons/fa";
import { FaUser } from 'react-icons/fa6'



const DoctorDashBoard = () => {
  const { dToken, dashData,
       setDashData, getDashData, cancelledAppointment} = useContext(DoctorContext)
  const {slotDateFormat} = useContext(AppContext)
       useEffect(()=>{
        if(dToken){
          getDashData()
        }
       },[dToken])
  return dashData && (
<div className="w-full min-h-screen bg-blue-200 max-md:ml-24 md:ml-75 min-h-screenp-3 sm:p-5 lg:p-7 max-md:ml-24 md:ml-75 bg-slate-50">

  {/* ================= DASHBOARD CARDS ================= */}
  <div className="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    lg:grid-cols-3 
    gap-4 
    lg:gap-6 
    w-full
    
  ">

    {/* PATIENTS */}
    <div className="
      group relative overflow-hidden
      flex items-center justify-between
      min-h-[128px]
      w-full
      gap-3
      
      bg-black
      p-4 sm:p-5
      rounded-3xl
      border border-blue-100
      shadow-[0_8px_30px_rgb(15,23,42,0.06)]
      hover:shadow-[0_18px_40px_rgb(37,99,235,0.15)]
      hover:-translate-y-1
      cursor-pointer
      hover:scale-[1.015]
      transition-all duration-300 ease-out
      before:absolute before:-right-12 before:-top-12
      before:w-32 before:h-32 before:rounded-full
      before:bg-blue-500/10
      before:transition-transform before:duration-500
      group-hover:before:scale-150
    ">

      <FaUser className="
        relative z-10
        w-10 h-9
        sm:w-14 sm:h-14
        object-contain
        text-blue-600
        drop-shadow-sm
        transition-all duration-300
        group-hover:scale-110
        group-hover:-rotate-3
      " />

      <div className="relative z-10 text-center">

        <p className="
          text-2xl sm:text-3xl
          min-w-[55px]
          px-3
          py-1
          rounded-2xl
          font-bold
          bg-gradient-to-br from-blue-600 to-blue-800
          text-white
          shadow-md shadow-blue-200
          transition-all duration-300
          group-hover:shadow-lg
          group-hover:shadow-blue-300
        ">
          {dashData?.patients}
        </p>

        <p className="
          text-sm sm:text-lg
          text-slate-500
          font-semibold
          mt-2
        ">
          Patients
        </p>

      </div>

    </div>


    {/* APPOINTMENTS */}
    <div className="
      group relative overflow-hidden
      flex items-center justify-between
      min-h-[128px]
      w-full
      gap-3
        bg-black
      p-4 sm:p-5
      rounded-3xl
      border border-indigo-100
      shadow-[0_8px_30px_rgb(15,23,42,0.06)]
      hover:shadow-[0_18px_40px_rgb(79,70,229,0.15)]
      hover:-translate-y-1
      cursor-pointer
      hover:scale-[1.015]
      transition-all duration-300 ease-out
      before:absolute before:-right-12 before:-top-12
      before:w-32 before:h-32 before:rounded-full
      before:bg-indigo-500/10
      before:transition-transform before:duration-500
      group-hover:before:scale-150
    ">

      <FaCalendarCheck className="
        relative z-10
        w-10 h-9
        sm:w-14 sm:h-14
        object-contain
        text-indigo-600
        drop-shadow-sm
        transition-all duration-300
        group-hover:scale-110
        group-hover:-rotate-3
      " />

      <div className="relative z-10 text-center">

        <p className="
          text-2xl sm:text-3xl
          min-w-[55px]
          px-3
          py-1
          rounded-2xl
          font-bold
          bg-gradient-to-br from-indigo-600 to-indigo-800
          text-white
          shadow-md shadow-indigo-200
          transition-all duration-300
          group-hover:shadow-lg
          group-hover:shadow-indigo-300
        ">
          {dashData?.appointments}
        </p>

        <p className="
          text-sm sm:text-lg
          text-slate-500
          font-semibold
          mt-2
        ">
          Appointments
        </p>

      </div>

    </div>


    {/* QUEUE */}
    <div className="
      group relative overflow-hidden
      flex items-center justify-between
      min-h-[128px]
      w-full
      
      gap-3
      bg-black
      p-4 sm:p-5
      rounded-3xl
      border border-violet-100
      shadow-[0_8px_30px_rgb(15,23,42,0.06)]
      hover:shadow-[0_18px_40px_rgb(124,58,237,0.15)]
      hover:-translate-y-1
      cursor-pointer
      hover:scale-[1.015]
      transition-all duration-300 ease-out
      before:absolute before:-right-12 before:-top-12
      before:w-32 before:h-32 before:rounded-full
      before:bg-violet-500/10
      before:transition-transform before:duration-500
      group-hover:before:scale-150
    ">

      <MdFormatListNumbered
        className="
          relative z-10
          w-12 h-12
          sm:w-14 sm:h-14
          p-2
          text-violet-600
          bg-violet-50
          border border-violet-100
          rounded-2xl
          shadow-sm
          transition-all duration-300
          group-hover:scale-110
          group-hover:bg-violet-100
          group-hover:rotate-3
        "
      />

      <div className="relative z-10  text-center">

        <p className="
          text-2xl sm:text-3xl
          min-w-[55px]
          px-3
          py-1
          rounded-2xl
          font-bold
          bg-gradient-to-br from-violet-600 to-violet-800
          text-white
          shadow-md shadow-violet-200
          transition-all duration-300
          group-hover:shadow-lg
          group-hover:shadow-violet-300
        ">
          {dashData?.QueueNumber}
        </p>

        <p className="
          text-sm sm:text-lg
          text-slate-500
          font-semibold
          mt-2
        ">
          Queue Number
        </p>

      </div>

    </div>

  </div>


  {/* ================= LATEST BOOKINGS ================= */}
  <div className="
    bg-blue-400
    rounded-3xl
    border border-slate-200
    shadow-[0_10px_35px_rgb(15,23,42,0.06)]
    overflow-hidden
    mt-5 sm:mt-7
  ">

    {/* HEADER */}
    <div className="
      flex items-center
      gap-2.5
      px-4 sm:px-6
      py-4
      border-b border-slate-200
      bg-gradient-to-r from-blue-50 via-white to-indigo-50
    ">

      <img
        className="
          w-5 h-5
          object-contain
          opacity-80
        "
        src={assets.list_icon}
        alt=""
      />

      <p className="
        text-slate-800
        font-bold
        text-base sm:text-lg
      ">
        Latest Bookings
      </p>

    </div>


    {/* BOOKINGS */}
    <div>

      {dashData?.latestAppointments?.map((item, index) => (

        <div
          key={index}
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            gap-3 sm:gap-4
            px-4 sm:px-6
            py-4
            border-b border-slate-100
            last:border-b-0
            hover:bg-blue-50/60
            transition-all duration-300
            group
          "
        >

          {/* PATIENT IMAGE + INFORMATION */}
          <div className="flex items-center gap-3 flex-1 min-w-0">

            <img
              className="
                rounded-full
                bg-blue-50
                w-12 h-12
                sm:w-14 sm:h-14
                object-cover
                border-2 border-white
                shadow-md
                ring-2 ring-blue-100
                flex-shrink-0
                transition-all duration-300
                group-hover:ring-blue-300
                group-hover:scale-105
              "
              src={item.userData.image}
              alt=""
            />

            <div className="min-w-0">

              <p className="
                text-slate-800
                font-bold
                text-sm sm:text-base
                truncate
                transition-colors duration-300
                group-hover:text-blue-700
              ">
                {item.userData.name}
              </p>

              <p className="
                text-slate-500
                text-xs sm:text-sm
                mt-1
                font-medium
              ">
                {slotDateFormat(item.slotDate)}
              </p>

            </div>

          </div>


          {/* STATUS / ACTIONS */}
          <div className="
            w-full
            sm:w-auto
            flex
            justify-start
            sm:justify-end
          ">

            {item.cancelled ? (

              <p className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-2xl
                bg-gradient-to-r from-red-50 to-rose-50
                border border-red-200
                text-red-600
                text-xs sm:text-sm
                font-bold
                shadow-sm
              ">
                <span className="
                  w-2 h-2
                  rounded-full
                  bg-red-500
                  shadow-[0_0_8px_rgba(239,68,68,0.5)]
                "></span>
                Cancelled
              </p>

            ) : item.isCompleted ? (

              <p className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-2xl
                bg-gradient-to-r from-emerald-50 to-green-50
                border border-emerald-200
                text-emerald-600
                text-xs sm:text-sm
                font-bold
                shadow-sm
              ">
                <span className="
                  w-2 h-2
                  rounded-full
                  bg-emerald-500
                  shadow-[0_0_8px_rgba(16,185,129,0.5)]
                "></span>
                Completed
              </p>

            ) : (

              <div className="
                flex
                items-center
                gap-2
                w-full
                sm:w-auto
              ">

                {/* CANCEL */}
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="
                    w-1/2
                    sm:w-32
                    h-10
                    p-2.5
                    rounded-xl
                    cursor-pointer
                    bg-red-50
                    border border-red-100
                    hover:bg-red-500
                    hover:border-red-500
                    hover:shadow-xl
                    hover:shadow-red-200
                    hover:scale-105
                    active:scale-95
                    transition-all duration-300
                  "
                  src={assets.cancel_icon}
                  alt="Cancel"
                />

                {/* COMPLETE */}
                <img
                  onClick={() => markAppointmentComplete(item._id)}
                  className="
                    w-1/2
                    sm:w-32
                    h-10
                    p-2.5
                    rounded-xl
                    cursor-pointer
                    bg-emerald-50
                    border border-emerald-100
                    hover:bg-emerald-500
                    hover:border-emerald-500
                    hover:shadow-xl
                    hover:shadow-emerald-200
                    hover:scale-105
                    active:scale-95
                    transition-all duration-300
                  "
                  src={assets.tick_icon}
                  alt="Complete"
                />

              </div>

            )}

          </div>

        </div>

      ))}

    </div>

  </div>

</div>


  )
}

export default DoctorDashBoard
