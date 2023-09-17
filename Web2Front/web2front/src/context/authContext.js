import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add new state variable

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true); // If token exists, user is logged in
    }
  }, []);

  const setAuthToken = (newToken) => {
    setToken(newToken);
    setIsLoggedIn(true); // When token is set, user is logged in
    localStorage.setItem("token", newToken);
    console.log(newToken);
  };

  const removeToken = () => {
    setToken(null);
    setIsLoggedIn(false); // When token is removed, user is logged out
    localStorage.removeItem("token");
    console.log("AuthProvider state updated"); // Add this line for debug
  };
  const contextValues = {
    token,
    setAuthToken,
    removeToken,
    isLoggedIn, // Add isLoggedIn to the context values
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
