import React  from 'react'
import { Link, NavLink,useLocation, useNavigate } from 'react-router-dom'

import { HomeIcon,SearchIcon,ImagePlusIcon,BookmarkPlusIcon, SaveAllIcon, LogOut}from'lucide-react'
import { Button } from './ui/button'
import useLogout from '@/hooks/useLogout'





const SideNavbar = () => {

  const {logout} =useLogout()
  const navigate = useNavigate()
  const handleLogout = async() => {
    await logout()

  navigate('/auth')

  }

const {pathname}=useLocation()
    const sidebarLinks = [
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
          icon:<BookmarkPlusIcon/>,
          route: "/saved",
          label: "Saved",
        },
       
        {
         icon:<ImagePlusIcon />,
          route: "/create-post",
          label: "Create Post",
        },
      ];

  return (
    <>
     <div className='flex-grow flex flex-col justify-center  px-3'>




     <ul className="flex flex-col gap-6 justify-center items-center">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`rounded-lg  hover:bg-primary transition w-max xl:w-full group ${
                  isActive && "bg-primary"
                }`}>
                    
                <NavLink
                
                  to={link.route}
                  className="flex gap-4 items-center justify-start p-4">
                 {link.icon}
                  <p className='hidden xl:block'>{link.label}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>


  </div>
        <Button
        variant="ghost"
        className=" mb-16 py-6 mr-6 flex justify-start"
        onClick={handleLogout}
        >
       <LogOut/>

        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
      
    </>
  )
}

export default SideNavbar
