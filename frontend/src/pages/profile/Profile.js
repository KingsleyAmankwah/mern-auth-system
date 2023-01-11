import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import useRedirectUser from "../../customeHook/useRedirectUser";
import { getUser } from "../../redux/auth/authSlice";
import { logout, RESET } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
  useRedirectUser("/login");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { isLoading, user } = useSelector((state) => state.auth);

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <Spinner />}
      <div onClick={logoutUser}> Welcome {user && user.name} Logout</div>
    </div>
  );
}

export default Profile;
