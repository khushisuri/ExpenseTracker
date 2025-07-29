import React from "react";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <>
              <Route path="/" element={<Root />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/dashboard" element={<Home />}></Route>
              <Route path="/income" element={<Income />}></Route>
              <Route path="/expense" element={<Expense />}></Route>
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          </Routes>
          <Toaster
            toastOptions={{
              className: "",
              style: {
                fontSize: "13px",
              },
            }}
          ></Toaster>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
