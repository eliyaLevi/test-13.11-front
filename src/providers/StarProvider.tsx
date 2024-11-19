import React, { useState } from "react";

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

interface StarProps {
  stars: User[];
  setStars: React.Dispatch<React.SetStateAction<User[]>>;
}

export const StarsContext = React.createContext<StarProps>({
  stars: [],
  setStars: () => {},
});
export const StarProvider = ({ children }: Props) => {
  const [stars, setStars] = useState<User[]>([]);
  return (
    <StarsContext.Provider value={{ stars, setStars }}>
      {children}
    </StarsContext.Provider>
  );
};
