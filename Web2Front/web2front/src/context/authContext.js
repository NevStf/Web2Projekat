import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true); 
    }
  }, []);

  const setAuthToken = (newToken) => {
    setToken(newToken);
    setIsLoggedIn(true); 
    localStorage.setItem("token", newToken);
  };

  const removeToken = () => {
    setToken(null);
    setIsLoggedIn(false); 
    localStorage.removeItem("token");
  };
  const contextValues = {
    token,
    setAuthToken,
    removeToken,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
