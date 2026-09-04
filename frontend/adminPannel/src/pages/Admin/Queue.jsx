import React, { useContext , useEffect} from 'react'
import { DoctorContext } from '../../context/doctorContext'
import { AdminContext } from '../../context/adminContext';
import { FaListOl, FaClock, FaUserDoctor, FaCheck } from 'react-icons/fa6'
const Queue = () => {



    const {getQueueStats, aToken, getDoctorQueue,stats,queue, setQueue,waitingCount, setWaitingCount, currentPatient, setCurrentPatient} = useContext(AdminContext)

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
  return (
    <div  className="flex-1 p-4 h-screen overflow-y-auto bg-slate-50">

        {/* ================= QUEUE SECTION ================= */}

    <div className="flex items-center justify-between mb-4">

      <div>

        <h2 className="text-xl font-bold text-slate-800">
          Queue Management
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Monitor patient queue activity
        </p>

      </div>

      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200">

        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>

        <span className="text-xs font-semibold text-emerald-700">
          Live
        </span>

      </div>

    </div>


    {/* ================= QUEUE STATISTICS ================= */}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

      {/* TOTAL */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-sm text-slate-500">
              Total Queues
            </p>

            <p className="text-3xl font-bold text-slate-800 mt-2">
              {stats?.totalQueues || 0}
            </p>

          </div>

          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
           <FaListOl className="w-7 h-7 text-blue-600" />
          </div>

        </div>

      </div>


      {/* WAITING */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-sm text-slate-500">
              Waiting
            </p>

            <p className="text-3xl font-bold text-amber-600 mt-2">
              {stats?.waitingQueues || 0}
            </p>

          </div>

          <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
            <FaClock className="w-6 h-6 text-amber-600" />
          </div>

        </div>

      </div>


      {/* CONSULTATION */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-sm text-slate-500">
              In Consultation
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats?.consultationQueues || 0}
            </p>

          </div>

          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
            <FaUserDoctor className="w-6 h-6 text-blue-600" />
          </div>

        </div>

      </div>


      {/* COMPLETED */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-sm text-slate-500">
              Completed
            </p>

            <p className="text-3xl font-bold text-emerald-600 mt-2">
              {stats?.completedQueues || 0}
            </p>

          </div>

          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
            <FaCheck className="w-6 h-6 text-emerald-600" />
          </div>

        </div>

      </div>

    </div>


    {/* ================= CURRENT + LAST QUEUE ================= */}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">

      {/* CURRENT QUEUE */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-7 text-white">

        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-blue-500/10"></div>

        <div className="relative">

          <p className="text-sm text-slate-300">
            Patients Currently Waiting
          </p>

          <div className="flex items-end gap-3 mt-3">

            <h2 className="text-5xl font-black">
              {stats?.waitingQueues || 0}
            </h2>

            <span className="text-slate-400 mb-2">
              patients
            </span>

          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-slate-300">

            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>

            Waiting for consultation

          </div>

        </div>

      </div>


      {/* LAST QUEUE */}
      <div className="bg-white border border-slate-200 rounded-2xl p-7">

        <p className="text-sm text-slate-500 font-medium">
          Last Queue Generated
        </p>

        <h2 className="text-5xl font-black text-blue-600 mt-3">
          Q{String(
            stats?.lastQueueNumber || 0
          ).padStart(3, "0")}
        </h2>

        <p className="text-sm text-slate-400 mt-4">
          Latest queue number generated today
        </p>

      </div>

    </div>
    </div>
  )
}

export default Queue
