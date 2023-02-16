import React from "react";
import { Link } from "react-router-dom";
import login from "../images/login.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="container mx-auto flex flex-col md:flex-row items-center justify-center px-5 py-24">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={login}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Ultimate MERN Stack Authentication System
          </h1>
          <p className="mb-8 leading-relaxed">
            Learn and Master Authentication and Authorization using MERN Stack.
            Implement User Regisration, Login, Password Reset, Social Login,
            User Permissions, Email Notifications etc.
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded-full mr-4">
              <Link to="/register">Register</Link>
            </button>
            <button className="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded-full">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
