/*eslint-disable*/
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import UserProfile from "../components/UserProfile";
import { BiLogOutCircle } from "react-icons/bi";
import { LOGOUT } from "../features/auth";
import { fetchUsers } from "../features/users";

function Home() {
  // const [user, dispatch] = useStateValue();

  const [state, dispatch] = useStateValue();
  const { users, user } = state;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, []);

  return (
    <>
      <div className=" bg-white py-2 px-4 w-screen h-[10vh] flex items-center z-40">
        {/* Brand */}
        <div className="flex justify-center items-center w-[20%] gap-5">
          {/* <Link href="/admin"> */}
          <div className="w-10 h-10 flex items-center justify-center border border-active-bg rounded-full">
            <img
              src="https://codersquiz.netlify.app/img/bentil.jpeg"
              alt=""
              className="w-[90%] h-[90%] border border-active-bg rounded-full"
            />
          </div>
          {/* </Link> */}
          {/* <Link href="/"> */}
          <h1 className="font-brand font-[500] text-3xl cursor-pointer">
            Bentility
          </h1>
          {/* </Link> */}
        </div>
        {/* main */}
        <div className="flex justify-between items-center w-[80%]">
          {/* searchbar */}
          {/* <Searchbar tweek /> */}
          {/* user profile */}
          <UserProfile />
        </div>
      </div>
    </>
  );
}
export default Home;
