import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/adminContext'
import {assets} from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/appContext';
import { FaCalendarCheck, FaListOl, FaUserDoctor, FaUserInjured } from 'react-icons/fa6';
// import { FaList0l } from 'react-icons/fa6';

const DashBoard = () => {

      const { appointments,stats, setStats, queue, setQueue, getDashData, aToken, getQueueStats,cancelledAppointment, dashData} = useContext(AdminContext);
      const {calculateAge, slotDateFormat} = useContext(AppContext)
      useEffect(()=>{
        if(aToken){
          getDashData()
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
<main className="flex-1 h-screen overflow-y-auto bg-slate-50">

  <div className="p-4 sm:p-6 lg:p-8">

    {/* ================= WELCOME / INTRO ================= */}
    <div className="mb-7">

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
        Dashboard Overview
      </h1>

      <p className="text-sm text-slate-500 mt-1">
        Monitor your health center activities and patient queues.
      </p>

    </div>


    {/* ================= GENERAL STATISTICS ================= */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">

      {/* DOCTORS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500 font-medium">
              Total Doctors
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {dashData?.doctors || 0}
            </h2>

            <p className="text-xs text-emerald-600 mt-2 font-medium">
              Medical staff
            </p>

          </div>

          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">

            {/* <img
              src={assets.doctor_icon}
              alt="Doctors"
              className="w-7 h-7"
            /> */}
            <FaUserDoctor className="w-7 h-7 text-blue-500 text-xl" />

          </div>

        </div>

      </div>

     


      {/* PATIENTS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500 font-medium">
              Total Patients
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {dashData?.patient || 0}
            </h2>

            <p className="text-xs text-blue-600 mt-2 font-medium">
              Registered patients
            </p>

          </div>

          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">

            {/* <img
              src={assets.patients_icon}
              alt="Patients"
              className="w-7 h-7"
            /> */}
              <FaUserInjured className="w-7 h-7 text-blue-500 text-xl" />
          </div>

        </div>

      </div>


      {/* APPOINTMENTS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500 font-medium">
              Appointments
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {dashData?.appointment || 0}
            </h2>

            <p className="text-xs text-violet-600 mt-2 font-medium">
              Total appointments
            </p>

          </div>

          <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center">

            {/* <img
              src={assets.appointments_icon}
              alt="Appointments"
              className="w-7 h-7"
            /> */}
                <FaCalendarCheck className="w-7 h-7 text-violet-500 text-xl" />
          </div>

        </div>

      </div>


      {/* TOTAL QUEUE */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 shadow-lg shadow-blue-100 text-white">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-blue-100 font-medium">
              Queues Today
            </p>

            <h2 className="text-4xl font-black mt-2">
              {stats?.totalQueues || 0}
            </h2>

            <p className="text-xs text-blue-100 mt-2">
              Generated today
            </p>

          </div>

          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
           <FaListOl className="w-7 h-7 text-blue-100" />
          </div>

        </div>

      </div>

    </div>

      <div className="max-h-[70vh] overflow-y-auto">

  <div className="flex items-center gap-2.5 px-4 mt-10 py-4 rounded-t-2xl border border-slate-200 bg-white shadow-sm">
    <img
      className="w-5 h-5"
      src={assets.list_icon}
      alt=""
    />

    <p className="font-semibold text-slate-800 text-sm sm:text-base">
      Latest Booking
    </p>
  </div>

  <div className="pt-4 border border-t-0 border-slate-200 bg-white rounded-b-2xl shadow-sm">

    {dashData.latestAppointment.map((item, index) => (

      <div
        className="flex items-center px-6 py-4 gap-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-all duration-300"
        key={index}
      >

        <img
          className="rounded-full w-11 h-11 object-cover border-2 border-white shadow-md ring-1 ring-slate-200"
          src={item.doctorData.image}
          alt=""
        />

        <div className="text-sm flex-1">
          <p className="text-slate-800 font-semibold">
            {item.doctorData.name}
          </p>

          <p className="text-slate-500 text-xs mt-1">
            {slotDateFormat(item.slotDate)}
          </p>
        </div>

        {item.cancelled

          ?

          <p className="px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-500 text-xs font-semibold">

            cancelled

          </p>

          :

          <img
            onClick={() => cancelledAppointment(item._id)}
            className="w-9 h-9 p-2 rounded-xl cursor-pointer bg-red-50 border border-red-100 hover:bg-red-500 hover:shadow-md hover:scale-105 transition-all duration-300"
            src={assets.cancel_icon}
            alt=""
          />

        }

      </div>

    ))}

  </div>

</div>


  
  


    {/* ================= APPOINTMENTS ================= */}

    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-7">

      {/* HEADER */}

      <div className="px-5 sm:px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Recent Appointments
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Overview of recent patient appointments
          </p>

        </div>

        <div className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">
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
              className="px-5 sm:px-6 py-4 hover:bg-slate-50 transition"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                {/* PATIENT */}

                <div className="flex items-center gap-3">

                  {/* <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">

                    {appointment.userData?.name
                      ?.charAt(0)
                      ?.toUpperCase() || "P"}

                  </div> */}
                  <img
                      className="rounded-full w-11 h-11 object-cover border-2 border-white shadow-md ring-1 ring-slate-200"
                      src={appointment.userData.image}
                      alt=""
                    />

                  <div>

                    <p className="font-semibold text-slate-800">
                      {appointment.userData?.name ||
                        "Unknown Patient"}
                    </p>

                    <p className="text-xs text-slate-400">
                      {appointment.userData?.email ||
                        "No email"}
                    </p>

                  </div>

                </div>


                {/* APPOINTMENT DETAILS */}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">

                  <div>

                    <p className="text-xs text-slate-400">
                      Doctor
                    </p>

                    <p className="font-medium text-slate-700 mt-1">
                      {appointment.doctorData?.name ||
                        "Unknown Doctor"}
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-slate-400">
                      Date
                    </p>

                    <p className="font-medium text-slate-700 mt-1">
                      {appointment.slotDate ||
                        appointment.date ||
                        "N/A"}
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-slate-400">
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

                <div className="flex items-center gap-3">

                  <span className={`
                    px-3 py-1.5
                    rounded-full
                    text-xs
                    font-semibold
                    ${
                      appointment.status === "completed"
                        ? "bg-emerald-50 text-emerald-700"
                        : appointment.status === "cancelled"
                        ? "bg-red-50 text-red-700"
                        : "bg-amber-50 text-amber-700"
                    }
                  `}>
                    {appointment.status || "Pending"}
                  </span>


        {appointment.cancelled

          ?

          <p className="px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-500 text-xs font-semibold">

            cancelled

          </p>

          :

          <img
            onClick={() => cancelledAppointment(appointment._id)}
            className="w-9 h-9 p-2 rounded-xl cursor-pointer bg-red-50 border border-red-100 hover:bg-red-500 hover:shadow-md hover:scale-105 transition-all duration-300"
            src={assets.cancel_icon}
            alt=""
          />

        }
                  {/* {appointment.status !== "completed" &&
                   appointment.status !== "cancelled" && (

                    <button
                      onClick={() =>
                        cancelledAppointment(
                          appointment._id
                        )
                      }
                      className="
                        px-3 py-1.5
                        rounded-lg
                        text-xs
                        font-semibold
                        text-red-600
                        border
                        border-red-200
                        hover:bg-red-50
                        transition
                      "
                    >
                      Cancel
                    </button>

                  )} */}

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="py-12 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-2xl mb-3">
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

      <div className="px-5 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Live Patient Queue
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Patients currently moving through the queue
          </p>

        </div>

        <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-700">

          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>

          LIVE

        </span>

      </div>


      <div className="overflow-x-auto">

        <table className="w-full min-w-[750px]">

          <thead className="bg-slate-50">

            <tr>

              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                Queue
              </th>

              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                Patient
              </th>

              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                Doctor
              </th>

              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                Date
              </th>

            </tr>

          </thead>


          <tbody className="divide-y divide-slate-100">

            {queue && queue.length > 0 ? (

              queue.map((queu) => (

                <tr
                  key={queu._id}
                  className="hover:bg-blue-50/30 transition"
                >

                  {/* QUEUE NUMBER */}

                  <td className="px-6 py-4">

                    <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold">
                      Q{String(
                        queu.queueNumber
                      ).padStart(3, "0")}
                    </span>

                  </td>


                  {/* PATIENT */}

                  <td className="px-6 py-4">

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

                  <td className="px-6 py-4">

                    <span className="text-sm font-medium text-slate-700">
                      {queu.doctorData?.name ||
                        "Not assigned"}
                    </span>

                  </td>


                  {/* STATUS */}

                  <td className="px-6 py-4">

                    {queu.status === "waiting" && (

                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">

                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>

                        Waiting

                      </span>

                    )}

                    {queu.status === "in-consultation" && (

                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">

                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>

                        In Consultation

                      </span>

                    )}

                    {queu.status === "completed" && (

                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">

                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>

                        Completed

                      </span>

                    )}

                    {queu.status === "cancelled" && (

                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-semibold">

                        <span className="w-2 h-2 rounded-full bg-red-500"></span>

                        Cancelled

                      </span>

                    )}

                  </td>


                  {/* DATE */}

                  <td className="px-6 py-4 text-sm text-slate-500">

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

                  <div className="text-3xl mb-3">
                    <div>
                    <FaListOl className="mx-auto text-slate-400 text-blue-500 text-xl" />
                    </div>
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

    <div className="py-6 text-center">

      <p className="text-xs text-slate-400">
        Health Center Management System • Queue monitoring
      </p>

    </div>

  </div>

</main>
  )
}

export default DashBoard
