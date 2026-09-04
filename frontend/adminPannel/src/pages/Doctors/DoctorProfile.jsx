import React, { useState } from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/doctorContext'
import { AppContext } from '../../context/appContext'
import { useEffect } from 'react'
import {FaUserDoctor} from 'react-icons/fa6'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

  const {dToken, getDocProfile, setProfileData, profileData} = useContext(DoctorContext)
  const {backendUrl} = useContext(DoctorContext)
  const [isEdit, setIsEdit] = useState(false)
  // const [available, setAvailable] = useState(profileData.available);


  const upDateProfile = async ()=>{
    try {

      const updateData = {
        address: profileData.address,
        available: profileData.available,
        name: profileData.name
      }
      const {data} = await axios.put(backendUrl + '/api/doctor/updateForDoctor', updateData,{ headers: { Authorization: `Bearer ${dToken}`}})
      if(data.success){
          toast.success(data.message)
          setIsEdit(false)
          getDocProfile()
          
      } else{
        toast.error(data.message)
      }
    } catch (error) {
       console.log(error);
      toast.error( error.message );
    }
  }
  useEffect(()=>{
    if(dToken){
      getDocProfile()
    }
  }, [dToken])
  return profileData && (
   <div>
  <div className="
    w-full
    max-w-5xl
    mx-auto
    px-3
    sm:px-5
    lg:px-8
    py-5
    sm:py-8
  ">

    <div className="
      flex
      flex-col
      lg:flex-row
      gap-0
      bg-white
      border
      border-slate-200
      rounded-3xl
      overflow-hidden
      shadow-[0_10px_40px_rgba(15,23,42,0.08)]
      hover:shadow-[0_15px_50px_rgba(15,23,42,0.12)]
      transition-all
      duration-300
    ">

      <div className="
        w-full
        lg:w-80
        flex-shrink-0
        bg-gradient-to-br
        from-blue-50
        via-cyan-50
        to-slate-100
        flex
        items-center
        justify-center
        p-6
        sm:p-8
        lg:p-10
        relative
      ">

        <div className="
          absolute
          top-5
          left-5
          w-16
          h-16
          bg-blue-100/50
          rounded-full
          blur-2xl
        "></div>

        <img
          className="
            relative
            w-44
            h-44
            sm:w-56
            sm:h-56
            lg:w-64
            lg:h-64
            object-cover
            rounded-3xl
            border-4
            border-white
            shadow-2xl
            ring-1
            ring-slate-200
            hover:scale-[1.02]
            transition-transform
            duration-300
          "
          src={profileData.image}
          alt=""
        />

      </div>


      <div className="
        flex-1
        p-5
        sm:p-7
        lg:p-9
        min-w-0
      ">

        {/* doc info */}

        <p className="
          text-2xl
          sm:text-3xl
          font-bold
          text-slate-800
          tracking-tight
          leading-tight
        ">
          {isEdit? <input type='text' onChange={(e)=>setProfileData(prev =>({...prev, name: e.target.value}))} value={profileData.name} className="
            w-full
            bg-slate-50
            border
            border-blue-200
            rounded-xl
            px-3
            py-2
            text-2xl
            sm:text-3xl
            font-bold
            text-slate-800
            outline-none
            focus:ring-4
            focus:ring-blue-100
            focus:border-blue-500
            transition
          "/>:profileData.name}
        </p>


        <div className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          gap-2
          sm:gap-3
          mt-3
        ">

          <p className="
            flex
            flex-wrap
            items-center
            gap-1
            text-sm
            sm:text-base
            text-slate-500
            break-words
          ">
            {isEdit? <input type='text' onChange={(e)=>setProfileData(prev =>({...prev, degree: e.target.value}))} value={profileData.degree} className="
              bg-slate-50
              border
              border-slate-200
              rounded-lg
              px-2.5
              py-1.5
              text-sm
              text-slate-700
              outline-none
              focus:ring-2
              focus:ring-blue-100
              focus:border-blue-400
            "/>:profileData.degree}

            <span className="text-slate-300">-</span>

            {isEdit? <input type='text' onChange={(e)=>setProfileData(prev =>({...prev, speciality: e.target.value}))} value={profileData.speciality} className="
              bg-slate-50
              border
              border-slate-200
              rounded-lg
              px-2.5
              py-1.5
              text-sm
              text-slate-700
              outline-none
              focus:ring-2
              focus:ring-blue-100
              focus:border-blue-400
            "/>:profileData.speciality}
          </p>

          <button className="
            w-fit
            px-3.5
            py-1.5
            rounded-full
            bg-blue-50
            border
            border-blue-100
            text-xs
            sm:text-sm
            font-semibold
            text-blue-600
            shadow-sm
          ">
            { isEdit? <input type='text' onChange={(e)=>setProfileData(prev =>({...prev, experience: e.target.value}))} value={profileData.experience} className="
              w-24
              bg-transparent
              text-center
              text-blue-600
              outline-none
              font-semibold
            "/>:profileData.experience}
          </button>

        </div>


        {/* doc about */}

        <div className="
          mt-6
          p-4
          sm:p-5
          bg-slate-50
          border
          border-slate-100
          rounded-2xl
          hover:border-blue-100
          transition
        ">

          <p className="
            text-sm
            font-bold
            text-slate-800
            mb-2
          ">
            About:
          </p>

          <p className="
            text-sm
            sm:text-base
            leading-7
            text-slate-500
          ">
            {isEdit ? <input type='text' onChange={(e)=>setProfileData(prev =>({...prev, about: e.target.value}))} value={profileData.about} className="
              w-full
              bg-white
              border
              border-slate-200
              rounded-xl
              px-3
              py-2.5
              text-sm
              sm:text-base
              text-slate-700
              outline-none
              focus:ring-4
              focus:ring-blue-100
              focus:border-blue-400
              transition
            " /> :profileData.about}
          </p>

        </div>


        <div className="
          mt-4
          p-4
          sm:p-5
          bg-white
          border
          border-slate-200
          rounded-2xl
          hover:border-blue-100
          hover:shadow-sm
          transition
        ">

          <p className="
            text-sm
            font-bold
            text-slate-800
            mb-3
          ">
            Address:
          </p>

          <p className="
            text-sm
            text-slate-500
            leading-6
          ">
            {isEdit? <input type='text' onChange={(e)=>setProfileData(prev =>({...prev, address: {...prev.address,line1:e.target.value}}))} value={profileData.address.line1} className="
              w-full
              bg-slate-50
              border
              border-slate-200
              rounded-xl
              px-3
              py-2.5
              text-sm
              text-slate-700
              outline-none
              focus:ring-4
              focus:ring-blue-100
              focus:border-blue-400
              transition
            "/>:profileData.address.line1}
          </p>

          <br />

          <p className="
            text-sm
            text-slate-500
            leading-6
          ">
            {isEdit? <input type='text' onChange={(e)=>setProfileData(prev =>({...prev, address: {...prev.address,line2:e.target.value}}))} value={profileData.address.line2} className="
              w-full
              bg-slate-50
              border
              border-slate-200
              rounded-xl
              px-3
              py-2.5
              text-sm
              text-slate-700
              outline-none
              focus:ring-4
              focus:ring-blue-100
              focus:border-blue-400
              transition
            "/>:profileData.address.line2}
          </p>

        </div>


        <div className="
          flex
          items-center
          justify-between
          flex-wrap
          gap-4
          mt-6
          pt-5
          border-t
          border-slate-100
        ">

          <div className="
            flex
            items-center
            gap-3
            px-4
            py-2.5
            rounded-xl
            bg-emerald-50
            border
            border-emerald-100
            shadow-sm
          ">

            <input
              type="checkbox"
              disabled={!isEdit}
              checked={profileData.available}
              onChange={(e)=>setProfileData(prev =>({...prev, available: e.target.checked}))}
              className="
                w-5
                h-5
                accent-emerald-500
                cursor-pointer
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            <label
              htmlFor="available"
              className="
                text-sm
                font-semibold
                text-emerald-700
                cursor-pointer
                select-none
              "
            >
              Available
            </label>

          </div>

          {isEdit?
          <button onClick={()=>upDateProfile()} className="
            w-full
            sm:w-auto
            min-w-[160px]
            px-8
            py-3
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            text-white
            text-sm
            font-semibold
            shadow-lg
            shadow-blue-100
            hover:from-blue-700
            hover:to-cyan-600
            hover:shadow-xl
            hover:-translate-y-0.5
            active:scale-95
            transition-all
            duration-300
          ">
            Save information
          </button> :
          <button onClick={()=>setIsEdit(true)} className="
            w-full
            sm:w-auto
            min-w-[140px]
            px-8
            py-3
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            text-white
            text-sm
            font-semibold
            shadow-lg
            shadow-blue-100
            hover:from-blue-700
            hover:to-cyan-600
            hover:shadow-xl
            hover:-translate-y-0.5
            active:scale-95
            transition-all
            duration-300
          ">
            Edit
          </button>}

        </div>

      </div>

    </div>

  </div>

</div>
  )
}

export default DoctorProfile
