import React from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { getCredentials } from "../../utils/helper";

const Sidemenu = ({ activemenu, user, clearUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };
  return (
    <div className="w-64 h-[calc(100vh-40px)] bg-white border-r border-gray-200 py-5">
      <div className="flex justify-center items-center w-20 h-20 mx-auto my-5 rounded-[50%] overflow-hidden bg-amber-50">
        {user?.profileImageUrl ? (
          <img src={user?.profileImageUrl} alt="profile pic"></img>
        ) : (
          <div className="uppercase text-2xl">
            {getCredentials(user?.fullname)}
          </div>
        )}
      </div>
      <p className="my-5 text-center capitalize">{user?.fullname}</p>
      {SIDE_MENU_DATA.map((data) => (
        <div
          key={data.id}
          onClick={() => {
            if (data.path == "/logout") {
              handleLogout();
            } else {
              navigate(data.path);
            }
          }}
          className={`flex gap-4 items-center p-4 cursor-pointer ${
            activemenu == data.label
              ? "bg-purple-600 text-white rounded-[10px]"
              : "bg-white text-black rounded-0"
          }`}
        >
          <div className="text-2xl">
            <data.icon />
          </div>
          {data.label}
        </div>
      ))}
    </div>
  );
};

export default Sidemenu;
