import React, { useEffect, useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { BsCheck2All } from "react-icons/bs";
import { TiUserAddOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
// import Card from "../../components/card/Card";
// import PasswordInput from "../../components/passwordInput/PasswordInput";
// import styles from "./auth.module.scss";
import { toast } from "react-toastify";
// import { validateEmail } from "../../redux/features/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import { register, RESET } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  //   const [uCase, setUCase] = useState(false);
  //   const [num, setNum] = useState(false);
  //   const [sChar, setSChar] = useState(false);
  //   const [passLength, setPassLength] = useState(false);

  //   const timesIcon = <FaTimes color="red" size={15} />;
  //   const checkIcon = <BsCheck2All color="green" size={15} />;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }

    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };

    // console.log(userData);
    await dispatch(register(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <div>
      {isLoading && <Spinner />}
      {/* <Card> */}
      <div>
        <div className="--flex-center">
          <TiUserAddOutline size={35} color="#999" />
        </div>
        <h2>Register</h2>

        <form onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Name"
            required
            name="name"
            value={name}
            onChange={handleInputChange}
          />
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
          <input
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleInputChange}
            onPaste={(e) => {
              e.preventDefault();
              toast.error("Cannot paste into input field");
              return false;
            }}
          />

          {/* Password Strength */}
          {/* <Card cardClass={styles.group}>
              <ul className="form-list">
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(uCase)}
                    &nbsp; Lowercase & Uppercase
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(num)}
                    &nbsp; Number (0-9)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(sChar)}
                    &nbsp; Special Character (!@#$%^&*)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(passLength)}
                    &nbsp; At least 6 Character
                  </span>
                </li>
              </ul>
            </Card> */}

          <button type="submit" className="--btn --btn-primary --btn-block">
            Register
          </button>
        </form>

        <span>
          <Link to="/">Home</Link>
          <p> &nbsp; Already have an account? &nbsp;</p>
          <Link to="/login">Login</Link>
        </span>
      </div>
      {/* </Card> */}
    </div>
  );
};

export default Register;
