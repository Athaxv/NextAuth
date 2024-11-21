"use client"
import React, { useState, useEffect } from 'react'
import  axios  from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { BackgroundBeams } from "../components/ui/background-beams";

export default function Page() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        // username: "",
        password: ""
    })
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
       try {
        setLoading(true)
        const response = await axios.post("/api/users/login", user)
        console.log("Login Success", response.data)
        router.push('/profile')

       } catch (error: any) {
        console.log("Login Failed")
        toast.error(error.message)
       }  
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0){
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }, [user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
        <h1 className='text-5xl text-gray-300 p-3 font-semibold -translate-y-12'>{loading ? "Processing..." : "Hey You are Back,"}</h1>
        <hr />
        {/* <label htmlFor="username" className='text-lg font-bold'>Username</label>
        <input 
        id='username'
        className='p-2 border w-1/6 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        value={user.username}
        placeholder='Enter username'
        onChange={(e)=> setUser({...user, username: e.target.value})}
        type="text" /> */}

        <label htmlFor="email" className='text-lg font-bold'>Email</label>
        <input 
        id='email'
        className='p-2 border w-1/6 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        value={user.email}
        placeholder='Enter your mail'
        onChange={(e)=> setUser({...user, email: e.target.value})}
        type="text" />

        <label htmlFor="username" className='text-lg font-bold'>Password</label>
        <input 
        id='password'
        className='p-2 border w-1/6 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        value={user.password}
        placeholder='Enter your password'
        onChange={(e)=> setUser({...user, password: e.target.value})}
        type="password" />
        <button
        className='bg-blue-500 p-2 hover:bg-blue-700 mt-3 rounded-lg w-1/6 text-white font-semibold'
        onClick={onLogin}
        >{disabled ? "Fill up the form first" : "Login Here"}</button>
        <Link href="/login" className='w-1/6 text-gray-300 text-sm mt-5 flex flex-col justify-center items-center'>Don't Have an Account? SignUp Here</Link>
        {/* <BackgroundBeams /> */}
    </div>
  )
}
