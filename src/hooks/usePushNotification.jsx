
import { toast } from "sonner";
import urlBase64ToUint8Array from "../helpers/Base64";



import { useState } from 'react';
import useAuth from "./useAuth";
import secureLocalStorage from "react-secure-storage";
import axios from "@/api/axios";


const usePushNotification = () => {
  console.log('running again')
  const [subscription, setSubscription] = useState(null);
  const [isSubscribed,setIsSubscribed]=useState(false);
  const {user,setUser}=useAuth()

  const subscribeToPush = async (PUBLIC_KEY) => {
    console.log(PUBLIC_KEY)
    try {
      if (!subscription) {
        // Request permission to receive push notifications
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          throw new Error('Permission not granted for push notifications');
        }

        // Get the subscription object from the push service
        const registration = await navigator.serviceWorker.ready;
        if(registration)
        { 
          const newSubscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
          
        });
        console.log(newSubscription)

        setSubscription(newSubscription);
        // Update this with setting in secureLocalStorage
        //  secureLocalStorage.setItem('Subscribed','true'); // persist storage
        //  setIsSubscribed(true);
        
          return newSubscription


      }

      else {
        console.log('please wait for app initializing registering servive worker)')
      }
       

        

      

   
      } else {
        console.log('Already subscribed to push notifications');
        // toast.info('Client Error try again')
      }
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      toast.error('Error subscribing to push notifications');
    }
  };

 
const sendSubscriptionToServer = async (PUBLIC_KEY) => {

  const newSubscription=await subscribeToPush(PUBLIC_KEY)
  try {
    // Your backend endpoint to handle subscription
    const backendUrl = `${import.meta.env.BACKEND_BASE_URL}/subscribe`;
    // const backendUrl = 'http://127.0.0.1:7000/subscribe';

    // Send the subscription to your backend
    const response = await axios.post(backendUrl, {
      subscription: newSubscription,
      userID: user.userID,
    });

    // based on response set in local storage or else to not to send again
    console.log(response);
    if (response.status === 200) {
      toast.success('Subscription added');
     
    } else if(response.status === 201){

  toast.info('Subscription already added with this device');
    }
    else {
      toast.warning('Something went wrong. Try Again');
      throw new Error('Failed to send subscription to server');
    }
  } catch (error) {
    console.error('Error sending subscription to server:', error);
    toast.error('Error sending subscription to server');
  }}

  return {isSubscribed, subscription, sendSubscriptionToServer,subscribeToPush };
};

export default usePushNotification;


