import React from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Sidemenu from "./Sidemenu";

const Navbar = ({ showSideMenu,setShowSideMenu }) => {

  return (
    <>
      <div className="flex gap-5 items-center bg-white border-gray-200/50 shadow-2xs backdrop:-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <div
          onClick={() => setShowSideMenu((prev) => !prev)}
          className="text-2xl cursor-pointer min-[1080px]:hidden"
        >
          {showSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
        </div>
        <div>
          <h2 className="font-medium">Expense Tracker</h2>
        </div>
      </div>
    </>
  );
};

export default Navbar;
