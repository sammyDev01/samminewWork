import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/doctorContext";
import DoctorQueue from "../../pages/Doctors/DoctorQueue";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdMedicalServices } from "react-icons/md";
import {FaUserDoctor} from "react-icons/fa6"



const DoctorConsultation = () => {




const {id} = useParams()
const navigate  = useNavigate();

  const [consultations, setConsultations] = useState([]);

  const [selectedConsultation, setSelectedConsultation] =
    useState(null);

  const [formData, setFormData] = useState({
    symptoms: "",
    diagnosis: "",
    notes: "",
    treatment: "",
    prescription: "",
  });
  const  {dToken} = useContext(DoctorContext)
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

 

  const getConsultations = async () => {
    try {
      setLoading(true)
      const {data} = await axios.get("http://localhost:5173/api/consultation/doctor", {headers: {Authorization: `Bearer ${dToken}`}});

      if (data.success) {
        setConsultations(data.consultations);
      }
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to load consultations");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getConsultations();
  }, []);


  // ===============================
  // SELECT CONSULTATION
  // ===============================
  const selectConsultation = (consultation) => {
    setSelectedConsultation(consultation);

    setFormData({
      symptoms: consultation.symptoms || "",
      diagnosis: consultation.diagnosis || "",
      notes: consultation.notes || "",
      treatment: consultation.treatment || "",
      prescription:
        consultation.prescription || "",
    });
  };


  // ===============================
  // INPUT CHANGE
  // ===============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // ===============================
  // START CONSULTATION
  // ===============================
  const startConsultation = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5173/api/consultation/start/${selectedConsultation._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${dToken}`
          },
        }
      );

      if (response.data.success) {
        alert("Consultation started");

        setSelectedConsultation(
          response.data.consultation
        );

        getConsultations();
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to start consultation"
      );
    }
  };


  // ===============================
  // SAVE CONSULTATION
  // ===============================
  const saveConsultation = async () => {
    try {
      setSaving(true);

      const {data} = await axios.put(`http://localhost:5173/api/consultation/update/${selectedConsultation._id}`,formData,{headers: {Authorization: `Bearer ${dToken}`,}});
      if (data.success) {
        // alert("Consultation saved successfully");
        toast.success(data.message)
        setSelectedConsultation(data.consultation);
        getConsultations();
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Unable to save consultation"
      );
    } finally {
      setSaving(false);
    }
  };


  // ===============================
  // COMPLETE CONSULTATION
  // ===============================
  const completeConsultation = async () => {
    if (!window.confirm(
      "Are you sure you want to complete this consultation?"
    )) {
      return;
    }

    try {
      const {data} = await axios.put(`http://localhost:5173/api/consultation/complete/${selectedConsultation._id}`,{},{headers: {Authorization: `Bearer ${dToken}`}});

      if (data.success) {
       toast.success(data.message)
        setSelectedConsultation(null);

        setFormData({
          symptoms: "",
          diagnosis: "",
          notes: "",
          treatment: "",
          prescription: "",
        });

        getConsultations();
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to complete consultation"
      );
    }
  };


  if (loading) {
    return (
      <div className="min-h-[70vh] w-full flex items-center justify-center">
  <div className="flex flex-col items-center justify-center gap-4">

    <div className="
      w-12 h-12
      rounded-full
      border-4
      border-slate-200
      border-t-blue-600
      animate-spin
    "></div>

    <p className="
      text-sm
      sm:text-base
      font-medium
      text-slate-600
      animate-pulse
    ">
      Loading...
    </p>

  </div>
</div>
    );
  }


  return (
   <div className="min-h-screen w-full bg-slate-50 p-3 sm:p-4 md:p-6">

  <div className="w-full max-w-7xl mx-auto">

    {/* HEADER */}
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center gap-3">

        <div className="
          w-10 h-10 sm:w-12 sm:h-12
          rounded-xl
          flex items-center justify-center
          border
          border-blue-400
          text-white
          shadow-lg shadow-blue-100
          flex-shrink-0
        ">
      

      <MdMedicalServices className="text-blue-500 text-xl" />
        </div>

        <div>
          <h1 className="
            text-xl sm:text-2xl md:text-3xl
            font-bold
            text-slate-800
          ">
            Doctor Consultation
          </h1>

          <p className="
            text-xs sm:text-sm
            text-slate-400
            mt-1
          ">
            Manage patient consultation and medical records
          </p>
        </div>

        <button  className="bg-blue-400 text-white p-2 m-4 w-33 h-9 rounded-full" onClick={()=>navigate(`/vidCons/:appointmentId`)}>Joint Live</button>

      </div>
    </div>


    {/* MAIN GRID */}
    <div className="
      grid
      grid-cols-1
      lg:grid-cols-3
      gap-4
      sm:gap-5
      lg:gap-6
    ">


      {/* =================================
          PATIENT LIST
      ================================= */}

      <div className="
        bg-white
        rounded-2xl
        border border-slate-200
        shadow-sm
        overflow-hidden
      ">

        <div className="
          px-4 sm:px-5
          py-4
          border-b border-slate-100
          bg-slate-50
        ">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="
                text-base sm:text-lg
                font-bold
                text-slate-800
              ">
                Patients
              </h2>

              <p className="
                text-[11px] sm:text-xs
                text-slate-400
                mt-1
              ">
                Select a patient to consult
              </p>
            </div>

            <div className="
              px-3 py-1.5
              rounded-xl
              bg-blue-50
              text-blue-600
              text-xs
              font-bold
            ">
              {consultations.length}
            </div>

          </div>

        </div>


        <div className="
          p-3 sm:p-4
          max-h-[65vh]
          lg:max-h-[70vh]
          overflow-y-auto
          space-y-2
        ">

          {consultations.length === 0 ? (

            <div className="
              py-12
              text-center
              px-4
            ">

              <div className="
                w-16 h-16
                mx-auto
                rounded-2xl
                bg-blue-50
                flex items-center justify-center
                text-3xl
                mb-3
              ">
                <FaUserDoctor className="text-blue-500 text-xl" />
              </div>

              <p className="
                text-sm
                font-semibold
                text-slate-700
              ">
                No consultations
              </p>

              <p className="
                text-xs
                text-slate-400
                mt-1
              ">
                No patients are currently waiting.
              </p>

            </div>

          ) : (

            <div className="space-y-2">

              {consultations.map((consultation) => (

                <button
                  key={consultation._id}
                  onClick={() =>
                    selectConsultation(consultation)
                  }
                  className={`
                    w-full
                    text-left
                    p-3 sm:p-4
                    rounded-xl
                    border
                    transition-all
                    duration-200
                    active:scale-[0.99]

                    ${
                      selectedConsultation?._id ===
                      consultation._id

                        ? "bg-blue-50 border-blue-400 shadow-sm"

                        : "bg-white border-slate-200 hover:border-blue-200 hover:bg-blue-50/40"
                    }
                  `}
                >

                  <div className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  ">

                    <div className="min-w-0">

                      <p className="
                        text-sm
                        sm:text-base
                        font-semibold
                        text-slate-800
                        truncate
                      ">
                        {consultation.patientId?.name ||
                          "Patient"}
                      </p>
                      <p className="
                        text-sm
                        sm:text-base
                        font-semibold
                        text-slate-800
                        truncate
                      ">
                        {consultation.patientId?.matNum ||
                          "Patient"}
                      </p>

                       <p className="
                        text-sm
                        sm:text-base
                        font-semibold
                        text-slate-800
                        truncate
                      ">
                        {consultation.patientId?.level ||
                          "Patient"}
                      </p>

                      <p className="
                        text-[11px]
                        sm:text-xs
                        text-slate-400
                        mt-1
                        truncate
                      ">
                        {consultation.patientId?.email}
                      </p>

                    </div>

                    <span className="
                      flex-shrink-0
                      px-2 py-1
                      rounded-lg
                      bg-slate-100
                      text-[9px]
                      sm:text-[10px]
                      font-semibold
                      text-slate-500
                    ">
                      {consultation.status}
                    </span>

                  </div>

                </button>

              ))}

            </div>

          )}

        </div>

      </div>


      {/* =================================
          CONSULTATION FORM
      ================================= */}

      <div className="lg:col-span-2">

        {!selectedConsultation ? (

          <div className="
            bg-white
            rounded-2xl
            border border-slate-200
            shadow-sm
            p-6 sm:p-10
            min-h-[350px]
            flex
            items-center
            justify-center
            text-center
          ">

            <div>

              <div className="
                w-20 h-20
                mx-auto
                rounded-3xl
                bg-blue-50
                flex
                items-center
                justify-center
                text-4xl
                mb-4
              ">
               <MdMedicalServices className="text-blue-500 text-xl" />

              </div>

              <h2 className="
                text-lg sm:text-xl
                font-bold
                text-slate-700
              ">
                Select a patient
              </h2>

              <p className="
                text-xs sm:text-sm
                text-slate-400
                mt-2
                max-w-sm
              ">
                Select a patient from the list to
                start consultation.
              </p>

            </div>

          </div>

        ) : (

          <div className="
            bg-white
            rounded-2xl
            border border-slate-200
            shadow-sm
            overflow-hidden
          ">


            {/* PATIENT INFORMATION */}

            <div className="
              p-4 sm:p-6
              border-b border-slate-100
              bg-gradient-to-r
              from-blue-50/70
              to-cyan-50/50
            ">

              <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
              ">

                <div className="min-w-0">

                  <p className="
                    text-[10px]
                    uppercase
                    tracking-wider
                    font-bold
                    text-blue-500
                    mb-1
                  ">
                    Patient Information
                  </p>

                  <h2 className="
                    text-xl sm:text-2xl
                    font-bold
                    text-slate-800
                    truncate
                  ">
                    {selectedConsultation.patientId?.name}
                  </h2>

                  <div className="
                    mt-2
                    space-y-1
                  ">

                    <p className="
                      text-xs sm:text-sm
                      text-slate-500
                      break-all
                    ">
                      {selectedConsultation.patientId?.email}
                    </p>
                    <p className="
                      text-xs sm:text-sm
                      text-slate-500
                      break-all
                    ">
                      {selectedConsultation.patientId?.matNum}
                    </p>
                    <p className="
                      text-xs sm:text-sm
                      text-slate-500
                      break-all
                    ">
                      {selectedConsultation.patientId?.level}
                    </p>
                    <p className="
                      text-xs sm:text-sm
                      text-slate-500
                    ">
                      {selectedConsultation.patientId?.phone}
                    </p>

                  </div>

                </div>


                <div>

                  <span
                    className={`
                      inline-flex
                      items-center
                      px-3 py-1.5
                      rounded-xl
                      text-xs
                      font-semibold

                      ${
                        selectedConsultation.status ===
                        "completed"

                          ? "bg-green-100 text-green-700"

                          : selectedConsultation.status ===
                            "in-consultation"

                          ? "bg-blue-100 text-blue-700"

                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    <span className="
                      w-2 h-2
                      rounded-full
                      bg-current
                      mr-2
                    "></span>

                    {selectedConsultation.status}

                  </span>

                </div>

              </div>

            </div>


            {/* FORM */}

            <div className="
              p-4 sm:p-6
              md:p-7
            ">


              {/* START BUTTON */}

              {selectedConsultation.status ===
                "pending" && (

                <button
                  onClick={startConsultation}
                  className="
                    w-full sm:w-auto
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    text-white
                    text-sm
                    font-semibold
                    px-5 sm:px-6
                    py-3
                    rounded-xl
                    shadow-md
                    shadow-blue-100
                    hover:shadow-lg
                    hover:-translate-y-0.5
                    active:scale-[0.98]
                    transition-all
                    duration-200
                    mb-5 sm:mb-6
                  "
                >
                  ▶ Start Consultation
                </button>

              )}


              <div className="space-y-5">


                {/* SYMPTOMS */}

                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  ">
                    Symptoms
                  </label>

                  <textarea
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    disabled={
                      selectedConsultation.status ===
                      "completed"
                    }
                    rows="4"
                    className="
                      w-full
                      border border-slate-200
                      rounded-xl
                      p-3 sm:p-4
                      text-sm
                      text-slate-700
                      bg-slate-50
                      outline-none
                      resize-y
                      focus:bg-white
                      focus:border-blue-400
                      focus:ring-4
                      focus:ring-blue-50
                      transition
                      disabled:opacity-60
                    "
                    placeholder="Enter patient's symptoms"
                  />

                </div>


                {/* DIAGNOSIS */}

                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  ">
                    Diagnosis
                  </label>

                  <textarea
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    disabled={
                      selectedConsultation.status ===
                      "completed"
                    }
                    rows="4"
                    className="
                      w-full
                      border border-slate-200
                      rounded-xl
                      p-3 sm:p-4
                      text-sm
                      text-slate-700
                      bg-slate-50
                      outline-none
                      resize-y
                      focus:bg-white
                      focus:border-blue-400
                      focus:ring-4
                      focus:ring-blue-50
                      transition
                      disabled:opacity-60
                    "
                    placeholder="Enter diagnosis"
                  />

                </div>


                {/* TREATMENT */}

                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  ">
                    Treatment
                  </label>

                  <textarea
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleChange}
                    disabled={
                      selectedConsultation.status ===
                      "completed"
                    }
                    rows="4"
                    className="
                      w-full
                      border border-slate-200
                      rounded-xl
                      p-3 sm:p-4
                      text-sm
                      text-slate-700
                      bg-slate-50
                      outline-none
                      resize-y
                      focus:bg-white
                      focus:border-blue-400
                      focus:ring-4
                      focus:ring-blue-50
                      transition
                      disabled:opacity-60
                    "
                    placeholder="Enter treatment"
                  />

                </div>


                {/* PRESCRIPTION */}

                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  ">
                    Prescription
                  </label>

                  <textarea
                    name="prescription"
                    value={formData.prescription}
                    onChange={handleChange}
                    disabled={
                      selectedConsultation.status ===
                      "completed"
                    }
                    rows="4"
                    className="
                      w-full
                      border border-slate-200
                      rounded-xl
                      p-3 sm:p-4
                      text-sm
                      text-slate-700
                      bg-slate-50
                      outline-none
                      resize-y
                      focus:bg-white
                      focus:border-blue-400
                      focus:ring-4
                      focus:ring-blue-50
                      transition
                      disabled:opacity-60
                    "
                    placeholder="Enter prescription"
                  />

                </div>


                {/* NOTES */}

                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  ">
                    Doctor's Notes
                  </label>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    disabled={
                      selectedConsultation.status ===
                      "completed"
                    }
                    rows="5"
                    className="
                      w-full
                      border border-slate-200
                      rounded-xl
                      p-3 sm:p-4
                      text-sm
                      text-slate-700
                      bg-slate-50
                      outline-none
                      resize-y
                      focus:bg-white
                      focus:border-blue-400
                      focus:ring-4
                      focus:ring-blue-50
                      transition
                      disabled:opacity-60
                    "
                    placeholder="Enter additional notes"
                  />

                </div>


                {/* BUTTONS */}

                {selectedConsultation.status !==
                  "completed" && (

                  <div className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-3
                    pt-3
                  ">

                    <button
                      onClick={saveConsultation}
                      disabled={saving}
                      className="
                        w-full sm:w-auto
                        flex-1
                        bg-gradient-to-r
                        from-emerald-500
                        to-teal-500
                        text-white
                        px-5 sm:px-6
                        py-3
                        rounded-xl
                        text-sm
                        font-semibold
                        shadow-md
                        shadow-emerald-100
                        hover:shadow-lg
                        active:scale-[0.98]
                        transition-all
                        disabled:opacity-60
                      "
                    >
                      {saving
                        ? "Saving..."
                        : "Save Consultation"}
                    </button>


                    <button
                      onClick={completeConsultation}
                      className="
                        w-full sm:w-auto
                        flex-1
                        bg-gradient-to-r
                        from-red-500
                        to-rose-500
                        text-white
                        px-5 sm:px-6
                        py-3
                        rounded-xl
                        text-sm
                        font-semibold
                        shadow-md
                        shadow-red-100
                        hover:shadow-lg
                        active:scale-[0.98]
                        transition-all
                      "
                    >
                      Complete Consultation
                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  </div>

</div>

  );
};



export default DoctorConsultation;