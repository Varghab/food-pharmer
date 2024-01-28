import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../config/supabase.config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  async function CheckAuth(){
    const { data: {user} } = await supabase.auth.getUser()
    if(user==null){
      setIsAuthenticated(false);
      return {status:false};
    }
    else if(user.role==="authenticated") {
      console.log("Authenticated");
      setIsAuthenticated(true);
      setUser(user)
      return {status:true, id:user.id};
    }
    else {
      console.log("Not Authenticated");
      setIsAuthenticated(false);
      return {status:false};
    }
  }

  async function Logout(){
    const { error } = await supabase.auth.signOut()
    window.location.reload(false);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, CheckAuth, Logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(){
  const auth = useContext(AuthContext);
  // console.log(auth);
  return auth;
}