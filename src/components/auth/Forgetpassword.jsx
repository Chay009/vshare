import React, { useEffect, useRef, useState } from 'react'
import ForgetpasswordEmail from './ForgetpasswordEmail'
import InputOTPForm from './InputOTPForm'
import autoAnimate from '@formkit/auto-animate'

const Forgetpassword = () => {
  const [email,setEmail]=useState("")
 const [id,setId]=useState("")
  const [token,setToken]=useState("")
  
  const parent = useRef(null)
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  return (
    
    <div ref={parent}>
{   !email?<ForgetpasswordEmail setId={setId} setEmail={setEmail} setToken={setToken} />
    :<InputOTPForm email={email} setEmail={setEmail} token={token} id={id}/>}

    </div>
  )
}

export default Forgetpassword
