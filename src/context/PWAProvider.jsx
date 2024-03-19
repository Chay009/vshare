import React, { createContext, useContext, useEffect, useState } from 'react';

import  secureLocalStorage  from  "react-secure-storage";

const PWAContext = createContext();

export const PWAProvider = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPwaInstalled, setIsPwaInstalled] = useState(false);
  const [isPwa, setIsPwa] = useState(false);

  const [showPWAInstallPrompt, setShowPWAInstallPrompt] = useState(secureLocalStorage.getItem("showPWAInstallPrompt")|| true);



  const [webAuthRegPromptShown,setWebAuthRegPromptShown] = useState(secureLocalStorage.getItem('webAuthRegPromptShown') || false )

  

  // isPwa-tells whether current view is PWA 
  
   
  // isPwaInstalled tells whether a PWA is already installed in device


 
  
  useEffect(() => {
  
    
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  
    console.log('isStandalone:', isStandalone);
    setIsPwa(isStandalone);
  
 
    
    
    
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();

      const promptInfo = {
        platform: event.platform,
        userChoice: null,
      };

      secureLocalStorage.setItem('installPrompt', JSON.stringify(promptInfo));
      setDeferredPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      // Set isPwaInstalled to true when the PWA is installed
      console.log('appinstalled');
      setShowPWAInstallPrompt(false);
     secureLocalStorage.removeItem('installPrompt');
     setIsPwa(true)
     
   
     
     
    });

    // Initialize showPWAInstallPrompt from local storage
    const storedShowPWAPrompt = secureLocalStorage.getItem('showPWAPrompt');

    if (storedShowPWAPrompt) {
      setShowPWAInstallPrompt(storedShowPWAPrompt === 'true');
    }


 
   
  
    

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', () => {
        console.log('hhooops');
        
       setIsPwa(true);
        setShowPWAInstallPrompt(false);
        secureLocalStorage.removeItem('installPrompt');
      });
    };
  }, []); 



  useEffect(() => {
    // Update local storage when showPWAInstallPrompt changes
    secureLocalStorage.setItem('showPWAPrompt', String(showPWAInstallPrompt));
  }, [showPWAInstallPrompt]);


  useEffect(() => {
    // Update local storage when showPWAInstallPrompt changes
    if(webAuthRegPromptShown)
   
    {
      secureLocalStorage.setItem("webAuthRegPromptShown",true);
    }
  }, [webAuthRegPromptShown]);


  const storedPromptInfo =secureLocalStorage.getItem('installPrompt');
  useEffect(() => {
    // Check if there is a deferred prompt in local storage
    
    if (!storedPromptInfo) {
      // If there is no deferred prompt, set isPwaInstalled to true
      setIsPwaInstalled(true);
    } else {
      // If there is a deferred prompt, set isPwaInstalled to false
      setIsPwaInstalled(false);
    }
  
    // Rest of your useEffect code...
  }, [storedPromptInfo]); 




  const promptToInstall = () => {

   
    console.log('Prompting to install');

    const storedPromptInfo = secureLocalStorage.getItem('installPrompt');

    if (storedPromptInfo) {
      const parsedPromptInfo = JSON.parse(storedPromptInfo);

      const installApp = () => {
        deferredPrompt && deferredPrompt.prompt();

        deferredPrompt?.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
            setShowPWAInstallPrompt(true);
          }

          parsedPromptInfo.userChoice = choiceResult;

          setDeferredPrompt(null);
        });
      };

      if (!isPwaInstalled) {
        if (parsedPromptInfo) {
          installApp();
        } else {
          setDeferredPrompt(() => {
            installApp();
            return null;
          });
        }

        setShowPWAInstallPrompt(false);
        secureLocalStorage.setItem('showPWAPrompt', 'false');
        secureLocalStorage.setItem('installPrompt', JSON.stringify(parsedPromptInfo));
      }
    }
  };

  return (
    <PWAContext.Provider value={{ promptToInstall,isPwaInstalled, isPwa,showPWAInstallPrompt, setShowPWAInstallPrompt,webAuthRegPromptShown,setWebAuthRegPromptShown }}>
      {children}
    </PWAContext.Provider>
  );
};

export const usePWAContext = () => {
  return useContext(PWAContext);
};
