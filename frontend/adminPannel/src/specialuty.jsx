import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { assets } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'
const Specialuty = () => {
    
  return (
   
       <section
  id="speciality"
  className="
    w-full
    flex
    flex-col
    items-center
    gap-4
    py-12
    sm:py-16
    md:py-20
    px-4
    sm:px-6
    overflow-hidden
  "
>

  {/* HEADING */}
  <div className="text-center max-w-2xl">

    <div className="
      inline-flex
      items-center
      gap-2
      px-3
      py-1.5
      mb-3
      rounded-full
      bg-blue-50
      border
      border-blue-100
      text-blue-600
      text-[10px]
      sm:text-xs
      font-semibold
    ">
      <span className="
        w-1.5
        h-1.5
        rounded-full
        bg-cyan-500
      "></span>

      EXPLORE OUR SERVICES
    </div>

    <h1 className="
      text-2xl
      sm:text-3xl
      md:text-4xl
      font-bold
      text-slate-800
      tracking-tight
    ">
      Find Your
      <span className="text-blue-600"> Speciality</span>
    </h1>

    <p className="
      w-full
      mt-3
      text-xs
      sm:text-sm
      text-slate-500
      leading-6
    ">
      Simply browse through our extensive list of trusted doctors
      and schedule your appointment hassle-free.
    </p>

  </div>


  {/* SPECIALITIES */}
  <div className="
    w-full
    mt-6
    sm:mt-8
    flex
    justify-start
    sm:justify-center
    gap-4
    sm:gap-5
    md:gap-6
    overflow-x-auto
    overflow-y-hidden
    pb-5
    px-1
    scrollbar-thin
    scrollbar-thumb-blue-200
    scrollbar-track-transparent
  ">

    {
      specialityData.map((each, index) => (

        <Link
          to={`/doctors/${each.speciality}`}
          onClick={() => scrollTo(0, 0)}
          key={index}
          className="
            group
            flex
            flex-col
            items-center
            justify-center
            flex-shrink-0
            w-[80px]
            sm:w-[100px]
            md:w-[110px]
            cursor-pointer
          "
        >

          {/* IMAGE CONTAINER */}
          <div className="
            w-16
            h-16
            sm:w-20
            sm:h-20
            md:w-24
            md:h-24
            flex
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-blue-50
            to-cyan-50
            border
            border-blue-100
            shadow-sm
            group-hover:shadow-lg
            group-hover:shadow-blue-100
            group-hover:border-blue-200
            group-hover:-translate-y-2
            transition-all
            duration-300
          ">

            <img
              src={each.image}
              className="
                w-12
                sm:w-16
                md:w-20
                h-auto
                object-contain
                group-hover:scale-110
                transition-transform
                duration-300
              "
              alt={each.speciality}
            />

          </div>


          {/* SPECIALITY NAME */}
          <p className="
            mt-3
            text-[11px]
            sm:text-xs
            md:text-sm
            font-medium
            text-slate-600
            text-center
            group-hover:text-blue-600
            transition-colors
            duration-300
            leading-5
          ">
            {each.speciality}
          </p>

        </Link>

      ))
    }

  </div>

</section>
  
  )
}

export default Specialuty
