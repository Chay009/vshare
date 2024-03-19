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
import { Flag, XCircle } from 'lucide-react';
import { AlertDescription } from '../ui/alert';






const UserName = ({setLoginEmail,setLoginID,setIsWebAuthnRegistered,setUsername}) => {
  

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
      
      const response = await axios.post('/username', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        });
      console.log(response.data?.email)
      console.log(response.data)
      if(response.data && response.data.email && response.data.id){
        
        setLoginEmail(response.data.email)
        setLoginID(response.data.id)
        console.log(response.data.isWebauthnReg)
        setIsWebAuthnRegistered(response.data.isWebauthnReg)
        setUsername(response.data.username)
        
        
        
        
      }
      setIsLoading(false);
      } catch (error) {
      
    
      console.log(error.response?.data?.message)
    
      // toast.error("No user found Register User")
      
      navigate('/auth/register',{state:{message:error.response?.data?.message}})
    }
      
    
        
    }
    

useEffect(()=>{
  if (inputRef.current) {
    inputRef.current.focus();
  }
},[])
 
    return(
<>
<div className="flex items-center px-6 justify-center h-screen">
      
      <Form {...form}>
      <div className="w-96 p-9 rounded-xl sm:w-420 flex-center flex-col border-2 border-teal-900">
          <img src="/logo_main.png"
           alt="logo" 
           width={85}
           
          />
          <p class="text-base leading-6 ">
    <span class="font-semibold text-teal-500">V</span><span className='text-accent-foreground'>share,</span> <span class="italic text-muted-foreground">we care</span>
</p>

          <h2 className="text-xl font-bold md:text-2xl pt-5 sm:pt-12">
           Login into your account
          </h2>
          <p className="text-teal-600 small-medium md:base-regular mt-2">
            Welcome back!
          </p>


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
                      className=""
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
            {isLoading?"verifying..":"Next"}
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
              Don&apos;t have an account?
             <Link to='/auth/register' className='underline text-teal-400'>register</Link>
            </p>
          </form>
        </div>
      </Form>

     
    </div>



       
    </>
    )
  
}

export default UserName
