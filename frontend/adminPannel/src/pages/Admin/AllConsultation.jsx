import React from 'react'
// import {  FaUserDoctor, FaStethoscope, FaNotesMedical, } from "react-icons/fa";
import {FaUserInjured} from "react-icons/fa";
import { FaNotesMedical } from 'react-icons/fa';
import {FaStethoscope} from "react-icons/fa";
import {useContext, useEffect  } from 'react'
import { AdminContext } from '../../context/adminContext'
import { MdMedication, MdLocalHospital, MdAccessTime, MdCheckCircle, } from "react-icons/md";

const AllConsultation = () => {

    const {consultations, getConsultations} = useContext(AdminContext)
    useEffect(()=>{
        getConsultations()
    },[])

  return (
    <div className="min-h-screen  w-full bg-slate-50 max-md:ml-20 md:ml-72 p-3 sm:p-5 lg:p-8"> 
    <div className="w-full max-w-[1800px] mx-auto"> 
    {/* PAGE HEADER */} 
    <div className="mb-6"> 
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"> 
        <div> 
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800"> Consultations </h1> 
            <p className="text-sm text-slate-500 mt-1"> 
                View and monitor patient consultation records
            </p>
        </div> 
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
        <p className="text-xs text-slate-500"> 
        Total Consultations
        </p>
        <p className="text-xl font-bold text-blue-600"> 
        {consultations.length || 0} 
     </p> 
        </div> 
        </div> 
    </div> 
    {/* CONSULTATIONS */} 
    {consultations.length === 0 ? ( 
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
    <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
         {/* <FaStethoscope size={28} />  */}
    </div> <h2 className="text-lg font-semibold text-slate-700 mt-4"> No Consultation Records </h2> 
    <p className="text-sm text-slate-500 mt-1"> Consultation records will appear here when doctors complete patient consultations. </p> 
    </div>
     ) : ( 
     <div className="space-y-5"> {consultations.map((item, index) => ( 
    <div key={item._id || index} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition" > 
    {/* CARD HEADER */} 
    <div className="p-5 border-b border-slate-200">
         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3"> 
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
    <FaNotesMedical size={21} /> 
    </div> 
    <div> 
        <h2 className="font-bold text-slate-800"> Consultation #{index + 1} </h2> 
    <p className="text-xs text-slate-500 mt-1"> Queue ID: {item.queueId?._id || item.queueId || "N/A"} </p>
    </div> 
    </div> 
    {/* STATUS */} 
    <div> 
        {item.status === "completed" ?
    ( 
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold"> 
    <MdCheckCircle />
     Completed 
    </span> ) : (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
        <MdAccessTime /> 
        In Consultation 
        </span> )} 
        </div> 
    </div> 
    </div> 
    {/* PATIENT & DOCTOR */} 
    <div className="p-5"> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* PATIENT */}
     <div className="rounded-xl bg-slate-50 border border-slate-200 p-4"> 
    <div className="flex items-center gap-3 mb-3"> 
    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"> 
    <FaUserInjured />
    </div> 
    <div> 
        <p className="text-xs text-slate-500"> Patient </p>
    <p className="font-semibold text-slate-800"> {item.patientId?.name || item.patientData?.name || "Unknown Patient"} </p>
    </div>
    </div> 
    <p className="text-sm text-slate-500 break-all"> {item.patientId?.email || item.patientData?.email || "No email available"} 
    </p> 
    </div>
    {/* DOCTOR */}
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
        <div className="flex items-center gap-3 mb-3"> 
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center"> 
               <FaStethoscope />
    </div> 
    
    <div> 
        <p className="text-xs text-slate-500"> 
            Doctor
        </p> 
        <p className="font-semibold text-slate-800"> {item.doctorId?.name || item.doctorData?.name || "Unknown Doctor"} 
        </p> 
    </div> 
    </div> 
    <p className="text-sm text-slate-500 break-all"> {item.doctorId?.email || item.doctorData?.email || "No email available"} 
    </p> 
    </div> 
    </div> 
    {/* MEDICAL INFORMATION */} 
    <div className="mt-5"> 
        <h3 className="font-semibold text-slate-800 mb-4"> Medical Information </h3> 
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     {/* SYMPTOMS */}
    <div className="border border-slate-200 rounded-xl p-4"> 
    <div className="flex items-center gap-2 mb-2"> 
        <FaNotesMedical className="text-blue-600" /> 
    <p className="font-semibold text-slate-700"> 
        Symptoms
    </p> 
    </div>
     <p className="text-sm text-slate-600 whitespace-pre-wrap"> {item.symptoms || "No symptoms recorded"}
    </p> 
    </div>
     {/* DIAGNOSIS */} 
     <div className="border border-slate-200 rounded-xl p-4"> 
    <div className="flex items-center gap-2 mb-2"> 
        <FaStethoscope className="text-indigo-600" /> 
        <p className="font-semibold text-slate-700">
             Diagnosis
        </p> 
        </div>
        <p className="text-sm text-slate-600 whitespace-pre-wrap">
             {item.diagnosis || "No diagnosis recorded"} 
        </p> 
        </div> 
        {/* TREATMENT */} 
        <div className="border border-slate-200 rounded-xl p-4"> 
            <div className="flex items-center gap-2 mb-2">
                 <MdLocalHospital className="text-green-600" size={20} /> 
                 <p className="font-semibold text-slate-700"> 
                    Treatment
                 </p> 
            </div> 
            <p className="text-sm text-slate-600 whitespace-pre-wrap"> 
                {item.treatment || "No treatment recorded"} 
            </p> 
            </div> 
            {/* PRESCRIPTION */} 
            <div className="border border-slate-200 rounded-xl p-4">
                 <div className="flex items-center gap-2 mb-2">
                     <MdMedication className="text-purple-600" size={21} /> 
                     <p className="font-semibold text-slate-700"> 
                        Prescription
                    </p> 
                </div> 
                    <p className="text-sm text-slate-600 whitespace-pre-wrap"> 
                        {item.prescription || "No prescription recorded"} 
                    </p>
            </div>
             {/* NOTES */} 
             <div className="md:col-span-2 border border-slate-200 rounded-xl p-4">
         <div className="flex items-center gap-2 mb-2">
             <FaNotesMedical className="text-orange-600" /> 
                <p className="font-semibold text-slate-700"> 
                    Additional Notes 
                </p> 
        </div> 
        <p className="text-sm text-slate-600 whitespace-pre-wrap">
             {item.notes || "No additional notes"} 
        </p>
        </div>
        </div> 
        </div>
        {/* TIME INFORMATION */}
        <div className="mt-5 pt-5 border-t border-slate-200"> 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div> 
                    <p className="text-xs text-slate-500"> 
                        Consultation Started 
                    </p> 
                    <p className="text-sm font-semibold text-slate-700 mt-1">
                         {item.startedAt ? new Date(item.startedAt).toLocaleString() : "N/A"} 
                         
                         </p> </div> <div> <p className="text-xs text-slate-500"> Consultation Completed </p> <p className="text-sm font-semibold text-slate-700 mt-1"> {item.completedAt ? new Date(item.completedAt).toLocaleString() : "Not completed"} </p> </div> </div> </div> </div> </div> ))} </div> )} </div> </div>
  )
}

export default AllConsultation
