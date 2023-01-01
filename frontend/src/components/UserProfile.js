import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { LOGOUT } from "../features/auth";
import { FaUserLock } from "react-icons/fa";
// import { RiSearch2Line } from 'react-icons/ri'
import { FiSettings } from "react-icons/fi";
import { BiLogOutCircle } from "react-icons/bi";

function UserProfile() {
  const [user, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const showMenu = () => {
    setIsMenu((menu) => !menu);
  };

  return (
    <div className="flex items-center gap-4 group relative">
      <div
        onClick={showMenu}
        className="flex flex-col items-end font-sans cursor-pointer"
      >
        {/* <p className="text-active">{user?.username || "username"}</p> */}
        {/* <p className="text-[#888A91] text-sm capitalize">{user.role}</p> */}
      </div>
      <div
        className="w-10 h-10 flex items-center justify-center border border-active-bg rounded-full cursor-pointer"
        onClick={showMenu}
      >
        <img
          //   src={user?.avatar}
          alt=""
          className="w-[90%] h-[90%] border border-active-bg rounded-full"
        />
        {isMenu && (
          <div className=" bg-white rounded-lg shadow-xl gap-0  flex-col absolute right-0 z-50 top-14 p-2 font-sans flex min-w-[12rem]">
            <div
              className="text-active flex gap-2 items-center "
              onClick={showMenu}
            >
              <FaUserLock className="text-lg" />
              <p>{user.name}</p>
            </div>
            <div className="w-full h-[2px] my-2 bg-active-bg"></div>
            <Link href="/admin/settings" onClick={showMenu}>
              <div className="flex items-center gap-2 text-active cursor-pointer hover:bg-active-bg p-2">
                <FiSettings className="text-lg" />
                <p>settings</p>
              </div>
            </Link>
            <div
              onClick={() => LOGOUT(dispatch)}
              className="flex items-center gap-2 text-active cursor-pointer hover:bg-active-bg p-2"
            >
              <BiLogOutCircle className="text-lg" />
              <p>Logout</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
