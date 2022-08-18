import React from "react"
import Dashboard from "../components/Dashboard";
import Drafts from "../components/Drafts";
import Posts from "../components/Posts";
import PrivateRoute from "../components/PrivateRoute";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

export const Nav = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: `/posts`,
    element: (
      <PrivateRoute>
        <Posts />
      </PrivateRoute>
    ),
  },
  {
    path: `/drafts`,
    element: (
      <PrivateRoute>
        <Drafts />
      </PrivateRoute>
    ),
  },
];
