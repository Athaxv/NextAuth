"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { div } from 'framer-motion/client'
// import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Page() {
  
  // const router = useRouter()
  const [token, setToken] = useState("")
  const [verified, setVerified ] = useState(false)
  const [error, setError] = useState(false)

  const verifyUser = async () => {
    try {
      await axios.post("api/users/verifyemail", {token})
    setVerified(true)
    setError(false)
    } catch (error: any) {
      setError(true)
      console.log(error.response.data)
    }
  } 

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")

    // const {query} = router;
    // const urlTokenTwo = query.token

  }, [])

  useEffect(() => {
    setError(false)
    if (token.length > 0){
      verifyUser()
    }
  }, [token])

  return (
    <div className='flex flex-col items-center  justify-center py-2 min-h-screen'>
      <h1 className='text-4xl'>Verify Email</h1>
      <h2 className='p-2 bg-blue-500 mt-3'>{token ? `${token}`: "No Token"}</h2>
        {
          verified && (
            <div>
              <h2>Verified User</h2>
              <Link href="/login">Login</Link>
            </div>
          )
        }
        {
          error && (
            <div>
              <h2>Error</h2>
            </div>
          )
        }
    </div>
  )
}
