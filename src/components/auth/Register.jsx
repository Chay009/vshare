import React, { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from '@/api/axios';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { XCircle} from 'lucide-react';

const Register = () => {

    // Create a ref to store the input element
    const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message,setMessage] = useState("");
  const navigate=useNavigate()
const{state}=useLocation()


useEffect(()=>{
  if (inputRef.current) {
    inputRef.current.focus();
  }
},[])

  const handleRegister= async (data) => {
    console.log('data', data);

    setIsLoading(true);
    try {
      const response = await axios.post('/register', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      console.log(response?.data);

      if(response.data.message) {
        setMessage(response.data.message)
        form.reset()
      }
      // setSuccess(true); // Assuming setSuccess is defined

      // Add logic to handle success (e.g., redirect or show a success message)
    } catch (error) {
      setMessage( error.response?.data?.message)
      console.error('Registration failed:', error.response?.data?.message);
      form.reset(); // If you have a form object, make sure it's defined
      // Add logic to handle failure (e.g., show an error message)
    } finally {
      setIsLoading(false);
    }
  };

  const signUpValidation = z.object({
   
    email: z.string().email("the email you provided is invalid "),
     password:z.string().min(8, "Password must be at least 8 characters long")
                                .max(20, "Password must not exceed 20 characters")
                                .regex(/[a-zA-Z]/, "Password must contain at least one letter")
                                .regex(/[0-9]/, "Password must contain at least one digit")
                                .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
  });

  const form = useForm({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className="flex items-center justify-center h-screen px-6 ">
  


    <Form {...form} >
    <div className="w-96 p-9 rounded-xl sm:w-420 flex-center flex-col border-2 border-teal-800">
    <img src="/logo_main.png"
           alt="logo" 
           width={85}
           
          />
          <p class="text-base leading-6 ">
    <span class="font-semibold  text-teal-500">V</span><span className='text-accent-foreground'>share,</span> <span class="italic text-muted-foreground">we care</span>
</p>

            <h2 className="text-xl font-bold md:text-2xl pt-5 sm:pt-12">
           Create a new account
          </h2>

   
    {
    message?
      <div className='bg-green-600 font-bold  text-white mt-5'><p className='p-2 '>{message}</p></div>:
       state?.message? 
       <div className='flex gap-2 mt-5 text-rose-600  font-bold'>
      <p className='p-3 '>{state?.message} </p> 
      </div>:  
       <h3 className="text-teal-600 small-medium md:base-regular mt-2 py-3">
       We're pleased to have you
        </h3>}
        
      <form
        onSubmit={form.handleSubmit(handleRegister)}
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

      

        <Button 
        type="submit"
        disabled={isLoading}
         >

      {isLoading? "Registering...":"Register"}
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2">
        ALready an user?
        <Link to='/auth' className=' underline text-teal-400'>Login Now!</Link>
        </p>
      </form>
    </div>
  </Form>
  </div>
  );
};

export default Register;
