/*eslint-disable*/
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex w-full  items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            >
              Mern Stack
            </Link>
          </div>
          <div className="flex items-center justify-between lg:w-[20%]  w-full lg:bg-opacity-0 lg:shadow-none">
            <button
              className="bg-white mr-4 w-full text-xs capitalize px-4 py-2 rounded outline-none focus:outline-none"
              type="button"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </button>

            <button
              className="bg-white w-full text-xs capitalize px-4 py-2 rounded outline-none focus:outline-none"
              type="button"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
