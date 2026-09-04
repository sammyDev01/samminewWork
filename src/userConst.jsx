// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const MyConsultation = () => {

//   const { queueId } = useParams();

//   const [consultation, setConsultation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;


//   const getConsultation = async () => {

//     try {

//       const response = await axios.get(
//         `${backendUrl}/api/consultation/${queueId}`
//       );


//       if (response.data.success) {

//         setConsultation(
//           response.data.consultation
//         );

//       }

//     } catch (error) {

//       console.log(
//         "PATIENT CONSULTATION ERROR:",
//         error.response?.data || error
//       );

//     } finally {

//       setLoading(false);

//     }
//   };


//   useEffect(() => {

//     if (queueId) {
//       getConsultation();
//     }

//   }, [queueId]);


//   if (loading) {

//     return (
//       <div className="
//         min-h-[60vh]
//         flex
//         items-center
//         justify-center
//       ">

//         <div className="text-center">

//           <div className="
//             w-10
//             h-10
//             border-4
//             border-blue-100
//             border-t-blue-600
//             rounded-full
//             animate-spin
//             mx-auto
//           "></div>

//           <p className="
//             mt-3
//             text-sm
//             text-gray-500
//           ">
//             Loading consultation...
//           </p>

//         </div>

//       </div>
//     );
//   }


//   if (!consultation) {

//     return (
//       <div className="
//         min-h-[60vh]
//         flex
//         items-center
//         justify-center
//         text-center
//         px-5
//       ">

//         <div>

//           <div className="
//             w-16
//             h-16
//             mx-auto
//             rounded-2xl
//             bg-blue-50
//             flex
//             items-center
//             justify-center
//             text-2xl
//           ">
//             🩺
//           </div>

//           <h2 className="
//             mt-4
//             text-xl
//             font-bold
//             text-slate-800
//           ">
//             Consultation not available
//           </h2>

//           <p className="
//             mt-2
//             text-sm
//             text-slate-500
//           ">
//             Your doctor has not started the consultation yet.
//           </p>

//         </div>

//       </div>
//     );
//   }


//   return (

//     <div className="
//       min-h-screen
//       bg-slate-50
//       px-4
//       sm:px-6
//       py-6
//     ">

//       <div className="
//         max-w-4xl
//         mx-auto
//       ">


//         {/* HEADER */}

//         <div className="
//           bg-gradient-to-r
//           from-blue-950
//           to-blue-600
//           rounded-3xl
//           p-6
//           sm:p-8
//           text-white
//           shadow-lg
//           mb-5
//         ">

//           <p className="
//             text-xs
//             uppercase
//             tracking-wider
//             text-blue-200
//           ">
//             WDU Healthcare
//           </p>

//           <h1 className="
//             text-2xl
//             sm:text-3xl
//             font-bold
//             mt-1
//           ">
//             My Consultation
//           </h1>

//           <p className="
//             text-sm
//             text-blue-100
//             mt-2
//           ">
//             Consultation information from your doctor
//           </p>

//         </div>


//         {/* DOCTOR */}

//         <div className="
//           bg-white
//           rounded-2xl
//           border
//           border-slate-200
//           p-5
//           sm:p-6
//           shadow-sm
//           mb-5
//         ">

//           <p className="
//             text-xs
//             uppercase
//             tracking-wider
//             text-slate-400
//             font-semibold
//           ">
//             Doctor
//           </p>


//           <div className="
//             flex
//             items-center
//             gap-4
//             mt-4
//           ">

//             <img
//               src={consultation.doctorId?.image}
//               alt=""
//               className="
//                 w-16
//                 h-16
//                 rounded-2xl
//                 object-cover
//                 bg-blue-50
//               "
//             />

//             <div>

//               <h2 className="
//                 font-bold
//                 text-slate-800
//               ">
//                 {consultation.doctorId?.name}
//               </h2>

//               <p className="
//                 text-sm
//                 text-slate-500
//               ">
//                 {consultation.doctorId?.speciality}
//               </p>

//             </div>

//           </div>

//         </div>


//         {/* CONSULTATION */}

//         <div className="
//           bg-white
//           rounded-2xl
//           border
//           border-slate-200
//           shadow-sm
//           overflow-hidden
//         ">

//           <div className="
//             p-5
//             sm:p-6
//             border-b
//             border-slate-100
//           ">

//             <h2 className="
//               text-lg
//               font-bold
//               text-slate-800
//             ">
//               Consultation Details
//             </h2>

//           </div>


//           <div className="
//             p-5
//             sm:p-6
//             space-y-5
//           ">


//             {/* SYMPTOMS */}

//             <div>

//               <p className="
//                 text-sm
//                 font-semibold
//                 text-slate-700
//                 mb-2
//               ">
//                 Symptoms
//               </p>

//               <div className="
//                 p-4
//                 rounded-xl
//                 bg-slate-50
//                 text-sm
//                 text-slate-600
//                 leading-6
//               ">
//                 {consultation.symptoms ||
//                   "No symptoms recorded."}
//               </div>

//             </div>


//             {/* DIAGNOSIS */}

//             <div>

//               <p className="
//                 text-sm
//                 font-semibold
//                 text-slate-700
//                 mb-2
//               ">
//                 Diagnosis
//               </p>

//               <div className="
//                 p-4
//                 rounded-xl
//                 bg-blue-50
//                 text-sm
//                 text-blue-800
//                 leading-6
//               ">
//                 {consultation.diagnosis ||
//                   "No diagnosis recorded."}
//               </div>

//             </div>


//             {/* NOTES */}

//             <div>

//               <p className="
//                 text-sm
//                 font-semibold
//                 text-slate-700
//                 mb-2
//               ">
//                 Doctor's Notes
//               </p>

//               <div className="
//                 p-4
//                 rounded-xl
//                 bg-slate-50
//                 text-sm
//                 text-slate-600
//                 leading-6
//               ">
//                 {consultation.notes ||
//                   "No notes recorded."}
//               </div>

//             </div>


//             {/* PRESCRIPTION */}

//             <div>

//               <p className="
//                 text-sm
//                 font-semibold
//                 text-slate-700
//                 mb-2
//               ">
//                 Prescription
//               </p>

//               <div className="
//                 p-4
//                 rounded-xl
//                 bg-green-50
//                 text-sm
//                 text-green-800
//                 leading-6
//               ">
//                 {consultation.prescription ||
//                   "No prescription recorded."}
//               </div>

//             </div>


//             {/* STATUS */}

//             <div className="
//               flex
//               items-center
//               justify-between
//               gap-3
//               p-4
//               rounded-xl
//               bg-slate-50
//               border
//               border-slate-100
//             ">

//               <span className="
//                 text-sm
//                 font-medium
//                 text-slate-600
//               ">
//                 Consultation Status
//               </span>

//               <span className={`
//                 px-3
//                 py-1.5
//                 rounded-full
//                 text-xs
//                 font-semibold
//                 ${
//                   consultation.status === "completed"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-blue-100 text-blue-700"
//                 }
//               `}>
//                 {consultation.status}
//               </span>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default MyConsultation;