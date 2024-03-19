import useAuth from '@/hooks/useAuth';
import React from 'react'
import {  Outlet } from 'react-router-dom'

const AuthLayout = () => {
 
    
  return (
    <>
    <div className='bg-background' >

      <section>
       <Outlet></Outlet>
      </section>
    </div>
    </>
  )
}

export default AuthLayout
