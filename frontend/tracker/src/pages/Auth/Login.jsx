import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleSubmit = async (e, guest = "") => {
    e.preventDefault();
    if (!guest) {
      if (!isValidEmail(email)) {
        setError("email not valid");
        return;
      }

      if (!password) {
        setError("Password cannot be empty");
        return;
      }
    }

    try {
      let response = "";
      if (!guest) {
        response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
          email,
          password,
        });
      } else {
        response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
          email: "guest@gmail.com",
          password: "test@143",
        });
      }
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else setError("something went wrong", error.message);
      console.log(error);

      setEmail("");
      setPassword("");
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to login
        </p>
      </div>
      <button
        type="button"
        className="w-full bg-purple-500 text-white p-2 m-2 cursor-pointer mx-0 rounded-[10px]"
        onClick={(e) => handleSubmit(e, "guest")}
      >
        Login as Guest
      </button>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="email"
          placeholder={"Email address"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label={"Email Address"}
        />
        <Input
          type="password"
          placeholder={"minimun 8 characters"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label={"Password"}
        />
        <button
          type="submit"
          className="w-full bg-purple-500 text-white p-2 m-2 cursor-pointer mx-0 rounded-[10px]"
        >
          Login
        </button>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <p className="pt-2">
          dont have an account?{" "}
          <Link className="text-blue-500 underline" to="/signup">
            Signup
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
