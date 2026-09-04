import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './context';
import { MdMedicalServices } from "react-icons/md";


const TopDoctors = () => {

  const { doctors} = useContext(AppContext)
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center text-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl  font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply brows through our extensive list of trusted doctors</p>
        <div className='w-full grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {doctors.slice(0,10).map((item, index)=>(
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
              rounded-xl
              sm:rounded-2xl
              overflow-hidden
              cursor-pointer
              shadow-sm
              hover:shadow-lg
              hover:-translate-y-1
              transition-all
              duration-300
            "
>
  {/* ================= DOCTOR IMAGE ================= */}
  <div
    className="
      relative
      w-full
      h-44
      xs:h-48
      sm:h-56
      md:h-60
      lg:h-64
      bg-gradient-to-br
      from-blue-50
      via-slate-50
      to-blue-100
      overflow-hidden
    "
  >

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

    {/* ================= AVAILABLE BADGE ================= */}
    <div
      className="
        absolute
        top-2
        left-2
        sm:top-4
        sm:left-4
        flex
        items-center
        gap-1.5
        sm:gap-2
        bg-white/95
        backdrop-blur-sm
        px-2
        py-1
        sm:px-3
        sm:py-1.5
        rounded-full
        shadow-sm
      "
    >

      <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">

        <span
          className="
            absolute
            inline-flex
            h-full
            w-full
            rounded-full
            bg-green-400
            opacity-75
            animate-ping
          "
        ></span>

        <span
          className="
            relative
            inline-flex
            h-2
            w-2
            sm:h-2.5
            sm:w-2.5
            rounded-full
            bg-green-500
          "
        ></span>

      </span>

      <span className="text-[10px] sm:text-xs font-semibold text-green-600">
        Available
      </span>

    </div>


    {/* ================= MOBILE/ DESKTOP ARROW ================= */}
    <div
      className="
        absolute
        bottom-2
        right-2
        sm:bottom-4
        sm:right-4
        w-8
        h-8
        sm:w-10
        sm:h-10
        rounded-full
        bg-white/95
        backdrop-blur-sm
        flex
        items-center
        justify-center
        text-blue-600
        shadow-md
        opacity-100
        sm:opacity-0
        sm:translate-y-3
        sm:group-hover:opacity-100
        sm:group-hover:translate-y-0
        transition-all
        duration-300
      "
    >
      <span className="text-sm sm:text-base">
        →
      </span>
    </div>

  </div>


  {/* ================= DOCTOR DETAILS ================= */}
  <div className="p-3 sm:p-4 md:p-5">

    {/* Doctor name */}

    <h3
      className="
        text-sm
        sm:text-base
        md:text-lg
        font-bold
        text-slate-800
        truncate
        group-hover:text-blue-600
        transition-colors
      "
    >
      {item.name}
    </h3>


    {/* Speciality */}

    <p
      className="
        text-xs
        sm:text-sm
        text-slate-500
        mt-1
        truncate
      "
    >
      {item.speciality}
    </p>


    {/* Divider */}

    <div className="border-t border-slate-100 my-3 sm:my-4"></div>


    {/* Bottom section */}

    <div className="flex items-center justify-between gap-2">

      {/* Specialist */}

      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">

        <div
          className="
            w-7
            h-7
            sm:w-8
            sm:h-8
            rounded-lg
            bg-blue-50
            flex
            items-center
            justify-center
            text-blue-600
            flex-shrink-0
          "
        >
          <span className="text-xs sm:text-sm">
            <MdMedicalServices />
          </span>
        </div>

        <span
          className="
            text-[10px]
            sm:text-xs
            text-slate-500
            truncate
          "
        >
          Specialist
        </span>

      </div>


      {/* Book */}

      <span
        className="
          flex-shrink-0
          text-[10px]
          sm:text-xs
          font-bold
          text-blue-600
          group-hover:translate-x-1
          transition-transform
        "
      >
        Book →
      </span>

    </div>

  </div>

</div>
          ))}
        </div>
        <button onClick={()=> {navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-200 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  )
}

export default TopDoctors
