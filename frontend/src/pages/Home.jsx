import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
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
        <p>Please choose from an option below</p>
      </section>
    </div>
  );
}

export default Home;
