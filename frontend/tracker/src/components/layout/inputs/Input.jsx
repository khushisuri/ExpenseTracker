import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ type, placeholder, onChange, value, label }) => {
  const [showpassword, setShowpassword] = useState(false);
  return (
    <>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="flex items-center gap-2">
        <div className="input-box">
          <input
            type={
              type == "password" ? (showpassword ? "text" : "password") : type
            }
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className="w-full bg-transparent outline-none"
          ></input>
          {type == "password" &&
          (showpassword ? (
            <FaRegEye
              size={22}
              className="text-primary cursor-pointer"
              onClick={() => setShowpassword((prev) => !prev)}
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              className="text-slate-400 cursor-pointer"
              onClick={() => setShowpassword((prev) => !prev)}
            />
          ))}
        </div>
        
      </div>
    </>
  );
};

export default Input;
