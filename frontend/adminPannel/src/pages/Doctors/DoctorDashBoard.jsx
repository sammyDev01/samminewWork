import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/doctorContext'
import {assets} from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/adminContext'
import { AppContext } from '../../context/appContext'
import { MdQueue } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";



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
<div className="w-full p-3 sm:p-5">

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
      flex items-center justify-between
      min-h-[125px]
      w-full
      gap-3
      bg-white
      p-4 sm:p-5
      rounded-2xl
      border border-gray-200
      shadow-sm
      hover:shadow-lg
      hover:-translate-y-1
      cursor-pointer
      hover:scale-[1.02]
      transition-all duration-300
    ">
      <img
        className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
        src={assets.patients_icon}
        alt=""
      />

      <div className="text-center">
        <p className="
          text-2xl sm:text-3xl
          min-w-[55px]
          px-3
          py-1
          rounded-full
          font-bold
          bg-blue-700
          text-white
        ">
          {dashData?.patients}
        </p>

        <p className="text-sm sm:text-lg text-gray-400 font-medium mt-1">
          Patients
        </p>
      </div>
    </div>


    {/* APPOINTMENTS */}
    <div className="
      flex items-center justify-between
      min-h-[125px]
      w-full
      gap-3
      bg-white
      p-4 sm:p-5
      rounded-2xl
      border border-gray-200
      shadow-sm
      hover:shadow-lg
      hover:-translate-y-1
      cursor-pointer
      hover:scale-[1.02]
      transition-all duration-300
    ">
      <img
        className="w-12 h-12 sm:w-16 sm:h-14 object-contain"
        src={assets.appointments_icon}
        alt=""
      />

      <div className="text-center">
        <p className="
          text-2xl sm:text-3xl
          min-w-[55px]
          px-3
          py-1
          rounded-full
          font-bold
          bg-blue-700
          text-white
        ">
          {dashData?.appointments}
        </p>

        <p className="text-sm sm:text-lg text-gray-400 font-medium mt-1">
          Appointments
        </p>
      </div>
    </div>


    {/* QUEUE */}
    <div className="
      flex items-center justify-between
      min-h-[125px]
      w-full
      gap-3
      bg-white
      p-4 sm:p-5
      rounded-2xl
      border border-gray-200
      shadow-sm
      hover:shadow-lg
      hover:-translate-y-1
      cursor-pointer
      hover:scale-[1.02]
      transition-all duration-300
    ">

      <MdFormatListNumbered
        className="
          w-12 h-12
          sm:w-14 sm:h-14
          p-2
          bg-gray-200
          rounded-xl
        "
      />

      <div className="text-center">
        <p className="
          text-2xl sm:text-3xl
          min-w-[55px]
          px-3
          py-1
          rounded-full
          font-bold
          bg-blue-700
          text-white
        ">
          {dashData?.QueueNumber}
        </p>

        <p className="text-sm sm:text-lg text-gray-400 font-medium mt-1">
          Queue Number
        </p>
      </div>

    </div>

  </div>


  {/* ================= LATEST BOOKINGS ================= */}
  <div className="
    bg-white
    rounded-2xl
    border border-gray-200
    shadow-sm
    overflow-hidden
    mt-5 sm:mt-6
  ">

    {/* HEADER */}
    <div className="
      flex items-center
      gap-2.5
      px-4 sm:px-6
      py-4
      border-b border-gray-200
      bg-gradient-to-r from-gray-50 to-white
    ">
      <img
        className="w-5 h-5 object-contain"
        src={assets.list_icon}
        alt=""
      />

      <p className="text-gray-700 font-semibold text-base sm:text-lg">
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
            border-b border-gray-100
            last:border-b-0
            hover:bg-blue-50/50
            transition-all duration-300
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
                shadow-sm
                ring-1 ring-gray-200
                flex-shrink-0
              "
              src={item.userData.image}
              alt=""
            />

            <div className="min-w-0">

              <p className="
                text-gray-800
                font-semibold
                text-sm sm:text-base
                truncate
              ">
                {item.userData.name}
              </p>

              <p className="
                text-gray-500
                text-xs sm:text-sm
                mt-1
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
                px-3
                py-2
                rounded-xl
                bg-red-50
                border border-red-200
                text-red-600
                text-xs sm:text-sm
                font-semibold
              ">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Cancelled
              </p>

            ) : item.isCompleted ? (

              <p className="
                inline-flex
                items-center
                gap-2
                px-3
                py-2
                rounded-xl
                bg-emerald-50
                border border-emerald-200
                text-emerald-600
                text-xs sm:text-sm
                font-semibold
              ">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
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
                    hover:shadow-lg
                    hover:shadow-red-100
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
                    hover:shadow-lg
                    hover:shadow-emerald-100
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
