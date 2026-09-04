import React, { useState,useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'
import { AppContext } from './context'



const Nav = () => {

  const navigate = useNavigate();
  const {token, setToken, userData, setUserData} = useContext(AppContext)

  const [showmenu, setShowmenu] = useState(false)
  const [showMenus, setShowMenus] = useState(false)
  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/')
  }
  
const [hide, setHide] =useState(false)

  return (
  <nav className="
  w-full
  h-16 sm:h-20
  px-3 sm:px-5 md:px-8 lg:px-10
  flex items-center justify-between
  bg-white
  border-b border-slate-200
  shadow-[0_2px_15px_rgba(15,23,42,0.05)]
  relative
  z-40
">

  {/* LOGO */}
  <img
    onClick={() => {navigate('/'); scrollTo(0,0)}}
    src={assets.MyLogo}
    className="
      w-28 h-14
      sm:w-32 sm:h-16
      md:w-36 md:h-18
      lg:w-40 lg:h-20
      object-contain
      cursor-pointer
      flex-shrink-0
      hover:scale-105
      transition-transform
      duration-300
    "
    alt=""
  />


  {/* DESKTOP NAV */}
  <ul className="
    hidden md:flex
    items-center
    gap-4 lg:gap-7 xl:gap-9
    text-xs lg:text-sm
    font-semibold
    text-slate-600
  ">

    <NavLink
      to="/"
      className="
        group relative py-2
        hover:text-blue-700
        transition-colors duration-300
      "
    >
      <li className="list-none">Home</li>

      <hr className="
        absolute
        bottom-0 left-1/2
        -translate-x-1/2
        w-0 group-hover:w-3/5
        h-0.5
        border-none
        bg-blue-600
        transition-all duration-300
      " />
    </NavLink>


    <NavLink
      to="/about"
      className="
        group relative py-2
        hover:text-blue-700
        transition-colors duration-300
      "
    >
      <li className="list-none">About</li>

      <hr className="
        absolute
        bottom-0 left-1/2
        -translate-x-1/2
        w-0 group-hover:w-3/5
        h-0.5
        border-none
        bg-blue-600
        transition-all duration-300
      " />
    </NavLink>


    <NavLink
      to="/doctors"
      className="
        group relative py-2
        hover:text-blue-700
        transition-colors duration-300
      "
    >
      <li className="list-none">Doctors</li>

      <hr className="
        absolute
        bottom-0 left-1/2
        -translate-x-1/2
        w-0 group-hover:w-3/5
        h-0.5
        border-none
        bg-blue-600
        transition-all duration-300
      " />
    </NavLink>


    <NavLink
      to="/contact"
      className="
        group relative py-2
        hover:text-blue-700
        transition-colors duration-300
      "
    >
      <li className="list-none">Contact</li>

      <hr className="
        absolute
        bottom-0 left-1/2
        -translate-x-1/2
        w-0 group-hover:w-3/5
        h-0.5
        border-none
        bg-blue-600
        transition-all duration-300
      " />
    </NavLink>


   

  </ul>


  {/* RIGHT SIDE */}
  <div className="
    flex items-center
    gap-2 sm:gap-4 md:gap-5
  ">

    {
      token && userData

      ?

      /* PROFILE */
      <div className="
        flex items-center gap-2
        cursor-pointer
        group
        relative
        py-2
      ">

        <div className="relative group">

  {/* Profile image */}
  <button
    type="button"
    onClick={() => setShowMenus((prev) => !prev)}
    className="relative focus:outline-none"
  >
    <img
      className="
        w-8 h-8
        sm:w-9 sm:h-9
        md:w-10 md:h-10
        rounded-full
        object-cover
        border-2
        border-blue-100
        group-hover:border-teal-400
        shadow-sm
        transition-all duration-300
        cursor-pointer
      "
      src={userData.image}
      alt="Profile"
    />

    {/* Online */}
    <span
      className="
        absolute
        right-0 bottom-0
        w-2.5 h-2.5
        bg-emerald-500
        border-2 border-white
        rounded-full
      "
    />
  </button>

  {/* Dropdown */}
  <div
    className={`
      absolute
      top-full right-0
      w-36
      pt-2
      z-50
     md:group-hover:block
      ${showMenus ? "block" : "hidden"}
    `}
  >
    
    <div
      className="
        w-56
        bg-white
        border border-slate-200
        rounded-2xl
        shadow-[0_15px_40px_rgba(15,23,42,0.12)]
        p-2"
    >

      <p
        onClick={() => {
          navigate("/my-profile");
          setShowMenus(false);
        }}
        className="
          px-4 py-3
          rounded-xl
          text-slate-600
          hover:bg-blue-50
          hover:text-blue-700
          cursor-pointer
          transition
        "
      >
        My profile
      </p>

      <p
        onClick={() => {
          navigate("/service");
          setShowMenus(false);
        }}
        className="
          px-4 py-3
          rounded-xl
          text-slate-600
          hover:bg-blue-50
          hover:text-blue-700
          cursor-pointer
          transition
        "
      >
        My consultation history
      </p>

      <p
        onClick={() => {
          navigate("/my-appointment");
          setShowMenus(false);
        }}
        className="
          px-4 py-3
          rounded-xl
          text-slate-600
          hover:bg-teal-50
          hover:text-teal-700
          cursor-pointer
          transition
        "
      >
        My Appointment
      </p>

      <div className="h-px bg-slate-100 my-1" />

      <p
        onClick={() => {
          logout();
          setShowMenus(false);
        }}
        className="
          px-4 py-3
          rounded-xl
          text-red-500
          hover:bg-red-50
          hover:text-red-600
          cursor-pointer
          transition
        "
      >
        Logout
      </p>

    </div>
  </div>

</div>


        <img
          className="
            w-2 sm:w-2.5
            opacity-60
            group-hover:opacity-100
            group-hover:rotate-180
            transition-all duration-300
          "
          src={assets.dropdown_icon}
          alt=""
        />


        {/* DROPDOWN */}
    

      </div>

      :

      /* CREATE ACCOUNT */
      <button
        onClick={() => navigate('/login')}
        className="
          hidden md:block
          px-5 lg:px-7
          py-2.5
          rounded-full
          bg-gradient-to-r
          from-blue-700
          to-cyan-600
          text-white
          text-xs lg:text-sm
          font-semibold
          shadow-md
          shadow-blue-200
          hover:from-blue-800
          hover:to-cyan-700
          hover:shadow-lg
          hover:-translate-y-0.5
          active:translate-y-0
          transition-all duration-300
        "
      >
        Create Account
      </button>
    }


    {/* MOBILE MENU ICON */}
    <img
      onClick={() => setShowmenu(true)}
      src={assets.menu_icon}
      className="
        w-6 h-6
        md:hidden
        cursor-pointer
        hover:scale-110
        transition-transform
      "
      alt=""
    />


    {/* MOBILE MENU */}
    <div
      className={`
        ${hide
          ? 'translate-x-full opacity-0'
          : 'translate-x-0 opacity-100'
        }

        ${showmenu
          ? 'fixed w-full'
          : 'h-0 w-0'
        }

        fixed
        right-0 top-0 bottom-0
        z-[100]
        overflow-hidden
        bg-gradient-to-b
        from-white
        to-blue-50
        border-l border-blue-100
        shadow-2xl
        transition-all duration-500
        md:hidden
      `}
    >

      {/* MOBILE HEADER */}
      <div className="
        flex items-center justify-between
        px-5 py-5
        bg-white
        border-b border-blue-100
        
      ">

        <img
          className="w-43 h-20 object-contain"
          src={assets.MyLogo}
          alt=""
        />

        <button
          onClick={() => setShowmenu(false)}
          className="
            w-10 h-10
            rounded-full
            bg-slate-100
            hover:bg-red-50
            active:bg-red-50
            flex items-center justify-center
            transition
          "
        >
          <img
            className="w-5"
            src={assets.cross_icon}
            alt=""
          />
        </button>

      </div>


      {/* MOBILE LINKS */}
      <ul className="
        flex flex-col
        gap-2
        px-5 pt-7
        text-base
        font-semibold
        text-slate-600
      ">

        <NavLink
          to="/"
          onClick={() => setShowmenu(false)}
          className="
            rounded-xl
            hover:bg-blue-100
            hover:text-blue-700
            transition
          "
        >
          <p className="px-4 py-3">
            HOME
          </p>
        </NavLink>


        <NavLink
          to="/doctors"
          onClick={() => setShowmenu(false)}
          className="
            rounded-xl
            hover:bg-blue-100
            hover:text-blue-700
            transition
          "
        >
          <p className="px-4 py-3">
            Doctors
          </p>
        </NavLink>


        <NavLink
          to="/about"
          onClick={() => setShowmenu(false)}
          className="
            rounded-xl
            hover:bg-blue-100
            hover:text-blue-700
            transition
          "
        >
          <p className="px-4 py-3">
            About
          </p>
        </NavLink>
        <NavLink
          to="/contact"
          onClick={() => setShowmenu(false)}
          className="
            rounded-xl
            hover:bg-blue-100
            hover:text-blue-700
            transition
            mt-2
          "
        >
          <p className="px-4 py-3">
            Contact
          </p>
        </NavLink>

      </ul>

    </div>

  </div>

</nav>
  )
}

export default Nav
