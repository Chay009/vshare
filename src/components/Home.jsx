import React, { lazy } from 'react'
import Topbar from './Topbar'
import Bottombar from './Bottombar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

import { ScrollArea } from './ui/scroll-area'
import { usePWAContext } from '@/context/PWAProvider'

import useAuth from '@/hooks/useAuth'
import UserInfo from './UserInfo'

import InstallApp from './InstallApp'
import RegisterWebAuthn from './RegisterWebAuthn'



import { useMediaQuery } from 'react-responsive';


const LazyPopularCard =lazy(()=>import('./PopularCard')) 

import InstallAppCard from './InstallAppCard'

import RegisterWebAuthnCard from './RegisterWebAuthnCard'






const Home = () => {

  const isDesktop = useMediaQuery({ query:"(min-width: 768px)"})

 


  const {isPwa,isPwaInstalled,showPWAInstallPrompt,webAuthRegPromptShown}=usePWAContext()
  console.log('isPwa',isPwa)
  console.log('isPwaIns',isPwaInstalled)
  const {user}=useAuth()



  


// console.log('isPwaInstalled:', isPWA);
console.log('showPWAPrompt:', showPWAInstallPrompt);

 return (

  
  <>
  
<div className='md:flex flex-1 w-screen h-screen fixed bg-background'>
  {/* Sidebar with sticky */}
    <Topbar />




    <Sidebar />
    


  

<div className='md:flex md:pb-3 px-6 h-screen w-full pb-36 bg-background overflow-hidden overflow-y-auto'>

  <ScrollArea className='md:w-screen'>
      <Outlet/>
   
    
  </ScrollArea>


 
</div>

{/* right sidebar */}
  <div className=' flex flex-col border w-2/5 lg:w-3/5 gap-4 px-4 md:px-10 py-7'>
  { isDesktop&&  <UserInfo/>}  
   {isPwa&&!user.isAlreadyWebAuthnRegistered&&<RegisterWebAuthnCard/>}

  {!isPwaInstalled && !isPwa && !showPWAInstallPrompt&& <InstallAppCard/>}
   <LazyPopularCard/>
  
  </div>
<Bottombar />


{!isPwaInstalled && showPWAInstallPrompt&&<InstallApp/>}
     {isPwa&&!user.isAlreadyWebAuthnRegistered&& !webAuthRegPromptShown&&<RegisterWebAuthn/>}
</div>


  </>
);
 }
export default Home
