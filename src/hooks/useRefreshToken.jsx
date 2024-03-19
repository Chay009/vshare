import axios from '@/api/axios';
import useAuth from './useAuth';
import { UAParser } from 'ua-parser-js';
import useLogout from './useLogout';

const useRefreshToken = () => {
    const { setUser } = useAuth();
    const {logout}=useLogout()

    const getTokens = async () => {
        try {
            const parser = new UAParser();
            const uaInfo = parser.getResult();  // Get user agent info once
            // this route checks the current refresh token; if valid, assign new, else invalidate so the user has to log in again
            const response = await axios.get('/refresh', {
                withCredentials: true,
                headers: {
                    'device-info': JSON.stringify(uaInfo),  // Include the user agent in the headers
                },
            });

            setUser((prev) => {
                console.log(JSON.stringify(prev)); // here, the prev is accessed by state like set((prev)=>{})
                // the prev state is spread, and roles and access token were overwritten by new values
                console.log(response.data.accessToken);
                return {
                    ...prev,
                    userRoles: response.data.roles,
                    userAccessToken: response.data.accessToken,
                };
            });
            return response.data.accessToken;
        } catch (error) {
            // this is due to the response from the server because the refresh token in the cookie was expired
            // so /refresh route makes the user login again
            console.log(error);

            // Assuming your authentication context provides a logout function
           logout()

            // You might also want to redirect the user to the login page after logout
        }
    };

    return getTokens;
};

export default useRefreshToken;
