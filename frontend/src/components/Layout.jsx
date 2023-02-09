import Sidenav from "./Sidenav";
import Navbar from "./Navbar";

import React, { useState } from "react";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <main className="bg-gray-200 w-screen h-screen ">
        <div className="">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="flex">
            <Sidenav open={sidebarOpen} />
            <div className="h-full w-full py-3 px-5">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
