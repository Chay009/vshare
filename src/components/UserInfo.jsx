import React, { useState } from 'react'
import UserAvatar from './UserAvatar';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import useAuth from '@/hooks/useAuth';
import ThemebarDropDown from './ThemebarDropDown';


const UserInfo = () => {
    const [isLoading,setIsLoading] = useState(false);
    const {user}=useAuth()
  return (
    <div className='flex gap-4'>
            {isLoading  ? (
          <div className="h-14">
           <Loader></Loader>
    
          </div>
        ) : (
          //  as of now linking to home  {`/profile/user?.id`} 
          <Link to='/' className="flex gap-3 items-center">

          <UserAvatar></UserAvatar>

            <div className="flex flex-col">
              <p className="body-bold">{user.username}</p>
              <p className="small-regular text-light-3">{user.userEmail}</p>
            </div>
          </Link>



)}
      
<ThemebarDropDown/>


    </div>
  )
}

export default UserInfo
