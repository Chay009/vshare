

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { useEffect, useRef, useState } from "react"

import ConfettiExplosion from 'react-confetti-explosion';
import { ArrowBigLeftIcon } from "lucide-react"


import {Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import autoAnimate from "@formkit/auto-animate"
import axios from "@/api/axios"
import { Link } from "react-router-dom"



const InputOTPForm=({email,setEmail,token,id})=> {



const[message,setMessage]=useState("OTP expires in 5min")
const [loading,setLoading]=useState("")
const [success,setSuccess]=useState(false)
const [successMessage,setSuccessMessage]=useState("")

  const [isExploding, setIsExploding] = useState(false);
const[value,setValue]=useState(null)


      // Create a ref to store the input element
      const inputRef = useRef(null);  
  useEffect(()=>{
    if (inputRef.current) {
      inputRef.current.focus();
    }
  },[])  

  const parent = useRef(null)
useEffect(() => {
  parent.current && autoAnimate(parent.current)
}, [parent])

  const passwordValidation = z.object({
   
    password:z.string().min(8, "Password must be at least 8 characters long")
    .max(20, "Password must not exceed 20 characters")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
  
  });


  const form = useForm({
    resolver: zodResolver(passwordValidation),
    defaultValues: {
      password: "",
   
    },
  });

  
  const handleBackButton=()=>{

    setEmail("")
          }


const handleSubmitOTP=async(data)=>{

  try{

    setLoading(true)
    const response = await axios.post(`/forget-password/${id}/change/${token}`, JSON.stringify({OTP:value,password:data.password}), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      });
  console.log(data);
  console.log(response);
  if(response.status==200){
setSuccess(true);
setSuccessMessage(response.data?.message)
  }

  setLoading(false);
    setIsExploding(true)
  }catch(e){
    setLoading(false);
    console.log(e)
    setMessage(e.response?.data?.message);
    setValue("");
    form.reset()

  }

}

  return (
    <div>
      

     
       {isExploding && 
       <div className="flex justify-around">
         <ConfettiExplosion
      force={0.8}
      width={1600}
      particleCount={60}
      duration={3000}
    
       />
         <ConfettiExplosion
      force={0.8}
      width={1600}
      particleCount={60}
      duration={3000}
    
       />
       </div>
      
       }


<div className="flex items-center justify-center h-screen">
      
    
{!success?<div   ref={parent} className="w-96 rounded-xl py-5 sm:w-420 flex-center gap-3 flex-col border-2 border-teal-800">
          <img src="/logo_main.png"
           alt="logo" 
           width={85}
           />
                     <p class="text-base leading-6 ">
    <span class="font-semibold text-teal-500">V</span><span className='text-accent-foreground'>share,</span> <span class="italic text-muted-foreground">we care</span>
</p>
<Button variant="ghost" className='w-2/3 bg-teal-700' onClick={handleBackButton}>
<ArrowBigLeftIcon/>Go Back
</Button>


 <h2 className="text-xl font-bold md:text-2xl">
  Enter One Time Password
  </h2>
       <p className="text-teal-400">Enter the code sent to {email}</p>
      
       {message&&
                 <div className='text-yellow-500'><p>{message}</p></div>
                 
                    }
 
 

              <InputOTP
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                maxLength={6}
                value={value}
                className='py-6'
                ref={inputRef}
                onChange={(value) => setValue(value)}
                  render={({ slots }) => (
                    <>
                    <InputOTPGroup 
                    
                    >
                      {slots.slice(0, 3).map((slot, index) => (
                        <InputOTPSlot className='border border-gray-100/40' key={index} {...slot} />
                        
                      ))}
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      {slots.slice(3).map((slot, index) => (
                        <InputOTPSlot key={index + 3} className='border border-gray-100/40' {...slot} />
                      ))}
                    </InputOTPGroup>
                  </>
                    
                  )}
                />

       







      

         
             
{ value?.length===6&&
  <Form {...form}>
  <form
        className=" w-2/3 flex flex-col items-center justify-center gap-5"
    
       onSubmit={form.handleSubmit(handleSubmitOTP)}
       >
         <FormField

     
         control={form.control}
         name="password"
         className="text-2xl font-bold"
         render={({ field }) => (
             <FormItem>
           <div  className=" w-full flex flex-col items-start gap-4">
             <FormLabel className='font-bold text-2xl' >Enter New Password</FormLabel>
             <FormControl>
               <Input
                 type="password"
                 className="border border-sky-300"
                 {...field}
                 />
             </FormControl>
             <FormMessage />
           </div>
                 </FormItem>
         )}
       />


<Button type="submit"
disabled={loading}
 className='w-2/3

 '>{loading?"updating..":"Update Password"}</Button>


 </form>
 
 </Form>
}   


             
    </div>:
    
    <div className="border border-teal-400 px-8 py-6 flex  justify-center flex-col gap-3 rounded-lg">
{successMessage&&<p className="font-bold font-mono"> {successMessage}</p>}
<Link to='/auth'>
<Button>
   Login!
   

</Button>
   </Link>

{isExploding && <ConfettiExplosion
      force={0.8}
      width={1600}
      particleCount={60}
      duration={3000}
    
       />}

    </div>
    
    
}
    </div>

   
    </div>

  )
 


}


export default InputOTPForm