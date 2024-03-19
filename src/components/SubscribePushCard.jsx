import React from 'react'
import { Button } from './ui/button'
import usePushNotification from '@/hooks/usePushNotification';
import { Switch } from './ui/switch';

const SubscribePushCard = () => {
  const {sendSubscriptionToServer}=usePushNotification();

  return (
    <>
      <div className=" hidden md:flex flex-col p-3 gap-4 h-max rounded-xl">
        <Switch className='text-red'/>
     <p>Subscribe To PushNotifications</p>
     <p>Get Realtime Updates about the account logins,App Updates and much more..</p>
     <p>you can disable anytime in settings</p>
          <Button onClick={async()=>{
            console.log("cna")
            await sendSubscriptionToServer(import.meta.env.VITE_PUSH_NOTIFICATION_PUBLIC_KEY) 
        }}>Subscribe Now</Button>
      
    </div>
    </>
  )
}

export default SubscribePushCard
