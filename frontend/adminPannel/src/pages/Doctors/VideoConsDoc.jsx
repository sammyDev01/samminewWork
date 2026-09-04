import React, { useEffect,  useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../socket";

const DoctorConsultation = () => {
  const { appointmentId } = useParams();


  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const createPeerConnection = () => {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    peerConnectionRef.current = peer;

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          appointmentId,
          candidate: event.candidate,
        });
      }
    };

    peer.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }

      setConnected(true);
    };

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        peer.addTrack(track, localStreamRef.current);
      });
    }

    return peer;
  };

  const startCamera = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      createPeerConnection();

      socket.emit("join-consultation", appointmentId);
    } catch (error) {
      console.error("Camera error:", error);
      alert("Please allow camera and microphone access.");
    }
  };

  useEffect(() => {
    if (!appointmentId) return;

    startCamera();

    socket.on("offer", async ({ offer }) => {
      console.log("Patient offer received");

      const peer = peerConnectionRef.current;

      if (!peer) return;

      await peer.setRemoteDescription(
        new RTCSessionDescription(offer)
      );

      const answer = await peer.createAnswer();

      await peer.setLocalDescription(answer);

      socket.emit("answer", {
        appointmentId,
        answer,
      });
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      try {
        const peer = peerConnectionRef.current;

        if (!peer) return;

        await peer.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      } catch (error) {
        console.error("ICE error:", error);
      }
    });

    socket.on("patient-left", () => {
      setConnected(false);

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    });

    return () => {
      socket.off("offer");
      socket.off("ice-candidate");
      socket.off("patient-left");

      if (localStreamRef.current) {
        localStreamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }

      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };


    socket.emit("join-consultation", appointmentId);

    const handlePatientJoined = (data) => {
      console.log("Patient joined:", data.socketId);
    };

    socket.on("user-joined", handlePatientJoined);

    return () => {
      socket.off("user-joined", handlePatientJoined);
    };
  }, [appointmentId]);

   const toggleMicrophone = () => {
    const tracks =
      localStreamRef.current?.getAudioTracks();

    if (!tracks) return;

    tracks.forEach((track) => {
      track.enabled = !track.enabled;
    });

    setMicOn((prev) => !prev);
  };

  const toggleCamera = () => {
    const tracks =
      localStreamRef.current?.getVideoTracks();

    if (!tracks) return;

    tracks.forEach((track) => {
      track.enabled = !track.enabled;
    });

    setCameraOn((prev) => !prev);
  };

  const leaveCall = () => {
    socket.emit("leave-consultation", appointmentId);

    if (localStreamRef.current) {
      localStreamRef.current
        .getTracks()
        .forEach((track) => track.stop());
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }

    window.history.back();
  };


  return (
    <div className="min-h-screen bg-slate-950 p-3 sm:p-5">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-4">

          <div>
            <h1 className="text-white text-xl sm:text-2xl font-bold">
              Doctor Consultation
            </h1>

            <p className="text-slate-400 text-xs sm:text-sm">
              Live patient consultation
            </p>
          </div>

          <div className="flex items-center gap-2">

            <span
              className={`w-3 h-3 rounded-full ${
                connected
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
            />

            <span className="text-white text-sm">
              {connected ? "Patient Connected" : "Waiting"}
            </span>

          </div>

        </div>


        <div className="grid lg:grid-cols-2 gap-4">

          {/* PATIENT VIDEO */}

          <div className="
            relative
            bg-slate-900
            rounded-2xl
            overflow-hidden
            aspect-video
            border
            border-slate-800
          ">

            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />

            <div className="
              absolute
              bottom-3
              left-3
              bg-black/60
              text-white
              px-3
              py-1.5
              rounded-lg
              text-sm
            ">
              Patient
            </div>

          </div>


          {/* DOCTOR VIDEO */}

          <div className="
            relative
            bg-slate-900
            rounded-2xl
            overflow-hidden
            aspect-video
            border
            border-slate-800
          ">

            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            <div className="
              absolute
              bottom-3
              left-3
              bg-black/60
              text-white
              px-3
              py-1.5
              rounded-lg
              text-sm
            ">
              You
            </div>

          </div>

        </div>


        <div className="
          flex
          justify-center
          items-center
          gap-3
          mt-5
        ">

          <button
            onClick={toggleMicrophone}
            className={`
              w-12 h-12
              rounded-full
              flex
              items-center
              justify-center
              text-xl
              ${
                micOn
                  ? "bg-slate-800 text-white"
                  : "bg-red-600 text-white"
              }
            `}
          >
            {micOn ? "🎤" : "🔇"}
          </button>


          <button
            onClick={toggleCamera}
            className={`
              w-12 h-12
              rounded-full
              flex
              items-center
              justify-center
              text-xl
              ${
                cameraOn
                  ? "bg-slate-800 text-white"
                  : "bg-red-600 text-white"
              }
            `}
          >
            {cameraOn ? "📹" : "🚫"}
          </button>


          <button
            onClick={leaveCall}
            className="
              px-6
              h-12
              rounded-full
              bg-red-600
              hover:bg-red-700
              text-white
              font-semibold
            "
          >
            End Call
          </button>

        </div>

      </div>

    </div>

  );
};

export default DoctorConsultation;