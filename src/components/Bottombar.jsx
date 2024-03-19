import React from 'react'


import { NavLink,useLocation} from 'react-router-dom'


import {HomeIcon,SearchIcon,ImagePlusIcon,BookmarkPlusIcon,SaveAllIcon,PlusCircle}from'lucide-react'
import AddImage from '../assets/icons/addImage.svg'

const Bottombar = () => {

  const {pathname}=useLocation()



  const bottombarLinks = [
    {
      icon:<HomeIcon/>,
      route: "/",
      label: "Home",
    },
    {
      icon:<SearchIcon/>,
      route: "/explore",
      label: "Explore",
    },
    {
     icon:<img className='w-6' src={AddImage}  />,
      route: "/create-post",
      label: "Create",
    },
  
    {
      icon:<BookmarkPlusIcon/>,
      route: "/saved",
      label: "Saved",
    },
  ];
  return (
    <>
      <section className="z-50 backdrop-filter backdrop-blur-md bg-opacity-70 flex-between w-full sticky bottom-0  bg-accent px-5 py-2 justify-center items-center md:hidden">
       
      
      {bottombarLinks.map((link) => {
       
        const isActive = pathname === link.route;
        return (
          
          <NavLink
          
          key={`bottombar-${link.label}`}
          to={link.route}
          className={` text-sm font-sans    ${
            isActive && "rounded-[8px] hover: bg-primary "
          } flex-center flex-col gap-1 p-1 transition`}>
            {link.icon}
          

            <p>{link.label}</p>
          </NavLink>
        );
      })}
    
      
    </section>
   
   
   </>
      
 
  )
}

export default Bottombar
