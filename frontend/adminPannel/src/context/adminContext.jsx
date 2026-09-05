import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";


export const AdminContext = createContext()
const AdminContextProvider = (props)=>{
    const [aToken, setAToken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'):"" )
    const [doctors, setDoctors] = useState([])
    const [users, setUsers] = useState([])
    const [appointments, setAppointments ] = useState([])
    const [dashData, setDashData] = useState(false)
    const [loading, setLoading] = useState(true);
    const [queue, setQueue] = useState([]);
    const [consultations, setConsultations] = useState([])

    const [stats, setStats] = useState({
    totalQueues: 0,
    waitingQueues: 0,
    consultationQueues: 0,
    completedQueues: 0,
    cancelledQueues: 0,
    lastQueueNumber: 0,
  });


    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async()=>{
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers:{Authorization:`Bearer ${aToken}`}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }
    const getAllUsers = async()=>{
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-users', {}, {headers:{Authorization:`Bearer ${aToken}`}})
            if(data.success){
                setUsers(data.users)
                console.log(data.users)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }
    const getConsultations = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/all-consultants', {headers:{Authorization:`Bearer ${aToken}`}})
            if(data.success){
                setConsultations(data.consultations)
                console.log(data.consultations)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }
    const changeAvailability = async(doctorId)=>{
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {doctorId}, {headers:{Authorization:`Bearer ${aToken}`}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }
    const getAllAppointment = async  ()=>{

        try {
            const {data} = await axios.get(backendUrl + '/api/admin/appointmentAdminOne',  {headers:{Authorization:`Bearer ${aToken}`}})
            if(data.success){
               setAppointments(data.appointments)
                console.log(data)
            } else{
                toast.error(data.message)
            }
        } catch (error) {
             toast.error(error.message)
            console.log(error)
        }

    }
    const cancelledAppointment = async (appointmentId)=>{
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/appointmentCancelledOne',{appointmentId} , {headers:{Authorization:`Bearer ${aToken}`}})
            if(data.success){
                toast.success(data.message)
                getAllAppointment()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
             toast.error(error.message)
        }
    }
    const getDashData = async() =>{
        try {
            const {data} = await axios.get(backendUrl +'/api/admin/adminDashBoardOne' , {headers:{Authorization:`Bearer ${aToken}`}})
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData)
            }else
            {
                toast.error(data.message)
            }
        } catch (error) {
          toast.error(error.message)   
        }
    }

  // ====================================
  // GET QUEUE STATISTICS
  // ====================================

  const getQueueStats = async () => {

    try {
        const { data } = await axios.get(backendUrl + '/api/queue/admin/stats',
        {headers: {Authorization:`Bearer ${aToken}`}});

      if (data.success) {
        setStats(data.stats)
        console.log("Queue Stats:", data.stats);
    } else{
        toast.error(data.message)
      }

    } catch (error) {

      console.log("ADMIN STATS ERROR:", error.response?.data || error.message);

    } finally {

      setLoading(false);

    }
  };

  const getQueue = async () => {
    try {
        const { data } = await axios.get(backendUrl + '/api/admin/adminGetQueue', {headers: {Authorization:`Bearer ${aToken}`}});
        setQueue(data.queue);
        console.log("Queue Data:", data.queue);
    } catch (error) {
        console.log("ADMIN QUEUE ERROR:", error.response?.data || error.message);
    }
  };

    const values = {
       aToken, setAToken,
       getQueue,
       backendUrl,
       getAllUsers,
       doctors,
       getAllDoctors,
       changeAvailability,
       appointments,
       setAppointments,
       getAllAppointment,
       cancelledAppointment,
       getDashData,
       dashData,
       stats, setStats,
       queue, setQueue,
       getQueueStats,
       users,
       consultations,
       getConsultations
    }
    return (
        <AdminContext.Provider value={values}>
            {props.children}
        </AdminContext.Provider>
    )
}



export default AdminContextProvider