import React, { useState } from 'react';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import useAuth from './useAuth';
import usePushNotification from './usePushNotification';
const useWebAuthn = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
 const {setUser}=useAuth()
 const {subscribeToPush}=usePushNotification()


  const initiateRegistration = async (userID) => {

    const subscription=await subscribeToPush(import.meta.env.VITE_PUSH_NOTIFICATION_PUBLIC_KEY)
    console.log(subscription)

    try {
      console.log("registering user")
      const registrationResponse = await axios.get(`http://127.0.0.1:7000/webauth/generate-registration-options/${userID}`);
      console.log(registrationResponse)
      console.log("registering......")

      const registrationOptions = registrationResponse.data;
      console.log(registrationOptions);
      
      const clientRegistrationOptions = await startRegistration(registrationOptions);
      console.log(clientRegistrationOptions);

    
      const registrationVerificationResponse = await axios.post(
        `http://127.0.0.1:7000/webauth/verify-registration/${userID}`,
        {
          clientRegistrationOptions,
          regUserSubscription: subscription

        }
      );
      const verificationResult = registrationVerificationResponse.data;
      console.log(verificationResult)
      console.log(verificationResult.verified)
       
      if (verificationResult && verificationResult.verified) {

        setIsRegistered(true);
        console.log('Authenticator registered!');
        toast.success("Device registered successfully!");
        setUser((prev)=>({
          ...prev,
          isAlreadyWebAuthnRegistered:true
      
          }))
      } else {
        setError('Registration failed. Please try again.');
        toast.error(error)
        console.log('Oh no, something went wrong during registration!');
      }
    } catch (error) {
      if (error.name === 'InvalidStateError' || error.name === 'NotAllowedError') {
        setError('Error: Authenticator was probably already registered by user');
        toast.warning('Device Authentication failed',{
          description:'Device already registered or device failed to register try again',
        })

      } else {
        setError('Error during registration:');
        toast.error('device already registered by another user');
        console.error('Error during registration:', error);
      }

      
    }

    finally{
      secureLocalStorage.setItem("webAuthRegPromptShown",true);
    }
  };

  const initiateAuthentication = async (userID,loginDeviceInfo) => {
    try {
      const authenticationResponse = await axios.get(`http://127.0.0.1:7000/webauth/generate-authentication-options/${userID}`);
      const authenticationOptions = authenticationResponse.data;

      console.log(authenticationOptions)
      console.log("authentication started")
      const clientAuthenticationOptions = await startAuthentication(authenticationOptions)
     
      console.log(clientAuthenticationOptions);

      console.log("waiting for authentication from server")

      const verifyResponse = await axios.post(
        `http://127.0.0.1:7000/webauth/verify-authentication/${userID}`,
    {
        clientAuthenticationOptions,
        loginDeviceInfo
      },
      { 
        headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
      
      );
      const { verification} = verifyResponse.data;
          

      if (verification&& verification.verified) {
        
        setIsAuthenticated(true);
       
        console.log('User authenticated!');
       return verifyResponse
      } else {
        setError('Authentication failed. Please try again.');
        console.log('Oh no, something went wrong during authentication!');
      }
    } catch (error) {
      setError('Error during authentication. Please try again.');
      console.error('Error during authentication:', error);
    }
  };
 

  return { initiateAuthentication, initiateRegistration, isAuthenticated, isRegistered, error};
};

export default useWebAuthn;
