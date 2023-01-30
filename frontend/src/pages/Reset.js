/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdPassword } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { resetPassword } from "../features/user/userSlice";

const initialState = {
  password: "",
  password2: "",
};

const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const { resetToken } = useParams();
  console.log(resetToken);

  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      password,
    };

    dispatch(resetPassword({ userData, resetToken }));
  };

  // useEffect(() => {
  //   if ( message.includes("Reset Successful")) {
  //     navigate("/login");
  //   }

  //   dispatch(RESET());
  // }, [dispatch, navigate, message]);

  return (
    <div>
      {isLoading && <Spinner />}

      <div>
        <div className="--flex-center">
          <MdPassword size={35} color="#999" />
        </div>
        <h2>Reset Password</h2>

        <form onSubmit={reset}>
          <input
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <input
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleInputChange}
          />

          <button type="submit" className="--btn --btn-primary --btn-block">
            Reset Password
          </button>
          <div>
            <p>
              <Link to="/">- Home</Link>
            </p>
            <p>
              <Link to="/login">- Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;
