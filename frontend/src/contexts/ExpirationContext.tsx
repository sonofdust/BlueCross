import React, {createContext, useContext, useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import {setEmitFlags} from "typescript";

interface ExpireContextType {
  isExpired: boolean;
  setIsExpired: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ExpireContext = createContext<ExpireContextType | undefined>(
  undefined
);

export function useExpire(): ExpireContextType {
  const context = useContext(ExpireContext);
  if (!context) {
    throw new Error("useExpire must be used within an ExpireProvider");
  }
  return context;
}

interface ExpireProviderProps {
  children: React.ReactNode;
}

export function ExpireProvider({children}: ExpireProviderProps): JSX.Element {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace with your own token retrieval logic

    if (token) {
      const decodedToken: {exp: number} = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      setIsExpired(decodedToken.exp < currentTime);
    } else {
      setIsExpired(true);
    }
  }, []);

  const value: ExpireContextType = {
    isExpired,
    setIsExpired,
  };

  return (
    <ExpireContext.Provider value={value}>{children}</ExpireContext.Provider>
  );
}
