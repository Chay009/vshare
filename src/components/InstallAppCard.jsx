import React from 'react'

import { Button } from './ui/button'
import { Download } from 'lucide-react'
import { usePWAContext } from '@/context/PWAProvider'

const InstallAppCard = () => {

  const { promptToInstall} = usePWAContext();


  const handleInstallButtonClick = () => {
   
    promptToInstall();
  
  };
  return (
    <div >


        
      

        
        <div className=" hidden md:flex flex-col p-3 gap-4 h-max rounded-xl">
      <div className=" bg-accent/70  rounded-3xl py-3  px-3 lg:w-full max-w-screen-sm flex-1 shrink-0">
        <div className='flex flex-col gap-3 py-3'>

          <p className='text-xl font-bold'>Install Now!!</p>
   <p className='font-inter text-sm'>No additional downloads needed,just click on Install! start using as app </p>
        </div>
      <Button className='rounded-md bg-primary group ' onClick={handleInstallButtonClick}>
        <div className='flex gap-2'>

          <p className='font-semibold'>Install</p>
          <Download className='w-4 h-5 group-hover:animate-bounce '></Download>
        </div>
        </Button>
         
     
      
        </div>
    </div>
    
    
    
    </div>
  )
}

export default InstallAppCard
