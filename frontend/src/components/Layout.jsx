import Sidenav from "./Sidenav";
import Navbar from "./Navbar";

import React from "react";

function Layout({ children }) {
  return (
    <div>
      <main className="bg-gray-200 w-screen h-screen ">
        <div className="">
          <Navbar />
          <div className="flex">
            <Sidenav page="Settings" />
            <div className="min-h-[90vh] h-[90vh] overflow-y-auto w-[80%] py-3 px-5">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
