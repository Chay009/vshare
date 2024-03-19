import React from 'react'


import { NavLink,useLocation} from 'react-router-dom'


import {HomeIcon,SearchIcon,ImagePlusIcon,BookmarkPlusIcon,SaveAllIcon,PlusCircle}from'lucide-react'
import AddImage from '../assets/icons/addImage.svg'

const Bottombar = () => {

  const {pathname}=useLocation()



  const bottombarLinks = [
    {
      icon:<HomeIcon className='w-5 h-5'/>,
      route: "/",
      label: "Home",
    },
    {
      icon:<SearchIcon className='w-5 h-5'/>,
      route: "/explore",
      label: "Explore",
    },
    {
     icon:<img  className='w-5 h-5' src={AddImage}  />,
      route: "/create-post",
      label: "Create",
    },
  
    {
      icon:<BookmarkPlusIcon className='w-5 h-5'/>,
      route: "/saved",
      label: "Saved",
    },
  ];
  return (
    <>
      <section className="z-50 backdrop-filter backdrop-blur-md bg-opacity-70 flex-between w-full sticky bottom-0  bg-accent px-5  justify-center items-center md:hidden">
       
      
      {bottombarLinks.map((link) => {
       
        const isActive = pathname === link.route;
        return (
          
          <NavLink
          
          key={`bottombar-${link.label}`}
          to={link.route}
          className={` text-xs font-sans   ${
            isActive && "rounded-[8px] border hover:text-primary px-3 hover: border-t-4 hover: border-t-primary "
          } flex-center flex-col gap-1 pt-1 pb-1  transition`}>
            {link.icon}
          

            <p className='text-xs '>{link.label}</p>
          </NavLink>
        );
      })}
    
      
    </section>
   
   
   </>
      
 
  )
}

export default Bottombar
