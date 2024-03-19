import React, { createContext, useEffect, useState } from 'react';
import  secure  from  "react-secure-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    userRoles: [],
    userAccessToken: '',
    userEmail: '',
  };

  // Load user info from  or use initialState if not present
  const storedUserInfo = secure.getItem('userInfo');
  const initialUser = storedUserInfo? JSON.parse(storedUserInfo) : initialState;



  const [user, setUser] = useState(initialUser);



  // Update  whenever the user state changes
  useEffect(() => {
    secure.setItem('userInfo', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
