/*eslint-disable*/
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
// import UserProfile from "../components/UserProfile";
import { BiLogOutCircle } from "react-icons/bi";
import { LOGOUT } from "../features/auth";

function Home() {
  const [user, dispatch] = useStateValue();

  return (
    <>
      <div className="bg-white py-2 px-4 w-screen h-[10vh] flex items-center z-40">
        {/* Brand */}
        <div className="flex justify-center items-center w-[20%] gap-5">
          <Link href="/admin">
            <div className="w-10 h-10 flex items-center justify-center border border-active-bg rounded-full">
              <img
                src="https://akingsley.netlify.app/images/p3.jpg"
                alt=""
                className="w-[90%] h-[90%] border border-active-bg rounded-full"
              />
            </div>
          </Link>
          <Link href="/">
            <h1 className="font-brand font-[500] text-3xl cursor-pointer">
              Kingsley
            </h1>
          </Link>
        </div>
        {/* main */}
        <div className="flex justify-between items-center w-[80%]">
          {/* searchbar */}
          {/* <Searchbar tweek /> */}
          {/* user profile */}
          {/* <UserProfile /> */}
        </div>

        <div
          onClick={() => LOGOUT(dispatch)}
          className="flex items-center gap-2 text-active cursor-pointer hover:bg-active-bg p-2"
        >
          <BiLogOutCircle className="text-lg" />
          <p>Logout</p>
        </div>
      </div>
    </>
  );
}
export default Home;
