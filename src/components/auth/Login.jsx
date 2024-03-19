import React, { useEffect, useRef, useState } from 'react'
import UserName from './UserName'
import Password from './Password'
import { usePWAContext } from '@/context/PWAProvider'
import useAuth from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { UAParser } from 'ua-parser-js'
import autoAnimate from '@formkit/auto-animate'

const Login = () => {
    const [loginEmail,setLoginEmail]=useState("")
    const [loginID,setLoginID]=useState("")
    const [isWebAuthnRegistered,setIsWebAuthnRegistered]=useState(false)
    const [deviceInfo,setDeviceInfo]=useState(null)
    const [username,setUsername]=useState(null)
    const {user}=useAuth()

    
    
    useEffect(()=>{
      const parser = new UAParser();
setDeviceInfo(parser.getResult());



},[])
const parent = useRef(null)
useEffect(() => {
  parent.current && autoAnimate(parent.current)
}, [parent])


  return (
    <>
    {user.userAccessToken &&
       <Navigate to='/'/>}
    <div ref={parent}>
       
     {!loginEmail
     ?<UserName setUsername={setUsername} setLoginEmail={setLoginEmail} setLoginID={setLoginID} setIsWebAuthnRegistered={setIsWebAuthnRegistered}/>:
     <Password  username={username} loginDeviceInfo={deviceInfo} loginEmail={loginEmail} setLoginEmail={setLoginEmail} loginID={loginID} isWebAuthnRegistered={isWebAuthnRegistered}/>}
     

    </div>




    </>
  )
}

export default Login
