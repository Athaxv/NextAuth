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
        username: "",
        password: ""
    })
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
       try {
        setLoading(true)
        const response = await axios.post("/api/users/signup", user)
        console.log("Signup Success", response.data)
        router.push('/login')

       } catch (error: any) {
        console.log("Signup Failed")
        toast.error(error.message)
       }  
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }, [user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
        <h1 className='text-5xl p-3 font-semibold -translate-y-12'>{loading ? "Processing..." : "Let's signup"}</h1>
        <hr />
        <label htmlFor="username" className='text-lg font-bold'>Username</label>
        <input 
        id='username'
        className='p-2 border w-1/6 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        value={user.username}
        placeholder='Enter username'
        onChange={(e)=> setUser({...user, username: e.target.value})}
        type="text" />

        <label htmlFor="username" className='text-lg font-bold'>Email</label>
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
        onClick={onSignup}
        >{disabled ? "Fill up the form first" : "SignUp Here"}</button>
        <Link href="/login" className='w-1/6 text-gray-300 text-sm mt-5 flex flex-col justify-center items-center'>Already Have an Account? Login Here</Link>
        {/* <BackgroundBeams /> */}
    </div>
  )
}
