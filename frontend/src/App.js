/*eslint-disable*/
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/auth/authSlice";
import axios from "axios";

axios.defaults.withCredentials = true;
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    // if (isLoggedIn && user === null) {
    //   dispatch(getUser());
    // }
  }, [dispatch, isLoggedIn, user]);

  return (
    <div className="App m-0 p-0 w-full h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              // <Layout>
              <Profile />
              // </Layout>
            }
          />
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
