import React, { useContext } from "react";
import Navbar from "./Navbar";
import Sidemenu from "./Sidemenu";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = ({ children, activemenu }) => {
  const { user, clearUser } = useContext(UserContext);
  return (
    <div activemenu={activemenu}>
      <Navbar activemenu={activemenu} />

      <div className="flex flex-row">
        <div className="max-[1080px]:hidden">
          {user && (
            <Sidemenu
              activemenu={activemenu}
              user={user}
              clearUser={clearUser}
            ></Sidemenu>
          )}
        </div>
        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
