import React, { createContext, useState, ReactNode } from "react";
import useFetch  from "../hooks/useFetch";


interface User {
  _id:string;
  email: string;
  password: string; 
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const  { getFetch, postFetch, putFetch, deleteFetch,data, error } = useFetch<User[]>("http://localhost:3001/auth/") 

  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) :Promise<boolean>=> {
    try {
      const user = postFetch({email,password},"login")
      if(!user){
        return false
      }
      return true
      
    } catch (error) {
      return false
    }
  };

  const logout = async () => {
    postFetch({},"logout")
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};





// useEffect(() => {
  
// getFetch()
  

// }, [])

// useEffect(() => {
//   if(data){

//     setUsers(data)
//   }
//   else{
//     console.log(data);
    
//   }

// }, [[data]])
