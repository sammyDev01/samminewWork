import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './context';
import { MdMedicalServices } from "react-icons/md";


const TopDoctors = () => {

  const { doctors} = useContext(AppContext)
  const navigate = useNavigate();
  return (
   <div
  className="
    relative
    flex flex-col
    items-center
    text-center
    gap-4
    px-3
    sm:px-5
    md:px-10
    lg:px-16
    py-14
    sm:py-16
    md:py-20

    overflow-hidden

    bg-gradient-to-br
    from-white
    via-blue-50
    to-cyan-50

    border-y
    border-blue-100

    shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]
  "
>

  {/* ================= DECORATIVE BACKGROUND ================= */}

  <div
    className="
      absolute
      -top-24
      -left-24
      w-72
      h-72
      rounded-full
      bg-blue-200/30
      blur-3xl
      pointer-events-none
    "
  />

  <div
    className="
      absolute
      -bottom-32
      -right-20
      w-80
      h-80
      rounded-full
      bg-cyan-200/30
      blur-3xl
      pointer-events-none
    "
  />

  <div
    className="
      absolute
      top-1/3
      right-10
      w-24
      h-24
      rounded-full
      bg-blue-100/40
      blur-2xl
      pointer-events-none
    "
  />


  {/* ================= SECTION HEADER ================= */}

  <div className="
    relative
    z-10
    flex
    flex-col
    items-center
    gap-3
    max-w-2xl
  ">

    {/* SMALL BADGE */}

    <div
      className="
        inline-flex
        items-center
        gap-2

        px-4
        py-2

        rounded-full

        bg-white/80
        backdrop-blur-md

        border
        border-blue-100

        shadow-sm
      "
    >

      <span
        className="
          w-2
          h-2
          rounded-full
          bg-blue-600
          shadow-[0_0_0_5px_rgba(37,99,235,0.10)]
        "
      />

      <span
        className="
          text-[11px]
          sm:text-xs
          font-bold
          uppercase
          tracking-wider
          text-blue-700
        "
      >
        Trusted Healthcare Professionals
      </span>

    </div>


    {/* TITLE */}

    <h1
      className="
        text-3xl
        sm:text-4xl
        md:text-5xl

        font-extrabold

        tracking-tight

        text-slate-900
      "
    >
      Top Doctors to{" "}

      <span
        className="
          bg-gradient-to-r
          from-blue-600
          via-blue-700
          to-cyan-500

          bg-clip-text
          text-transparent
        "
      >
        Book
      </span>
    </h1>


    {/* DESCRIPTION */}

    <p
      className="
        max-w-xl
        text-sm
        sm:text-base

        leading-7

        text-slate-500
      "
    >
      Simply browse through our extensive list of trusted doctors
      and find the right healthcare professional for your needs.
    </p>

  </div>


  {/* ================= DOCTORS GRID ================= */}

  <div
    className="
      relative
      z-10

      w-full

      grid
      grid-cols-2
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5

      gap-3
      sm:gap-4
      md:gap-5

      pt-8
      sm:pt-10
    "
  >

    {doctors.slice(0,10).map((item, index) => (

      <div
        key={index}

        onClick={() =>
          navigate(`/appointment/${item._id}`)
        }

        className="
          group
          w-full
          min-w-0

          bg-white

          border
          border-slate-200/80

          rounded-2xl
          sm:rounded-3xl

          overflow-hidden

          cursor-pointer

          shadow-[0_8px_30px_rgba(15,23,42,0.06)]

          hover:shadow-[0_20px_45px_rgba(37,99,235,0.16)]

          hover:-translate-y-2

          hover:border-blue-200

          transition-all
          duration-500
        "
      >

        {/* ================= DOCTOR IMAGE ================= */}

        <div
          className="
            relative

            w-full

            h-40
            sm:h-48
            md:h-56
            lg:h-60

            overflow-hidden

            bg-gradient-to-br
            from-blue-50
            via-white
            to-cyan-50
          "
        >

          {/* IMAGE */}

          <img
            src={item.image}
            alt={item.name}

            className="
              w-full
              h-full

              object-contain

              transition-transform
              duration-700

              group-hover:scale-110
            "
          />


          {/* IMAGE BOTTOM FADE */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0

              h-20

              bg-gradient-to-t
              from-slate-900/10
              to-transparent

              pointer-events-none
            "
          />


          {/* ================= AVAILABLE BADGE ================= */}

          <div
            className="
              absolute
              top-3
              left-3
              sm:top-4
              sm:left-4

              flex
              items-center
              gap-1.5

              bg-white/95
              backdrop-blur-md

              px-2.5
              py-1.5
              sm:px-3
              sm:py-2

              rounded-full

              border
              border-white

              shadow-lg
            "
          >

            <span className="relative flex h-2 w-2">

              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full

                  rounded-full

                  bg-emerald-400

                  opacity-60

                  animate-ping
                "
              />

              <span
                className="
                  relative
                  inline-flex

                  h-2
                  w-2

                  rounded-full

                  bg-emerald-500
                "
              />

            </span>


            <span
              className="
                text-[9px]
                sm:text-[10px]

                font-bold

                text-emerald-600
              "
            >
              Available
            </span>

          </div>


          {/* ================= ARROW ================= */}

          <div
            className="
              absolute

              bottom-3
              right-3
              sm:bottom-4
              sm:right-4

              w-9
              h-9
              sm:w-10
              sm:h-10

              rounded-full

              bg-white/95
              backdrop-blur-md

              flex
              items-center
              justify-center

              text-blue-600

              shadow-lg

              opacity-100
              sm:opacity-0

              translate-y-0
              sm:translate-y-3

              sm:group-hover:opacity-100
              sm:group-hover:translate-y-0

              transition-all
              duration-300
            "
          >
            <span className="text-lg font-semibold">
              →
            </span>
          </div>

        </div>


        {/* ================= DOCTOR DETAILS ================= */}

        <div
          className="
            p-3
            sm:p-4
            md:p-5
          "
        >

          {/* NAME */}

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
              duration-300
            "
          >
            {item.name}
          </h3>


          {/* SPECIALITY */}

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


          {/* DIVIDER */}

          <div
            className="
              border-t
              border-slate-100

              my-3
              sm:my-4
            "
          />


          {/* BOTTOM */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-2
            "
          >

            {/* SPECIALIST */}

            <div
              className="
                flex
                items-center
                gap-1.5
                sm:gap-2

                min-w-0
              "
            >

              <div
                className="
                  w-7
                  h-7
                  sm:w-8
                  sm:h-8

                  rounded-xl

                  bg-blue-50

                  flex
                  items-center
                  justify-center

                  text-blue-600

                  group-hover:bg-blue-600
                  group-hover:text-white

                  transition-all
                  duration-300

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

                  font-medium

                  text-slate-500

                  truncate
                "
              >
                Specialist
              </span>

            </div>


            {/* BOOK */}

            <span
              className="
                flex-shrink-0

                text-[10px]
                sm:text-xs

                font-bold

                text-blue-600

                group-hover:text-blue-700

                group-hover:translate-x-1

                transition-all
                duration-300
              "
            >
              Book →
            </span>

          </div>

        </div>

      </div>

    ))}

  </div>


  {/* ================= MORE BUTTON ================= */}

  <button
    onClick={() => {
      navigate('/doctors');
      scrollTo(0,0);
    }}

    className="
      relative
      z-10

      mt-10
      sm:mt-12

      px-10
      sm:px-14

      py-3.5

      rounded-full

      bg-gradient-to-r
      from-blue-600
      to-cyan-500

      text-white

      text-sm
      sm:text-base

      font-bold

      shadow-lg
      shadow-blue-200

      hover:from-blue-700
      hover:to-cyan-600

      hover:-translate-y-1

      hover:shadow-xl
      hover:shadow-blue-300

      active:translate-y-0

      transition-all
      duration-300
    "
  >
    View All Doctors
    <span className="ml-2">→</span>
  </button>

</div>
  )
}

export default TopDoctors
