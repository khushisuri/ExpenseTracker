import React from "react";
import Navbar from "./Navbar";
import Sidemenu from "./Sidemenu";

const DashboardLayout = ({ children, activemenu }) => {
  return (
    <div activemenu={activemenu}>
      <Navbar activemenu={activemenu} />

      <div className="max-[1080px]:hidden">
        <Sidemenu activemenu={activemenu}></Sidemenu>
      </div>
      <div className="grow mx-5">{children}</div>
    </div>
  );
};

export default DashboardLayout;
