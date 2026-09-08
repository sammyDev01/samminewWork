import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from './context'

const Homeheader = () => {
  const {token} = useContext(AppContext)
  const navigate = useNavigate();
  return (
   <div
  className="
    relative
    w-full
    overflow-hidden
    bg-white
    shadow-2xl
    min-h-[620px]
    lg:min-h-[650px]
  "
>
  {/* =========================================================
      BACKGROUND IMAGE
  ========================================================= */}
  <img
    src={assets.docwdu1}
    alt=""
    className="
      absolute
      inset-0
      h-full
      w-full
      object-cover
      scale-105
      animate-[slowZoom_15s_ease-in-out_infinite_alternate]
    "
  />

  {/* =========================================================
      SOFT DARK OVERLAY
      Keeps the background visible instead of making it deep blue
  ========================================================= */}
  <div
    className="
      absolute
      inset-0
      bg-black/1
    "
  />

  {/* =========================================================
      GRADIENT OVERLAY
  ========================================================= */}
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-r
      from-black/80
      via-black/50
      to-black/20
    "
  />

  {/* =========================================================
      ANIMATED LIGHT ORBS
  ========================================================= */}

  {/* Top right */}
  <div
    className="
      pointer-events-none
      absolute
      -right-20
      -top-20
      h-72
      w-72
      rounded-full
      bg-cyan-400/20
      blur-3xl
      animate-pulse
    "
  />

  {/* Bottom left */}
  <div
    className="
      pointer-events-none
      absolute
      -bottom-32
      -left-20
      h-80
      w-80
      rounded-full
      bg-blue-400/15
      blur-3xl
      animate-[float_8s_ease-in-out_infinite]
    "
  />

  {/* Center glow */}
  <div
    className="
      pointer-events-none
      absolute
      left-1/2
      top-1/2
      h-96
      w-96
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-cyan-300/10
      blur-3xl
      animate-pulse
    "
  />

  {/* =========================================================
      DECORATIVE MOVING CIRCLE
  ========================================================= */}
  <div
    className="
      pointer-events-none
      absolute
      right-[20%]
      top-[15%]
      h-20
      w-20
      rounded-full
      border
      border-cyan-200/20
      animate-[float_6s_ease-in-out_infinite]
    "
  />

  <div
    className="
      pointer-events-none
      absolute
      right-[25%]
      top-[20%]
      h-3
      w-3
      rounded-full
      bg-cyan-300
      shadow-[0_0_25px_rgba(103,232,249,0.9)]
      animate-ping
    "
  />

  {/* =========================================================
      MAIN CONTENT
  ========================================================= */}
  <div
    className="
      relative
      z-10
      grid
      min-h-[620px]
      w-full
      grid-cols-1
      lg:grid-cols-2
    "
  >

    {/* =======================================================
        LEFT CONTENT
    ======================================================= */}
    <div
      className="
        flex
        flex-col
        justify-center
        px-5
        py-14
        text-center
        sm:px-8
        md:px-12
        lg:px-14
        lg:py-20
        lg:text-left
        xl:px-20
      "
    >

      {/* Badge */}
      <div className="mb-6 flex justify-center lg:justify-start">
        <span
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/20
            bg-white/10
            px-4
            py-2
            text-xs
            font-medium
            text-cyan-100
            shadow-lg
            backdrop-blur-md
          "
        >
          <span
            className="
              h-2
              w-2
              animate-pulse
              rounded-full
              bg-cyan-300
              shadow-[0_0_12px_rgba(103,232,249,0.9)]
            "
          />

          Your trusted healthcare partner
        </span>
      </div>

      {/* Heading */}
      <h1
        className="
          max-w-2xl
          text-4xl
          font-bold
          leading-[1.05]
          tracking-tight
          text-white
          sm:text-5xl
          lg:text-5xl
          xl:text-6xl
        "
      >
        Your partner in

        <span
          className="
            mt-2
            block
            bg-gradient-to-r
            from-cyan-200
            via-white
            to-cyan-300
            bg-clip-text
            text-transparent
          "
        >
          Health and Wellness
        </span>
      </h1>

      {/* Description */}
      <p
        className="
          mt-6
          max-w-xl
          text-sm
          leading-7
          text-white/75
          sm:text-base
        "
      >
        Access convenient healthcare services, connect with qualified
        doctors, book appointments, and manage your healthcare journey
        with ease.
      </p>

      {/* =====================================================
          PATIENT INFORMATION
      ===================================================== */}
      <div
        className="
          mt-8
          flex
          flex-col
          items-center
          gap-4
          sm:flex-row
          sm:justify-center
          lg:justify-start
        "
      >

        {/* Patient image */}
        <div
          className="
            relative
            h-20
            w-20
            shrink-0
            overflow-hidden
            rounded-full
            border-4
            border-white/80
            bg-white/10
            shadow-[0_0_30px_rgba(103,232,249,0.25)]
            backdrop-blur-md
            sm:h-24
            sm:w-24
          "
        >
          <img
            className="
              h-full
              w-full
              object-cover
            "
            src={assets.twoDoc}
            alt="Patient"
          />

          {/* Online indicator */}
          <span
            className="
              absolute
              bottom-1
              right-1
              h-4
              w-4
              rounded-full
              border-2
              border-white
              bg-green-400
            "
          />
        </div>

        {/* Text */}
        <div className="max-w-md text-center sm:text-left">
          <p
            className="
              text-xs
              leading-6
              text-white/70
              sm:text-sm
            "
          >
            Get access to convenient healthcare services, connect with
            doctors, book appointments, and manage your healthcare
            journey with ease.
          </p>
        </div>

      </div>

      {/* =====================================================
          BUTTON
      ===================================================== */}
      <div
        className="
          mt-9
          flex
          justify-center
          lg:justify-start
        "
      >
        {!token ? (
          <button
            onClick={() => navigate("/login")}
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-white
              px-6
              py-3
              text-sm
              font-semibold
              text-slate-900
              shadow-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-cyan-50
              hover:shadow-[0_15px_40px_rgba(103,232,249,0.25)]
              active:translate-y-0
              sm:px-8
              sm:py-3.5
            "
          >
            Login

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-slate-100
                transition-all
                duration-300
                group-hover:bg-cyan-100
              "
            >
              <img
                className="
                  w-3
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                src={assets.arrow_icon}
                alt=""
              />
            </span>
          </button>
        ) : (
          <button
            onClick={() => navigate("/doctors")}
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-white
              px-6
              py-3
              text-sm
              font-semibold
              text-slate-900
              shadow-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-cyan-50
              hover:shadow-[0_15px_40px_rgba(103,232,249,0.25)]
              active:translate-y-0
              sm:px-8
              sm:py-3.5
            "
          >
            BOOK AN APPOINTMENT

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-slate-100
                transition-all
                duration-300
                group-hover:bg-cyan-100
              "
            >
              <img
                className="
                  w-3
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                src={assets.arrow_icon}
                alt=""
              />
            </span>
          </button>
        )}
      </div>
    </div>

    {/* =======================================================
        RIGHT DOCTOR IMAGE
    ======================================================= */}
    <div
      className="
        relative
        flex
        min-h-[320px]
        items-end
        justify-center
        overflow-hidden
        lg:min-h-full
        lg:justify-end
      "
    >

      {/* Doctor glow */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-[10%]
          h-72
          w-72
          rounded-full
          bg-cyan-300/15
          blur-3xl
          animate-pulse
        "
      />

      {/* Decorative ring */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-20
          right-20
          h-72
          w-72
          rounded-full
          border
          border-white/10
          animate-[spin_25s_linear_infinite]
        "
      />

      {/* Doctor */}
      <img
        className="
          relative
          z-10
          h-auto
          w-[90%]
          max-w-[380px]
          object-contain
          object-bottom
          drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]
          transition-transform
          duration-700
          hover:scale-[1.03]
          sm:w-[75%]
          sm:max-w-[450px]
          md:max-w-[500px]
          lg:w-[100%]
          lg:max-w-[560px]
          xl:max-w-[650px]
        "
        src={assets.docwdu}
        alt="Healthcare professional"
      />

    </div>

  </div>
</div>
  )
}

export default Homeheader
