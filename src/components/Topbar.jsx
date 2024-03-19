import React, { Suspense, lazy } from 'react'
import ThemeBarToggle from './ThemeBarToggle'

import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Download,Fingerprint} from 'lucide-react'

const LazyUserDetails=lazy(()=>import('./UserDetails')) 



import LoaderSvg from '@/components/loaderSvg'
import { usePWAContext } from '@/context/PWAProvider'
import useAuth from '@/hooks/useAuth'




const Topbar = () => {


  const { promptToInstall,isPwa,setWebAuthRegPromptShown} = usePWAContext();
  const {user}=useAuth()

  const handleInstallButtonClick = () => {
   
    promptToInstall();
  
  };

  return (
    <>
   <div className='md:hidden bg-muted top-0 sticky z-50 w-screen p-3 flex justify-around items-center'>
 

  
   <Link to="/" className="flex gap-3 items-center justify-center">
          <img
            src='/logo_main.png'
            alt="logo"
            width={32}
            height={32}
            />
           <p className=' hidden text-xl xl:block'>chay</p>
        </Link>


{!isPwa&& <div className='flex justify-center items-center'>
 <p 
 className='font-mono text-sm text-sky-500 animate-pulse'
 >
 Install app now to get native experience!
</p>
<Button
 variant="ghost"
 className='animate-pulse'
 onClick={handleInstallButtonClick}
>
<Download className='w-5 h-5 text-sky-400'></Download>
</Button>
 </div>}
{isPwa&&!user.isAlreadyWebAuthnRegistered&& <div className='flex justify-center items-center'>
 <p 
 className='font-mono text-sm text-sky-500 '
 >
Improve security Now!
</p>
<Button
variant='ghost'
className='text-teal-300'
 onClick={()=>{
  console.log("fjfj")
  setWebAuthRegPromptShown(false)
 }}
>
<Fingerprint className='w-6  h-6 animate-pulse'/>
</Button>
 </div>}
   
     
   <div className="flex gap-4">
    <ThemeBarToggle/>

<Suspense fallback={<LoaderSvg duration={0.6}/>}>

    <LazyUserDetails/>
</Suspense>
      
    
   
    
   </div>


 
  
   </div>


   
   
   </>
      
 
  )
}

export default Topbar
