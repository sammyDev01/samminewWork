import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";



export const DoctorContext = createContext()
const DoctorContextProvider = (props)=>{
    const  backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken, setDToken ] = useState(localStorage.getItem('dToken')? localStorage.getItem('dToken'):"")
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData ] = useState(false)
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true)
    const [waitingCount, setWaitingCount] = useState(0);
    const [currentPatient, setCurrentPatient] = useState(null);
    const [attending, setAttending] = useState(false)
    const [completingId, setCompletingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [profileData, setProfileData] = useState(false)

    const [consultation, setConsultation] = useState(null);

    const [formData, setFormData] = useState({
    symptoms: "",
    diagnosis: "",
    notes: "",
    prescription: "",
  });

 const navigate = useNavigate()
 const {queueId} = useParams()
   

    const getAppointment = async()=>{
        try {
            const {data} = await axios.get(backendUrl +'/api/doctor/appointentrDoctor' ,{headers:{Authorization:`Bearer ${dToken}`}})
            if(data.success){
                setAppointments(data.appointments.reverse())
                console.log(data.appointments.reverse());
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const markAppointmentComplete = async(appointmentId)=>{
        try {
            const {data} = await axios.post(backendUrl + '/api/doctor/completeAppointentForDoctor' ,{appointmentId},{headers:{Authorization:`Bearer ${dToken}`}})
            if(data.success){
                toast.success(data.message)
                getAppointment()
            } else{
                toast.error(data.message)
            }
            
        } catch (error) {
             console.log(error)
            toast.error(error.message)
        }
    }

        const cancelAppointment = async(appointmentId)=>{
        try {
            const {data} = await axios.post(backendUrl + '/api/doctor/cancelAppointentForDoctor' ,{appointmentId},{headers:{Authorization:`Bearer ${dToken}`}})
            if(data.success){
                toast.success(data.message)
                getAppointment()
            } else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const getDashData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/dashBoardForDoctor' ,{headers:{Authorization:`Bearer ${dToken}`}})
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

 
    
    //   const token = localStorage.getItem("token");
    
    
      const getDoctorQueue = async () => {
        try {
            setLoading(true)
            
          const {data} = await axios.get(backendUrl +'/api/queue/doctor', {headers: {Authorization: `Bearer ${dToken}`}});
            if(data.success){
                setQueue(data.queue || []);
                setWaitingCount(data.waitingCount || 0);
                setCurrentPatient(data.currentPatient || null)
                //  setWaitingPatients(data.waitingPatients ||
                // data.queues || []);
                // console.log(data.queue)
                console.log(data);   
            } else{
                 toast.error(
                 data.message);
            }
          
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.data?.message || error.message)
          
        }
      };
    
    
      const attendPatient = async (queueId) => {
              try {
                       // setLoading(true)
                setAttending(true);
          
          console.log("Attending Queue:",queueId);
          
            const {data} = await axios.put(backendUrl + '/api/queue/attend',
            {queueId: queueId,},{ headers: { Authorization: `Bearer ${dToken}`}});
            console.log(data);
                if(data.success){
                console.log(data);
                
                toast.success("Patient is now being attended");
                await getDoctorQueue()
                navigate(`/docCons/${queueId}`)
                console.log(queueId);
                
            //     setQueue((prevQueue) => prevQueue.map((item) =>
            //         item._id === queueId
            //   ? {...item, status: "attending"}: item));
                
          } else{
              console.log(data);
              toast.error(data.message || "Failed to attend to patient");
          }
        } catch (error) {
          console.log(error);
    
          toast.error(
            error.response?.data?.message ||
            "Failed to attend patient"
          );
        } finally {
            // setLoading(false)
            setAttending(false);
        }
      };
    
    
      const completePatient = async (queueId) => {
         if(!queueId) {
            toast.error("Queue ID is missing");
            return;
        }
        if(!dToken) {
        toast.error("Doctor token not found");
            return;
        }

        try {
            setLoading(true);
          const {data} = await axios.post(backendUrl + '/api/queue/complete', {queueId: queueId}, { headers: { Authorization: `Bearer ${dToken}`}});
            if(data.success){
        //   setCurrentPatient(null);
        //   setCompletingId(queueId)

          toast.success(data.message || "Consultation completed");
          await getDoctorQueue();
          } else {

        toast.error(data.message || "Failed to complete consultation");}
        } catch (error) {
            console.log(error);
           toast.error( error.response?.data?.message || "Failed to complete consultation");
        }
            finally {
            setLoading(false);
        }
      };

      const getDocProfile = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + "/api/doctor/doctorProfile", { headers: { Authorization: `Bearer ${dToken}`}})
            if(data.success){
                setProfileData(data.profileData)
                console.log(data.profileData);
                
            }
            
        } catch (error) {
            console.log(error);
           toast.error( error.message );
        }
      }
    

      
 
    const values = {
       backendUrl,
       dToken, setDToken,
       appointments, setAppointments,
       getAppointment,
       markAppointmentComplete,
       cancelAppointment,
       dashData,
       setDashData, getDashData,
       completePatient,
       attendPatient,
       getDoctorQueue,
       loading,
       setLoading,
       queue, setQueue,
       waitingCount, setWaitingCount,
       currentPatient, setCurrentPatient,
       completingId, setCompletingId,
       saving, setSaving,
       formData, setFormData,
       consultation, setConsultation,
       getDocProfile,
       profileData,
       setProfileData,
      //  completeConsultation,
      //  saveConsultation,
      //  getConsultation
       queueId
    }
    return (
        <DoctorContext.Provider value={values}>
            {props.children}
        </DoctorContext.Provider>
    )
}



export default DoctorContextProvider