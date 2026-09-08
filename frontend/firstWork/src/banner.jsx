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
<div
  className="
    relative
    w-full
    min-h-[430px]
    sm:min-h-[480px]
    lg:min-h-[520px]
    overflow-hidden
    bg-slate-950
    bg-cover
    bg-center
    bg-no-repeat
    shadow-[0_20px_60px_rgba(15,23,42,0.25)]
  "
  style={{
    backgroundImage: `url(${assets.patient})`,
  }}
>
  {/* DARK / BLUE IMAGE OVERLAY */}
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-r
      from-slate-950
      via-slate-950/90
      via-60%
      to-blue-950/55
      pointer-events-none
    "
  ></div>

  {/* BLUE GLOW */}
  <div
    className="
      absolute
      -top-32
      -right-20
      w-80
      h-80
      rounded-full
      bg-blue-500/20
      blur-[100px]
      pointer-events-none
    "
  ></div>

  {/* CYAN GLOW */}
  <div
    className="
      absolute
      -bottom-40
      left-1/3
      w-96
      h-96
      rounded-full
      bg-cyan-400/15
      blur-[120px]
      pointer-events-none
    "
  ></div>

  {/* BLUE LIGHT SPOT */}
  <div
    className="
      absolute
      top-1/2
      right-[15%]
      -translate-y-1/2
      w-64
      h-64
      rounded-full
      bg-blue-400/10
      blur-[90px]
      pointer-events-none
    "
  ></div>

  {/* SUBTLE GRID */}
  <div
    className="
      absolute
      inset-0
      opacity-[0.04]
      pointer-events-none
      bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
      bg-[size:40px_40px]
    "
  ></div>

  {/* CONTENT */}
  <div
    className="
      relative
      z-10
      flex
      items-center
      w-full
      min-h-[430px]
      sm:min-h-[480px]
      lg:min-h-[520px]
      px-5
      sm:px-8
      md:px-12
      lg:px-16
      xl:px-24
      py-14
      sm:py-16
      lg:py-20
    "
  >

    {/* LEFT CONTENT */}
    <div
      className="
        w-full
        md:w-[65%]
        lg:w-[58%]
        flex
        flex-col
        items-start
      "
    >

      {/* LABEL */}
      <div
        className="
          inline-flex
          items-center
          gap-2
          mb-5
          px-3
          sm:px-4
          py-2
          rounded-full
          bg-white/10
          border
          border-white/15
          backdrop-blur-md
          shadow-lg
        "
      >
        <span
          className="
            relative
            flex
            w-2
            h-2
          "
        >
          <span
            className="
              absolute
              inline-flex
              w-full
              h-full
              rounded-full
              bg-emerald-400
              opacity-75
              animate-ping
            "
          ></span>

          <span
            className="
              relative
              inline-flex
              w-2
              h-2
              rounded-full
              bg-emerald-400
            "
          ></span>
        </span>

        <span
          className="
            text-[10px]
            sm:text-xs
            font-semibold
            tracking-wide
            text-cyan-200
          "
        >
          QUALITY HEALTHCARE
        </span>
      </div>


      {/* HEADING */}
      <h1
        className="
          max-w-3xl
          text-3xl
          min-[375px]:text-4xl
          sm:text-5xl
          md:text-5xl
          lg:text-6xl
          xl:text-7xl
          font-extrabold
          tracking-tight
          leading-[1.05]
          text-white
        "
      >
        Book Your

        <span
          className="
            block
            mt-2
            bg-gradient-to-r
            from-cyan-300
            via-blue-300
            to-cyan-200
            bg-clip-text
            text-transparent
          "
        >
          Appointment
        </span>

        <span
          className="
            block
            mt-2
            text-white
          "
        >
          With Trusted Doctors
        </span>
      </h1>


      {/* DESCRIPTION */}
      <p
        className="
          mt-5
          sm:mt-6
          max-w-xl
          text-xs
          sm:text-sm
          md:text-base
          leading-6
          sm:leading-7
          text-slate-300
        "
      >
        Get access to trusted healthcare professionals and
        manage your appointments easily from anywhere.
        Your health deserves convenient and reliable care.
      </p>


      {/* BUTTON */}
      {token ? (
        <NavLink
          to="/queueGenerate"
          className="
            group
            mt-7
            sm:mt-8
            inline-flex
            items-center
            gap-3
            rounded-full
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            px-5
            sm:px-7
            py-3
            sm:py-3.5
            text-xs
            sm:text-sm
            font-bold
            text-white
            shadow-[0_10px_30px_rgba(6,182,212,0.25)]
            border
            border-white/10
            hover:from-blue-500
            hover:to-cyan-400
            hover:-translate-y-1
            hover:shadow-[0_15px_35px_rgba(6,182,212,0.35)]
            active:translate-y-0
            transition-all
            duration-300
          "
        >
          Generate Queue or Check your Queue

          <span
            className="
              flex
              items-center
              justify-center
              w-7
              h-7
              rounded-full
              bg-white/15
              group-hover:bg-white
              group-hover:text-blue-600
              transition-all
              duration-300
            "
          >
            →
          </span>
        </NavLink>
      ) : (
        <NavLink
          to="/login"
          className="
            group
            mt-7
            sm:mt-8
            inline-flex
            items-center
            gap-3
            rounded-full
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            px-5
            sm:px-7
            py-3
            sm:py-3.5
            text-xs
            sm:text-sm
            font-bold
            text-white
            shadow-[0_10px_30px_rgba(6,182,212,0.25)]
            border
            border-white/10
            hover:from-blue-500
            hover:to-cyan-400
            hover:-translate-y-1
            hover:shadow-[0_15px_35px_rgba(6,182,212,0.35)]
            active:translate-y-0
            transition-all
            duration-300
          "
        >
          Click here to login

          <span
            className="
              flex
              items-center
              justify-center
              w-7
              h-7
              rounded-full
              bg-white/15
              group-hover:bg-white
              group-hover:text-blue-600
              transition-all
              duration-300
            "
          >
            →
          </span>
        </NavLink>
      )}

    </div>


    {/* DECORATIVE RIGHT SIDE */}
    <div
      className="
        hidden
        md:block
        absolute
        right-6
        lg:right-12
        xl:right-20
        bottom-0
        w-52
        lg:w-64
        xl:w-80
        h-72
        lg:h-80
        rounded-t-full
        bg-gradient-to-t
        from-blue-500/10
        to-transparent
        blur-sm
        pointer-events-none
      "
    ></div>


    {/* FLOATING MEDICAL BADGE */}
    <div
      className="
        hidden
        lg:flex
        absolute
        right-8
        xl:right-20
        top-10
        items-center
        gap-3
        px-4
        py-3
        rounded-2xl
        bg-white/10
        border
        border-white/15
        backdrop-blur-xl
        shadow-2xl
        animate-[float_4s_ease-in-out_infinite]
      "
    >
      <div
        className="
          flex
          items-center
          justify-center
          w-10
          h-10
          rounded-xl
          bg-blue-500/20
          text-cyan-300
          text-lg
        "
      >
        +
      </div>

      <div>
        <p className="text-xs font-bold text-white">
          Trusted Healthcare
        </p>

        <p className="text-[10px] text-slate-300 mt-0.5">
          Professional medical care
        </p>
      </div>
    </div>

  </div>
</div>
  )
}

export default Banner
