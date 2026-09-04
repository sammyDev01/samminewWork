import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { DoctorContext } from "../../context/doctorContext";

const DoctorQueue = () => {

    const {completingId, setCompletingI, waitingCount, setWaitingCount,   getDoctorQueue, loading, dToken, completePatient, attendPatient, queue, setQueue, currentPatient, setCurrentPatient} = useContext(DoctorContext)
    const [attending, setAttending] = useState(false);
 
  useEffect(() => {
    if(dToken){
   getDoctorQueue()
    }
    const interval = setInterval(() => {
      getDoctorQueue();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [dToken]);
  // const hanledAttend = async(queueId) =>{
  //   await attendPatient(queueId)
  // }  
  // const hanledComplete = async() =>{
  //   if(!currentPatient){
  //     return;
  //   }
  //   await completePatient(currentPatient._id);
  // }


  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">

      {/* HEADER */}

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h1 className="text-2xl font-bold text-gray-800">
            Doctor Queue
          </h1>
          <p className="text-gray-500 mt-1">
            Manage patients waiting for consultation
          </p>
        </div>

        {/* QUEUE COUNT */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">
              Total Patients
            </p><h2 className="text-3xl font-bold">{queue.length}
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">
              Waiting
            </p>

            <h2 className="text-3xl font-bold text-yellow-600">
              {
                queue.filter(
                  (queu) =>
                    queu.status === "waiting"
                ).length
              }
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">
              In Consultation
            </p>

            <h2 className="text-3xl font-bold text-blue-600">
              {
                queue.filter(
                  (queu) =>
                    queu.status ===
                    "in-consultation"
                ).length
              }
            </h2>
          </div>

        </div>

        {/* PATIENT QUEUE */}

        <div className="space-y-4">

          {queue.length === 0 ? (

            <div className="bg-white rounded-xl shadow p-10 text-center">

              <h2 className="text-xl font-semibold">
                No patients in queue
              </h2>

              <p className="text-gray-500 mt-2">
                Patients who generate a queue
                will appear here.
              </p>

            </div>

          ) : (

            queue.map((queu) => (

              <div
                key={queu._id}
                className="bg-white rounded-xl shadow p-6"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  {/* PATIENT INFORMATION */}

                  <div>

                    <div className="flex items-center gap-4">

                      <div className="bg-blue-100 text-blue-700 rounded-full w-14 h-14 flex items-center justify-center font-bold text-lg">

                        Q
                        {String(
                          queu.queueNumber
                        ).padStart(2, "0")}

                      </div>

                      <div>

                        <h2 className="text-xl font-bold">

                          {queu.userData?.name ||
                            "Unknown User"}

                        </h2>

                        <p className="text-gray-500">

                          Queue Number:

                          <strong className="ml-1">

                            Q
                            {String(
                              queu.queueNumber
                            ).padStart(3, "0")}

                          </strong>

                        </p>

                      </div>

                    </div>

                    {/* PATIENT DETAILS */}

                    <div className="mt-4 space-y-1 text-gray-600">

                      <p>
                        <strong>
                          Email:
                        </strong>{" "}
                        {queu.userData?.email ||
                          "N/A"}
                      </p>

                      <p>
                        <strong>
                          Phone:
                        </strong>{" "}
                        {queu.userData?.phone ||
                          "N/A"}
                      </p>

                      <p>
                        <strong>
                          Date:
                        </strong>{" "}
                        {queu.queueDate}
                      </p>

                    </div>

                  </div>

                  {/* STATUS AND ACTION */}

                  <div className="flex flex-col items-start md:items-end gap-3">

                    {/* WAITING */}

                    {queu.status ===
                      "waiting" && (

                      <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">

                        Waiting

                      </span>

                    )}

                    {/* IN CONSULTATION */}

                    {queu.status ===
                      "in-consultation" && (

                      <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">

                        In Consultation

                      </span>

                    )}

                    {/* COMPLETED */}

                    {queu.status ===
                      "completed" && (

                      <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">

                        Completed

                      </span>

                    )}

                    {/* CANCELLED */}

                    {queu.status ===
                      "cancelled" && (

                      <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold">

                        Cancelled

                      </span>

                    )}

                    {/* ATTEND BUTTON */}

                    {queu.status ===
                      "waiting" && (<button onClick={() => attendPatient(queu._id)
                        }
                        disabled={attending}
                        className="px-4 py-2 rounded-lg bg-blue-600     text-white text-sm font-medium hover:bg-blue-700 transition" >
                        {attending
          ? "Attending..."
          : "Attend Patient"}
                      </button>

                    )}

                    {/* COMPLETE BUTTON */}

                    {queu.status ===
                      "in-consultation" && (
                      <button
                        onClick={() => completePatient( queu._id )}
                        // disabled={ completingId === queu._id }
                          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:opacity-50">
                        
                        {completingId ===
                        queu._id ? "Completing..."
                          : "Complete Consultation"}
                      </button>

                    )}

                    {/* COMPLETED MESSAGE */}

                    {queu.status ===
                      "completed" && (

                      <p className="text-green-600 font-semibold">

                        Consultation completed

                      </p>

                    )}

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>




  );
};

export default DoctorQueue;