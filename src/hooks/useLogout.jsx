import axios from '@/api/axios';

import useAuth from './useAuth';
import  secureLocalStorage  from  "react-secure-storage";
const useLogout = () => {
    const { setUser } = useAuth();
    

    const logout = async () => {
        setUser({})
        
        try {
            const response = await axios('/logout', {
               withCredentials:true
                
                
            });
                        secureLocalStorage.removeItem('userInfo')
                        secureLocalStorage.removeItem('webAuthRegPromptShown')


        } catch (err) {
            console.error(err);
        }
    }

    return {logout};
}

export default useLogout