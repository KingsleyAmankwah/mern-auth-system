import { Routes, Route } from "react-router-dom";

import HeaderStats from "../components/HeaderStats";
import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import Profile from "./Profile";
import Users from "./Users";

function Home() {
  return (
    <>
      <Sidebar />

      <div className="relative md:ml-64 bg-blueGray-100 font-[system-ui]">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="profile" element={<Profile />}></Route>
          </Routes>
          <Routes>
            <Route path="users" element={<Users />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Home;
