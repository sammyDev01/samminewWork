import { createContext } from "react";
// import { assets } from '../assets/assets_frontend/assets'
export const AppContext = createContext()
import axios from "axios";
import { useState, useEffect } from "react";
import {toast} from 'react-toastify'

const AppContextProvider = (props) => {


    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false)
    const [userData, setUserData] = useState(false)
    const [queue, setQueue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [peopleAhead, setPeopleAhead] = useState(0);
    const [checkingQueue, setCheckingQueue] = useState(true)
     
    const getAllDoctorsData = async () => {
        try {   
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)      

            }else{
                toast.error(data.message)
            }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
        }
    } 
    
    const loadUserData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/getUserData', {headers:{Authorization:`Bearer ${token}`}})
            if(data.success){
                setUserData(data.user)
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    } 

//   const token = localStorage.getItem("token");

 const generateQueue = async () => {


    try {
      setLoading(true);

      const { data } = await axios.post(
        backendUrl+'/api/queue/generateQueue',
        {},{headers: {Authorization: `Bearer ${token}`}});
        console.log(data);
        
      if (data.success) {
        setQueue(data.queue);
        toast.success(data.message)
        setPeopleAhead(data.peopleAhead || 0);
      } else{
        toast.error(data.message)

      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    //   toast.error(data.message)
    } finally {
      setLoading(false);
    }
  };


    const getQueue = async () => {
    try {
        if (!token) {
        setCheckingQueue(false);
            return;
         }
      const { data } = await axios.get(
        backendUrl + '/api/queue/user', {
          headers: {Authorization: `Bearer ${token}`}});

      if (data.success && data.queue) {
        console.log(data);
        
        setQueue(data.queue);
        setPeopleAhead(data.peopleAhead || 0);} else {
        setQueue(null);
    }
    } catch (error) {
      console.log(error.response?.data || error.message);
      setQueue(null)
    }  finally {
         setCheckingQueue(false);
    }
  };

    const value =   {
        doctors,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserData,
        getAllDoctorsData,
        generateQueue,
        queue, setQueue,
        loading, setLoading,
        getQueue,
        peopleAhead, setPeopleAhead
        
    }
   
    useEffect(() => {
        getAllDoctorsData()
    },[])
    useEffect(() => {
       
        if(token){
            loadUserData()
        }  else{
            setUserData(false)
        } 
    },[token])
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;