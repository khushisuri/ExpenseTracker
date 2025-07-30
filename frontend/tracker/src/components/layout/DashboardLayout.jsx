import React, { useContext ,  useState } from "react";
import Navbar from "./Navbar";
import Sidemenu from "./Sidemenu";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = ({ children, activemenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [showSideMenu, setShowSideMenu] = useState(false);
  
  return (
    <div activemenu={activemenu}>
      <Navbar showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu} />
      <div className="flex">
      {user && showSideMenu && (
        <div className="min-[1080px]:hidden fixed top-[56px] left-0 h-[100vh] z-10">
        <Sidemenu
          activemenu={activemenu}
          user={user}
          clearUser={clearUser}
        ></Sidemenu>
        </div>
      )}
      <div className="flex flex-row grow">
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
    </div>
  );
};

export default DashboardLayout;
