import React from 'react'


import SideNavbar from './SideNavbar'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import useLogout from '@/hooks/useLogout'
import { Link, useNavigate } from 'react-router-dom'


import { useTheme } from '@/context/theme-provider'




const Sidebar = () => {
  const{theme,setTheme} =useTheme()

 
  return (
    <>
    <div className='top-0 sticky border '>

          
  
      
     <div className=' h-screen w-max  bg-background  mt-5 xl:w-64 flex-col hidden md:flex'>
  
     <Link to="/" className="flex items-center justify-center">

<div className='flex flex-col justify-center gap-4 '>
 
<img
      src='/logo_main.png'
      alt="logo"
      width={96}
      height={64}
      className=' mt-20 '
      />
 <p class=" hidden xl:block text-xl leading-6">
    <span class="font-semibold text-teal-500">V</span><span className='text-accent-foreground'>share,</span> <span class="italic text-muted-foreground">we care</span>
</p>

</div>

  
  </Link>

    
 <SideNavbar/>

 
</div>

</div>   
       
    </>
  )
}

export default Sidebar
