import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/adminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/appContext'
import {assets} from '../../assets/assets_admin/assets'
import { FaCalendarCheck } from 'react-icons/fa6'

const Appointment = () => {

  const { aToken, appointments , getAllAppointment, userData, cancelledAppointment} = useContext(AdminContext)
  const { calculateAge, slotDateFormat } = useContext(AppContext)

  useEffect(()=>{
    if(aToken){
    getAllAppointment()
    }
 },[aToken])
  return (
    <div className="bg-white border border-slate-200 rounded-2xl w-full m-2 shadow-sm overflow-hidden">

  {/* ================= HEADER ================= */}
  <div className="px-5 sm:px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-white to-slate-50">

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-800">
          All Appointments
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage and monitor patient appointments
        </p>
      </div>

      <div className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-100">
        <span className="text-xs font-semibold text-blue-600">
          {appointments.length} Appointments
        </span>
      </div>

    </div>

  </div>


  {/* ================= TABLE HEADER ================= */}

  <div
    className="
      hidden
      sm:grid
      grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr]
      items-center
      gap-4
      px-6
      py-4
      bg-slate-50
      border-b
      border-slate-200
      text-[11px]
      uppercase
      tracking-wider
      font-bold
      text-slate-500
    "
  >

    <p>#</p>

    <p>Patient</p>

    <p>Age</p>

    <p>Date & Time</p>

    <p>Doctor</p>

    <p>Action</p>

  </div>


  {/* ================= APPOINTMENT LIST ================= */}

  <div className="max-h-[70vh] overflow-y-auto">

    {appointments.length > 0 ? (

      appointments.map((item, index) => (

        <div
          key={item._id || index}
          className=" group relative flex flex-wrap items-center justify-between gap-4 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr] sm:gap-4 px-5 sm:px-6 py-5 border-b border-slate-100 bg-white hover:bg-blue-50/40 transition-all duration-200 "
        >

          {/* ================= NUMBER ================= */}

          <div className="max-sm:hidden">

            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold group-hover:bg-blue-100 group-hover:text-blue-600 transition">

              {String(index + 1).padStart(2, "0")}

            </span>

          </div>


          {/* ================= PATIENT ================= */}

          <div className="flex items-center gap-3 min-w-[180px]">

            {/* Patient Image */}

            <div className="relative flex-shrink-0">

              <img
                className="
                  w-11
                  h-11
                  rounded-full
                  object-cover
                  border-2
                  border-white
                  shadow-sm
                  bg-slate-100
                "
                src={
                  item.userData?.image ||
                  assets.profile_pic
                }
                alt={item.userData?.name || "Patient"}
              />

              {/* Online/status dot */}

              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>

            </div>


            <div className="min-w-0">

              <p className="font-semibold text-slate-800 truncate group-hover:text-blue-700 transition">

                {item.userData?.name ||
                  "Unknown Patient"}

              </p>

              <p className="text-xs text-slate-400 truncate mt-0.5">

                {item.userData?.email ||
                  "Patient"}

              </p>

            </div>

          </div>


          {/* ================= AGE ================= */}

          <div className="flex flex-col">

            <span className="text-[10px] uppercase tracking-wide text-slate-400 sm:hidden">
              Age
            </span>

            <span className="font-semibold text-slate-700">

              {item.userData?.dob
                ? calculateAge(item.userData.dob)
                : "N/A"}

            </span>

          </div>


          {/* ================= DATE & TIME ================= */}

          <div className="flex flex-col">

            <span className="text-[10px] uppercase tracking-wide text-slate-400 sm:hidden">
              Appointment
            </span>

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <FaCalendarCheck className="w-4 h-4" />
              </div>

              <div>

                <p className="text-sm font-semibold text-slate-700">

                  {slotDateFormat(item.slotDate)}

                </p>

                <p className="text-xs text-slate-400 mt-0.5">

                  {item.slotTime}

                </p>

              </div>

            </div>

          </div>


          {/* ================= DOCTOR ================= */}

          <div className="flex items-center gap-3 min-w-[180px]">

            {/* Doctor Image */}

            <div className="relative flex-shrink-0">

              <img
                className="
                  w-11
                  h-11
                  rounded-full
                  object-cover
                  border-2
                  border-white
                  shadow-sm
                  bg-slate-100
                "
                src={
                  item.doctorData?.image ||
                  assets.profile_pic
                }
                alt={item.doctorData?.name || "Doctor"}
              />

              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>

            </div>


            <div className="min-w-0">

              <p className="font-semibold text-slate-800 truncate">

                {item.doctorData?.name ||
                  "Unknown Doctor"}

              </p>

              <p className="text-xs text-slate-400 mt-0.5">

                Medical Doctor

              </p>

            </div>

          </div>


          {/* ================= ACTION ================= */}

          <div className="flex items-center justify-start sm:justify-end">

            {item.cancelled ? (

              <span className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-red-50
                border
                border-red-100
                text-red-600
                text-xs
                font-semibold
              ">

                <span className="w-2 h-2 rounded-full bg-red-500"></span>

                Cancelled

              </span>

            ) : (

              <button
                type="button"
                onClick={() =>
                  cancelledAppointment(item._id)
                }
                className="
                  group/cancel
                  w-10
                  h-10
                  rounded-xl
                  bg-red-50
                  border
                  border-red-100
                  flex
                  items-center
                  justify-center
                  hover:bg-red-500
                  hover:border-red-500
                  transition-all
                  duration-200
                  cursor-pointer
                "
                title="Cancel appointment"
              >

                <img
                  src={assets.cancel_icon}
                  alt="Cancel"
                  className="
                    w-5
                    h-5
                    object-contain
                    group-hover/cancel:brightness-0
                    group-hover/cancel:invert
                    transition
                  "
                />

              </button>

            )}

          </div>

        </div>

      ))

    ) : (

      /* ================= EMPTY STATE ================= */

      <div className="flex flex-col items-center justify-center py-20 px-5">

        <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl mb-4">
          <FaCalendarCheck className="w-10 h-10 text-blue-500" />
        </div>

        <h3 className="text-lg font-bold text-slate-700">
          No Appointments
        </h3>

        <p className="text-sm text-slate-400 mt-1 text-center max-w-sm">
          There are currently no appointments available to display.
        </p>

      </div>

    )}

  </div>

</div>
  )
}

export default Appointment
