
  
  import { Button } from "@/components/ui/button"

  import {
     SearchIcon ,
     Settings,
    
     Moon,
     LogOut,
   
     

     
  } from "lucide-react"

  import UserAvatar from "./UserAvatar"
import useLogout from "@/hooks/useLogout"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Separator } from "./ui/separator"

import {
  Drawer,
 
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react"
import { useTheme } from "@/context/theme-provider"
import { Switch } from "./ui/switch"
   const UserDetails=()=> {

   const{theme,setTheme} =useTheme()

    const {logout} =useLogout()
    const navigate = useNavigate()
    const {pathname}=useLocation()
    const handleLogout = async() => {
      await logout()
  
    navigate('/auth')
  
    }


    const sidebarLinks = [
      {
        icon:<UserAvatar />,
        // as of now linking to homepage"/user/profile"
        route: "/",
        label: "profile",
      },
      
      {
        icon:<Settings />,
 // as of now linking to homepage  "/user/settngs"
        route:"/",
        label: "Settings",
      },
      
    
     
     
    ];
    const [open,setOpen]=useState(false)
    return (
        
//           <Sheet >
//           <SheetTrigger asChild>
//           <Button  variant="outline" className='w-1 rounded-full'>
//               <UserAvatar/>
              
//           </Button>
//           </SheetTrigger>
//           <SheetContent className='bg-zinc-800'>
//             <SheetHeader>
//               <SheetTitle className='flex gap-2'>
//                 <UserAvatar/>
//                 Chay009
//                 <Actions/>
//               </SheetTitle>
//               <SheetDescription>
//                 {/* Make changes to your profile here. Click save when you're done. */}
//               </SheetDescription>
//             </SheetHeader >
//             <div className='flex flex-col items-start'>
//      <ul className="flex flex-col w-full mt-2">
//           {sidebarLinks.map((link) => {
          

//             return (
//               <li
//                 key={link.label}
//                 className="rounded-lg flex flex-col gap-1 px-2 base-medium hover:bg-gray-700 transition group">
                    
//                 <NavLink
//                   to={link.route}
//                   className=" flex gap-2 items-center text-sm py-1 text-slate-300">
//                    <Settings className="w-4 text-slate-400"/>

//                  {/* {link.icon} */}
//                   {link.label}
//                 </NavLink>
                
//               </li>
//             );
//           })}
//         </ul>
//         <Separator/>
//
//   </div>
//               <SheetClose asChild>
// <ArrowRightCircleIcon>
//               <Button   className='w-1 rounded-full'>
//                 </Button>
// </ArrowRightCircleIcon>
//               </SheetClose>
           
//           </SheetContent>
//         </Sheet>


 <Drawer open={open} onOpenChange={setOpen}>
 <DrawerTrigger  asChild> 
 <Button  variant="outline" className='w-1 rounded-full'>
             <UserAvatar/>
              
         </Button>
  </DrawerTrigger  >
  <DrawerContent onInteractOutside={() => {console.log("closed")}}>
    <DrawerHeader>
      <DrawerTitle></DrawerTitle>
      <DrawerDescription></DrawerDescription>
    </DrawerHeader>
    <ul className="flex flex-col w-full mt-2  ">         
    
    {sidebarLinks.map((link) => {
          

          return (
            <li
              key={link.label}
              className="rounded-lg flex flex-col px-4  py-3 base-medium hover:bg-accent transition group">
                  
              <NavLink
                to={link.route}
                className="  flex gap-2 items-center text-lg py-1 text-accent-foreground">
                 {/* <BellDotIcon className="w-4 text-slate-400"/> */}
             
              {link.icon}
                
                {link.label}
              </NavLink>
              
             
            </li>
          );
        })}
        <Separator/>

<div className="pt-3 justify-center flex flex-col space-y-2">

      <div className="flex px-3 justify-between items-center text-accent-foreground">
        <div className="flex gap-2"> 
        <Moon size={26}/>

        <p className="text-lg text-accent-foreground ">DarkMode</p>

        </div>

      <Switch
      
        checked={theme === 'dark'}
        onCheckedChange={(checked)=>{setTheme(`${checked?"dark":"light"}`)}}
        />

      </div  >
          <div>

            <Button
            variant="ghost"
            className=" flex gap-2 text-accent-foreground "
            onClick={handleLogout}
            >
              <LogOut></LogOut>
            <p className="text-xl text-accent-foreground">Logout</p>
          </Button>
          </div>
</div>
      
      

 
     
      </ul>

  
       
        
    

    <DrawerFooter>
 
    </DrawerFooter>
  </DrawerContent>
</Drawer> 

    
    )
  }
   export default UserDetails