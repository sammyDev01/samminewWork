import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from './context';
import { MdMedicalServices } from "react-icons/md";

const Doctors = () => {
  const {speciality} = useParams();
  const [showFilter, setShowFilter] = useState(false)
  const {doctors} = useContext(AppContext)

  const [filterDoc, setFilterDoc] = useState([])

  const applyFilter = () =>{
    if (speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }else {
      setFilterDoc(doctors)
    }
  }
  const navigate = useNavigate()
  useEffect(()=>{
      applyFilter()
  },[doctors, speciality])

  return (
   <div className="w-full min-w-0 mb-5">

  {/* TOP DESCRIPTION */}
  <p className="
    text-xs
    sm:text-sm
    md:text-base
    text-slate-500
    font-medium
    leading-6
  ">
    Browse through the doctors speciality
  </p>


  {/* FILTER + DOCTORS */}
  <div className="
    flex
    flex-col
    lg:flex-row
    items-start
    gap-5
    lg:gap-8
    mt-5
    w-full
  ">


    {/* MOBILE FILTER BUTTON */}
    <button
      className={`
        sm:hidden
        inline-flex
        items-center
        justify-center
        gap-2
        px-5
        py-2
        rounded-full
        border
        text-xs
        font-semibold
        shadow-sm
        transition-all
        duration-300
        ${
          showFilter
            ? "bg-blue-600 text-white border-blue-600 shadow-blue-200"
            : "bg-white text-slate-600 border-slate-200 hover:border-blue-400"
        }
      `}
      onClick={() => setShowFilter(prev => !prev)}
    >
      <span>☰</span>
      Filter
    </button>


    {/* FILTER SIDEBAR */}
   {/* FILTER SIDEBAR */}
<div
  className={`
    fixed
    inset-0
    z-[100]
    bg-black/40
    backdrop-blur-sm
    transition-all
    duration-300

    sm:static
    sm:z-auto
    sm:bg-transparent
    sm:backdrop-blur-none
    sm:block
    sm:w-62
    sm:flex-shrink-0

    ${showFilter
      ? "opacity-100 visible"
      : "opacity-0 invisible pointer-events-none"
    }

    sm:opacity-100
    sm:visible
    sm:pointer-events-auto
  `}
>

  {/* FULL SCREEN MOBILE PANEL */}
  <div
    className={`
      absolute
      left-0
      top-0
      bottom-0
      w-full
      max-w-full
      bg-white
      overflow-y-auto

      transform
      transition-transform
      duration-300

      sm:static
      sm:w-full
      sm:max-w-none
      sm:bg-transparent
      sm:transform-none
      sm:overflow-visible

      ${showFilter
        ? "translate-x-0"
        : "-translate-x-full"
      }

      sm:translate-x-0
    `}
  >

    {/* MOBILE HEADER */}
    <div className="
      flex
      items-center
      justify-between
      px-5
      py-5
      border-b
      border-slate-200
      sm:hidden
    ">

      <div>
        <h2 className="
          text-lg
          font-bold
          text-slate-800
        ">
          Filter Doctors
        </h2>

        <p className="
          text-xs
          text-slate-400
          mt-1
        ">
          Select a speciality
        </p>
      </div>


      {/* CLOSE BUTTON */}
      <button
        onClick={() => setShowFilter(false)}
        className="
          w-10
          h-10
          flex
          items-center
          justify-center
          rounded-full
          bg-slate-100
          text-slate-600
          text-xl
          hover:bg-red-50
          hover:text-red-500
          transition-all
        "
      >
        ×
      </button>

    </div>


    {/* FILTER CONTENT */}
    <div className="
      flex
      flex-col
      gap-2
      p-5

      sm:p-0
      sm:gap-2
    ">

      {/* DESKTOP TITLE */}
      <p className="
        hidden
        sm:block
        text-xs
        font-bold
        uppercase
        tracking-wider
        text-slate-400
        mb-2
      ">
        Specialities
      </p>


      {/* GENERAL PHYSICIAN */}
      <p
        onClick={() => {
          setShowFilter(false);

          speciality === "General Physician"
            ? navigate("/doctors")
            : navigate("/doctors/General Physician");
        }}
        className={`
          w-full
          px-4
          py-3
          rounded-xl
          border
          text-sm
          cursor-pointer
          transition-all
          duration-300

          ${
            speciality === "General Physician"
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-slate-600 border-slate-200 hover:bg-blue-50 hover:border-blue-300"
          }
        `}
      >
        General Physician
      </p>


      {/* GYNECOLOGIST */}
      <p
        onClick={() => {
          setShowFilter(false);

          speciality === "Gynecologist"
            ? navigate("/doctors")
            : navigate("/doctors/Gynecologist");
        }}
        className={`
          w-full
          px-4
          py-3
          rounded-xl
          border
          text-sm
          cursor-pointer
          transition-all
          duration-300

          ${
            speciality === "Gynecologist"
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-slate-600 border-slate-200 hover:bg-blue-50 hover:border-blue-300"
          }
        `}
      >
        Gynecologist
      </p>


      {/* DERMATOLOGIST */}
      <p
        onClick={() => {
          setShowFilter(false);

          speciality === "Dermatologist"
            ? navigate("/doctors")
            : navigate("/doctors/Dermatologist");
        }}
        className={`
          w-full
          px-4
          py-3
          rounded-xl
          border
          text-sm
          cursor-pointer
          transition-all
          duration-300

          ${
            speciality === "Dermatologist"
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-slate-600 border-slate-200 hover:bg-blue-50 hover:border-blue-300"
          }
        `}
      >
        Dermatologist
      </p>


      {/* PEDIATRICIANS */}
      <p
        onClick={() => {
          setShowFilter(false);

          speciality === "Pediatricians"
            ? navigate("/doctors")
            : navigate("/doctors/Pediatricians");
        }}
        className={`
          w-full
          px-4
          py-3
          rounded-xl
          border
          text-sm
          cursor-pointer
          transition-all
          duration-300

          ${
            speciality === "Pediatricians"
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-slate-600 border-slate-200 hover:bg-blue-50 hover:border-blue-300"
          }
        `}
      >
        Pediatricians
      </p>


      {/* NEUROLOGIST */}
      <p
        onClick={() => {
          setShowFilter(false);

          speciality === "Neurologist"
            ? navigate("/doctors")
            : navigate("/doctors/Neurologist");
        }}
        className={`
          w-full
          px-4
          py-3
          rounded-xl
          border
          text-sm
          cursor-pointer
          transition-all
          duration-300

          ${
            speciality === "Neurologist"
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-slate-600 border-slate-200 hover:bg-blue-50 hover:border-blue-300"
          }
        `}
      >
        Neurologist
      </p>


      {/* GASTROENTEROLOGIST */}
      <p
        onClick={() => {
          setShowFilter(false);

          speciality === "Gastroenterologist"
            ? navigate("/doctors")
            : navigate("/doctors/Gastroenterologist");
        }}
        className={`
          w-full
          px-4
          py-3
          rounded-xl
          border
          text-sm
          cursor-pointer
          transition-all
          duration-300

          ${
            speciality === "Gastroenterologist"
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-slate-600 border-slate-200 hover:bg-blue-50 hover:border-blue-300"
          }
        `}
      >
        Gastroenterologist
      </p>

    </div>

  </div>

</div>


    {/* DOCTOR GRID */}
    <div className="
      flex-1
      min-w-0
      w-full
      grid
      grid-cols-1
      min-[420px]:grid-cols-2
      md:grid-cols-3
      xl:grid-cols-4
      2xl:grid-cols-5
      gap-4
      sm:gap-5
      lg:gap-6
    ">

      {filterDoc.map((item, index) => (

        <div
          key={index}
          onClick={() => navigate(`/appointment/${item._id}`)}
          className="
            group
            w-full
            min-w-0
            bg-white
            border
            border-slate-200
            rounded-2xl
            overflow-hidden
            cursor-pointer
            shadow-sm
            hover:shadow-xl
            hover:shadow-blue-100/50
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >

          {/* IMAGE */}
          <div className="
            relative
            w-full
            aspect-[4/4.2]
            bg-gradient-to-br
            from-blue-50
            via-slate-50
            to-cyan-50
            overflow-hidden
          ">

            <img
              src={item.image}
              alt={item.name}
              className="
                w-full
                h-full
                object-contain
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />


            {/* AVAILABLE */}
            <div className="
              absolute
              top-3
              left-3
              flex
              items-center
              gap-1.5
              bg-white/95
              backdrop-blur-md
              px-2.5
              py-1.5
              rounded-full
              shadow-sm
            ">

              <span className="
                relative
                flex
                w-2
                h-2
              ">

                <span className="
                  absolute
                  w-full
                  h-full
                  rounded-full
                  bg-green-400
                  opacity-60
                  animate-ping
                ></span>

                <span className="
                  relative
                  w-2
                  h-2
                  rounded-full
                  bg-green-500
                ></span>

              </span>

              <span className="
                text-[10px]
                sm:text-xs
                font-semibold
                text-green-600
              ">
                Available
              </span>

            </div>


            {/* ARROW */}
            <div className="
              absolute
              right-3
              bottom-3
              flex
              items-center
              justify-center
              w-8
              h-8
              rounded-full
              bg-white/95
              backdrop-blur-md
              text-blue-600
              shadow-md
              opacity-100
              sm:opacity-0
              sm:translate-y-2
              sm:group-hover:opacity-100
              sm:group-hover:translate-y-0
              transition-all
              duration-300
            ">
              →
            </div>

          </div>


          {/* DETAILS */}
          <div className="
            p-3
            sm:p-4
          ">

            <h3 className="
              text-sm
              sm:text-base
              font-bold
              text-slate-800
              truncate
              group-hover:text-blue-600
              transition-colors
            ">
              {item.name}
            </h3>

            <p className="
              mt-1
              text-xs
              sm:text-sm
              text-slate-500
              truncate
            ">
              {item.speciality}
            </p>


            <div className="
              my-3
              border-t
              border-slate-100
            "></div>


            <div className="
              flex
              items-center
              justify-between
              gap-2
            ">

              <span className="
                text-[10px]
                sm:text-xs
                text-slate-400
              ">
               

<MdMedicalServices /> Specialist
              </span>

              <span className="
                text-[10px]
                sm:text-xs
                font-bold
                text-blue-600
                group-hover:translate-x-1
                transition-transform
              ">
                Book →
              </span>

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

</div>
  )
}

export default Doctors
