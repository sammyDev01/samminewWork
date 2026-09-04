import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './context'
import axios from 'axios'
import { toast } from 'react-toastify'
import  {useNavigate} from 'react-router-dom'
import Consultationvideo from './Consultationvideo'
import { MdAccessTime } from "react-icons/md";
import { MdDateRange } from "react-icons/md";


// import QueueGenerate from './QueueGenerate'

const MyAppointment = () => {
  const {backendUrl, token, getAllDoctorsData} = useContext(AppContext)

  const [appointments, setAppiointments] = useState([])
  const month = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
   const slotDateFormat = (slotDate) =>{
    const dataArray = slotDate.split('_')
    return dataArray[0]+ "  " + month[Number(dataArray[1])] + " " + dataArray[2]

   }

  
const navigate = useNavigate();


  const getUserAppointment = async ()=>{
    try {
        const {data} = await axios.get(backendUrl + '/api/user/apppointment', {headers:{Authorization:`Bearer ${token}`}})

        if(data.success){
          setAppiointments(data.appointments.reverse())
          // toast.success(data.message)
          console.log(data.appointments)
        }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const handleComplete = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl+ '/api/user/completeMyAppointment', { appointmentId }, {headers:{Authorization:`Bearer ${token}`}});
       if(data.success){
        console.log(appointmentId)
        toast.success(data.message)
        await getUserAppointment()
     } else{
      toast.error(data.message)
     }
    } catch (error) {
      console.error("Error completing appointment:", error);
       toast.error(error.response?.data?.message || error.message || "An error occurred while completing the appointment.");

    }
  };

  const cancelAppointment =  async(appointmentId)=>{
    try {
     const {data} = await axios.post(backendUrl +  '/api/user/cancelMyapppointment',{appointmentId}, {headers:{Authorization:`Bearer ${token}`}})

     if(data.success){
      toast.success(data.message)
      await getUserAppointment()
      // getAllDoctorsData()
     } else{
      toast.error(data.message)
     }
      
    } catch (error) {
       console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(()=>{
    if(token){
      getUserAppointment()
    }
  },[token])

  return (
   <div className="
  w-full
  bg-slate-50
  rounded-2xl
  p-3
  sm:p-5
  md:p-6
  lg:p-8
">

  {/* HEADER */}
  <div className="
    flex
    items-center
    justify-between
    pb-4
    mt-6
    sm:mt-8
    border-b
    border-slate-200
  ">
    <div>
      <p className="
        text-lg
        sm:text-xl
        md:text-2xl
        font-bold
        text-slate-800
      ">
        My Appointments
      </p>

      <p className="
        text-xs
        sm:text-sm
        text-slate-400
        mt-1
      ">
        Manage and track your appointments
      </p>
    </div>

    <div className="
      hidden
      sm:flex
      items-center
      gap-2
      bg-blue-50
      text-blue-600
      px-3
      py-2
      rounded-xl
      text-xs
      font-medium
    ">
      {appointments.length} Appointment{appointments.length !== 1 ? 's' : ''}
    </div>
  </div>


  {/* APPOINTMENTS */}
  <div className="
    mt-4
    sm:mt-5
    space-y-4
  ">

    {appointments.map((item, index) => (

      <div
        key={index}
        className="
          group
          relative
          bg-white
          border
          border-slate-200
          rounded-2xl
          overflow-hidden
          shadow-sm
          hover:shadow-lg
          hover:border-blue-200
          transition-all
          duration-300
        "
      >

        {/* TOP STATUS LINE */}
        <div className="
          h-1
          w-full
          bg-gradient-to-r
          from-blue-600
          via-cyan-500
          to-teal-400
        "></div>


        {/* MAIN CONTENT */}
        <div className="
          p-3
          sm:p-4
          md:p-5
          lg:p-6
        ">

          <div className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            gap-4
            sm:gap-5
          ">


            {/* DOCTOR IMAGE */}
            <div className="
              flex-shrink-0
              flex
              justify-center
              sm:justify-start
            ">

              <div className="
                relative
                w-full
                sm:w-32
                md:w-36
                lg:w-40
                h-36
                sm:h-32
                md:h-36
                lg:h-40
                rounded-xl
                overflow-hidden
                bg-gradient-to-br
                from-blue-50
                to-cyan-50
                border
                border-blue-100
              ">

                <img
                  className="
                    w-full
                    h-full
                    object-contain
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                  src={item.doctorData.image}
                  alt=""
                />

              </div>

            </div>
           
                 
            {/* DOCTOR DETAILS */}
            <div className="
              flex-1
              min-w-0
              text-sm
              text-slate-500
            ">

              {/* Doctor name */}
              <p className="
                text-base
                sm:text-lg
                md:text-xl
                font-bold
                text-slate-800
                truncate
              ">
                {item.doctorData.name}
              </p>


              {/* Speciality */}
              <p className="
                text-xs
                sm:text-sm
                text-blue-600
                font-medium
                mt-1
              ">
                {item.doctorData.speciality}
              </p>


              {/* ADDRESS */}
              <div className="
                mt-3
                sm:mt-4
                p-3
                bg-slate-50
                rounded-xl
                border
                border-slate-100
              ">

                <p className="
                  text-xs
                  sm:text-sm
                  font-semibold
                  text-slate-700
                  mb-1
                ">
                  Address
                </p>

                <p className="text-[11px] sm:text-xs text-slate-500">
                  {item.doctorData.address.line1}
                </p>

                <p className="text-[11px] sm:text-xs text-slate-500">
                  {item.doctorData.address.line2}
                </p>

              </div>


              {/* DATE AND TIME */}
              <div className="
                flex
                flex-wrap
                items-center
                gap-2
                mt-3
              ">

                <span className="
                  inline-flex
                  items-center
                  gap-1.5
                  bg-blue-50
                  text-blue-700
                  px-2.5
                  py-1.5
                  rounded-lg
                  text-[10px]
                  sm:text-xs
                  font-medium
                ">
                  <MdDateRange />
                  {slotDateFormat(item.slotDate)}
                </span>

                <span className="
                  inline-flex
                  items-center
                  gap-1.5
                  bg-teal-50
                  text-teal-700
                  px-2.5
                  py-1.5
                  rounded-lg
                  text-[10px]
                  sm:text-xs
                  font-medium
                ">
                  <MdAccessTime />
                  {item.slotTime}
                </span>

              </div>

            </div>


            {/* ACTIONS */}
            <div className="
              w-full
              lg:w-auto
              flex
              flex-col
              gap-2
              sm:gap-3
              lg:min-w-[190px]
            ">

             <div>
              {
                item.cancelled ||
                item.isCompleted ? "":
                  <button

                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                  onClick={() =>
                  navigate(`/liveVideo/${item._id}`)
                 }
                  >
                 Join Live Consultation
                </button> 
    }
            </div>

              {/* COMPLETE */}
              { !item.cancelled &&
                !item.isCompleted &&
                
                <button
                  onClick={() => handleComplete(item._id)}
                  className="
                    w-full
                    text-xs
                    sm:text-sm
                    font-semibold
                    text-blue-600
                    bg-blue-50
                    border
                    border-blue-200
                    py-2.5
                    sm:py-3
                    px-4
                    rounded-xl
                    hover:bg-blue-600
                    hover:text-white
                    hover:border-blue-600
                    hover:shadow-md
                    hover:shadow-blue-100
                    active:scale-[0.98]
                    transition-all
                    duration-300
                  "
                >
                  Complete Appointment
                </button>
              }


              {/* CANCEL */}
              {
                !item.cancelled &&
                !item.isCompleted &&
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="
                    w-full
                    text-xs
                    sm:text-sm
                    font-semibold
                    text-red-500
                    bg-red-50
                    border
                    border-red-100
                    py-2.5
                    sm:py-3
                    px-4
                    rounded-xl
                    hover:bg-red-500
                    hover:text-white
                    hover:border-red-500
                    hover:shadow-md
                    hover:shadow-red-100
                    active:scale-[0.98]
                    transition-all
                    duration-300
                  "
                >
                  Cancel Appointment
                </button>
              }


              {/* CANCELLED */}
              {
                item.cancelled &&
                <button
                  disabled
                  className="
                    w-full
                    py-2.5
                    sm:py-3
                    px-4
                    rounded-xl
                    text-xs
                    sm:text-sm
                    font-semibold
                    text-red-500
                    bg-red-50
                    border
                    border-red-200
                    cursor-not-allowed
                  "
                >
                  You Cancelled this Appointment
                </button>
              }


              {/* COMPLETED */}
              {
                item.isCompleted &&
                <button
                  disabled
                  className="
                    w-full
                    py-2.5
                    sm:py-3
                    px-4
                    rounded-xl
                    bg-gradient-to-r
                    from-emerald-500
                    to-teal-500
                    text-xs
                    sm:text-sm
                    font-semibold
                    text-white
                    shadow-md
                    shadow-emerald-100
                    cursor-not-allowed
                  "
                >
                  ✓ Appointment Completed
                </button>
              }

            </div>

          </div>

        </div>

      </div>

    ))}

  </div>

</div>
  )
}

export default MyAppointment
