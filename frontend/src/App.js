/*eslint-disable*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Users from "./components/Users";
import axios from "axios";
axios.defaults.withCredentials = true;
import {
  getLoginStatus,
  selectIsLoggedIn,
  selectUser,
} from "./features/auth/authSlice";
import { getUser } from "./features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Test from "./components/Test";
import NoInternet from "./components/NoInternet";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleNetworkChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  return (
    <div className="App m-0 p-0 w-full h-full">
      {!isOnline && <NoInternet />}

      {isOnline && (
        <>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ForgotPassword />} />
              <Route path="/test" element={<Test />} />

              <Route
                path="/dashboard"
                element={
                  <Layout>
                    <Dashboard />
                  </Layout>
                }
              />
              <Route
                path="/profile"
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              />
              <Route
                path="/settings"
                element={
                  <Layout>
                    <Settings />
                  </Layout>
                }
              />
              <Route
                path="/users"
                element={
                  <Layout>
                    <Users />
                  </Layout>
                }
              />
            </Routes>
          </Router>

          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
