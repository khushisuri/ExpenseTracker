import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/inputs/input";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/helper";
import ProfilePicSelector from "../../components/Custom/ProfilePicSelector";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";
import { UserContext } from "../../context/UserContext";
import { uploadImage } from "../../utils/uploadImage";

const Signup = () => {
  const [profilePic, setProfilePic] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!name) {
      setError("Name cannot be empty");
      return;
    }
    if (!isValidEmail) {
      setError("email not valid");
      return;
    }
    if (!password) {
      setError("Password cannot be empty");
      return;
    }
    let profileImageUrl = "";
    if (profilePic) {
      const imgUploadRes = await uploadImage(profilePic);
      profileImageUrl = imgUploadRes.imageUrl || "";
    }
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullname: name,
        email: email,
        password: password,
        profileImageUrl: profileImageUrl,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token)
      updateUser(user);
      setName("");
      setEmail("");
      setPassword("");
      setProfilePic("");
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else setError("something went wrong", error.message);
      setName("");
      setEmail("");
      setPassword("");
      setProfilePic("");
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to Signup
        </p>
      </div>
      <ProfilePicSelector image={profilePic} setImage={setProfilePic} />
      <form onSubmit={handleSubmit}>
        <Input
          type="name"
          placeholder={"Full Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          label={"Full Name"}
        />
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
          Signup
        </button>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <p className="pt-2">
          already have an account?
          <Link className="text-blue-500 underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
