import React, { useEffect, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { validateEmail } from "../../redux/auth/authService";
import { login, RESET } from "../../redux/auth/authSlice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, isError } = useSelector(
    (state) => state.auth
  );

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    // console.log(userData);
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError]);

  return (
    <div>
      {isLoading && <Spinner />}

      <div>
        <div className="--flex-center">
          <BiLogIn size={35} color="#999" />
        </div>
        <h2>Login</h2>

        <br />
        <p className="--text-center --fw-bold">or</p>

        <form onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={handleInputChange}
          />
          <input
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />

          <button type="submit" className="--btn --btn-primary --btn-block">
            Login
          </button>
        </form>
        {/* <Link to="/forgot">Forgot Password</Link>
        <span>
          <Link to="/">Home</Link>
          <p> &nbsp; Don't have an account? &nbsp;</p>
          <Link to="/register">Register</Link>
        </span> */}
      </div>
    </div>
  );
};

export default Login;
