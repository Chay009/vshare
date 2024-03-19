import React from 'react'
import { Moon,Sun,Laptop2Icon} from 'lucide-react'


import { useTheme } from '../context/theme-provider'


import { DropdownMenu,
  DropdownMenuContent,
      DropdownMenuItem,
  DropdownMenuTrigger} from './ui/dropdown-menu'

import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const ThemebarDropDown = ({type}) => {
    const {theme,setTheme}=useTheme()

   

      return(
    
    
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            
            <div className='flex gap-2'>
              
              <Sun/> <span>Light</span>
              </div> 
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
           
          <div className='flex gap-2'> <Moon /> <span>Dark</span></div> 
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
          <div className='flex gap-2'> <Laptop2Icon/><span>System</span> </div> 
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      )
    



    
    
}

export default ThemebarDropDown
