import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Homeheader = () => {
  const navigate = useNavigate();
  return (
   <div className="
 relative
  w-full
  overflow-hidden
  rounded-2xl
  sm:rounded-3xl
  bg-gradient-to-br
  from-black
  via-slate-950
  to-slate-900
  shadow-xl
  mt-3
">

  {/* Decorative circles */}
  <div className="
     absolute
  -top-32
  -right-32
  w-80
  h-80
  rounded-full
  bg-blue-500/10
  blur-3xl
  pointer-events-none
  "></div>

  <div className="
    absolute
  -bottom-32
  -left-32
  w-80
  h-80
  rounded-full
  bg-cyan-400/10
  blur-3xl
  pointer-events-none
  "></div>


  {/* CONTENT */}
  <div className="
    relative
    z-10
    flex
    flex-col
    md:flex-row
    w-full
    min-w-0
  ">


    {/* LEFT SIDE */}
    <div className="
      w-full
      md:w-1/2
      min-w-0
      flex
      flex-col
      items-center
      md:items-start
      justify-center
      gap-5
      sm:gap-6
      px-5
      sm:px-8
      md:px-8
      lg:px-12
      xl:px-16
      py-10
      m-0
      sm:py-14
      md:py-16
      lg:py-20
      text-center
      md:text-left
    ">

      {/* Heading */}
      <p className="
        w-full
        max-w-xl
        text-3xl
        min-[375px]:text-4xl
        sm:text-5xl
        md:text-4xl
        lg:text-5xl
        xl:text-6xl
        text-white
        font-bold
        leading-tight
        tracking-tight
      ">
        Your partner in
        <span className="block text-cyan-100">
          Health and Wellness
        </span>
      </p>


      {/* PROFILE + DESCRIPTION */}
      <div className="
        w-full
        max-w-xl
        flex
        flex-col
        sm:flex-row
        items-center
        md:items-center
        gap-3
        sm:gap-4
      ">

        <img
          className="
            w-24
            sm:w-28
            md:w-24
            lg:w-28
            h-auto
            flex-shrink-0
            object-contain
          "
          src={assets.group_profiles}
          alt=""
        />

        <p className="
         w-full
          max-w-[400px]
          text-slate-300
          text-center
          md:text-left
          text-xs
          text-sm
          text-blue-50
          font-light
          leading-5
        ">
          Healthcare,is the improvement or maintenance of health via the prevention, diagnosis, treatment, amelioration or cure of disease, illness, injury, and other physical and mental impairments in people. 
        </p>

      </div>


      {/* BUTTON */}
      <a
        href="#speciality"
        onClick={() => navigate('/doctors')}
        className="
          group
          inline-flex
          items-center
          justify-center
          gap-3
          bg-white
          text-blue-700
          px-6
          sm:px-8
          py-3
          sm:py-3.5
          rounded-full
          text-xs
          sm:text-sm
          font-semibold
          shadow-md
          hover:bg-blue-50
          hover:shadow-xl
          hover:-translate-y-1
          active:translate-y-0
          transition-all
          duration-300
        "
      >
        BOOK AN APPOINTMENT

        <span className="
          flex
          items-center
          justify-center
          w-6
          h-6
          rounded-full
          bg-blue-50
          group-hover:bg-blue-100
        ">
          <img
            className="
              w-3
              group-hover:translate-x-0.5
              transition-transform
              duration-300
            "
            src={assets.arrow_icon}
            alt=""
          />
        </span>

      </a>

    </div>


    {/* RIGHT SIDE / IMAGE */}
    <div className="
      w-full
      md:w-1/2
      min-w-0
      relative
      flex
      items-end
      justify-center
      md:justify-end
      self-end
      px-3
      sm:px-6
      md:px-0
      pt-2
      md:pt-0
    ">

      <img
        className="
          w-full
          max-w-[360px]
          sm:max-w-[450px]
          md:max-w-full
          lg:max-w-[560px]
          xl:max-w-[620px]
          h-auto
          object-contain
          object-bottom
          md:translate-y-1
          transition-transform
          duration-500
          hover:scale-[1.02]
        "
        src={assets.header_img}
        alt=""
      />

    </div>

  </div>

</div>
  )
}

export default Homeheader
