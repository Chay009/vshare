import useAuth from '@/hooks/useAuth'
import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Toaster } from './ui/sonner';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from '@/context/theme-provider';
import { Analytics } from '@vercel/analytics/react';



const AppLayout = () => {


    const {user}=useAuth();
    const {theme}=useTheme();
    

    const isDesktop = useMediaQuery({ query:"(min-width: 768px)"})

     

    
    console.log(user.userAccessToken)
    
  return (
    
    <div>
      
      <Toaster richColors theme={theme}  position={`${isDesktop?"bottom-right":"top-center"}`}/>
     
      <Analytics/>

       {user.userAccessToken ? <Outlet/> :<Navigate to='/auth'/>}
    </div>
  )
}

export default AppLayout
