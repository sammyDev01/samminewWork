import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from './context';
import QueueGenerating from './QueueGenerate'
import { NavLink } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();
    const {token} = useContext(AppContext)
  return (
    <div className="
  relative
  flex
  w-full
  overflow-hidden
  rounded-2xl
  sm:rounded-3xl
  mx-0
  sm:my-16
  md:mx-6
  lg:mx-10
  bg-gradient-to-br
  from-black
  via-slate-950
  to-slate-900
  shadow-xl
">

  {/* BLUE GLOW */}
  <div className="
    absolute
    -top-24
    -right-24
    w-72
    h-72
    rounded-full
    bg-blue-500/10
    blur-3xl
    pointer-events-none
  "></div>

  {/* CYAN GLOW */}
  <div className="
    absolute
    -bottom-32
    left-1/3
    w-80
    h-80
    rounded-full
    bg-cyan-400/10
    blur-3xl
    pointer-events-none
  "></div>

  {/* SUBTLE TRANSPARENT LAYER */}
  <div className="
    absolute
    inset-0
    bg-white/[0.02]
    pointer-events-none
  "></div>


  {/* LEFT SIDE */}
  <div className="
    relative
    z-10
    flex-1
    flex
    flex-col
    justify-center
    items-start
    py-10
    sm:py-12
    md:py-16
    lg:py-20
    px-5
    sm:px-8
    md:px-10
    lg:px-14
    xl:px-16
  ">

    {/* SMALL LABEL */}
    <div className="
      flex
      items-center
      gap-2
      mb-4
      px-3
      py-1.5
      rounded-full
      bg-white/5
      border
      border-white/10
      text-cyan-300
      text-[10px]
      sm:text-xs
      font-medium
      backdrop-blur-sm
    ">

      <span className="
        w-2
        h-2
        rounded-full
        bg-emerald-400
        animate-pulse
      "></span>

      Quality Healthcare

    </div>


    {/* HEADING */}
    <div className="
      text-2xl
      min-[375px]:text-3xl
      sm:text-4xl
      md:text-4xl
      lg:text-5xl
      xl:text-6xl
      font-bold
      text-white
      leading-tight
    ">

      <p>
        Book Appointment
      </p>

      <p className="
        mt-2
        sm:mt-3
        text-cyan-300
      ">
        with 100+ Trusted Doctors
      </p>

    </div>


    {/* DESCRIPTION */}
    <p className="
      mt-5
      max-w-lg
      text-xs
      sm:text-sm
      text-white/60
      leading-6
    ">
      Get access to trusted healthcare professionals and
      manage your appointments easily from anywhere.
    </p>


    {/* BUTTON */}
    <NavLink
      to="/queueGenerate"
      className="
        group
        mt-6
        inline-flex
        items-center
        gap-3
        rounded-full
        bg-white
        px-5
        sm:px-7
        py-3
        text-xs
        sm:text-sm
        font-semibold
        text-slate-900
        shadow-lg
        shadow-black/20
        hover:bg-cyan-300
        hover:scale-105
        hover:shadow-cyan-400/20
        active:scale-100
        transition-all
        duration-300
      "
    >

      {!token? "Create Account":"Generate Queue or Check your Queue"}

      <span className="
        flex
        items-center
        justify-center
        w-6
        h-6
        rounded-full
        bg-slate-100
        group-hover:bg-white
        transition
      ">
        →
      </span>

    </NavLink>

  </div>


  {/* RIGHT SIDE */}
  <div className="
    hidden
    md:flex
    relative
    z-10
    w-1/2
    lg:w-[400px]
    xl:w-[460px]
    items-end
    justify-end
    self-end
  ">

    <img
      className="
        w-full
        max-w-md
        lg:max-w-lg
        h-auto
        object-contain
        object-bottom
        transition-transform
        duration-500
        hover:scale-[1.02]
      "
      src={assets.appointment_img}
      alt="Book appointment"
    />

  </div>

</div>
  )
}

export default Banner
