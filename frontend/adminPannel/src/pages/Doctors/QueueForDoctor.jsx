import { useEffect, useState } from "react";
import axios from "axios";

const DoctorQueue = () => {
  const [queues, setQueues] = useState([]);
  const [currentPatient, setCurrentPatient] =
    useState(null);

  const token = localStorage.getItem("token");


  const getWaitingPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5173/api/queue/waiting",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQueues(response.data.queues);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load queue"
      );
    }
  };


  const attendPatient = async (queueId) => {
    try {
      const response = await axios.put(
        `http://localhost:5173/api/queue/attend/${queueId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCurrentPatient(response.data.queue);

      // Remove patient from waiting list
      setQueues((previousQueues) =>
        previousQueues.filter(
          (item) => item._id !== queueId
        )
      );

      alert(response.data.message);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to attend patient"
      );
    }
  };


  const completePatient = async () => {
    if (!currentPatient) return;

    try {
      const response = await axios.put(
        `http://localhost:5173/api/queue/complete/${currentPatient._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      setCurrentPatient(null);

      getWaitingPatients();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to complete patient"
      );
    }
  };


  useEffect(() => {
    getWaitingPatients();

    const interval = setInterval(() => {
      getWaitingPatients();
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div style={{ padding: "30px" }}>
      <h1>Doctor Queue</h1>


      {/* CURRENT PATIENT */}

      {currentPatient && (
        <div
          style={{
            padding: "25px",
            marginBottom: "30px",
            border: "2px solid green",
            borderRadius: "10px",
          }}
        >
          <h2>Current Patient</h2>

          <h1>
            Queue Number:{" "}
            {currentPatient.queueNumber}
          </h1>

          <p>
            Patient Name:{" "}
            {currentPatient.patient?.name}
          </p>

          <p>
            Email:{" "}
            {currentPatient.patient?.email}
          </p>

          <p>
            Status:{" "}
            {currentPatient.status}
          </p>

          <button onClick={completePatient}>
            Complete Consultation
          </button>
        </div>
      )}


      {/* WAITING PATIENTS */}

      <h2>Waiting Patients</h2>

      {queues.length === 0 ? (
        <p>No patients waiting.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Queue No.</th>
              <th>Patient</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {queues.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.queueNumber}
                </td>

                <td>
                  {item.patient?.name}
                </td>

                <td>
                  {item.patient?.email}
                </td>

                <td>
                  {item.status}
                </td>

                <td>
                  <button
                    onClick={() =>
                      attendPatient(item._id)
                    }
                    disabled={currentPatient !== null}
                  >
                    Attend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorQueue;