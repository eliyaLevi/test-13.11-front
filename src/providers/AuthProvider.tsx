import React, { createContext, useState, ReactNode } from "react";
import useFetch from "../hooks/useFetch";

interface IUser {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  isAdmin: boolean;
  image?: string;
  createdAt: Date;
}

interface UserDto {
  email: string;
  password: string;
}

interface AuthContextType {
  user: IUser | null;
  login: (user: UserDto) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, postFetch } = useFetch<IUser[]>("http://localhost:3001/auth/");

  const [user, setUser] = useState<IUser | null>(null);

  const login = async (userFromClinet: UserDto): Promise<boolean> => {
    try {
      const user = postFetch(userFromClinet, "login");
      if (!user) {
        return false;
      }
      setUser(user);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    postFetch({}, "logout");
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
