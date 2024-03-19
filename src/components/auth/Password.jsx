import React, {  useState} from 'react'

import { useForm } from "react-hook-form";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import useWebAuthn from '@/hooks/useWebAuthn';
import useAuth from '@/hooks/useAuth';
import axios from '@/api/axios';
import { useLocation, useNavigate } from 'react-router-dom';

  import {Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { ArrowBigLeftIcon, Fingerprint,Loader,Loader2,LockKeyhole } from 'lucide-react';
import secureLocalStorage from 'react-secure-storage';
import { usePWAContext } from '@/context/PWAProvider';
import { toast } from 'sonner';
import { Toast } from '../ui/toast';

const Password = ({loginEmail,loginID,isWebAuthnRegistered,setLoginEmail,loginDeviceInfo,username}) => {




  
  const [isloading,setIsLoading] = useState(false)

  // this has to form global state 
  const {user,setUser}=useAuth()
  const {isPwa}=usePWAContext()
  console.log(isWebAuthnRegistered)
console.log(loginDeviceInfo)

const {initiateAuthentication,isAuthenticated}=useWebAuthn();
const [authenticating,setAuthenticating]=useState(false);
const [message,setMessage]=useState("")

console.log(isAuthenticated)
    
    
  const navigate=useNavigate()
  const location = useLocation(); // it is used to redirect them to the page they wanted to visit before being sent to this login page
  const from = location.state?.from?.pathname || "/";





const signInValidation = z.object({
   
  password: z.string().min(2,"min 2 letters")

});

const handleWebauthn=async()=>{

  setAuthenticating(true);
  console.log(loginID);
  if(loginID){

    try {
      
      const verifyResponse=await initiateAuthentication(loginID,loginDeviceInfo)
    




      console.log(verifyResponse?.data)

      const roles = verifyResponse?.data?.roles;
      const accessToken = verifyResponse?.data?.accessToken;
      const id= verifyResponse?.data?.foundUser._id;
      const isWebAuthnRegistered=verifyResponse?.data?.foundUser.isWebAuthnRegistered;
      const username= verifyResponse?.data?.foundUser.username;

      
      console.log(isWebAuthnRegistered)
      
     
        console.log('Authenticated..')
      
        
        if(verifyResponse.status==200){

          setAuthenticating(false);
          
          setUser( (prev)=>({
          ...prev,
            userRoles: roles,
            userAccessToken: accessToken,
            userEmail:loginEmail,
            userID:id,
            username:username,
            isAlreadyWebAuthnRegistered: isWebAuthnRegistered

          }));
          
          

       
      
    
   }
        
        
        console.log(user)
    
    navigate(from,{replace:true})
  
 
      
         
      
     

    } catch (error) {
      console.log(error)
    }
      
  }
  else{
    console.log("no login id provided")
  }
}

    const handleSignIn=async(data)=>{


      setIsLoading(true);
      console.log(loginEmail)
        console.log(data)
        const {password}=data;



      try {
        
        const response = await axios.post('/auth', JSON.stringify({email:loginEmail,pwd:password,loginDeviceInfo:loginDeviceInfo}), {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
   
        
          
        });
  
  
        console.log(response?.data)
        

        const roles = response?.data?.roles;
        const accessToken = response?.data?.accessToken;
        const id= response?.data?.foundUser._id;
        const isWebAuthnRegistered=response?.data?.foundUser.isWebAuthnRegistered;
        const username= response?.data?.foundUser.username;

        
        console.log(isWebAuthnRegistered)
        
        if(response.status==200){

          
          
          setUser( (prev)=>({
          ...prev,
            userRoles: roles,
            userAccessToken: accessToken,
            userEmail:loginEmail,
            userID:id,
            username:username,
            isAlreadyWebAuthnRegistered: isWebAuthnRegistered

          }));
          
         

       
    
    
   }
 

      
          
        
       
  
      } catch (error) {
        setIsLoading(false) ;
        
      //  toast.error("user and password dont match")
      setMessage(error.response?.data?.message)
        console.log(error.response?.data?.message)
      }
        
  
          
      }

      const form = useForm({
        resolver: zodResolver(signInValidation),
        defaultValues: {
          password: "",
       
        },
      });

      const handleBackButton=()=>{

setLoginEmail("")
      }

      

    return (
        <>

<div className="flex items-center px-6 justify-center h-screen">


       
              <Form {...form}>
              <div className="w-96 p-9 rounded-xl sm:w-420 flex-center flex-col border-2 border-teal-800">
          <img src="/logo_main.png"
           alt="logo" 
           width={85}
           
          />
          <Button variant="ghost" className='w-full mt-2 bg-teal-700' onClick={handleBackButton}>
<ArrowBigLeftIcon/>Go Back
</Button>
                              
                            
  <h2 className="text-xl font-bold md:text-2xl pt-5 sm:pt-12">
           Enter your password
          </h2>
                 {message?
                 <div className='text-rose-600'><p>{message}</p></div>
                 :
                  <p className="text-sky-200 small-medium md:base-regular mt-2">
                    {`Hey!! ${username} Welcome Back`}
                    </p>
                    }

                  <form

                    onSubmit={form.handleSubmit(handleSignIn)}
                    className="flex flex-col gap-5 w-full mt-4">



                    <FormField

                  
                      control={form.control}
                      name="password"
                      className="text-2xl font-bold"
                      render={({ field }) => (
                          <FormItem>
                        <div className="flex flex-col items-start gap-2">
                          <FormLabel >password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              className=""
                              {...field}
                              />
                          </FormControl>
                          <FormMessage />
                        </div>
                              </FormItem>
                      )}
                    />
<p className='flex justify-end'>

<Link to='/auth/forget-password' className='underline text-sky-400 '>forget password?</Link>
</p>

                  

                    <Button
                     type="submit" 
                     disabled={isloading}
                     className="flex gap-2"
                    >
                      <LockKeyhole/>    
                <p>{isloading ?"logging in...":"login"}</p>  
                    </Button>

                    <p className="text-small-regular text-light-2 text-center mt-2">
              Don&apos;t have an account?
             <Link to='/auth/register' className='underline text-teal-400'>register</Link>
            </p>
                  </form>
                </div>
              </Form>

             

              {isWebAuthnRegistered &&isPwa &&  <div>
                
                <h2>OR</h2>
                <Button
                 onClick={handleWebauthn}
                 disabled={authenticating}
                 className="flex gap-2"
                >
                  {!authenticating?
                  <Fingerprint/>:
                  <div className='animate-spin'>

                    <Loader2/>
                  </div>
                  }
                <p>{!authenticating?"Login with Device":"waiting for device..."}</p>
  </Button>
  </div> } 

    </div>

      


        


        
       
       




  
    


      
 

  
           </>
       
        )  
  
}

export default Password
