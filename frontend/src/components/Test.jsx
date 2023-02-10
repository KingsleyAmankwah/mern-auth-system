import React, { useState } from "react";

function Sidebar({ open }) {
  return (
    <div className={`${open ? "block" : "hidden"} bg-gray-700 w-64 h-full`}>
      <h3 className="text-white font-bold p-4">Sidebar</h3>
      <p className="text-white p-4">Welcome to the sidebar!</p>
    </div>
  );
}

function Navbar({ toggleSidebar }) {
  return (
    <nav className="bg-gray-800 p-6">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-xl">Dashboard</div>
        <button
          className="bg-gray-600 text-white p-3 rounded-full"
          onClick={toggleSidebar}
        >
          Open Sidebar
        </button>
      </div>
    </nav>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar open={sidebarOpen} />
      <div className="flex-1 bg-gray-100">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6">
          <h1 className="text-gray-700 font-bold mb-4">Main Content</h1>
          <p className="text-gray-700">
            This is the main content of the dashboard.
          </p>
        </main>
      </div>
    </div>
  );
}

export default App;
