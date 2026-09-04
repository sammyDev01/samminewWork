import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/doctorContext'
import { useEffect } from 'react'
import {AppContext} from '../../context/appContext'
import {assets} from '../../assets/assets_admin/assets'
import { FaCalendarCheck } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";





const DoctorApponitment = () => {
    const {dToken, setDToken,
       appointments, setAppointments,
       getAppointment,markAppointmentComplete,
       cancelAppointment} = useContext(DoctorContext)
    const {calculateAge, slotDateFormat} = useContext(AppContext)

       useEffect(()=>{
        if(dToken){
            getAppointment()
        }
       },[dToken])
  return (
    <div className="w-full max-w-7xl px-3 sm:px-5 lg:px-8 py-4 sm:py-5">

  {/* ================= HEADER ================= */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 sm:mb-6">

    <div>
      <div className="flex items-center gap-3">

        <div className="
          w-10 h-10 sm:w-11 sm:h-11
          flex-shrink-0
          rounded-xl sm:rounded-2xl
          flex items-center justify-center
          bg-gradient-to-br from-blue-600 to-cyan-500
          text-white
          text-lg sm:text-xl
          shadow-lg shadow-blue-100
        ">
         <FaCalendarCheck />
        </div>

        <div className="min-w-0">

          <h1 className="
            text-lg sm:text-2xl
            font-bold
            text-slate-800
          ">
            Appointments
          </h1>

          <p className="
            text-[11px] sm:text-sm
            text-slate-400
            mt-1
            truncate
          ">
            Manage and monitor your patient appointments
          </p>

        </div>

      </div>
    </div>


    {/* TOTAL APPOINTMENTS */}

    <div className="
      flex items-center gap-3
      bg-white
      border border-slate-200
      rounded-xl sm:rounded-2xl
      px-3 sm:px-4
      py-2.5 sm:py-3
      shadow-sm
      w-fit
    ">

      <div className="
        w-8 h-8 sm:w-9 sm:h-9
        rounded-lg sm:rounded-xl
        flex items-center justify-center
        bg-blue-50
        text-blue-600
        text-sm
        font-bold
      ">
        {appointments.length}
      </div>

      <div>

        <p className="
          text-[9px] sm:text-[10px]
          uppercase
          tracking-wider
          text-slate-400
        ">
          Total
        </p>

        <p className="
          text-xs sm:text-sm
          font-semibold
          text-slate-700
        ">
          Appointment{appointments.length !== 1 ? "s" : ""}
        </p>

      </div>

    </div>

  </div>


  {/* ================= MAIN CARD ================= */}

  <div className="
    w-full
    bg-white
    border border-slate-200
    rounded-2xl sm:rounded-3xl
    overflow-hidden
    shadow-sm
    hover:shadow-md
    transition-shadow
    duration-300
  ">

    {/* TOP GRADIENT */}

    <div className="
      h-1 sm:h-1.5
      w-full
      bg-gradient-to-r
      from-blue-600
      via-cyan-500
      to-teal-400
    "></div>


    {/* ================= TABLE HEADER ================= */}

    <div className="
      hidden md:grid
      grid-cols-[60px_2fr_100px_1.5fr_1.5fr]
      items-center
      gap-4
      px-6
      py-4
      bg-slate-50
      border-b border-slate-200
      text-[11px]
      font-bold
      uppercase
      tracking-wider
      text-slate-400
    ">

      <p>#</p>
      <p>Patient</p>
      <p>Age</p>
      <p>Date & Time</p>
      <p className="text-center">Action</p>

    </div>


    {/* ================= APPOINTMENT LIST ================= */}

    <div className="
      max-h-[70vh]
      min-h-[300px] sm:min-h-[350px]
      overflow-y-auto
      divide-y divide-slate-100
      scrollbar-thin
      scrollbar-thumb-slate-300
      scrollbar-track-transparent
    ">

      {appointments.map((item, index)=>(

        <div
          key={index}
          className="
            group
            relative

            grid
            grid-cols-1
            md:grid-cols-[60px_2fr_100px_1.5fr_1.5fr]

            items-center
            gap-3
            md:gap-4

            px-4
            sm:px-5
            md:px-6

            py-4
            sm:py-5

            bg-white

            hover:bg-blue-50/40

            transition-all
            duration-300

            border-l-4
            border-transparent
            hover:border-blue-500
          "
        >

            {/* NUMBER */}

            <p className="
              hidden
              md:flex
              items-center
              justify-center

              w-9
              h-9

              rounded-xl

              bg-slate-100
              text-slate-500

              text-xs
              font-bold

              group-hover:bg-blue-100
              group-hover:text-blue-600

              transition-all
              duration-300
            ">
                {index+1}
            </p>


            {/* PATIENT */}

            <div className="
              flex
              items-center
              gap-3
              min-w-0
            ">

                <div className="
                  relative
                  flex-shrink-0
                ">

                  <img
                    className="
                      w-12 h-12
                      sm:w-14 sm:h-14

                      rounded-2xl

                      object-cover

                      border-2
                      border-white

                      shadow-md

                      ring-1
                      ring-slate-200

                      group-hover:ring-blue-300

                      transition-all
                      duration-300
                    "
                    src={item.userData.image}
                    alt=""
                  />

                  <span className="
                    absolute
                    right-0
                    bottom-0

                    w-3
                    h-3

                    rounded-full

                    bg-emerald-500

                    border-2
                    border-white
                  "></span>

                </div>


                <div className="
                  min-w-0
                  flex-1
                ">

                    <p className="
                      text-sm
                      sm:text-base

                      font-semibold

                      text-slate-800

                      truncate

                      group-hover:text-blue-600

                      transition-colors
                      duration-300
                    ">
                        {item.userData.name}
                    </p>

                    <p className="
                      text-[10px]
                      sm:text-xs

                      text-slate-400

                      mt-1
                    ">
                        Patient #{String(index + 1).padStart(3, "0")}
                    </p>

                </div>

            </div>


            {/* AGE */}

            <p className="
              flex
              items-center

              text-xs
              sm:text-sm

              font-semibold

              text-slate-600

              bg-slate-50

              border
              border-slate-100

              rounded-xl

              px-3
              py-2

              w-fit

              md:bg-transparent
              md:border-0
              md:px-0
              md:py-0
            ">
                {calculateAge(item.userData.dob)}

                <span className="
                  ml-1
                  text-[9px]
                  text-slate-400
                  font-normal
                ">
                  yrs
                </span>
            </p>


            {/* DATE & TIME */}

            <p className="
              flex
              items-center

              text-xs
              sm:text-sm

              font-medium

              text-slate-600

              bg-slate-50

              border
              border-slate-100

              rounded-xl

              px-3
              py-2

              w-fit

              group-hover:bg-blue-50
              group-hover:border-blue-100

              transition-all
              duration-300
            ">
                <span className="
                  mr-2
                  text-blue-500
                  text-sm
                ">
                 <MdDateRange className='w-5 h-4' />
                </span>

                {slotDateFormat(item.slotDate)}

                <span className="
                  mx-1
                  text-slate-300
                ">
                  |
                </span>

                <span className="
                  text-teal-600
                  font-semibold
                ">
                  {item.slotTime}
                </span>
            </p>


            {/* ACTION */}
             {
                item.cancelled ? <p className="
                inline-flex items-center gap-2 px-3 py-2 rounded-xl  bg-red-50
                border border-red-200  text-red-600 text-xs sm:text-sm font-semibold shadow-sm ">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Cancelled
                </p>
                : item.isCompleted ? <p className="
                inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs sm:text-sm font-semibold shadow-sm ">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Completed
                </p> : 
                <div className="w-full flex items-center gap-2 md:justify-center pt-1 md:pt-0">
                <img
                  onClick={()=>cancelAppointment(item._id)}
                  className=" w-full h-10 p-2.5 rounded-xl cursor-pointer bg-red-50 border border-red-100 hover:bg-red-500 hover:border-red-500 hover:shadow-lg hover:shadow-red-100 hover:scale-105 active:scale-95 transition-all duration-300 " src={assets.cancel_icon}
                  alt="" />
                <img
                  onClick={()=>markAppointmentComplete(item._id)}
                  className=" w-full h-10  p-2.5 rounded-xl cursor-pointer bg-emerald-50 border border-emerald-100 hover:bg-emerald-500 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-100 hover:scale-105 active:scale-95 transition-all duration-300 " src={assets.tick_icon} alt="" />
                </div>
             }
            

        </div>

      ))}

    </div>

  </div>

</div>
  )
}

export default DoctorApponitment
