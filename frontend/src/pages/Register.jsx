import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { toast } from "react-toastify";

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !password2) {
      toast.error("Please add all fields");
    }

    if (password !== password2) {
      toast.error("The two passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData))
        .unwrap()
        .then((user) => {
          toast.success(`Welcome to mern auth system ${user.name}`);
          navigate("/");
        })
        .catch(toast.error);
    }
  };

  return (
    <>
      <section className="h-full gradient-form md:h-screen background-radial-gradient">
        <div className="container py-12 px-6 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="md:p-12 md:mx-6">
                      <div className="text-center">
                        <h1 className="text-3xl font-semibold mt-1 mb-5 pb-1">
                          Register
                        </h1>
                      </div>
                      <form onSubmit={onSubmit}>
                        <p class="mb-4">Please Create an account...</p>
                        <div class="mb-4">
                          <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Full Name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            // required
                          />
                        </div>
                        <div class="mb-4">
                          <input
                            type="email"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            // required
                          />
                        </div>
                        <div class="mb-4">
                          <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            // required
                          />
                        </div>

                        <div class="mb-4">
                          <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={onChange}
                            // required
                          />
                        </div>

                        <div class="text-center pt-1 mb-12 pb-1">
                          <button
                            className="inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                            type="submit"
                          >
                            Register
                          </button>
                          {/* <a class="text-gray-500" href="#!">
                          Forgot password?
                        </a> */}
                        </div>
                        <div class="flex items-center justify-between pb-6">
                          <p class="mb-0 mr-2">Already have an account?</p>
                          <a
                            href="/login"
                            class="inline-block px-6 py-2 text-black font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                          >
                            Login here
                          </a>
                        </div>
                      </form>

                      <div className="text-center">
                        <a href="/" className="">
                          Back Home
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="hidden lg:w-6/12 lg:flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none background-radial-gradient">
                    <div class="text-white px-4 py-6 md:p-12 md:mx-6">
                      <h4 class="text-xl font-semibold mb-6">
                        We are more than just a company
                      </h4>
                      <p class="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
