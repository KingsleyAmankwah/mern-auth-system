import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { verifyUser } from "../features/user/userSlice";
import { RESET } from "../features/auth/authSlice";

const Verify = () => {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();

  const { isLoading } = useSelector((state) => state.user);

  const verifyAccount = async () => {
    dispatch(verifyUser(verificationToken));
    dispatch(RESET());
  };

  return (
    <section>
      {isLoading && <Spinner />}
      <div>
        <h2>Account Verification</h2>
        <p>To verify your account, click the button below...</p>
        <br />
        <button onClick={verifyAccount}>Verify Account</button>
      </div>
    </section>
  );
};

export default Verify;
