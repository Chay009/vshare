import React, { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth';
import {Outlet } from 'react-router-dom';
import  secureLocalStorage  from  "react-secure-storage";
import LoaderSvg from '@/components/loaderSvg';



const Persist = () => {
    const {user,setUser}=useAuth();
    console.log(user)
    const [isLoading,setIsLoading] = useState(true);
 
    useEffect(() => {
        secureLocalStorage.setItem("userInfo", JSON.stringify(user))
      },[user]);
  
    
    useEffect(() => {
        const storedUserInfo = secureLocalStorage.getItem('userInfo');
        
        console.log('Stored User Info:', storedUserInfo);
        
        if (storedUserInfo) {
            // Assuming storedUserInfo is a JSON string, parse it before setting the user
            try {
                const parsedUserInfo = JSON.parse(storedUserInfo);
                
                console.log('Parsed User Info:', parsedUserInfo);
                
                // Check if parsedUserInfo is an object with the expected properties
                if (parsedUserInfo && typeof parsedUserInfo === 'object') {
                    const { userAccessToken, userEmail, userRoles } = parsedUserInfo;
                  
                    if ( userAccessToken !== null && userEmail !== null && Array.isArray(userRoles)) {
                      setUser(parsedUserInfo);
                  
                      // Set 'userInfo' as the key and JSON.stringify(parsedUserInfo) as the value
                     
                  
                      console.log("user from setting in persisit", user);
                      setIsLoading(false);
                    } else {
                      console.error('Invalid user info properties:', parsedUserInfo);
                    }
                  }
                  
            } catch (error) {
                console.error('Error parsing stored user info:', error);
            }
        }
    }, [setUser]);
    
  

   
  return (
    <div >
 
     {user?.UserAccessToken
                ? <Outlet />
                : isLoading
                    ?    <div className='flex items-center justify-center mt-5 '>

                    <LoaderSvg duration={1}/>
                    </div>
                    : <Outlet /> 
                
            }
    </div>
  )
}

export default Persist
