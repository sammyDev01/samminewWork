import React, { useState , useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './context'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const { backendUrl, token, setToken} = useContext(AppContext)

  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name1, setName] = useState('')

  const [failResponce, setFailResponce] = useState("")

  const navigate = useNavigate()

 

  const SubmitHandler = async (event)=>{
    event.preventDefault()

      try {
            if(state === 'Sign Up'){
              const {data} = await axios.post(backendUrl + '/api/user/register', {name: name1, password, email})
              if(data.success){
                localStorage.setItem("token" , data.token)
               toast.success(data.message)
                setToken(data.token)
                
              } else{
                toast.error(data.message)
              }
            } else {
              const {data} = await axios.post(backendUrl + '/api/user/login', { password, email})
              if(data.success){
                localStorage.setItem("token" , data.token)
                toast.success(data.message)
                setToken(data.token)
                
              } else{
                toast.error(data.message)
              }
            }
          } catch (error) {
            toast.error(error.message)
      }
    
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }   
  },[token])

  return (
    <form
  onSubmit={SubmitHandler}
  className="
    min-h-[80vh]
    w-full
    flex
    items-center
    justify-center
    px-4
    sm:px-6
    py-10
    relative
    overflow-hidden
  "
>
  {/* Background decoration */}
  <div
    className="
      absolute
      -top-24
      -left-24
      w-72
      h-72
      rounded-full
      bg-blue-400/10
      blur-3xl
      pointer-events-none
    "
  />

  <div
    className="
      absolute
      -bottom-24
      -right-24
      w-80
      h-80
      rounded-full
      bg-cyan-400/10
      blur-3xl
      pointer-events-none
    "
  />


  {/* LOGIN CARD */}
  <div
    className="
      relative
      z-10
      w-full
      max-w-md
      flex
      flex-col
      gap-5
      p-6
      sm:p-8
      md:p-9
      rounded-2xl
      sm:rounded-3xl
      bg-white
      border
      border-slate-200
      shadow-[0_20px_60px_rgba(15,23,42,0.10)]
      transition-all
      duration-300
    "
  >

    {/* Header */}
    <div className="text-center mb-2">

      <div
        className="
          mx-auto
          mb-4
          w-14
          h-14
          rounded-2xl
          bg-blue-50
          flex
          items-center
          justify-center
          text-blue-600
          shadow-sm
        "
      >
        <span className="text-2xl">
          🩺
        </span>
      </div>

      <p
        className="
          text-2xl
          sm:text-3xl
          font-bold
          text-slate-800
        "
      >
        {state === "Sign Up" ? "Create Account" : "Welcome Back"}
      </p>

      <p
        className="
          mt-2
          text-xs
          sm:text-sm
          text-slate-500
        "
      >
        {state === "Sign Up"
          ? "Create your account to access healthcare services"
          : "Login to continue to your healthcare account"}
      </p>

    </div>


    {/* FULL NAME */}
    {state === "Sign Up" && (
      <div className="w-full">

        <label
          className="
            block
            mb-1.5
            text-sm
            font-semibold
            text-slate-700
          "
        >
          Full Name
        </label>

        <div className="relative">

          <span
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          >
            👤
          </span>

          <input
            required
            className="
              w-full
              pl-10
              pr-4
              py-3
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              text-sm
              text-slate-800
              outline-none
              placeholder:text-slate-400
              focus:bg-white
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-500/10
              transition-all
              duration-200
            "
            type="text"
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
            value={name1}
          />

        </div>

      </div>
    )}


    {/* EMAIL */}
    <div className="w-full">

      <label
        className="
          block
          mb-1.5
          text-sm
          font-semibold
          text-slate-700
        "
      >
        Email Address
      </label>

      <div className="relative">

        <span
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        >
          ✉
        </span>

        <input
          required
          className="
            w-full
            pl-10
            pr-4
            py-3
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            text-sm
            text-slate-800
            outline-none
            placeholder:text-slate-400
            focus:bg-white
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-500/10
            transition-all
            duration-200
          "
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

      </div>

    </div>


    {/* PASSWORD */}
    <div className="w-full">

      <label
        className="
          block
          mb-1.5
          text-sm
          font-semibold
          text-slate-700
        "
      >
        Password
      </label>

      <div className="relative">

        <span
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        >
          🔒
        </span>

        <input
          required
          className="
            w-full
            pl-10
            pr-4
            py-3
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            text-sm
            text-slate-800
            outline-none
            placeholder:text-slate-400
            focus:bg-white
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-500/10
            transition-all
            duration-200
          "
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

      </div>

    </div>


    {/* ERROR / RESPONSE */}
    {failResponce && (
      <div
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-red-200
          bg-red-50
          text-red-600
          text-xs
          sm:text-sm
        "
      >
        {failResponce}
      </div>
    )}


    {/* SUBMIT BUTTON */}
    <button
      type="submit"
      className="
        w-full
        mt-1
        py-3
        rounded-xl
        bg-gradient-to-r
        from-blue-600
        to-cyan-600
        text-white
        text-sm
        sm:text-base
        font-semibold
        shadow-lg
        shadow-blue-500/20
        hover:from-blue-700
        hover:to-cyan-700
        hover:-translate-y-0.5
        active:translate-y-0
        focus:outline-none
        focus:ring-4
        focus:ring-blue-500/20
        transition-all
        duration-300
      "
    >
      {state === "Sign Up"
        ? "Create Account"
        : "Login"}
    </button>


    {/* SWITCH LOGIN / SIGN UP */}
    <div className="
      text-center
      text-xs
      sm:text-sm
      text-slate-500
      pt-1
    ">

      {state === "Sign Up" ? (
        <p>
          Already have an account?{" "}

          <span
            onClick={() => setState("Login")}
            className="
              font-semibold
              text-blue-600
              cursor-pointer
              hover:text-blue-700
              hover:underline
              transition-all
            "
          >
            Login here
          </span>
        </p>
      ) : (
        <p>
          Don't have an account?{" "}

          <span
            onClick={() => setState("Sign Up")}
            className="
              font-semibold
              text-blue-600
              cursor-pointer
              hover:text-blue-700
              hover:underline
              transition-all
            "
          >
            Create an account
          </span>
        </p>
      )}

    </div>


    {/* SECURITY MESSAGE */}
    <div
      className="
        flex
        items-center
        justify-center
        gap-2
        pt-3
        border-t
        border-slate-100
        text-[10px]
        sm:text-xs
        text-slate-400
      "
    >
      <span>🔐</span>
      <span>Your information is securely protected</span>
    </div>

  </div>
</form>
  )
}

export default Login
