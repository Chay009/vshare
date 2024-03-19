

import useAuth from "@/hooks/useAuth";


import { Button } from "./ui/button";
import { usePWAContext } from "@/context/PWAProvider";




const RegisterWebAuthnCard = () => {



 
 

  const {user}=useAuth()
  console.log(user)


  const {setWebAuthRegPromptShown}=usePWAContext()


const handleRegisterWebauthn=()=>{

  // send user info with user agent parser 
  
  // setOpenWebAuthRegPrompt(true)
  setWebAuthRegPromptShown(false) 
     // await initiateRegistration(user.userID);
  

    

}




  return (
    <>
    
    
    <div className=" hidden md:flex flex-col p-3 gap-4 h-max bg-muted rounded-xl">
     <p>Improve Security</p>
     <p>Register Device Now for passwordless Authentication</p>
          <Button onClick={handleRegisterWebauthn}>Register</Button>
      
    </div>
</>
  );
};

export default RegisterWebAuthnCard;