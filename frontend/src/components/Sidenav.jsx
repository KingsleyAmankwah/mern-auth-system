/*eslint-disable*/
import { FiHome, FiSettings, FiUsers } from "react-icons/fi";
// import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { FaClipboardList } from "react-icons/fa";
// import { CgListTree } from "react-icons/cg";
// import { BsCalendarEvent } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout, RESET } from "../features/auth/authSlice";
// import { AiOutlineAppstoreAdd } from "react-icons/ai";

export const Navs = [
  {
    name: "Dashboard",
    icon: <FiHome />,
    protected: false,
    link: "dashboard",
  },

  {
    name: "Users",
    icon: <FiUsers />,
    protected: true,
    link: "users",
  },
  {
    name: "Profile",
    icon: <FiSettings />,
    protected: false,
    link: "profile",
  },
  {
    name: "Settings",
    icon: <FiSettings />,
    protected: false,
    link: "change-password",
  },
];
function Sidenav({ page }) {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-white px-4 h-[90vh] w-[20%] flex items-center justify-between">
      <div className="w-[85%] mx-auto h-full flex flex-col justify-between items-center pt-20">
        <div className=" w-full h-[50vh] flex flex-col gap-2">
          {/* Navigations */}
          {Navs.map((nav, index) => {
            // if user role is not admin, hide protected
            if (nav.protected && user && user.role !== "admin") return;

            return (
              <a href={`${nav.link}`} key={index}>
                <div
                  className={`flex gap-4 items-center cursor-pointer ${
                    page === nav.name
                      ? "hover:text-white hover:bg-primary bg-active-bg text-active"
                      : "text-active hover:bg-active-bg hover:text-active"
                  } py-2 px-5 w-full rounded-full transition-all duration-75 ease-in-out`}
                >
                  {nav.icon}
                  <p className="">{nav.name}</p>
                </div>
              </a>
            );
          })}
          <div
            className={`flex gap-4 items-center cursor-pointer text-active hover:bg-active-bg hover:text-active py-2 px-5 w-full rounded-full transition-all duration-75 ease-in-out`}
            onClick={logoutUser}
          >
            <BiLogOutCircle />
            <p>Logout</p>
          </div>
        </div>
        <div className=" w-full flex flex-col mb-5">
          <Link href="/admin/new">
            {/* <Button icon={<AiOutlineAppstoreAdd />} text={"New Post"} /> */}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
