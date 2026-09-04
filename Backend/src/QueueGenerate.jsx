import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "./context";
import {toast} from 'react-toastify'
import {MdMedicalServices} from 'react-icons/md'
import { MdAccessTime } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";



const PatientQueue = ({ backendUrl, doctorId }) => {

    const {checkingQueue, peopleAhead, setPeopleAhead, getQueue, token, generateQueue, getMyQueue, queue, setQueue, loading, setLoading} = useContext(AppContext)

// 
  useEffect(() => {
    if(token){
    getQueue(); 
  } else{
    toast.error("login to generate Queue Number")
  }
  const interval = setInterval(() => {
    getQueue()
  }, 5000);

  return () => {
    clearInterval(interval);
  };
  }, [token]);
 
// console.log("QUEUE:", queue);
// console.log("TYPE:", typeof queue);
// console.log("KEYS:", queue ? Object.keys(queue) : "NO QUEUE");

  // useEffect(() => {
  //   getQueue();

  //   const interval = setInterval(() => {
  //     getQueue();
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);
//   useEffect(() => {
//   getQueue();
// }, []);

  return (
   <div className="w-full min-h-[70vh] px-4 sm:px-6 lg:px-8 py-6">

  {checkingQueue ? (

    /* ================= CHECKING QUEUE ================= */
    <div className="
      min-h-[400px]
      flex
      flex-col
      items-center
      justify-center
      text-center
      rounded-3xl
      bg-white
      border
      border-slate-200
      shadow-sm
      p-6
    ">

      <div className="
        w-14
        h-14
        rounded-full
        border-4
        border-blue-100
        border-t-blue-600
        animate-spin
        mb-5
      "></div>

      <p className="
        text-lg
        font-semibold
        text-slate-800
      ">
        Checking your queue...
      </p>

      <p className="
        text-sm
        text-slate-400
        mt-2
      ">
        Please wait while we check your current queue status.
      </p>

    </div>

  ) : queue ? (

    /* ================= EXISTING QUEUE ================= */
    <div className="
      w-full
      max-w-3xl
      mx-auto
      overflow-hidden
      rounded-3xl
      bg-white
      border
      border-slate-200
      shadow-[0_15px_50px_rgba(15,23,42,0.08)]
    ">

      {/* HEADER */}
      <div className="
        relative
        overflow-hidden
        bg-gradient-to-r
        from-slate-950
        via-blue-950
        to-blue-700
        px-5
        sm:px-8
        py-6
      ">

        {/* Decorative circles */}
        <div className="
          absolute
          -right-12
          -top-16
          w-40
          h-40
          rounded-full
          bg-white/10
        "></div>

        <div className="
          absolute
          -left-16
          -bottom-20
          w-44
          h-44
          rounded-full
          bg-cyan-400/10
        "></div>


        <div className="
          relative
          z-10
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        ">

          <div>

            <p className="
              text-xs
              uppercase
              tracking-[0.2em]
              text-blue-200
              font-semibold
            ">
              WDU Healthcare
            </p>

            <h2 className="
              mt-1
              text-2xl
              sm:text-3xl
              font-bold
              text-white
            ">
              Your Queue
            </h2>

            <p className="
              mt-1
              text-xs
              sm:text-sm
              text-white/60
            ">
              Your queue information is saved.
            </p>

          </div>


          {/* STATUS */}
          <div className="
            self-start
            sm:self-auto
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-white/10
            border
            border-white/10
            backdrop-blur-sm
          ">

            <span className={`
              w-2.5
              h-2.5
              rounded-full

              ${
                queue.status === "waiting"
                  ? "bg-amber-400 animate-pulse"
                  : queue.status === "attending"
                  ? "bg-blue-300 animate-pulse"
                  : queue.status === "completed"
                  ? "bg-green-400"
                  : "bg-slate-300"
              }
            `}></span>

            <span className="
              text-xs
              sm:text-sm
              font-semibold
              text-white
              capitalize
            ">
              {queue.status}
            </span>

          </div>

        </div>

      </div>


      {/* QUEUE NUMBER */}
      <div className="
        px-5
        sm:px-8
        pt-7
      ">

        <div className="
          relative
          overflow-hidden
          rounded-2xl
          bg-gradient-to-br
          from-blue-50
          via-white
          to-cyan-50
          border
          border-blue-100
          p-6
          sm:p-8
          text-center
        ">

          <p className="
            text-xs
            uppercase
            tracking-[0.2em]
            font-semibold
            text-slate-400
          ">
            Queue Number
          </p>

          <p className="
            mt-2
            text-5xl
            sm:text-6xl
            font-black
            tracking-wider
            text-blue-600
          ">
            Q{String(queue.queueNumber).padStart(3, "0")}
          </p>

          <p className="
            mt-2
            text-xs
            sm:text-sm
            text-slate-400
          ">
            Please keep this number for your consultation.
          </p>

        </div>

      </div>


      {/* INFORMATION */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        gap-4
        p-5
        sm:p-8
      ">

        {/* DATE */}
        <div className="
          flex
          items-center
          gap-4
          p-4
          rounded-2xl
          bg-slate-50
          border
          border-slate-100
        ">

          <div className="
            w-11
            h-11
            flex-shrink-0
            rounded-xl
            bg-blue-100
            flex
            items-center
            justify-center
            text-blue-600
            text-lg
          ">
           <MdAccessTime />
          </div>

          <div>
            <p className="
              text-xs
              text-slate-400
            ">
              Queue Date
            </p>

            <p className="
              mt-1
              text-sm
              font-semibold
              text-slate-700
            ">
              {queue.queueDate}
            </p>
          </div>

        </div>


        {/* DOCTOR */}
        <div className="
          flex
          items-center
          gap-4
          p-4
          rounded-2xl
          bg-slate-50
          border
          border-slate-100
        ">

          <div className="
            w-11
            h-11
            flex-shrink-0
            rounded-xl
            bg-cyan-100
            flex
            items-center
            justify-center
            text-cyan-600
            text-lg
          ">
           <MdMedicalServices />
          </div>

          <div className="min-w-0">

            <p className="
              text-xs
              text-slate-400
            ">
              Doctor
            </p>

            <p className="
              mt-1
              text-sm
              font-semibold
              text-slate-700
              truncate
            ">
              {queue?.doctorData?.name || "Waiting for doctor"}
            </p>

          </div>

        </div>

      </div>


      {/* WAITING MESSAGE */}
      {queue.status === "waiting" && (
        <div className="
          mx-5
          sm:mx-8
          mb-6
          p-4
          rounded-2xl
          bg-amber-50
          border
          border-amber-100
        ">

          <div className="
            flex
            items-start
            gap-3
          ">

            <span className="
              w-9
              h-9
              flex-shrink-0
              rounded-full
              bg-amber-100
              flex
              items-center
              justify-center
            ">
              ⏳
            </span>

            <div>

              <p className="
                text-sm
                font-semibold
                text-amber-800
              ">
                You are currently waiting
              </p>

              <p className="
                mt-1
                text-xs
                sm:text-sm
                text-amber-700
              ">
                Please remain available. A doctor will attend to you when
                your queue number is reached.
              </p>

            </div>

          </div>

        </div>
      )}


      {/* ATTENDING MESSAGE */}
      {queue.status === "attending" && (
        <div className="
          mx-5
          sm:mx-8
          mb-6
          p-4
          rounded-2xl
          bg-blue-50
          border
          border-blue-100
        ">

          <div className="
            flex
            items-start
            gap-3
          ">

            <span className="
              w-9
              h-9
              flex-shrink-0
              rounded-full
              bg-blue-100
              flex
              items-center
              justify-center
            ">
              <MdMedicalServices />
            </span>

            <div>

              <p className="
                text-sm
                font-semibold
                text-blue-800
              ">
                Doctor is attending to you
              </p>

              <p className="
                mt-1
                text-xs
                sm:text-sm
                text-blue-700
              ">
                Please proceed with your consultation.
              </p>

            </div>

          </div>

        </div>
      )}


      {/* COMPLETED MESSAGE */}
      {queue.status === "completed" && (
        <div className="
          mx-5
          sm:mx-8
          mb-6
          p-4
          rounded-2xl
          bg-green-50
          border
          border-green-100
        ">

          <div className="
            flex
            items-start
            gap-3
          ">

            <span className="
              w-9
              h-9
              flex-shrink-0
              rounded-full
              bg-green-100
              flex
              items-center
              justify-center
            ">
              ✓
            </span>

            <div>

              <p className="
                text-sm
                font-semibold
                text-green-800
              ">
                Consultation completed
              </p>

              <p className="
                mt-1
                text-xs
                sm:text-sm
                text-green-700
              ">
                Your consultation has been completed successfully.
              </p>

            </div>

          </div>

        </div>
      )}

    </div>

  ) : (

    /* ================= NO QUEUE ================= */
    <div className="
      min-h-[450px]
      w-full
      max-w-3xl
      mx-auto
      flex
      flex-col
      items-center
      justify-center
      text-center
      rounded-3xl
      bg-white
      border
      border-slate-200
      shadow-sm
      p-6
      sm:p-10
    ">

      <div className="
        w-20
        h-20
        rounded-3xl
        bg-blue-50
        flex
        items-center
        justify-center
        text-3xl
        mb-5
      ">
       <MdFormatListNumbered />
      </div>

      <h2 className="
        text-xl
        sm:text-2xl
        font-bold
        text-slate-800
      ">
        No Active Queue
      </h2>

      <p className="
        max-w-md
        mt-2
        text-sm
        leading-6
        text-slate-500
      ">
        You don't currently have a queue number.
        Generate a queue number to join the healthcare consultation queue.
      </p>


      <button
        onClick={generateQueue}
        className="
          mt-6
          inline-flex
          items-center
          justify-center
          gap-2
          px-7
          py-3.5
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          to-cyan-600
          text-white
          text-sm
          font-semibold
          shadow-lg
          shadow-blue-500/20
          hover:from-blue-700
          hover:to-cyan-700
          hover:-translate-y-1
          active:translate-y-0
          transition-all
          duration-300
        "
      >
        Generate Queue Number
        <span>→</span>
      </button>

    </div>

  )}

</div>


  );
};

export default PatientQueue;