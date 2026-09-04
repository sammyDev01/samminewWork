import React from 'react'
import {assets} from '../assets/assets_admin/assets'
import { useState } from 'react'
import { useContext } from 'react';
import { AdminContext } from '../context/adminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/doctorContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [state, setState] = useState('Admin');
    const [isRegister, setIsRegister] = useState(false);

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { aToken, setAToken, backendUrl } = useContext(AdminContext);
    const { dToken, setDToken } = useContext(DoctorContext);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (aToken) {
            navigate('/admin/dashboard');
        }
    }, [aToken, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            // =========================
            // ADMIN REGISTRATION
            // =========================
           
                if (state === "Admin" && isRegister) {

                    const { data } = await axios.post(
                        backendUrl + '/api/admin/create-admin',
                        {username,  email,password}
                    );
                    console.log(data);
                    if (data.success) {
                        toast.success(data.message);
                        // // Save admin token
                        localStorage.setItem('aToken', data.token);
                        // // Put token into AdminContext
                        setAToken(data.token);
                        // Clear form
                        setUserName('');
                        setEmail('');
                        setPassword('');

                    } else {
                        toast.error(data.message);
                    }
                }



            // =========================
            // ADMIN LOGIN
            // =========================
            else if (state === "Admin") {

                const { data } = await axios.post(
                    backendUrl + '/api/admin/login-admin',
                    {
                        email,
                        password
                    }
                );

                console.log(data);

                if (data.success) {

                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);

                } else {
                    toast.error(data.message);
                }
            }

            // =========================
            // DOCTOR LOGIN
            // =========================
            else {

                const { data } = await axios.post(
                    backendUrl + '/api/doctor/login',
                    {
                        email,
                        password
                    }
                );

                console.log(data);

                if (data.success) {

                    localStorage.setItem('dToken', data.token);
                    setDToken(data.token);

                } else {
                    toast.error(data.message);
                }
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className='min-h-[80vh] flex items-center'
        >

            <div className='flex flex-col gap-3 items-start m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>

                {/* TITLE */}
                <p className='text-2xl font-semibold m-auto'>

                    <span className='text-blue-400'>
                        {state}
                    </span>

                    {isRegister ? ' Create Account' : ' Login'}

                </p>


                {/* ADMIN NAME - ONLY WHEN REGISTERING */}
                {state === "Admin" && isRegister && (

                    <div className='w-full'>

                        <p>Username</p>

                        <input
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            className='border border-[#DADADA] rounded w-full p-2 mt-1'
                            type="text"
                            placeholder="Enter your username"
                            required
                        />

                    </div>

                )}


                {/* EMAIL */}
                <div className='w-full'>

                    <p>Email</p>

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1'
                        type="email"
                        placeholder="Enter your email"
                        required
                    />

                </div>


                {/* PASSWORD */}
                <div className='w-full'>

                    <p>Password</p>

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1'
                        type="password"
                        placeholder="Enter your password"
                        required
                    />

                </div>


                {/* BUTTON */}
                <button
                    className='bg-blue-600 text-white w-full py-2 rounded-md text-base'
                >
                    {isRegister ? 'Create Account' : 'Login'}
                </button>


                {/* ADMIN CREATE ACCOUNT / LOGIN */}
                {state === "Admin" && (

                    <p>

                        {isRegister
                            ? "Already have an account? "
                            : "Don't have an admin account? "
                        }

                        <span
                            className='text-blue-400 underline cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                setIsRegister(!isRegister);
                            }}
                        >
                            {isRegister
                                ? "Login here"
                                : "Create account"
                            }
                        </span>

                    </p>

                )}


                {/* DOCTOR LOGIN */}
                {state === "Admin" && !isRegister && (

                    <p>

                        Doctor Login{" "}

                        <span
                            className='text-blue-400 underline cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                setState("Doctor");
                                setIsRegister(false);
                            }}
                        >
                            Click here
                        </span>

                    </p>

                )}


                {/* BACK TO ADMIN LOGIN */}
                {state === "Doctor" && (

                    <p>

                        Admin Login{" "}

                        <span
                            className='text-blue-400 underline cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                setState("Admin");
                            }}
                        >
                            Click here
                        </span>

                    </p>

                )}

            </div>

        </form>
    );
};





export default Login
