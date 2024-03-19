/**the service worker file should always be outside src ie our pwa is loaclhost/   to acsess
 * scr folder pwa-src ir localhost/src similarly the 



All the code runs again since the hook executes on component rerender

*/


/*
CUSTOM HOOK 
-export const fun=()=>{return {..,...,..,}}     to make import like import {fun}
- const fun=()=>{return {..,...,..,}} export default fun            to make import like import fun
 */

import { useState, useEffect } from "react";

 export const useServiceWorker = () => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isNewUpdateFound, setIsNewUpdateFound] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [isReloaded, setIsReloaded] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [isAppupdated, setIsAppupdated] = useState(false);
  const [updateError, setUpdateError] = useState(null);


  //  isNewUpdateFound and isUpdateAvailable seem same but
  
  
  //  isNewUpdateFound is used inform that there is a new update if user action agreed then use isupdateAvailable to update







    // we created our register function inside useEffect because we need it to executed on once and sw filepath changed
    const registerServiceWorker = async (swFilePath) => {
      try {
        // Registration logic
        const registration = await  navigator.serviceWorker.register(swFilePath, { scope: '/' });
        console.log("registered")

      if(registration.active)
      {
        console.log('service worker registered and running')
      }



        registration.onupdatefound = () => {

          // service worker not yet activated
          if(!registration.active) return;

          const installingWorker = registration.installing;

          installingWorker.onstatechange = (stateChangeEvent) => {

            if (installingWorker.state === "installed") {

              const newState = stateChangeEvent.target.state;

              setIsInstalling(newState === 'installing');
              setIsInstalled(newState === 'installed');

              if (newState === 'installed') {
                console.log('New service worker installed');
  
                  if(registration.active)
                  {
                    console.log('New service worker is now active')
                           // since new worker active we are ready to clean up the old service worker by update prompt to user
                setIsNewUpdateFound(true);
                setIsUpdateAvailable(true);
                setShowUpdate(true);
                console.log('update Available');
                  }

              if (!navigator.serviceWorker.controller) {
                // controller triggers when a new service worker is ready to take control but 
                // since no controller found mean it is the first timw
             // Service worker installed for the first time
             setIsInstalled(true)
              }

            }
          };
        };

        setIsInstalling(true);
      }

     }catch (error) {
        setRegistrationError(error);
        console.log(`registration Error ${error}`);
      }
  }

 







// once user founds update and ready to reload
// even this func should run only once when user clicks to relaod 

  

    const updateAndReload = async () => {
      try {
        // getting the current active service worker
        const registration = await navigator.serviceWorker.getRegistration();
        // check that there is actually a registered service worker and an update
  
        if (registration && registration.waiting) {
          const SKIP_WAITING = 'SKIP_WAITING';

          registration.waiting.postMessage({ type: SKIP_WAITING });
          setIsAppupdated(true);
  
          // App updated to make sure smooth UX, the app is started fresh
          if (!window.isReloaded) {
            // in actual there is no isReloaded in window we are just adding one
            // initially it is null it ensures this reload is from update
            window.isReloaded = true;
            setIsReloaded(true);
            window.location.reload();
          }
  
          console.log('Manual update triggered');
        }
      } catch (error) {
        setUpdateError(error);
        console.error('Error triggering manual update:', error);
      }
    };
  
 
  // Make sure to include an empty dependency array to run this effect only once
  







  // Expose the state values in the returned object
  return {
    isInstalling,
    isInstalled,
    isNewUpdateFound,
    isUpdateAvailable,
    showUpdate,
    isReloaded,
    isAppupdated,
    registrationError,
    updateError,
    updateAndReload,
    registerServiceWorker
 
  };
};





/*

  const updateByReload = useCallback(() => {
    const registrationWaiting = navigator.serviceWorker.controller;

    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' });

      registrationWaiting.addEventListener('statechange', (e) => {
        if (e.target.state === 'activated') {
          setIsReload(true);
        }
      });
    }
  }, []);




*/







// import { useState } from "react";

// /* 


// if new service worker installed then update since updating is just removing previously installed service workers

// so show update available only after new service worker has installed

// if registration.active is true then-sw is running 
// if registration.installing is true- sw is in installing state
// if registration.installed is true- sw is in installed
// if registration.waiting is true- new sw is waiting to be installed





// */

// export const useServiceWorker=(swilepath)=>{

// // const [isSWinitialized,setIsSWinInitialized]=useState(false);
// const [isUpdateAvailable,setIsUpdateAvailable]=useState(false);
// const [showupdate,setShowupdate]=useState(false);
// const [isreload,setIsreload]=useState(false);



// const register=(swfilepath)=>{
//     if('serviceWorker' in navigator){
//         ServiceWorker
//         register(swfilepath).then((registration)=>{
          
//            console.log('registered service worker')


//            if(registration.active) {
//             console.log('a service already running')
//            }
//            else{
//             console.log("new service worker installed") 
//            }



//            // what if  already a uodate

//                 if (registration.waiting) console.log("new update found")



//            registration.addEventListener('updatefound', () => {

//                  /* registration.active is true if already  a service worker running */
//                  if(!registration.active) return; // since it is the first time its not an update for fresh registration

//                  const newSWorker=registration.installing;

//                  newSWorker.addEventListener('statechange', (statechangeevent) => {

//                       /* show update available on it newsw is installed*/
//                     if(statechangeevent.target.state!=='installed') return;


//                    if(statechangeevent.target.state==='installed') {

// console.log('new service worker installed');
//           if(registration.active)
//           {
//             console.log('new service worker installed and active now')


// setIsUpdateAvailable(true);
// setShowupdate(true);
//        console.log('update available')


//           }
                      

//                    }





//                  })
                  

//            })

          




// /*
  
//    this event triggered when new service worker available and activated so that old service worker could give control to new service worker

// when the state change eventof new service worker becomes active controllerchange is triggered 
// */

   

//         }).catch((error)=>{
//             console.error('Service Worker registration failed:', error);
//         })



//         const updateByreload = () =>{
//             navigator.serviceWorker.addEventListener('controllerchange',controllerchangeevent=>{
            
            
//             controllerchangeevent.target.ready.then((registration)=>{
            
//                 if(isreload){
            
//                     setIsreload(true)
//                    window.location.reload();
//             // when is relaod true 
//                 }
              
//             })
            
            
//             })
            
            
//             }  

//     }
// }



// return {isUpdateAvailable,isreload,showupdate}

// };
































































































// // import { useState } from "react";

// // /* 


// // if new service worker installed then update since updating is just removing previously installed service workers

// // so show update available only after new service worker has installed


// // if registration.installing is true- sw is in installing state
// // if registration.installed is true- sw is in installed
// // if registration.waiting is true- new sw is waiting to be installed





// // */

// // export const useServiceWorker=(swfilepath)=>{

// // // const [isSWinitialized,setIsSWinInitialized]=useState(false);
// // const [isUpdateAvailable,setIsUpdateAvailable]=useState(false);
// // const [showupdate,setShowupdate]=useState(false);
// // const [isreload,setIsreload]=useState(false);



// // const register=(swfilepath)=>{
// //     if('serviceWorker' in navigator){
// //         ServiceWorker
// //         register(swfilepath).then((registration)=>{
          
// //            console.log('registered service worker')


// //            if(registration.active) {
// //             console.log('a service already running')
// //            }
// //            else{
// //             console.log("new service worker installed") 
// //            }



// //            // what if  already a uodate

// //                 if (registration.waiting) console.log("new sw waiting to be installed")



// //            registration.addEventListener('updatefound', () => {

// //                  /* registration.active is true if already  a service worker running */
// //                  if(!registration.active) return; // since it is the first time its not an update for fresh registration

// //                  const newSWorker=registration.installing;

// //                  newSWorker.addEventListener('statechange', (statechangeevent) => {

// //                       /* show update available on it newsw is installed*/
// //                     if(statechangeevent.target.state!=='installed') return;


// //                    if(statechangeevent.target.state==='installed') {

// // console.log('new service worker installed');
// //           if(registration.active)
// //           {
// //             console.log('new service worker installed and active now')


// // setIsUpdateAvailable(true);
// // setShowupdate(true);
// //        console.log('update available')


// //           }
                      

// //                    }





// //                  })
                  

// //            })

          




// // /*
  
// //    this event triggered when new service worker available and activated so that old service worker could give control to new service worker

// // when the state change eventof new service worker becomes active controllerchange is triggered 
// // */

   

// //         }).catch((error)=>{
// //             console.error('Service Worker registration failed:', error);
// //         })



// //         const updateByreload = () =>{
// //             navigator.serviceWorker.addEventListener('controllerchange',controllerchangeevent=>{
            
            
// //             controllerchangeevent.target.ready.then((registration)=>{
            
// //                 if(isreload){
            
// //                     setIsreload(true)
// //                    window.location.reload();
// //             // when is relaod true 
// //                 }
              
// //             })
            
            
// //             })
            
            
// //             }  

// //     }
// // }



// // return {isUpdateAvailable,isreload,showupdate}

// // };