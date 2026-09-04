
import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/adminContext'
import { useEffect } from 'react'


const AllUser = () => {
  const { users, aToken, getAllUsers } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllUsers();
    }
  }, [aToken]);

  return (
    <div className="m-4 sm:m-6 lg:m-8 max-h-[90vh] overflow-y-auto pr-2">

      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            All Users
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            View and manage registered patients
          </p>
        </div>

        {/* User count */}
        <div className="hidden sm:flex items-center gap-3 bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
            <span className="text-indigo-600 font-bold">
              {users?.length || 0}
            </span>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Total
            </p>

            <p className="text-sm font-semibold text-slate-700">
              Users
            </p>
          </div>
        </div>
      </div>


      {/* Users */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-5
        "
      >

        {users?.map((item, index) => (

          <div
            key={item._id || index}
            className="
              group
              bg-white
              border border-slate-200
              rounded-2xl
              overflow-hidden
              shadow-sm
              hover:shadow-lg
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            {/* Image */}
            <div className="relative h-48 bg-indigo-50 overflow-hidden">

              <img
                src={item.image}
                alt={item.name}
                className="
                  w-full
                  h-full
                  object-cover
                  group-hover:scale-105
                  transition-transform
                  duration-500
                "
              />

              {/* Image overlay */}
              <div className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/40
                to-transparent
              " />

              {/* Name */}
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-lg font-bold text-white truncate">
                  {item.name}
                </h2>

                <p className="text-xs text-white/80 truncate">
                  {item.email}
                </p>
              </div>

            </div>


            {/* User Information */}
            <div className="p-4">

              {/* Matric Number */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-400">
                  Matric No.
                </span>

                <span className="text-sm font-medium text-slate-700">
                  {item.matNum || "N/A"}
                </span>
              </div>


              {/* Department */}
              <div className="flex justify-between items-center mb-3 gap-3">
                <span className="text-xs text-slate-400">
                  Department
                </span>

                <span className="text-sm font-medium text-slate-700 truncate">
                  {item.department || "N/A"}
                </span>
              </div>


              {/* Level */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-400">
                  Level
                </span>

                <span className="text-sm font-medium text-slate-700">
                  {item.level ? `${item.level} Level` : "N/A"}
                </span>
              </div>


              {/* Gender */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-400">
                  Gender
                </span>

                <span className="text-sm font-medium text-slate-700">
                  {item.gender || "Not Selected"}
                </span>
              </div>


              {/* Phone */}
              <div className="flex items-center gap-3 mt-4 p-3 bg-slate-50 rounded-xl">

                <div className="
                  w-9 h-9
                  rounded-lg
                  bg-indigo-100
                  flex items-center justify-center
                  shrink-0
                ">
                  <span className="text-indigo-600">
                    ☎
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400">
                    Phone
                  </p>

                  <p className="text-sm font-medium text-slate-700 truncate">
                    {item.phone || "Not provided"}
                  </p>
                </div>

              </div>


              {/* View Button */}
              <button
                className="
                  w-full
                  mt-4
                  py-2.5
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  text-sm
                  font-medium
                  transition-colors
                "
              >
                View User
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* Empty State */}
      {users?.length === 0 && (
        <div className="text-center py-20">

          <div className="
            mx-auto
            w-16 h-16
            rounded-full
            bg-slate-100
            flex items-center justify-center
            text-2xl
          ">
            👤
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-700">
            No users found
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            No patients have registered yet.
          </p>

        </div>
      )}

    </div>
  );
};





export default AllUser
