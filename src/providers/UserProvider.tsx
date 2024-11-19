import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";


interface User {
  _id:string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  isAdmin: boolean;
  image?: string;
  createdAt: Date; 
}

interface Props {
  children: React.ReactNode;
}

interface UserProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

// Step 1
// Create Context
export const UserContext = React.createContext<UserProps>({
  users: [],
  setUsers: () => {},
});

export default function UserProvider({ children }: Props) {
  const [users, setUsers] = useState<User[]>([]);

  const  { getFetch, postFetch, putFetch, deleteFetch,data, error } = useFetch<User[]>("http://localhost:3001/data") 

  useEffect(() => {
    
    getFetch()
    
  
  }, [])

  useEffect(() => {
    if(data){

      setUsers(data)
    }
    else{
      console.log(data);
      
    }
  
  }, [[data]])

  

  
  

  return (
    // Step 2
    // Call the Context
    <UserContext.Provider value={{ users, setUsers }}>
      {/* Step 3
      Add Children */}
      {children}
    </UserContext.Provider>
  );
}
