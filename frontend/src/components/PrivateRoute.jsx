import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  return user ? children : <Navigate to="/sign-in" />;
};

export const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user?.role === "admin" || user?.role === "author") {
    return <>{children}</>;
  }

  // return user ? children : <Navigate to="/sign-in" />;
};

// export default PrivateRoute;
