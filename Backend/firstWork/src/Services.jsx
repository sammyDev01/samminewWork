
import React, { useState,useContext ,useEffect,} from 'react';
import { 
  User, Heart, Activity, Thermometer, Weight, 
  AlertTriangle, Plus, Trash2, Save, CheckCircle 
} from 'lucide-react';
;
import axios from "axios";

import { AppContext } from './context';

const Services =() => {

const {token} = useContext(AppContext)

  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const getConsultations = async () => {
    try {
      setLoading(true);

      const response = await axios.get("https://healthcare-for-wdu-netlify-3.onrender.com/api/consultation/patient",
        {headers: {
            Authorization: `Bearer ${token}`}});

      if (response.data.success) {
        setConsultations(response.data.consultations);
      }
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load consultations"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConsultations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading consultation...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          My Consultations
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded mb-5">
            {error}
          </div>
        )}

        {consultations.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500">
              You don't have any consultation yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {consultations.map((consultation) => (

              <div
                key={consultation._id}
                className="bg-white rounded-lg shadow p-6"
              >

                <div className="flex justify-between items-center mb-5">

                  <div>
                    <h2 className="text-xl font-semibold">
                      Doctor
                    </h2>

                    <p className="text-gray-600">
                      {consultation.doctorId?.name ||
                        "Doctor"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {consultation.doctorId?.specialization ||
                        "Medical Doctor"}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium
                    ${
                      consultation.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : consultation.status ===
                          "in-consultation"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {consultation.status}
                  </span>

                </div>


                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <h3 className="font-semibold">
                      Symptoms
                    </h3>

                    <p className="text-gray-600 mt-1">
                      {consultation.symptoms ||
                        "Not yet recorded"}
                    </p>
                  </div>


                  <div>
                    <h3 className="font-semibold">
                      Diagnosis
                    </h3>

                    <p className="text-gray-600 mt-1">
                      {consultation.diagnosis ||
                        "Not yet recorded"}
                    </p>
                  </div>


                  <div>
                    <h3 className="font-semibold">
                      Treatment
                    </h3>

                    <p className="text-gray-600 mt-1">
                      {consultation.treatment ||
                        "Not yet recorded"}
                    </p>
                  </div>


                  <div>
                    <h3 className="font-semibold">
                      Prescription
                    </h3>

                    <p className="text-gray-600 mt-1">
                      {consultation.prescription ||
                        "Not yet recorded"}
                    </p>
                  </div>

                </div>


                <div className="mt-5">

                  <h3 className="font-semibold">
                    Doctor's Notes
                  </h3>

                  <p className="bg-gray-50 p-4 rounded mt-2">
                    {consultation.notes ||
                      "No notes available"}
                  </p>

                </div>


                {consultation.completedAt && (
                  <p className="text-sm text-gray-500 mt-5">
                    Completed:{" "}
                    {new Date(
                      consultation.completedAt
                    ).toLocaleString()}
                  </p>
                )}

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  
  );
}

export default Services