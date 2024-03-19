import React, { useEffect, useRef, useState } from 'react'

import {  useForm } from "react-hook-form";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import useWebAuthn from '@/hooks/useWebAuthn';
import axios from '@/api/axios';
import {  Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowBigLeftIcon, Flag, XCircle } from 'lucide-react';
import { AlertDescription } from '../ui/alert';






const UserName = ({setEmail,setToken,setId}) => {
  const [message,setMessage] = useState("")

    // Create a ref to store the input element
    const inputRef = useRef(null);
    const {state}=useLocation()

  const signUpValidation = z.object({
   
    email: z.string().email("the email you provided is invalid ").nonempty('Email is required'),
  
  });

  const form = useForm({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      email: "",
   
    },
  });

const navigate = useNavigate()
const [isLoading,setIsLoading] = useState(false)
    
    
    const handleSignin=async(data)=>{
      setIsLoading(true);
     
      console.log(data)
      
    try {
      
      const response = await axios.post('/forget-password', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        });
      console.log(response.data?.email)
      console.log(response.data)

   console.log(response)

   if(response.status==200 && response.data && response.data.email&& response.data.token&&response.data.id){
    console.log("yes")
    console.log(response.data.email)
   setEmail(response.data.email)
   setToken(response.data.token)
   setId(response.data.id)

   }
      setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        form.reset()
    setMessage(error.response?.data?.message)
      console.log(error.response?.data?.message)
    
      // toast.error("No user found Register User")
      
      
    }
      
    
        
    }
    

useEffect(()=>{
  if (inputRef.current) {
    inputRef.current.focus();
  }
},[])
 
    return(
<>
<div className="flex items-center justify-center h-screen">
      
      <Form {...form}>
      <div className="w-96 p-9 rounded-xl sm:w-420 flex-center flex-col border-2 border-teal-800">
          <img src="/logo_main.png"
           alt="logo" 
           width={85}
           
          />

<p class="text-base leading-6 ">
    <span class="font-semibold text-teal-500">V</span><span className='text-accent-foreground'>share,</span> <span class="italic text-muted-foreground">we care</span>
</p>
          <Link to='/auth'>
                    <Button variant="ghost" className='w-full mt-2 bg-teal-700' >
                      
<ArrowBigLeftIcon/>Go Back
                      
</Button>
          </Link>
           

          <h2 className="text-xl font-bold md:text-2xl pt-5 sm:pt-12">
          Enter your email address
          </h2>
          {message&&
                 <div className='text-rose-600'><p>{message}</p></div>
                 
                    }

                    <p className='text-sm pt-3 text-teal-400'>Enter the same email which you have registered with,to update password</p>

          <form
            onSubmit={form.handleSubmit(handleSignin)}
            className="flex flex-col gap-5 w-full mt-4">

           
            <FormField

           
              control={form.control}
              name="email"
              className="text-2xl font-bold"
              render={({ field }) => (
                  <FormItem>
                <div className="flex flex-col items-start gap-2">

                  <FormLabel >Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      
                      {...field}
                      ref={inputRef} 
                      />
                  </FormControl>
                  <FormMessage />
                </div>
                      </FormItem>
              )}
            />

           

            <Button 
            type="submit"
            disabled={isLoading} 
            >
            {isLoading?"validating..":"Next"}
            </Button>

          
          </form>
        </div>
      </Form>

     
    </div>



       
    </>
    )
  
}

export default UserName
