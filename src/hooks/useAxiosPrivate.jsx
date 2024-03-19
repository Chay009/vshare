import { axiosPrivate } from "@/api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";
const useAxiosPrivate = () => {
  const getTokens = useRefreshToken();
  const { user } = useAuth();
  const navigate=useNavigate()




  /* 1ST ERROR WHEN ACCESSING PRIVATE ROUTE IN SERVER IS BY MIDDLE WARE JWT VERIFY THEN REQ SEND TO REFRESH TOKEN IF OK
  REQ IS AGAIN SENT TO PRIVATE ROUTE IF NEW REFRESH TOKEN WORKS FINE THEN WE ARE NOT LOGGED OUT BUT IF NOT LOGGED OUT  */

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${user?.userAccessToken}`;
        }
        return config;
      },
      (reqError) => {
        Promise.reject(reqError);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;

          try {
            // Attempt to refresh the access token
            const newAccessToken = await getTokens();
            console.log(newAccessToken,"new access token")
            // Update the Authorization header with the new access token
            if(newAccessToken)
            {

              prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
              // Retry the modified request
              const response = await axiosPrivate(prevRequest);
              // Return the successful response
              return response;
            }

          } catch (refreshError) {
            // Handle the refresh error, e.g., log out the user or show an error message
              
          
            console.error('Error refreshing access token:', refreshError);

               // Assuming 401 or another appropriate status code for an expired refresh token
        if (refreshError.response && refreshError.response.status === 403) {
            // Clear authentication data from local storage
            secureLocalStorage.removeItem('userInfo');
            // Redirect the user to the login page
            navigate('/auth')
            
          }
  
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, getTokens]);

  return axiosPrivate;
};

export default useAxiosPrivate;
