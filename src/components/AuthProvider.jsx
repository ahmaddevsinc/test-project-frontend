import React, { createContext, useState } from "react";

export const Auth = createContext({
  isAuthenticated: false,
  setUserAuthencation: () => {},
});

const AuthProvider = (props) => {
  const [isAuthenticated, setUserAuthencation] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <Auth.Provider value={{ isAuthenticated, setUserAuthencation }}>
      {props.children}
    </Auth.Provider>
  );
};

export default AuthProvider;
