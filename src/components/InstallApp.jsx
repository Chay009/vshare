// InstallApp.js
import React, { useEffect, useRef, useState } from 'react';
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
import { Button } from './ui/button';
import { usePWAContext } from '@/context/PWAProvider';
import { useMediaQuery } from 'react-responsive';


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
} from "@/components/ui/alert-dialog"


const InstallApp = () => {
  
  const { promptToInstall,setShowPWAInstallPrompt} = usePWAContext();

 
  const [open,setOpen]=useState(true)
  const isDesktop = useMediaQuery({ query:"(min-width: 768px)"})

 


  const handleInstallButtonClick = () => {

    promptToInstall();
   
  };
  if (isDesktop) {
    return (
 

<AlertDialog open={open} onOpenChange={setOpen}>

<AlertDialogContent>
  <AlertDialogHeader>
    <AlertDialogTitle>Would you like to install?</AlertDialogTitle>
    <AlertDialogDescription>
    It is recommended to install for a smooth experience
    </AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <AlertDialogCancel onClick={()=>{setShowPWAInstallPrompt(false)}}>Cancel</AlertDialogCancel>

    <AlertDialogAction onClick={handleInstallButtonClick}>Install PWA </AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>
</AlertDialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} 

    >
      {/* <DrawerTrigger ref={myButtonRef} /> */}
      <DrawerTrigger  />
      <DrawerContent onInteractOutside={() => setShowPWAInstallPrompt(false)}>
        <DrawerHeader>
          <DrawerTitle>Would you like to install?</DrawerTitle>
          <DrawerDescription>It is recommended to install for a smooth experience</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button onClick={handleInstallButtonClick}>Install PWA</Button>
          <DrawerClose asChild>
          
            <Button variant="outline" onClick={()=>{setShowPWAInstallPrompt(false);
            }}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default InstallApp;
