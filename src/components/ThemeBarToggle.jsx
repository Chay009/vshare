import { Moon, Sun } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useTheme } from '@/context/theme-provider'

const ThemeBarToggle = () => {
    const {theme,setTheme}=useTheme()
  return (
  
  <Button variant="ghost" size="icon" onClick={()=>{

    {theme==='light'?setTheme("dark"):setTheme('light')}
    } }>
      {theme=='light'? 
       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
       : <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

      
      }
            
             
              <span className="sr-only">Toggle theme</span>
            </Button>
  )
}

export default ThemeBarToggle
