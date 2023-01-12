/*eslint-disable*/

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   const { isLoading, isLoggedIn, isSuccess } = useSelector(
  //     (state) => state.auth
  //   );

  //   const registerUser = async (e) => {
  //     e.preventDefault();

  //     if (!name || !email || !password) {
  //       return toast.error("All fields are required");
  //     }
  //     if (password.length < 6) {
  //       return toast.error("Password must be up to 6 characters");
  //     }
  //     if (!validateEmail(email)) {
  //       return toast.error("Please enter a valid email");
  //     }
  //     if (password !== password2) {
  //       return toast.error("Passwords do not match");
  //     }

  //     const userData = {
  //       name,
  //       email,
  //       password,
  //     };

  //     // console.log(userData);
  //     await dispatch(register(userData));
  //     // await dispatch(sendVerificationEmail());
  //   };

  //   useEffect(() => {
  //     if (isSuccess && isLoggedIn) {
  //       navigate("/profile");
  //     }

  //     dispatch(RESET());
  //   }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <>
      <section className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full bg-blueGray-800 bg-full bg-center bg-cover">
        <div className="container py-[5rem] mx-auto">
          <div className="flex justify-center items-center h-full px-6">
            <div className="w-full xl:w-3/4 lg:w-11/12 ">
              <div className="w-full bg-white p-5 rounded-lg lg:rounded-l-none">
                <div className="sm:px-8 mb-4 text-center">
                  <h3 className="pt-4 mb-2 sm:text-3xl text-lg">
                    Welcome to Mern Auth system
                  </h3>
                  <p className="mb-4 text-sm text-gray-700">
                    Create an account to discover how secure this system is.
                  </p>
                </div>
                <form
                  className="sm:px-8 sm:pt-6 pb-8 mb-4 bg-white rounded"
                  //   onSubmit={registerUser}
                >
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Full Name
                    </label>
                    <input
                      className="w-full px-3 py-2 placeholder:text-md text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="name"
                      type="text"
                      value={name}
                      onChange={onChange}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 placeholder:text-md text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="email"
                      type="email"
                      value={email}
                      onChange={onChange}
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
                      onChange={onChange}
                      placeholder="........"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm placeholder:text-2xl leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="password2"
                      type="password"
                      value={password2}
                      onChange={onChange}
                      placeholder="........"
                    />
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="bg-green-500  hover:bg-green-700 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded-xl shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="flex items-center flex-col sm:flex-row justify-around pb-6">
                    <p
                      className="text-sm text-green-800 align-baseline hover:text-green-500  cursor-pointer"
                      onClick={() => navigate("/login")}
                    >
                      Already have an Account? Login!
                    </p>

                    <p
                      className="text-sm text-green-800 align-baseline hover:text-green-500 pt-3 sm:pt-0 cursor-pointer"
                      onClick={() => navigate("/reset-password")}
                    >
                      Forgot password?
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
