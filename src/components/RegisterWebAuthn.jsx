import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from './ui/button';

import useWebAuthn from '@/hooks/useWebAuthn';

import useAuth from '@/hooks/useAuth';
import { usePWAContext } from '@/context/PWAProvider';
import { Switch } from './ui/switch';
import usePushNotification from '@/hooks/usePushNotification';
import { Fingerprint } from 'lucide-react';

const RegisterWebAuthn = () => {
  
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const {subscribeToPush}=usePushNotification();

  const { user } = useAuth();
 const [open,setOpen]=useState(true);
  const { setWebAuthRegPromptShown,openWebAuthRegPrompt, setOpenWebAuthRegPrompt } = usePWAContext();
  const { initiateRegistration, error } = useWebAuthn();

  const[isLoading,setIsLoading]=useState(false);

  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const [isChecked, setIsChecked] = useState(Notification.permission==='granted'?true:false);

  useEffect(() => {
    setNotificationPermission(Notification.permission);
    setIsChecked(Notification.permission === 'granted');
  }, []);

  const handleRequestPermission = async (checked) => {
    if (checked) {
      await Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
        setIsChecked(permission === 'granted');
      });
    }
  };

  

  const handleCancel = () => {
    setWebAuthRegPromptShown(true);
  };

  const handleRegisterWebauthn = async () => {
    setIsLoading(true);
    await initiateRegistration(user.userID);
    await subscribeToPush(import.meta.env.VITE_PUSH_NOTIFICATION_PUBLIC_KEY) 
    
    setWebAuthRegPromptShown(true);
    setIsLoading(false);
  };
  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='font-inter'>Hola <span className='font-mono text-teal-300'>{user?.username}</span>, Enhance Security now!</AlertDialogTitle>
            <AlertDialogDescription className='font-inter'>
              To enhance user privacy and security and to keep your account more secure, make sure you register your trusted device.
              If the current device is not trusted, try logging in with a trusted device.
              Note: The biometric data is not stored on the server; it is completed inside your device.
            
           
         
            </AlertDialogDescription>
           <div className='flex gap-3 pt-3'> 
       
        {Notification.permission=="denied"
        ?<p className='text-xs text-rose-500'>Allow notifications by resetting your browser settings </p>
      :     <div className='flex gap-3 pt-3'> 

      <Switch
     
   
      checked={Notification.permission=="granted"?true:false}
      onCheckedChange={(checked)=>{
        handleRequestPermission(checked)
        console.log(isChecked)
        console.log(Notification.permission)
        
      }
      
    }
    
    />
    
    <p className='text-sm font-inter'>I agree to recieve updates regarding my account security and recent logins</p>
    </div>
       
       
       }
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction
           disabled={Notification.permission!=="granted" ||isLoading}
           className='flex gap-2'
             onClick={handleRegisterWebauthn}>

            <Fingerprint className='w-4 h-4 '/> 
              <p className='text-xs  '>Start Registration</p>
              </AlertDialogAction>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger />
      <DrawerContent onInteractOutside={handleCancel}>
        <DrawerHeader>
          <DrawerTitle>Enhance Security!</DrawerTitle>
          <DrawerDescription>Register for more security. Note: The biometric data is not stored on the server; it is completed inside your device.</DrawerDescription>
        </DrawerHeader>
        <div>
          
        </div>
        {Notification.permission=="denied"
        ?<p className='text-xs  text-rose-500'>Allow notifications by resetting your browser settings </p>
      :     <div className='flex gap-3 pt-3 px-2'> 

      <Switch
     
   
      checked={Notification.permission=="granted"?true:false}
      onCheckedChange={(checked)=>{
        handleRequestPermission(checked)
        console.log(isChecked)
        console.log(Notification.permission)
        
      }
      
    }
    
    />
    
    <p className='text-sm font-inter'>I agree to recieve updates regarding my account security and recent logins</p>
    </div>
       
       
       }
        <DrawerFooter>


          
       
          <Button 
       
          onClick={handleRegisterWebauthn}
          disabled={Notification.permission!=="granted" }>
          Start Registration</Button>
          <DrawerClose asChild>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default RegisterWebAuthn;
