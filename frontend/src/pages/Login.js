/*eslint-disable*/
import React, { useEffect, useState } from "react";
// import { BiLogIn } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
// import { validateEmail } from "../../redux/auth/authService";
import { login, RESET } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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

    //     if (!validateEmail(email)) {
    //       return toast.error("Please enter a valid email");
    //     }

    const userData = {
      email,
      password,
    };

    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError]);

  return (
    <>
      {isLoading && <Spinner />}
      <section className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full bg-blueGray-800  bg-full bg-center bg-cover">
        <div className="container py-[5rem] mx-auto">
          <div className="flex justify-center items-center h-full px-6">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              <div className="w-full bg-white p-5 rounded-lg lg:rounded-l-none">
                <div className="sm:px-8 mb-4 text-center">
                  <h3 className="pt-4 mb-2 text-3xl">Welcome back!</h3>
                  <p className="mb-4 text-sm text-gray-700">
                    Please login to your account
                  </p>
                </div>
                <form
                  className="sm:px-8 sm:pt-6 pb-8 mb-4 bg-white rounded"
                  onSubmit={loginUser}
                >
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 placeholder:text-md text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleInputChange}
                      placeholder="name@gmail.com"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm placeholder:text-2xl leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="password"
                      type="password"
                      value={password}
                      onChange={handleInputChange}
                      placeholder="........"
                    />
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="bg-green-500  hover:bg-green-700 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded-xl shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="flex items-center flex-col sm:flex-row justify-around pb-6">
                    <p
                      className="text-sm text-green-800 align-baseline hover:text-green-500  cursor-pointer"
                      onClick={() => navigate("/register")}
                    >
                      Create an Account!
                    </p>

                    <p
                      className="text-sm text-green-800 align-baseline hover:text-green-500 pt-3 sm:pt-0 cursor-pointer"
                      onClick={() => navigate("/reset-password")}
                    >
                      Forgot password?
                    </p>
                  </div>

                  <div className="flex items-center my-2 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                  </div>
                  {/* <OAuth /> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
