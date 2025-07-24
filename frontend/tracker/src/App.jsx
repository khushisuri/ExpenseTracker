import React, { useEffect, useState } from "react";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserProvider from "./context/userContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const isAuth = localStorage.getItem("token");
    setIsAuthenticated(!!isAuth);
    console.log(isAuth);
  }, []);
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<Home />}></Route>
                <Route path="/income" element={<Income />}></Route>
                <Route path="/expense" element={<Expense />}></Route>
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
};

export default App;
