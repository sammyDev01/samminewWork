import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/adminContext'
import {assets} from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/appContext';
import { FaCalendarCheck, FaListOl, FaUserDoctor, FaCalendarXmark, FaUserInjured } from 'react-icons/fa6';
// import { FaList0l } from 'react-icons/fa6';

const DashBoard = () => {

      const { getQueue, appointments,stats, setStats, queue, setQueue, getDashData, aToken, getQueueStats,cancelledAppointment, dashData} = useContext(AdminContext);
      const {calculateAge, slotDateFormat} = useContext(AppContext)
      useEffect(()=>{
        if(aToken){
          getDashData()
        }
      },[aToken])

      useEffect(()=>{
        if(aToken){
          getQueue()
        }
      },[aToken])

  // ====================================
  // LOAD DATA
  // ====================================

  useEffect(() => {

    getQueueStats();

    // Refresh every 5 seconds
    const interval = setInterval(() => {
      getQueueStats();
    }, 5000);

    return () => {
      clearInterval(interval);
    };

  }, []);

  return dashData && (


<main className="flex-1 max-md:ml-20 md:ml-72 min-h-screen overflow-y-auto bg-[#f1f5f9]">

  <div className="w-full max-w-[1800px] mx-auto px-3 sm:px-5 lg:px-8 xl:px-10 py-5 sm:py-7 lg:py-8">

    {/* ================= WELCOME / INTRO ================= */}
    <div className="mb-6 sm:mb-8">

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight">
        Dashboard Overview
      </h1>

      <p className="text-sm sm:text-base text-slate-500 mt-1.5 max-w-2xl">
        Monitor your health center activities and patient queues.
      </p>

    </div>


    {/* ================= GENERAL STATISTICS ================= */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mb-7 lg:mb-8">

      {/* DOCTORS */}
      <div className="group bg-white border border-slate-200/80 rounded-2xl p-5 lg:p-6 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center justify-between gap-4">

          <div className="min-w-0">

            <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wide">
              Total Doctors
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-2">
              {dashData?.doctors || 0}
            </h2>

            <p className="text-xs text-emerald-600 mt-2 font-semibold">
              Medical staff
            </p>

          </div>

          <div className="shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-100 transition">

            <FaUserDoctor className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />

          </div>

        </div>

      </div>


      {/* PATIENTS */}
      <div className="group bg-white border border-slate-200/80 rounded-2xl p-5 lg:p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center justify-between gap-4">

          <div className="min-w-0">

            <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wide">
              Total Patients
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-2">
              {dashData?.patient || 0}
            </h2>

            <p className="text-xs text-blue-600 mt-2 font-semibold">
              Registered patients
            </p>

          </div>

          <div className="shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:bg-indigo-100 transition">

            <FaUserInjured className="w-6 h-6 lg:w-7 lg:h-7 text-indigo-600" />

          </div>

        </div>

      </div>

      {/* Consultations */}
       <div className="group bg-white border border-slate-200/80 rounded-2xl p-5 lg:p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center justify-between gap-4">

          <div className="min-w-0">

            <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wide">
              Total Consultations
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-2">
              {dashData?.consultations || 0}
            </h2>

            <p className="text-xs text-blue-600 mt-2 font-semibold">
              Registered consultations
            </p>

          </div>

          <div className="shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:bg-indigo-100 transition">

            <FaCalendarXmark className="w-6 h-6 lg:w-7 lg:h-7 text-indigo-600" />

          </div>

        </div>

      </div>


      {/* APPOINTMENTS */}
      <div className="group bg-white border border-slate-200/80 rounded-2xl p-5 lg:p-6 shadow-sm hover:shadow-xl hover:shadow-violet-100/50 hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center justify-between gap-4">

          <div className="min-w-0">

            <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wide">
              Appointments
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-2">
              {dashData?.appointment || 0}
            </h2>

            <p className="text-xs text-violet-600 mt-2 font-semibold">
              Total appointments
            </p>

          </div>

          <div className="shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center group-hover:bg-violet-100 transition">

            <FaCalendarCheck className="w-6 h-6 lg:w-7 lg:h-7 text-violet-600" />

          </div>

        </div>

      </div>


      {/* TOTAL QUEUE */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-5 lg:p-6 shadow-lg shadow-blue-200/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/70 transition-all duration-300">

        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>

        <div className="absolute -left-10 -bottom-10 w-28 h-28 rounded-full bg-cyan-300/10 blur-2xl"></div>

        <div className="relative flex items-center justify-between gap-4">

          <div>

            <p className="text-xs sm:text-sm text-blue-100 font-semibold uppercase tracking-wide">
              Queues Today
            </p>

            <h2 className="text-3xl lg:text-4xl font-black text-white mt-2">
              {stats?.totalQueues || 0}
            </h2>

            <p className="text-xs text-blue-100 mt-2">
              Generated today
            </p>

          </div>

          <div className="shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-sm">

            <FaListOl className="w-6 h-6 lg:w-7 lg:h-7 text-white" />

          </div>

        </div>

      </div>

    </div>


    {/* ================= LATEST BOOKING ================= */}

    <div className="mb-7 lg:mb-8">

      <div className="flex items-center gap-3 px-4 sm:px-5 py-4 bg-white border border-slate-200 rounded-t-2xl shadow-sm">

        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">

          <img
            className="w-5 h-5"
            src={assets.list_icon}
            alt=""
          />

        </div>

        <div>

          <p className="font-bold text-slate-800 text-sm sm:text-base">
            Latest Booking
          </p>

          <p className="text-xs text-slate-400">
            Most recent appointment activity
          </p>

        </div>

      </div>


      <div className="bg-white border border-t-0 border-slate-200 rounded-b-2xl shadow-sm overflow-hidden">

        {dashData.latestAppointment.map((item, index) => (

          <div
            className="flex flex-wrap sm:flex-nowrap items-center px-4 sm:px-6 py-4 gap-3 sm:gap-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-all duration-300"
            key={index}
          >

            <img
              className="shrink-0 rounded-full w-11 h-11 object-cover border-2 border-white shadow-md ring-1 ring-slate-200"
              src={item.doctorData.image}
              alt=""
            />

            <div className="text-sm flex-1 min-w-[150px]">

              <p className="text-slate-800 font-semibold">
                {item.doctorData.name}
              </p>

              <p className="text-slate-500 text-xs mt-1">
                {slotDateFormat(item.slotDate)}
              </p>

            </div>

            {item.cancelled

              ?

              <p className="px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
                cancelled
              </p>

              : item.isCompleted

                ?

                <p className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold">
                  completed
                </p>

                :

                <img
                  onClick={() => cancelledAppointment(item._id)}
                  className="shrink-0 w-9 h-9 p-2 rounded-xl cursor-pointer bg-red-50 border border-red-100 hover:bg-red-500 hover:shadow-md hover:scale-105 transition-all duration-300"
                  src={assets.cancel_icon}
                  alt=""
                />

            }

          </div>

        ))}

      </div>

    </div>


    {/* ================= APPOINTMENTS ================= */}

    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-7 lg:mb-8">

      {/* HEADER */}

      <div className="px-4 sm:px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            Recent Appointments
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Overview of recent patient appointments
          </p>

        </div>

        <div className="self-start sm:self-auto px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-lg text-xs font-bold">
          {dashData?.latestAppointment.length || 0} Total
        </div>

      </div>


      {/* APPOINTMENT LIST */}

      <div className="divide-y divide-slate-100">

        {dashData?.latestAppointment &&
        dashData.latestAppointment.length > 0 ? (

          dashData.latestAppointment.map((appointment) => (

            <div
              key={appointment._id}
              className="px-4 sm:px-6 py-5 hover:bg-slate-50 transition-all duration-300"
            >

              <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_2fr_auto] gap-5 lg:gap-8 items-center">

                {/* PATIENT */}

                <div className="flex items-center gap-3 min-w-0">

                  <img
                    className="shrink-0 rounded-full w-11 h-11 object-cover border-2 border-white shadow-md ring-1 ring-slate-200"
                    src={appointment.userData?.image}
                    alt=""
                  />

                  <div className="min-w-0">

                    <p className="font-semibold text-slate-800 truncate">
                      {appointment.userData?.name ||
                        "Unknown Patient"}
                    </p>

                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {appointment.userData?.email ||
                        "No email"}
                    </p>

                  </div>

                </div>


                {/* APPOINTMENT DETAILS */}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">

                  <div className="min-w-0">

                    <p className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold">
                      Doctor
                    </p>

                    <p className="font-medium text-slate-700 mt-1 truncate">
                      {appointment.doctorData?.name ||
                        "Unknown Doctor"}
                    </p>

                  </div>


                  <div>

                    <p className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold">
                      Date
                    </p>

                    <p className="font-medium text-slate-700 mt-1">
                      {slotDateFormat(appointment.slotDate) ||
                        appointment.date ||
                        "N/A"}
                    </p>

                  </div>


                  <div>

                    <p className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold">
                      Time
                    </p>

                    <p className="font-medium text-slate-700 mt-1">
                      {appointment.slotTime ||
                        appointment.time ||
                        "N/A"}
                    </p>

                  </div>

                </div>


                {/* STATUS / CANCEL */}

                <div className="flex items-center lg:justify-end gap-3">

                  {
                    appointment.isCompleted

                      ?

                      <p className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold">
                        completed
                      </p>

                      :

                      appointment.cancelled

                        ?

                        <p className="px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
                          cancelled
                        </p>

                        :

                        <button
                          onClick={() =>
                            cancelledAppointment(
                              appointment._id
                            )
                          }
                          className="
                            px-4 py-2
                            rounded-xl
                            text-xs
                            font-semibold
                            text-red-600
                            border
                            border-red-200
                            bg-red-50
                            hover:bg-red-500
                            hover:text-white
                            hover:border-red-500
                            transition-all
                            duration-300
                          "
                        >
                          Cancel
                        </button>

                  }

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="py-12 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-3">

              <FaCalendarCheck className="text-blue-500 text-xl" />

            </div>

            <p className="font-semibold text-slate-700">
              No appointments found
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Recent appointments will appear here
            </p>

          </div>

        )}

      </div>

    </div>


    {/* ================= LIVE QUEUE TABLE ================= */}

    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

      <div className="px-4 sm:px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            Live Patient Queue
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Patients currently moving through the queue
          </p>

        </div>

        <span className="self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-700">

          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>

          LIVE

        </span>

      </div>


      <div className="overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead className="bg-slate-50">

            <tr>

              <th className="text-left px-4 sm:px-6 py-4 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                Queue
              </th>

              <th className="text-left px-4 sm:px-6 py-4 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                Patient
              </th>

              <th className="text-left px-4 sm:px-6 py-4 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                Doctor
              </th>

              <th className="text-left px-4 sm:px-6 py-4 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                Status
              </th>

              <th className="text-left px-4 sm:px-6 py-4 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                Date
              </th>

            </tr>

          </thead>


          <tbody className="divide-y divide-slate-100">

            {queue && queue.length > 0 ? (

              queue.map((queu) => (

                <tr
                  key={queu._id}
                  className="hover:bg-blue-50/40 transition-all duration-300"
                >

                  {/* QUEUE NUMBER */}

                  <td className="px-4 sm:px-6 py-4">

                    <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 font-bold shadow-sm">
                      Q{String(
                        queu.queueNumber
                      ).padStart(3, "0")}
                    </span>

                  </td>


                  {/* PATIENT */}

                  <td className="px-4 sm:px-6 py-4">

                    <div>

                      <p className="font-semibold text-slate-800">
                        {queu.userData?.name ||
                          "Unknown User"}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {queu.userData?.email ||
                          "No email"}
                      </p>

                    </div>

                  </td>


                  {/* DOCTOR */}

                  <td className="px-4 sm:px-6 py-4">

                    <span className="text-sm font-medium text-slate-700">
                      {queu.doctorData?.name ||
                        "Not assigned"}
                    </span>

                  </td>


                  {/* STATUS */}

                  <td className="px-4 sm:px-6 py-4">

                    {queu.status === "waiting" && (

                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold">

                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>

                        Waiting

                      </span>

                    )}

                    {queu.status === "in-consultation" && (

                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">

                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>

                        In Consultation

                      </span>

                    )}

                    {queu.status === "completed" && (

                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">

                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>

                        Completed

                      </span>

                    )}

                    {queu.status === "cancelled" && (

                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold">

                        <span className="w-2 h-2 rounded-full bg-red-500"></span>

                        Cancelled

                      </span>

                    )}

                  </td>


                  {/* DATE */}

                  <td className="px-4 sm:px-6 py-4 text-sm text-slate-500">

                    {queu.queueDate || "Today"}

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="py-14 text-center"
                >

                  <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-3">

                    <FaListOl className="text-blue-500 text-xl" />

                  </div>

                  <p className="font-semibold text-slate-700">
                    No queues generated
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    Patient queues will appear here
                  </p>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>


    {/* ================= FOOTER ================= */}

    <div className="py-7 text-center">

      <p className="text-xs text-slate-400">
        Health Center Management System • Queue monitoring
      </p>

    </div>

  </div>

</main>




  )
}

export default DashBoard
