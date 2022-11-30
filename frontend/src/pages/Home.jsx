import React, { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

function Home() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div>
      <header className="header">
        <div className="logo">Mern Auth System</div>
        <ul>
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </header>

      <section className="heading">
        <h1>Welcome to Mern Auth System</h1>
        <p>{user && user.name}</p>
      </section>
    </div>
  );
}

export default Home;
