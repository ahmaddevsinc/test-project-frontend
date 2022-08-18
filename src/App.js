import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "./routes/Routes.js";
import "./App.css";
import AuthProvider from "./components/AuthProvider";
import React from "react"

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {Nav.map((route, index) => (
            <Route
              key={route + index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
