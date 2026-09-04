import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/adminContext'
import { useEffect } from 'react'

const DoctorList = () => {
  const {doctors, aToken, getAllDoctors, changeAvailability} = useContext(AdminContext)

  useEffect(()=>{
    if(aToken){
      getAllDoctors()
    }
  },[aToken])
  return (
    <div className="m-4 sm:m-6 lg:m-8 max-h-[90vh] overflow-y-auto pr-2">

  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
        All Doctors
      </h1>

      <p className="text-sm text-slate-500 mt-1">
        Manage doctors and their availability
      </p>
    </div>
  </div>

  {/* Doctors Grid */}
  <div
    className="
      grid
      grid-cols-1
      xs:grid-cols-2
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      gap-4
      sm:gap-5
      lg:gap-6
    "
  >
    {doctors.map((item, index) => (
      <div
        key={index}
        className="
          group
          relative
          bg-white
          border
          border-slate-200
          rounded-2xl
          overflow-hidden
          cursor-pointer

          shadow-sm
          hover:shadow-xl

          hover:-translate-y-1
          transition-all
          duration-300
          ease-out
        "
      >

        {/* Doctor Image */}
        <div className="relative overflow-hidden bg-indigo-50">

          <img
            className="
              w-full
              h-52
              sm:h-56
              object-cover

              group-hover:scale-105

              transition-transform
              duration-500
              ease-out
            "
            src={item.image}
            alt={item.name}
          />

          {/* Image overlay */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-slate-900/30
              via-transparent
              to-transparent

              opacity-0
              group-hover:opacity-100

              transition-opacity
              duration-300
            "
          />

          {/* Availability badge */}
          <div
            className="
              absolute
              top-3
              right-3
              flex
              items-center
              gap-1.5

              px-2.5
              py-1

              rounded-full
              bg-white/90
              backdrop-blur-sm

              text-xs
              font-medium
              shadow-sm
            "
          >
            <span
              className={`
                w-2
                h-2
                rounded-full
                ${
                  item.available
                    ? "bg-emerald-500"
                    : "bg-red-400"
                }
              `}
            />

            <span
              className={
                item.available
                  ? "text-emerald-600"
                  : "text-red-500"
              }
            >
              {item.available ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        {/* Doctor Information */}
        <div className="p-4">

          <h2
            className="
              text-base
              sm:text-lg
              font-semibold
              text-slate-800
              truncate
            "
          >
            {item.name}
          </h2>

          <p
            className="
              text-sm
              text-slate-500
              mt-1
              truncate
            "
          >
            {item.speciality}
          </p>

          {/* Divider */}
          <div className="h-px bg-slate-100 my-4" />

          {/* Availability Toggle */}
          <label
            className="
              flex
              items-center
              justify-between
              gap-3
              cursor-pointer
              select-none
            "
          >
            <div>
              <p className="text-sm font-medium text-slate-700">
                Availability
              </p>

              <p className="text-xs text-slate-400 mt-0.5">
                {item.available
                  ? "Doctor is available"
                  : "Doctor is unavailable"}
              </p>
            </div>

            {/* Custom checkbox */}
            <div className="relative">

              <input
                type="checkbox"
                onChange={() => changeAvailability(item._id)}
                checked={item.available}
                className="
                  peer
                  sr-only
                "
              />

              <div
                className="
                  w-11
                  h-6
                  bg-slate-200
                  rounded-full

                  peer-checked:bg-emerald-500

                  transition-colors
                  duration-300
                "
              />

              <div
                className="
                  absolute
                  top-1
                  left-1

                  w-4
                  h-4
                  bg-white
                  rounded-full
                  shadow-sm

                  peer-checked:translate-x-5

                  transition-transform
                  duration-300
                "
              />
            </div>

          </label>

        </div>
      </div>
    ))}
  </div>
</div>
  )
}

export default DoctorList
