import React, { useEffect, useState, useContext} from 'react'
import { AppContext } from './context'
import { assets } from '../assets/assets_frontend/assets'
import axios  from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
 
  const {userData, setUserData, token, backendUrl, loadUserData} = useContext(AppContext)
  const [image, setImage] = useState(false)


  const updateUserProfile = async ()=>{
    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      formData.append('matNum', userData.matNum)
      formData.append('department', userData.department)
      formData.append('level', userData.level)

      image && formData.append('image' ,image)

      const {data} = await axios.put(backendUrl + "/api/user/update-profile", formData, {headers:{Authorization:`Bearer ${token}`}})

      if(data.success){
        toast.success(data.message)
        await loadUserData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  
// const [userData, setUserData] = useState({
//   name: "khbhjbjh",
//     phone:"345678968",
//     address: {line1:"dfghjk", line2:"sdfghjkgh"},
//     gender: "male",
//     dob: "2001",
//     email:"utyhuhgh",
//     image: assets.profile_pic
// })


// const handleEdit = () => {
//   setSaveUserData({
//     name: userData.name,
//     phone: userData.phone,
//     address: userData.address,
//     gender: userData.gender,
//     dob: userData.dob
//   })
//   setIsEdit(true)
// }

  const [isEdit, setIsEdit] = useState(false)

  return userData && (
   <div className="
  w-full
  mt-3
  mb-3
  max-w-3xl
  mx-auto
  flex
  flex-col
  gap-5
  sm:gap-6
  text-sm
  text-slate-700
  pb-10
">

  {/* ================= PROFILE HEADER ================= */}
  <div className="
    relative
    overflow-hidden
    rounded-2xl
    sm:rounded-3xl
    bg-gradient-to-br
    from-slate-950
    via-slate-900
    to-blue-950
    p-5
    sm:p-7
    md:p-8
    shadow-xl
  ">

    {/* Decorative glow */}
    <div className="
      absolute
      -top-20
      -right-20
      w-52
      h-52
      rounded-full
      bg-blue-500/20
      blur-3xl
    "></div>

    <div className="
      absolute
      -bottom-24
      -left-20
      w-56
      h-56
      rounded-full
      bg-cyan-400/10
      blur-3xl
    "></div>


    <div className="
      relative
      z-10
      flex
      flex-col
      sm:flex-row
      items-center
      sm:items-end
      gap-5
    ">

      {/* PROFILE IMAGE */}
      <div className="relative flex-shrink-0">

        {
          isEdit
            ?
            <label htmlFor="image" className="cursor-pointer group">

              <div className="
                relative
                w-28
                h-28
                sm:w-32
                sm:h-32
                md:w-36
                md:h-36
                rounded-2xl
                overflow-hidden
                border-4
                border-white/20
                bg-slate-800
                shadow-xl
              ">

                <img
                  className="
                    w-full
                    h-full
                    object-cover
                    opacity-80
                    group-hover:scale-105
                    transition-transform
                    duration-300
                  "
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : userData.image
                  }
                  alt="Profile"
                />

                {/* Upload overlay */}
                <div className="
                  absolute
                  inset-0
                  flex
                  flex-col
                  items-center
                  justify-center
                  bg-black/40
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-300
                ">

                  <img
                    className="w-8 h-8 object-contain"
                    src={assets.upload_icon}
                    alt="Upload"
                  />

                  <span className="
                    mt-1
                    text-[10px]
                    text-white
                    font-medium
                  ">
                    Change photo
                  </span>

                </div>

              </div>

              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
                accept="image/*"
              />

            </label>

            :

            <div className=" w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-white/20 bg-slate-800 shadow-xl ">
              <img
                className="
                  w-full
                  h-full
                  object-cover
                "
                src={userData.image}
                alt="Profile"
              />
            </div>
        }

      </div>


      {/* NAME */}
      <div className="
        flex-1
        min-w-0
        text-center
        sm:text-left
      ">

        <p className="
          text-[10px]
          sm:text-xs
          uppercase
          tracking-[0.2em]
          text-cyan-300
          font-semibold
          mb-2
        ">
          WDU Patient Profile
        </p>

        {
          isEdit

            ?

            <input
              className="
                w-full
                max-w-md
                bg-white/10
                border
                border-white/20
                focus:border-cyan-300
                focus:ring-2
                focus:ring-cyan-300/20
                outline-none
                px-3
                py-2
                rounded-xl
                text-xl
                sm:text-2xl
                font-semibold
                text-white
                placeholder:text-white/40
                transition-all
              "
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData(prev => ({
                  ...prev,
                  name: e.target.value
                }))
              }
            />

            :

            <p className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-bold
              text-white
              truncate
            ">
              {userData.name}
            </p>
        }

        <p className="
          mt-2
          text-xs
          sm:text-sm
          text-white/60
        ">
          Manage your personal information and healthcare details
        </p>

      </div>

    </div>

  </div>


  {/* ================= CONTACT INFORMATION ================= */}
  <div className="
    bg-white
    rounded-2xl
    border
    border-slate-200
    p-5
    sm:p-6
    md:p-7
    shadow-sm
    hover:shadow-md
    transition-shadow
  ">

    <div className="
      flex
      items-center
      gap-3
      mb-5
    ">

      <div className="
        w-10
        h-10
        rounded-xl
        bg-blue-50
        flex
        items-center
        justify-center
        text-blue-600
      ">
        ✉
      </div>

      <div>
        <p className="
          text-base
          sm:text-lg
          font-bold
          text-slate-800
        ">
          Contact Information
        </p>

        <p className="
          text-[11px]
          sm:text-xs
          text-slate-400
        ">
          Your contact details
        </p>
      </div>

    </div>


    <div className="
      grid
      grid-cols-1
      sm:grid-cols-[130px_1fr]
      gap-x-5
      gap-y-4
    ">

      <p className="font-semibold text-slate-500">
        Email
      </p>

      <p className="
        text-blue-600
        break-all
      ">
        {userData.email}
      </p>


      <p className="font-semibold text-slate-500">
        Phone
      </p>

      {
        isEdit

          ?

          <input
            className="
              w-full
              max-w-sm
              bg-slate-50
              border
              border-slate-200
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
              outline-none
              px-3
              py-2
              rounded-lg
              transition-all
            "
            type="text"
            value={userData.phone}
            onChange={(e) =>
              setUserData(prev => ({
                ...prev,
                phone: e.target.value
              }))
            }
          />

          :

          <p className="text-blue-600">
            {userData.phone}
          </p>
      }


      <p className="font-semibold text-slate-500">
        Address
      </p>

      {
        isEdit

          ?

          <div className="
            flex
            flex-col
            gap-2
            w-full
            max-w-md
          ">

            <input
              className="
                w-full
                bg-slate-50
                border
                border-slate-200
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
                outline-none
                px-3
                py-2
                rounded-lg
              "
              onChange={(e) =>
                setUserData(prev => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    line1: e.target.value
                  }
                }))
              }
              value={userData.address.line1}
              type="text"
              placeholder="Address line 1"
            />

            <input
              className="
                w-full
                bg-slate-50
                border
                border-slate-200
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
                outline-none
                px-3
                py-2
                rounded-lg
              "
              type="text"
              onChange={(e) =>
                setUserData(prev => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    line2: e.target.value
                  }
                }))
              }
              value={userData.address.line2}
              placeholder="Address line 2"
            />

          </div>

          :

          <p className="
            text-slate-500
            leading-6
          ">
            {userData.address.line1}
            <br />
            {userData.address.line2}
          </p>
      }

    </div>

  </div>


  {/* ================= BASIC INFORMATION ================= */}
  <div className="
    bg-white
    rounded-2xl
    border
    border-slate-200
    p-5
    sm:p-6
    md:p-7
    shadow-sm
    hover:shadow-md
    transition-shadow
  ">

    <div className="
      flex
      items-center
      gap-3
      mb-5
    ">

      <div className="
        w-10
        h-10
        rounded-xl
        bg-cyan-50
        flex
        items-center
        justify-center
        text-cyan-600
      ">
        ♡
      </div>

      <div>
        <p className="
          text-base
          sm:text-lg
          font-bold
          text-slate-800
        ">
          Basic Information
        </p>

        <p className="
          text-[11px]
          sm:text-xs
          text-slate-400
        ">
          Your personal information
        </p>
      </div>

    </div>


    <div className="
      grid
      grid-cols-1
      sm:grid-cols-[130px_1fr]
      gap-x-5
      gap-y-4
    ">

      <p className="font-semibold text-slate-500">
        Gender
      </p>

      {
        isEdit

          ?

          <select
            className="
              w-full
              max-w-32
              bg-slate-50
              border
              border-slate-200
              focus:border-blue-500
              outline-none
              px-3
              py-2
              rounded-lg
              cursor-pointer
            "
            onChange={(e) =>
              setUserData(prev => ({
                ...prev,
                gender: e.target.value
              }))
            }
            value={userData.gender}
          >

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

          </select>

          :

          <p className="text-slate-500">
            {userData.gender}
          </p>
      }


      <p className="font-semibold text-slate-500">
        Birthday
      </p>

      {
        isEdit

          ?

          <input
            className="
              w-full
              max-w-40
              bg-slate-50
              border
              border-slate-200
              focus:border-blue-500
              outline-none
              px-3
              py-2
              rounded-lg
            "
            type="date"
            onChange={(e) =>
              setUserData(prev => ({
                ...prev,
                dob: e.target.value
              }))
            }
            value={userData.dob}
          />

          :

          <p className="text-slate-500">
            {userData.dob}
          </p>
      }
      
      <p className="font-semibold text-slate-500">
        Matric Number
      </p>

      {
        isEdit

          ?

          <input
            className="
              w-full
              max-w-sm
              bg-slate-50
              border
              border-slate-200
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
              outline-none
              px-3
              py-2
              rounded-lg
              transition-all
            "
            type="text"
            value={userData.matNum}
            onChange={(e) =>
              setUserData(prev => ({
                ...prev,
                matNum: e.target.value
              }))
            }
          />

          :

          <p className="text-blue-600">
            {userData.matNum}
          </p>
      }

      <p className="font-semibold text-slate-500">
        Department
      </p>

      {
        isEdit

          ?

          <input
            className="
              w-full
              max-w-sm
              bg-slate-50
              border
              border-slate-200
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
              outline-none
              px-3
              py-2
              rounded-lg
              transition-all
            "
            type="text"
            value={userData.department}
            onChange={(e) =>
              setUserData(prev => ({
                ...prev,
                department: e.target.value
              }))
            }
          />

          :

          <p className="text-blue-600">
            {userData.department}
          </p>
      }


       <p className="font-semibold text-slate-500">
        Level
      </p>

      {
        isEdit

          ?

          <input
            className="
              w-full
              max-w-sm
              bg-slate-50
              border
              border-slate-200
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
              outline-none
              px-3
              py-2
              rounded-lg
              transition-all
            "
            type='number'
            value={userData.level}
            onChange={(e) =>
              setUserData(prev => ({
                ...prev,
                level: e.target.value
              }))
            }
          />

          :

          <p className="text-blue-600">
            {userData.level}
          </p>
      }

    </div>

  </div>


  {/* ================= ACTION BUTTON ================= */}
  <div className="
    flex
    justify-center
    sm:justify-start
  ">

    {
      isEdit

        ?

        <button
          className="
            inline-flex
            items-center
            justify-center
            px-8
            sm:px-10
            py-3
            rounded-full
            bg-blue-600
            text-white
            text-sm
            font-semibold
            shadow-lg
            shadow-blue-200
            hover:bg-blue-700
            hover:-translate-y-0.5
            active:translate-y-0
            transition-all
            duration-300
          "
          onClick={updateUserProfile}
        >
          SAVE CHANGES
        </button>

        :

        <button
          className="
            inline-flex
            items-center
            justify-center
            px-8
            sm:px-10
            py-3
            rounded-full
            border-2
            border-blue-600
            text-blue-600
            text-sm
            font-semibold
            bg-white
            hover:bg-blue-600
            hover:text-white
            hover:-translate-y-0.5
            active:translate-y-0
            transition-all
            duration-300
          "
          onClick={() => setIsEdit(true)}
        >
          EDIT PROFILE
        </button>
    }

  </div>

</div>
  )
}

export default MyProfile