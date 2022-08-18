import * as React from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "./AuthProvider";

const PrivateRoute = ({ redirectPath = "/signin", children }) => {
  const { isAuthenticated } = React.useContext(Auth);
  if (!isAuthenticated) {
    return (
      <>
        <Navigate to={redirectPath} replace />;
        {alert("USer is not authenticated")}
      </>
    );
  }

  return children;
};

export default PrivateRoute;
