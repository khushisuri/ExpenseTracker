import React, { useEffect, useState } from "react";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserProvider from "./context/UserContext";

const App = () => {
  return (
    <div>
        <BrowserRouter>
        <UserProvider>
          <Routes>
              <>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/dashboard" element={<Home />}></Route>
                <Route path="/income" element={<Income />}></Route>
                <Route path="/expense" element={<Expense />}></Route>
                <Route path="*" element={<Navigate to="/login" />} />
              </>
          </Routes>
          </UserProvider>
        </BrowserRouter>
    </div>
  );
};

export default App;
