import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RESET } from "../features/auth/authSlice";
import { changePassword } from "../features/user/userSlice";
import useRedirectUser from "../hook/useRedirectUser";

export default function Settings() {
  useRedirectUser("/login");

  const initialState = {
    oldPassword: "",
    password: "",
    password2: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      oldPassword,
      password,
    };

    dispatch(changePassword(userData))
      .then(() => dispatch(RESET(userData)))
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <>
      <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">Settings</h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={updatePassword}>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className=" text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="password2"
                      value={password2}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="mb-6 text-center">
                  <button
                    className="bg-green-500  hover:bg-green-700 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded-xl shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                    type="submit"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  );
}
